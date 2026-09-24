; on CompilerExplorer: https://godbolt.org/z/xGcsjahsY
; Local:
; Assemble for Linux/SysV64:
;     nasm -f elf64 sincos_fma.asm -o sincos_fma.o
; Assemble for Windows x64:
;     nasm -f win64 -DWIN64_ABI sincos_fma.asm -o sincos_fma.obj
;
; Return convention: -- struct {double s, c;}
; in xmm0:xmm1 under SysV64, via hidden pointer (RCX in, RAX out) under
; Win64, with x correspondingly arriving in XMM1 not XMM0 under Win64.
default rel
global sincos_fma

section .text
align 64

sincos_fma:
%ifdef WIN64_ABI
	mov r10, rcx              ; r10 = destination struct pointer
	vmovapd xmm0, xmm1        ; x arrives in xmm1 under Win64's hidden-pointer shift

	sub rsp, 32
	vmovdqu [rsp], xmm6
	vmovdqu [rsp+16], xmm7
%endif

	; --- snapshot sign of original x (see header: r9, not rdx) ---
	; r9 = 0x0000000000000000 or 0x8000000000000000
	vmovq   r9,xmm0
	shr     r9,63
	shl     r9,63

	; No exact-zero branch needed: the refit coefficients give
	; sin(+-0.0)=+-0.0 and cos(0.0)=1.0 exactly through the normal path.

	; --- |x|, double precision ---
	vandpd  xmm0,xmm0,[.abs_mask_dbl]

	; --- radians -> RAU, done in double precision ---
	vmulsd xmm0, xmm0, [.two_over_pi_dbl]  ; xmm0 = phi = |x| * 2/pi

	; --- floor-based mod4: m = phi - 4*floor(phi/4), still double ---
	vmulsd xmm1, xmm0, [.quarter_dbl]       ; non-destructive: no separate copy needed
	vroundsd xmm1, xmm1, xmm1, 0x09         ; round down (floor), suppress inexact
	vmulsd xmm1, xmm1, [.four_dbl]
	vsubsd xmm0, xmm0, xmm1                 ; xmm0 = m, in [0,4), double

	; --- quadrant + fraction, still double ---
	vcvttsd2si eax,xmm0              ; eax = qi_full -- stays live all the way
	mov r8d,eax                      ; to the sign-application block below
	and r8d,3                        ; r8d = qi

	vcvtsi2sd xmm2,xmm0,eax          ; convert qi_full (double), NOT masked qi
	vsubsd xmm0,xmm0,xmm2            ; frac = m - qi_full, double, in [0,1)

	; --- narrow to float32 now: frac is small and already well-reduced ---
	vcvtsd2ss xmm0,xmm0,xmm0

	; --- warp polynomial: v = frac - 0.5, then one step in v ---
	vsubss xmm3, xmm0, [.half]       ; xmm3 = v
	vmulss xmm4, xmm3, xmm3          ; xmm4 = v^2

	; -------- Estrin, FMA-fused --------
	vmovss xmm5,[.coef5]
	vfmadd231ss xmm5, xmm4, [.coef4]   ; xmm5 = v2*coef4 + coef5
	vmovss xmm0,[.coef3]
	vfmadd231ss xmm0, xmm4, [.coef2]   ; xmm0 = v2*coef2 + coef3
	vmovss xmm1,[.coef1]
	vfmadd231ss xmm1, xmm4, [.coef0]   ; xmm1 = v2*coef0 + coef1

	vmulss xmm4,xmm4,xmm4               ; v^4
	vmulss xmm0,xmm0,xmm4
	vmulss xmm4,xmm4,xmm4               ; v^8
	vmulss xmm1,xmm1,xmm4
	vaddss xmm5,xmm5,xmm0
	vaddss xmm5,xmm5,xmm1
	; xmm5 = p

	vfmadd213ss xmm5, xmm3, [.half]     ; xmm5 = v*p + 0.5 = w

	; --- odd-quadrant fix ---
	and r8d,1
	jz .no_flip

	vmovss xmm6,[.one]
	vsubss xmm5,xmm6,xmm5               ; w = 1 - w, written straight into xmm5

.no_flip:
	vmovss xmm6,[.one]
	vsubss xmm6,xmm6,xmm5               ; xmm6 = (1-w)

	vmulss xmm7,xmm6,xmm6               ; (1-w)^2
	vfmadd231ss xmm7, xmm5, xmm5        ; xmm7 += w*w = D

	;; ---- rsqrt polynomial evaluation, FMA-fused Estrin ----
	; (C0 + C1*d + (C2 + C3*d)*d^2) + d^4 * (C4 + C5*d + (C6 + C7*d)*d^2)
	vmulss xmm4,xmm7,xmm7               ; d^2

	vmovss xmm3,[.rscoef6]
	vfmadd231ss xmm3, xmm7, [.rscoef7]  ; xmm3 = d*rscoef7 + rscoef6
	vmulss xmm3,xmm3,xmm4

	vmovss xmm2,[.rscoef4]
	vfmadd231ss xmm2, xmm7, [.rscoef5]  ; xmm2 = d*rscoef5 + rscoef4

	vaddss xmm3,xmm3,xmm2
	vmulss xmm3,xmm3,xmm4
	vmulss xmm3,xmm3,xmm4                ; * d^4

	vmovss xmm2,[.rscoef2]
	vfmadd231ss xmm2, xmm7, [.rscoef3]  ; xmm2 = d*rscoef3 + rscoef2
	vmulss xmm2,xmm2,xmm4

	vmovss xmm1,[.rscoef0]
	vfmadd231ss xmm1, xmm7, [.rscoef1]  ; xmm1 = d*rscoef1 + rscoef0
	vaddss xmm1,xmm1,xmm2
	vaddss xmm1,xmm1,xmm3
	; -------- end rsqrt polynomial evaluation --------

	vmulss xmm5,xmm5,xmm1                ; xmm5 = sin_raw = w*inv
	vmulss xmm6,xmm6,xmm1                ; xmm6 = cos_raw = (1-w)*inv

	; --- sin: periodic sign (qi bit1) ---
	mov edx,eax
	shr edx,1
	and edx,1                       ; defensive: guard against qi_full transiently >3
	shl edx,31
	vmovd xmm2,edx
	vpxor xmm5,xmm5,xmm2

	; --- cos: periodic sign (qi bit1 XOR bit0), no overall-sign step ---
	mov r8d,eax
	shr r8d,1
	xor r8d,eax
	and r8d,1
	shl r8d,31
	vmovd xmm3,r8d
	vpxor xmm6,xmm6,xmm3

	; --- widen; apply overall input sign to sin ONLY (sin is odd) ---
	vcvtss2sd xmm0,xmm0,xmm5
	vmovq xmm1,r9
	vxorpd xmm0,xmm0,xmm1                ; xmm0 = si, f(-x) = -f(x) exactly

	vcvtss2sd xmm1,xmm1,xmm6              ; xmm1 = co, no sign correction (cos is even)

%ifdef WIN64_ABI
	vmovsd [r10], xmm0
	vmovsd [r10+8], xmm1
	vmovdqu xmm6, [rsp]
	vmovdqu xmm7, [rsp+16]
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
