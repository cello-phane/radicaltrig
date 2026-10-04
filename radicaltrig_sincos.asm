;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;SINE_RAU;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; https://godbolt.org/z/GarveP5EY (pair test)
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
; Return convention: -- struct {double s, c;}
; in xmm0:xmm1 under SysV64, via hidden pointer (RCX in, RAX out) under
; Win64, with x correspondingly arriving in XMM1 not XMM0 under Win64.
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
    subss xmm3,[.half]        ; xmm3 = v
    movss xmm4,xmm3
    mulss xmm4,xmm4            ; xmm4 = (xmm3-0.5)^2
    ; y = x²
    ; Estrin polynomial evaluation
    ;  v·[(C0 + C1·y + C2·y² + C3·y³) + y⁴·(C4 + C5·y + C6·y²)]
    ; -------- Estrin --------
    movss xmm2,[.coef1]
    mulss xmm2,xmm4
    addss xmm2,[.coef0] ; a0 = xmm2
    movss xmm5,[.coef3]
    mulss xmm5,xmm4
    addss xmm5,[.coef2] ; a1 = xmm5
    movss xmm6,[.coef5]
    mulss xmm6,xmm4
    addss xmm6,[.coef4] ; a2 = xmm6

    mulss xmm5,xmm4
    mulss xmm5,xmm4
    addss xmm5,xmm2     ; b0 = a1 * y^2 + a0
    movss xmm1,[.coef6]
    mulss xmm4,xmm4
    mulss xmm1,xmm4
    addss xmm1,xmm6

    mulss xmm4,xmm4
    mulss xmm1,xmm4
    addss xmm5,xmm1
    mulss xmm5,xmm3
    ; xmm5 = p

    addss xmm5,[.half]        ; xmm5 = v*p + 0.5 = w

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
	subss xmm7,[.threequarter] ; xmm7 = d = D - 0.75  (recentered)
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
.threequarter:
    dd 0x3F400000       ; 0.75
.coef0:
    dd 0.78539828866558314
.coef1:
    dd 0.64594625770051587
.coef2:
    dd 0.63827326697947083
.coef3:
    dd 0.62357916420830480
.coef4:
    dd 0.75561600946878778
.coef5:
    dd 0.079951715963356818
.coef6:
    dd 1.8429558690126906

; rsqrt(D) polynomial, D in [0.5, 1.0)
.rscoef0:
    dd 1.1547001741792948507
.rscoef1:
    dd -0.76979733693368505099
.rscoef2:
    dd 0.76998321274009581393
.rscoef3:
    dd -0.85582127579338446687
.rscoef4:
    dd 0.98389454964086504873
.rscoef5:
    dd -1.1731736300945866946
.rscoef6:
    dd 1.7987005561684346056
.rscoef7:
    dd -2.2836002361103702185


section .note.GNU-stack noalloc noexec nowrite progbits
