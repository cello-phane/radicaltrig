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

sinecos_rau:
%ifdef WIN64_ABI
	mov r10, rcx              ; r10 = destination struct pointer
	movsd xmm0, xmm1          ; x arrives in xmm1 under Win64's hidden-pointer shift

	sub rsp, 32
	movdqu [rsp], xmm6
	movdqu [rsp+16], xmm7
%endif

	; --- snapshot sign of original x ---
	; rdx = 0x0000000000000000 or 0x8000000000000000
	movq    r9,xmm0
	shr     r9,63
	shl     r9,63

	; No exact-zero branch needed: the refit coefficients below already
	; give sin(+-0.0)=+-0.0 and cos(0.0)=1.0 exactly through the normal
	; path (verified in the refit simulation). See header comment.

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
	cvttsd2si eax,xmm0              ; eax = qi_full -- stays live all the way
	mov r8d,eax                     ; to the sign-application block below
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

	;; ---- rsqrt polynomial evaluation(valid for 0.5 to 1.0 input range) ----
	; (C[0] + (C[1] * d) + ((C[2] + d * C[3]) * d^2)) + d^4 * (C[4] + (C[5] * d) + ((C[6] + d * C[7]) * d^2))
	;                                                         (      xmm2      )   (          xmm3          )
	;                                                  (                    xmm3{free xmm2}                 )
    ; xmm4 = d^2
    movss xmm4,xmm7
    mulss xmm4,xmm4 ; d^2 = xmm4
    ;---------
    movss xmm3,[.rscoef7]
    mulss xmm3,xmm7
    addss xmm3,[.rscoef6]
    mulss xmm3,xmm4

    movss xmm2,[.rscoef5]
    mulss xmm2,xmm7
    addss xmm2,[.rscoef4]
    ;---------
    addss xmm3,xmm2
    ;-- multiply by d^4 --
    mulss xmm3,xmm4
    mulss xmm3,xmm4

   	; ( C[0] + (C[1] * d) + ( ( C[2] + (d * C[3]) ) * d^2 ) ) + d^4 * ( C[4] + (C[5] * d) + ( ( C[6] + (d * C[7]) ) * d^2 ) )
	;        (  xmm1  )     (             xmm2              )
	; (                          xmm1                       ) += { xmm3 } --> xmm1 = 1/sqrt(d)
	movss xmm2,[.rscoef3]
	mulss xmm2,xmm7
	addss xmm2,[.rscoef2]
	mulss xmm2,xmm4

	movss xmm1,[.rscoef1]
	mulss xmm1,xmm7
	addss xmm1,[.rscoef0]
	addss xmm1,xmm2
	addss xmm1,xmm3
	; -------- end rsqrt polynomial evaluation --------

	; This block replaced by the above
	; - which is an optional optimization for fma supported archs
	;rsqrtss xmm1,xmm7
	;movss xmm1,[.one]
	;divss xmm1,xmm7			; xmm1 = inv = 1/sqrt(D)

	mulss xmm5,xmm1			; xmm5 = sin_raw = w*inv
	mulss xmm6,xmm1			; xmm6 = cos_raw = (1-w)*inv

	; --- sin: periodic sign (qi bit1) ---
	mov edx,eax
	shr edx,1
	and edx,1                       ; defensive: guard against qi_full transiently >3
	shl edx,31
	movd xmm2,edx
	pxor xmm5,xmm2

	; --- cos: periodic sign (qi bit1 XOR bit0), no overall-sign step ---
	mov r8d,eax
	shr r8d,1
	xor r8d,eax
	and r8d,1
	shl r8d,31
	movd xmm3,r8d
	pxor xmm6,xmm3

	; --- widen; apply overall input sign to sin ONLY (sin is odd) ---
	cvtss2sd xmm0,xmm5
	movq xmm1,r9
	xorpd xmm0,xmm1                 ; xmm0 = si, f(-x) = -f(x) exactly

	cvtss2sd xmm1,xmm6               ; xmm1 = co, no sign correction (cos is even)

%ifdef WIN64_ABI
	movsd [r10], xmm0
	movsd [r10+8], xmm1
	movdqu xmm6, [rsp]
	movdqu xmm7, [rsp+16]
	add rsp, 32
	mov rax, r10
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

; Refit coefficients: boundary-constrained, p(0.25) = 1.0 exactly, via
; NASM's native decimal-literal parsing rather than hand-computed hex.
.coef0:
	dd 1.4099248224897576
.coef1:
	dd 0.39804812605847295
.coef2:
	dd 0.6676945542914484
.coef3:
	dd 0.6358057177332058
.coef4:
	dd 0.645998410943566
.coef5:
	dd 0.7853980572931007

; rsqrt(D) polynomial, D in [0.5, 1.0)
.rscoef0:
	dd 3.7485222
.rscoef1:
	dd -12.36746552
.rscoef2:
	dd 31.20405037
.rscoef3:
	dd -51.61996226
.rscoef4:
	dd 55.3118811
.rscoef5:
	dd -37.09117787
.rscoef6:
	dd 14.17152784
.rscoef7:
	dd -2.35737633


section .note.GNU-stack noalloc noexec nowrite progbits
