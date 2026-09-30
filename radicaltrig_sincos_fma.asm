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
    vmovss xmm3,xmm0
    vsubss xmm3,xmm3,[rel .half]       ; v = frac - 0.5
    vmulss xmm4,xmm3,xmm3              ; y = v²

    ; a0 = C0 + C1*y   (no FMA: separate mul + add)
    vmulss xmm2,xmm4,[rel .coef1]
    vaddss xmm2,xmm2,[rel .coef0]

    ; a1 = C2 + C3*y
    vmulss xmm5,xmm4,[rel .coef3]
    vaddss xmm5,xmm5,[rel .coef2]

    ; a2 = C4 + C5*y
    vmulss xmm6,xmm4,[rel .coef5]
    vaddss xmm6,xmm6,[rel .coef4]

    ; b0 = a0 + a1*y²
    vmulss xmm5,xmm5,xmm4
    vmulss xmm5,xmm5,xmm4
    vaddss xmm5,xmm5,xmm2

    vmulss xmm4,xmm4,xmm4               ; y²

    ; a2 + C6*y²
    vmulss xmm1,xmm4,[rel .coef6]
    vaddss xmm1,xmm1,xmm6

    vmulss xmm4,xmm4,xmm4               ; y⁴

    ; b0 + (a2 + C6*y²)*y⁴
    vmulss xmm1,xmm1,xmm4
    vaddss xmm5,xmm5,xmm1

    vmulss xmm5,xmm5,xmm3                ; p = v*(...)
    vaddss xmm5,xmm5,[rel .half]         ; w = 0.5 + p

    ; --- odd-quadrant fix: w -> 1-w for Q1/Q3 ---
    test r8d,1
    jz .no_flip
    vmovss xmm6,[rel .one]
    vsubss xmm6,xmm6,xmm5
    vmovss xmm5,xmm6
.no_flip:
    ; xmm5 = w

    vmovss xmm6,[rel .one]
    vsubss xmm6,xmm6,xmm5              ; xmm6 = 1-w

    ; D = w² + (1-w)²
    vmulss xmm7,xmm5,xmm5
    vmulss xmm4,xmm6,xmm6
    vaddss xmm7,xmm7,xmm4
    vsubss xmm7,xmm7,[rel .threequarter]   ; xmm7 = d = D - 0.75  (recentered)

    ;; ---- rsqrt polynomial evaluation, no FMA ----
    vmulss xmm4,xmm7,xmm7                ; d²

    vmulss xmm3,xmm7,[rel .rscoef7]
    vaddss xmm3,xmm3,[rel .rscoef6]
    vmulss xmm3,xmm3,xmm4

    vmulss xmm2,xmm7,[rel .rscoef5]
    vaddss xmm2,xmm2,[rel .rscoef4]

    vaddss xmm3,xmm3,xmm2
    vmulss xmm3,xmm3,xmm4
    vmulss xmm3,xmm3,xmm4                ; * d⁴

    vmulss xmm2,xmm7,[rel .rscoef3]
    vaddss xmm2,xmm2,[rel .rscoef2]
    vmulss xmm2,xmm2,xmm4

    vmulss xmm1,xmm7,[rel .rscoef1]
    vaddss xmm1,xmm1,[rel .rscoef0]
    vaddss xmm1,xmm1,xmm2
    vaddss xmm1,xmm1,xmm3
    ; xmm1 = 1/sqrt(D)
	; -------- end rsqrt polynomial evaluation --------
	; xmm1 = 1/sqrt(D)
	; xmm5 = w
	; xmm6 = 1-w

	vmulss xmm5,xmm5,xmm1                ; xmm5 = sin_raw = w*inv
	;vmulss xmm6,xmm6,xmm1                ; xmm6 = cos_raw = (1-w)*inv
	; --- sin: periodic sign (qi bit1) ---
	mov edx,eax
	shr edx,1
	and edx,1                       ; defensive: guard against qi_full transiently >3
	shl edx,31
	vmovd xmm2,edx
	vpxor xmm5,xmm5,xmm2

	; --- cos: periodic sign (qi bit1 XOR bit0), no overall-sign step ---
	;mov r8d,eax
	;shr r8d,1
	;xor r8d,eax
	;and r8d,1
	;shl r8d,31
	;vmovd xmm3,r8d
	;vpxor xmm6,xmm6,xmm3

	; --- widen; apply overall input sign to sin ONLY (sin is odd) ---
	vcvtss2sd xmm0,xmm0,xmm5
	vmovq xmm1,r9
	vxorpd xmm0,xmm0,xmm1                ; xmm0 = si, f(-x) = -f(x) exactly

	;vcvtss2sd xmm1,xmm1,xmm6              ; xmm1 = co, no sign correction (cos is even)

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

;align 8
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
