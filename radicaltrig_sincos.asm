;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;SINE_RAU;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; https://godbolt.org/z/6zrjqEE7z (sine test) https://godbolt.org/z/Tq4chjes3 (cosine test)
;
; ABI selection: this function writes xmm6/xmm7 as scratch. Under SysV64
; (Linux/macOS) ALL xmm registers are caller-saved, so this is fine as-is.
; Under Win64, xmm6-xmm15 are CALLEE-saved -- a caller may have a live
; value sitting in xmm6/xmm7 across this call, and this function would
; silently corrupt it unless it saves/restores them itself.
;
; Assemble for Linux/SysV64 (default, no extra cost):
;     nasm -f elf64 sincos_rau.asm -o sincos_rau.o
;
; Assemble for Windows x64 (adds the save/restore prologue+epilogue):
;     nasm -f win64 -DWIN64_ABI sincos_rau.asm -o sincos_rau.obj
;
; Same source, same algorithm, only the register-preservation differs.
default rel
global sincos_rau

section .text
align 64

sincos_rau:
%ifdef WIN64_ABI
	; Win64 ABI: xmm6/xmm7 are callee-saved -- preserve the caller's values
	sub rsp, 32
	movdqu [rsp], xmm6
	movdqu [rsp+16], xmm7
%endif

	; --- snapshot sign of original x ---
	; rdx = 0x0000000000000000 or 0x8000000000000000
	movq    rdx,xmm0
	shr     rdx,63
	shl     rdx,63
	xorpd xmm2, xmm2
	ucomisd xmm0, xmm2              ; +0.0 == -0.0 is true under IEEE compare
	je .early_zero
	; --- |x|, double precision ---
	andpd   xmm0,[.abs_mask_dbl]

	; --- radians -> RAU, done in double precision ---
	mulsd xmm0, [.two_over_pi_dbl]  ; xmm0 = phi = |x| * 2/pi

	; --- floor-based mod4: m = phi - 4*floor(phi/4), still double ---
	movsd xmm1,xmm0
	mulsd xmm1,[.quarter_dbl]
	roundsd xmm1,xmm1,0x09          ; round down (floor), suppress inexact
	mulsd xmm1,[.four_dbl]
	subsd xmm0,xmm1                 ; xmm0 = m, in [0,4), double

	; --- quadrant + fraction, still double ---
	cvttsd2si eax,xmm0              ; eax = qi_full
	mov r8d,eax                     ; preserve qi_full
	and r8d,3                       ; r8d = qi

	cvtsi2sd xmm2,eax               ; convert qi_full (double), NOT masked qi
	subsd xmm0,xmm2                 ; frac = m - qi_full, double, in [0,1)

	; --- narrow to float32 now: frac is small and already well-reduced ---
	cvtsd2ss xmm0,xmm0

	; --- warp polynomial: v = frac - 0.5, then one step in v ---
	movss xmm3,xmm0
	subss xmm3,[.half]		; xmm3 = v
	movss xmm4,xmm3
	mulss xmm4,xmm4			; xmm4 = v^2 = (xmm3-0.5)^2

	; -------- Estrin --------
	movss xmm5,[.coef4]
	mulss xmm5,xmm4
	addss xmm5,[.coef5]
	movss xmm0,[.coef2]
	mulss xmm0,xmm4
	addss xmm0,[.coef3]
	movss xmm1,[.coef0]
	mulss xmm1,xmm4
	addss xmm1,[.coef1]
	mulss xmm4,xmm4
	mulss xmm0,xmm4
	mulss xmm4,xmm4
	mulss xmm1,xmm4
	addss xmm5,xmm0
	addss xmm5,xmm1
	; xmm5 = p

	mulss xmm5,xmm3			; xmm5 = v*p = xmm3*xmm5
	addss xmm5,[.half]		; xmm5 = v*p + 0.5 = w

	; --- odd-quadrant fix ---
	and r8d,1
	jz .no_flip

	movss xmm6,[.one]
	subss xmm6,xmm5
	movss xmm5,xmm6

.no_flip:
	movss xmm6,[.one]
	subss xmm6,xmm5			; xmm6 = (1-w)

	movss xmm7,xmm6
	mulss xmm7,xmm7
	movss xmm1,xmm5
	mulss xmm1,xmm1
	addss xmm7,xmm1			; xmm7 = D

	sqrtss xmm7,xmm7
	movss xmm1,[.one]
	divss xmm1,xmm7			; xmm1 = inv = 1/sqrt(D)

	mulss xmm5,xmm1			; xmm5 = sin_raw = w*inv

	; --- quadrant-derived periodic sign ---
	mov r8d,eax
	shr r8d,1
	shl r8d,31
	movd xmm2,r8d
	pxor xmm5,xmm2

	; --- widen and restore original input sign ---
	cvtss2sd xmm0,xmm5
	movq xmm1,rdx
	xorpd xmm0,xmm1

%ifdef WIN64_ABI
	movdqu xmm6, [rsp]
	movdqu xmm7, [rsp+16]
	add rsp, 32
%endif
	ret

.early_zero:
	; rdx already holds exactly +0.0's or -0.0's bit pattern -- no
	; extra masking needed, and no xmm6/xmm7 has been touched yet on
	; this path, so no restore needed here either.
	movq xmm0, rdx
%ifdef WIN64_ABI
	movdqu xmm6, [rsp]
	movdqu xmm7, [rsp+16]
	add rsp, 32
%endif
	ret

align 16
.abs_mask_dbl:
	dq 0x7FFFFFFFFFFFFFFF, 0x7FFFFFFFFFFFFFFF

align 8
.two_over_pi_dbl:
	dq 0x3FE45F306DC9C883	; 0.63661977236758134308 (2/pi), double
.quarter_dbl:
	dq 0x3FD0000000000000	; 0.25, double
.four_dbl:
	dq 0x4010000000000000	; 4.0, double

.half:
	dd 0x3F000000		; 0.5
.one:
	dd 0x3F800000		; 1.0

.coef0:
	dd 0x3FC26F24		; 1.51901679307446258196
.coef1:
	dd 0x3EA66887		; 0.32501622369042378935
.coef2:
	dd 0x3F2F6638		; 0.68515350354689586789
.coef3:
	dd 0x3F224EDE		; 0.63401589172451679138
.coef4:
	dd 0x3F2564F2		; 0.64607158024987317298
.coef5:
	dd 0x3F490FDB		; 0.78539816339744830962 (pi/4)
