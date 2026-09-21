;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;SINECOS_RAU v2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; https://godbolt.org/z/6zrjqEE7z (sine test) https://godbolt.org/z/Tq4chjes3 (cosine test)
;
; TOGGLE: exactly one of the two blocks marked "TOGGLE: SIN" / "TOGGLE: COS"
default rel
global sincos_rau

section .text
align 64

sincos_rau:
	; --- snapshot sign of original x (needed for the SIN toggle only) ---
	; Must live in a register nothing else in this function touches:
	; rax/eax gets reused below for qi_full, and writing eax zero-extends
	; the full 64-bit rax, so storing the sign there would be clobbered
	; before use. r8 is untouched elsewhere in this function.
	movq r8, xmm0                   ; r8 = raw bits of x
	mov rcx, 0x8000000000000000
	and r8, rcx                     ; r8 = sign bit of x, isolated

	andpd xmm0, [.abs_mask_dbl]     ; xmm0 = |x|, double precision

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
	mov edx,eax                     ; preserve qi_full
	and edx,3                       ; edx = qi

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
	; p0123 = {(c0 + v^2 * c1)} + {(v^4 * (c2 + v^2 * c3)}
	; p     = p0123 + {(v^8 * (c4 + v^2 * c5)}
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

	; --- odd-quadrant fix (reversal of numerator term w): if qi&1, w = 1-w ---
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
    ; movss xmm3,xmm1
    ; mulss xmm3,xmm3          ; y0²
    ; mulss xmm3,xmm7          ; D*y0²
    ; mulss xmm3,[.half]       ; 0.5*D*y0²
    ; movss xmm2,[.three_halves]
	; subss xmm2,xmm3          ; 1.5 - 0.5*D*y0²
	; mulss xmm1,xmm2          ; y1
	; --- end Newton-Raphson ---

	;; mul with reciprocal
	mulss xmm5,xmm1			; xmm5 = sin_raw = w*inv
	mulss xmm6,xmm1			; xmm6 = cos_raw = (1-w)*inv

	; ============================================================
	; TOGGLE: SIN -- keep this pair active for a sin() build
	; ============================================================
	; sine sign = qi bit1, periodic (correct for sin(|x|))
	mov edx,eax
	shr edx,1
	shl edx,31
	movd xmm2,edx
	pxor xmm5,xmm2

	; widen, then apply OVERALL sign of original x -- sin only, since
	; sin is odd. This must stay inside the SIN block: do not let it
	; run on the cos path.
	cvtss2sd xmm0,xmm5
	movq xmm1,r8                     ; xmm1 = sign bit of original x
	xorpd xmm0,xmm1                  ; f(-x) = -f(x), exactly
	ret

	; ============================================================
	; TOGGLE: COS -- comment out the SIN block above and uncomment
	; this pair for a cos() build. No overall-sign step: cosine is
	; even, so only the quadrant-derived periodic sign applies.
	; ============================================================
	; cosine sign = qi bit1 XOR bit0, periodic (correct for cos(|x|)
	; == cos(x), since cosine never depends on the sign of x)
	; mov edx,eax
	; shr edx,1
	; xor edx,eax
	; shl edx,31
	; movd xmm2,edx
	; pxor xmm6,xmm2
	;
	; cvtss2sd xmm0,xmm6
	; ret

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

.three_halves: 			; for rsqrt version only
	dd 0x3FC00000
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
