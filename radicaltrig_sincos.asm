;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;SINECOS_RAU_RSQRTNW;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
%ifndef SINCOS_RAU_RSQRTNW
%define SINCOS_RAU_RSQRTNW
; https://godbolt.org/z/oGPPo1qT4
global sincos_rau_rsqrtnw

align 64
sincos_rau_rsqrtnw:
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
    cvttss2si eax,xmm0		; truncate m -> integer part (m>=0, so trunc==floor)
    and eax,3				; qi = qi_full & 3 (guards the rare m==4.0 rounding edge)
    cvtsi2ss xmm2,eax
    subss xmm0,xmm2			; xmm0 = frac = m - qi   (note: uses UNMASKED qi implicitly
    						; via reuse below; frac itself only needs m - trunc(m),
    						; which is correctly computed here since qi_full and
    						; qi_full&3 differ only by full multiples of 4, which
    						; cancel out of m - trunc(m) either way)

	; --- warp polynomial: v = frac - 0.5, Horner in v^2, then one step in v ---
    ; p = (((((c0*z + c1)*z + c2)*z + c3)*z + c4)*z + c5)

    ; Optional: use Estrin scheme(instead of linear Horner to evaluate the polynomial):
    ; {xmm4 = (xmm3-0.5)^2}
    ; p0123 = {([.coef0] + xmm4 * [.coef1])}=xmm5 + {xmm4*xmm4 * ([.coef2] + xmm4 * [.coef3])}=xmm0
    ; p     = p0123 + {xmm4*xmm4*xmm4*xmm4 * ([c.oef4] + xmm4 * [.coef5])}=xmm1
    ;       = xmm5 {xmm5 = (xmm3 * p)+0.5} (odd-quadrant fix afterwards with a subss)
    movss xmm3,xmm0
    subss xmm3,[.half]		; xmm3 = v
    movss xmm4,xmm3
    mulss xmm4,xmm4			  ; xmm4 = v^2

    ; ------- Horner --------
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
    mulss xmm5,xmm3			; v*p
    addss xmm5,[.half]		; xmm5 = w = v*p + 0.5

    ; --- odd-quadrant reversal: if qi&1, w = 1-w ---
    mov edx,eax
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

	sqrtss xmm7,xmm7
	movss xmm1,[.one]
	divss xmm1,xmm7			; xmm1 = inv = 1/sqrt(D)
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
	;mov edx,eax
	;shr edx,1
	;xor edx,eax
	;and edx,1
	;shl edx,31
	;movd xmm2,edx
	;pxor xmm6,xmm2

	; widen outputs
	; return double(sin)
	cvtss2sd xmm0,xmm5

	;return double(cos)
	;cvtss2sd xmm0,xmm6

	ret

align 8
.three_halves: 			; for sine only
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

%endif
