;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;SINECOS_RAU;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; https://godbolt.org/z/6zrjqEE7z (sine test) https://godbolt.org/z/Tq4chjes3 (cosine test)
default rel
global sincos_rau

section .text
align 64

sincos_rau:
	cvtsd2ss xmm0,xmm0		; narrow to float32 (rau_sincosf(C-variant) precision)

    ; --- radians -> RAU ---
    mulss xmm0,[.two_over_pi]

    ; --- floor-based mod4: m = phi - 4*floor(phi/4) ---
    movss xmm1,xmm0
    mulss xmm1,[.quarter]
    roundss xmm1,xmm1,0x09	; round down (floor), suppress inexact
    mulss xmm1,[.four]
    subss xmm0,xmm1			; xmm0 = m, in [0,4)

    ; --- quadrant + fraction ---
	cvttss2si eax,xmm0       ; eax = qi_full
	mov edx,eax              ; preserve qi_full
	and edx,3                ; edx = qi

	cvtsi2ss xmm2,eax        ; convert qi_full, NOT masked qi
	subss xmm0,xmm2          ; frac = m - qi_full

	; --- warp polynomial: v = frac - 0.5, then one step in v ---
    movss xmm3,xmm0
    subss xmm3,[.half]		; xmm3 = v
    movss xmm4,xmm3
    mulss xmm4,xmm4			; xmm4 = v^2 = (xmm3-0.5)^2

    ; ------- Horner --------
    ; p = (((((c0*z + c1)*v^2 + c2)*v^2 + c3)*v^2 + c4)*v^2 + c5)
	; p = ((((([.coef0]*v^2 + [.coef1])*v^2 + [.coef2])*v^2 + [.coef3])*v^2 + [.coef4])*v^2 + [.coef5])
    ; movss xmm5,[.coef0]
    ; mulss xmm5,xmm4
    ; addss xmm5,[.coef1]
    ; mulss xmm5,xmm4
    ; addss xmm5,[.coef2]
    ; mulss xmm5,xmm4
    ; addss xmm5,[.coef3]
    ; mulss xmm5,xmm4
    ; addss xmm5,[.coef4]
    ; mulss xmm5,xmm4
    ; addss xmm5,[.coef5]
    ; xmm5 = p

    ; -------- Estrin --------
    ; Optional: use Estrin scheme(instead of linear Horner to evaluate the polynomial):
	; p0123 = {(c0*v^2 + c1) + (v^4 * (c2 + v^2 + c3)} + *v^ + c5}
	; p = {p0123} + {(v^8 * (c4 + v^2 * c5)}
    ; p0123 = {([.coef0] + xmm4 * [.coef1])}=xmm5 + {xmm4*xmm4 * ([.coef2] + xmm4 * [.coef3])} = xmm0
    ; p     = p0123 + {xmm4*xmm4*xmm4*xmm4 * ([c.oef4] + xmm4 * [.coef5])} = xmm1
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

    ; continue
    mulss xmm5,xmm3			; xmm5 = v*p = xmm3*xmm5
    addss xmm5,[.half]		; xmm5 = v*p + 0.5 = w

    ; --- odd-quadrant fix(reversal of numerator term w): if qi&1, w = 1-w ---
    and edx,1
    jz .no_flip

    movss xmm6,[.one]
    subss xmm6,xmm5
    movss xmm5,xmm6

.no_flip:
	; --- diagonal normalize: BOTH numerators share this one sqrt(D) ---
	movss xmm6,[.one]
	subss xmm6,xmm5			; xmm6 = (1-w) (cos numerator)

	movss xmm7,xmm6
	mulss xmm7,xmm7
	movss xmm1,xmm5
	mulss xmm1,xmm1
	addss xmm7,xmm1			; xmm7 = D
	
	; --- sqrt+div ---
	sqrtss xmm7,xmm7
	movss xmm1,[.one]
	divss xmm1,xmm7			; xmm1 = inv = 1/sqrt(D)
	; --- end sqrt+div ---

	; -- or --

	; --- reciprocal sqrt+newton ---
    ; rsqrtss xmm1,xmm7        ; xmm1 = y0 ≈ 1/sqrt(D)
    ; --- Newton-Raphson correction --- ; xmm3 = rsqrt
    ; movss xmm3,xmm1
    ; mulss xmm3,xmm3          ; y0²
    ; mulss xmm3,xmm7          ; D*y0²
    ; mulss xmm3,[.half]       ; 0.5*D*y0²
    ; movss xmm2,[.three_halves]
	; subss xmm2,xmm3          ; 1.5 - 0.5*D*y0²
	; mulss xmm1,xmm2          ; y1
	; --- end Newton-Raphson ---

	;; specific assignments
	mulss xmm5,xmm1			; xmm5 = sin_raw = w*inv
	;mulss xmm6,xmm1		; xmm6 = cos_raw = (1-w)*inv

	; --- sign application --- ;; specific assignments
	
	; sine sign = qi bit1
	mov edx,eax
	shr edx,1
	and edx,1
	shl edx,31
	movd xmm2,edx
	pxor xmm5,xmm2
	
	; cosine sign = qi bit1 XOR bit0
	; mov edx,eax
	; shr edx,1
	; xor edx,eax
	; and edx,1
	; shl edx,31
	; movd xmm2,edx
	; pxor xmm6,xmm2

	; --- widen outputs ---

	; return double(sin)
	cvtss2sd xmm0,xmm5

	;return double(cos)
	;cvtss2sd xmm0,xmm6

	ret

align 8
.three_halves: 			; for rsqrt version only
	dd 0x3FC00000
.two_over_pi:
	dd 0x3F22F983		; 0.63661977236758134308 (2/pi), float32
.quarter:
	dd 0x3E800000		; 0.25
.four:
	dd 0x40800000		; 4.0
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
