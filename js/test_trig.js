/**
 * Radical Angle Unit [conversion system]
 * 
 * To convert RAU → Angle:
 * 1. Calculate sin = t / √(1 - 2t + 2t²)
 * 2. Calculate cos = (1-t) / √(1 - 2t + 2t²)
 * 3. Use atan2(sin, cos) to get the actual angle
 * 
 * The shortcut tan(θ) = t/(1-t) gives the TANGENT value, 
 * but atan(t/(1-t)) ≠ atan2(sin, cos) due to normalization.
 */

class RAUAngleConverter {
    // ========================================================================
    // FUNDAMENTAL RAU FUNCTIONS
    // ========================================================================
    
    static rsin_base(t) {
        const a = 1.0 - 2.0 * t + 2.0 * t * t;
        return t / Math.sqrt(a);
    }
    
    static rcos_base(t) {
        const a = 1.0 - 2.0 * t + 2.0 * t * t;
        return (1.0 - t) / Math.sqrt(a);
    }
    
    static rtan_base(t) {
        // tan(θ) = sin/cos = t/(1-t)
        if (Math.abs(1 - t) < 1e-10) return Infinity;
        return t / (1 - t);
    }
    
    // ========================================================================
    // CORRECT RAU → ANGLE CONVERSIONS
    // ========================================================================
    
    /**
     * Convert RAU parameter to angle in DEGREES
     * Uses atan2 of sin/cos
     */
    static rauToDegrees(rau) {
        const radians = this.rauToRadians(rau);
        return radians * 180 / Math.PI;
    }
    
    /**
     * Convert RAU parameter to angle in RADIANS
     */
    static rauToRadians(rau) {
        // Normalize to [0, 4)
        rau = ((rau % 4) + 4) % 4;
        
        const quadrant = Math.floor(rau);
        const t = rau - quadrant;
        
        // Compute sin and cos from RAU formulas
        const s = this.rsin_base(t);
        const c = this.rcos_base(t);
        
        // Apply quadrant transformation
        const { sin, cos } = this.applyQuadrant(s, c, quadrant);
        
        // Use atan2 for correct angle
        let radians = Math.atan2(sin, cos);
        
        // Normalize to [0, 2π)
        if (radians < 0) radians += 2 * Math.PI;
        
        return radians;
    }
    
    // ========================================================================
    // ANGLE → RAU
    // ========================================================================
    
    /**
     * Convert angle in DEGREES to RAU parameter
     * Uses inverse trig functions
     */
    static degreesToRAU(degrees) {
        const radians = degrees * Math.PI / 180;
        return this.radiansToRAU(radians);
    }
    
    /**
     * Convert angle in RADIANS to RAU parameter
     * Uses sin/cos and trigToRAU method
     */
    static radiansToRAU(radians) {
        // Normalize to [0, 2π)
        radians = ((radians % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
        
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);
        
        return this.trigToRAU(sin, cos);
    }
    
    // ========================================================================
    // INVERSE TRIG → RAU
    // ========================================================================
    
    static trigToRAU(sinVal, cosVal) {
        const quadrant = this.getQuadrant(sinVal, cosVal);
        const { s_q0, c_q0 } = this.translateToQ0(sinVal, cosVal, quadrant);
        const t = this.inverseSine(Math.abs(s_q0));
        
        if (isNaN(t)) {
            console.warn('Invalid trig values:', { sinVal, cosVal, quadrant });
            return quadrant;
        }
        
        return quadrant + t;
    }
    
    static inverseSine(v) {
        if (Math.abs(v) < 1e-15) return 0;
        if (Math.abs(v - 1) < 1e-15) return 1;
        
        const denom = 2 * v * v - 1;
        const inner = v * v * (1 - v * v);
        
        if (inner < 0) return NaN;
        
        if (Math.abs(denom) < 1e-10) {
            if (Math.abs(v - 0.7071067811865475) < 0.01) {
                return 0.5;
            }
            return NaN;
        }
        
        const result = (v * v - Math.sqrt(inner)) / denom;
        return Math.max(0, Math.min(1, result));
    }
    
    // ========================================================================
    // RAU → TRIG VALUES (Forward direction)
    // ========================================================================
    
    static rauToTrig(rau) {
        rau = ((rau % 4) + 4) % 4;
        const quadrant = Math.floor(rau);
        const t = rau - quadrant;
        
        const s = this.rsin_base(t);
        const c = this.rcos_base(t);
        
        return this.applyQuadrant(s, c, quadrant);
    }
    
    static rauToSin(rau) {
        return this.rauToTrig(rau).sin;
    }
    
    static rauToCos(rau) {
        return this.rauToTrig(rau).cos;
    }
    
    static rauToTan(rau) {
        const { sin, cos } = this.rauToTrig(rau);
        if (Math.abs(cos) < 1e-10) return Math.sign(sin) * Infinity;
        return sin / cos;
    }
    
    // ========================================================================
    // HELPERS
    // ========================================================================
    
    static applyQuadrant(s, c, q) {
        const transforms = [
            { sin: s, cos: c },      // Q0
            { sin: c, cos: -s },     // Q1
            { sin: -s, cos: -c },    // Q2
            { sin: -c, cos: s }      // Q3
        ];
        return transforms[q];
    }
    
    static getQuadrant(sinVal, cosVal) {
        const sin = Math.abs(sinVal) < 1e-12 ? 0 : sinVal;
        const cos = Math.abs(cosVal) < 1e-12 ? 0 : cosVal;
        
        if (cos > 0 && sin >= 0) return 0;
        if (cos <= 0 && sin > 0) return 1;
        if (cos < 0 && sin <= 0) return 2;
        return 3;
    }
    
    static translateToQ0(sinVal, cosVal, quadrant) {
        const absSin = Math.abs(sinVal);
        const absCos = Math.abs(cosVal);
        
        switch (quadrant) {
            case 0: return { s_q0: absSin, c_q0: absCos };
            case 1: return { s_q0: absCos, c_q0: absSin };
            case 2: return { s_q0: absSin, c_q0: absCos };
            case 3: return { s_q0: absCos, c_q0: absSin };
            default: return { s_q0: absSin, c_q0: absCos };
        }
    }
}

// ============================================================================
// TEST CASES
// ============================================================================

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║         Testing RAU = 0.333333 (Test Case)               ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

const testRAU = 1/3;  // 0.333333...

console.log('Given RAU Phase:', testRAU.toFixed(6));
console.log('');

// Forward: RAU → Trig
const trig = RAUAngleConverter.rauToTrig(testRAU);
console.log('Calculated Trig Values:');
console.log(`  sin(θ) = ${trig.sin.toFixed(13)}`);
console.log(`  cos(θ) = ${trig.cos.toFixed(13)}`);
console.log(`  tan(θ) = ${(trig.sin / trig.cos).toFixed(13)}`);
console.log('');

// Expected values
const expectedSin = 1 / Math.sqrt(5);  // = 0.4472135954999579
const expectedCos = 2 / Math.sqrt(5);  // = 0.8944271909999159
const expectedTan = 0.5;

console.log('Expected Values:');
console.log(`  sin(θ) = ${expectedSin.toFixed(13)} (1/√5)`);
console.log(`  cos(θ) = ${expectedCos.toFixed(13)} (2/√5)`);
console.log(`  tan(θ) = ${expectedTan.toFixed(13)} (1/2)`);
console.log('');

// Check match
const sinMatch = Math.abs(trig.sin - expectedSin) < 1e-10;
const cosMatch = Math.abs(trig.cos - expectedCos) < 1e-10;
const tanMatch = Math.abs(trig.sin / trig.cos - expectedTan) < 1e-10;

console.log('Match Check:');
console.log(`  sin: ${sinMatch ? '✓' : '✗'} (error: ${Math.abs(trig.sin - expectedSin).toExponential(2)})`);
console.log(`  cos: ${cosMatch ? '✓' : '✗'} (error: ${Math.abs(trig.cos - expectedCos).toExponential(2)})`);
console.log(`  tan: ${tanMatch ? '✓' : '✗'} (error: ${Math.abs(trig.sin/trig.cos - expectedTan).toExponential(2)})`);
console.log('');

// RAU → Angle
const radians = RAUAngleConverter.rauToRadians(testRAU);
const degrees = RAUAngleConverter.rauToDegrees(testRAU);

console.log('Calculated Angle:');
console.log(`  Radians: ${radians.toFixed(13)}`);
console.log(`  Degrees: ${degrees.toFixed(6)}°`);
console.log('');

// Expected angle
const expectedRadians = Math.atan2(expectedSin, expectedCos);
const expectedDegrees = expectedRadians * 180 / Math.PI;

console.log('Expected Angle:');
console.log(`  Radians: ${expectedRadians.toFixed(13)}`);
console.log(`  Degrees: ${expectedDegrees.toFixed(6)}°`);
console.log('');

const radMatch = Math.abs(radians - expectedRadians) < 1e-10;
const degMatch = Math.abs(degrees - expectedDegrees) < 1e-6;

console.log('Angle Match:');
console.log(`  Radians: ${radMatch ? '✓' : '✗'} (error: ${Math.abs(radians - expectedRadians).toExponential(2)})`);
console.log(`  Degrees: ${degMatch ? '✓' : '✗'} (error: ${Math.abs(degrees - expectedDegrees).toExponential(2)})`);
console.log('');

// Round-trip test
const rauBack = RAUAngleConverter.radiansToRAU(radians);
const roundTripMatch = Math.abs(testRAU - rauBack) < 1e-10;

console.log('Round-Trip Test (RAU → Radians → RAU):');
console.log(`  Original:  ${testRAU.toFixed(13)}`);
console.log(`  Recovered: ${rauBack.toFixed(13)}`);
console.log(`  Match: ${roundTripMatch ? '✓' : '✗'} (error: ${Math.abs(testRAU - rauBack).toExponential(2)})`);

console.log('\n' + '═'.repeat(60));
const allTestsPassed = sinMatch && cosMatch && tanMatch && radMatch && degMatch && roundTripMatch;
console.log(allTestsPassed ? '✓ ALL TESTS PASSED' : '✗ SOME TESTS FAILED');
console.log('═'.repeat(60) + '\n');

// ============================================================================
// ADDITIONAL TEST CASES
// ============================================================================

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║           Additional Verification Tests                 ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

const additionalTests = [
    { rau: 0.0, expectedDeg: 0.0 },
    { rau: 0.25, expectedDeg: 18.43494882292201 },  // atan(0.25/0.75) in degrees
    { rau: 0.5, expectedDeg: 45.0 },
    { rau: 0.75, expectedDeg: 71.56505117707799 },  // atan(0.75/0.25) in degrees
    { rau: 1.0, expectedDeg: 90.0 },
];

console.log('RAU       | Expected °  | Calculated ° | Error      | Status');
console.log('────────────────────────────────────────────────────────────────');

additionalTests.forEach(test => {
    const calculated = RAUAngleConverter.rauToDegrees(test.rau);
    const error = Math.abs(calculated - test.expectedDeg);
    const passed = error < 1e-6;
    
    console.log(
        `${test.rau.toFixed(2).padStart(6)} | ` +
        `${test.expectedDeg.toFixed(6).padStart(11)} | ` +
        `${calculated.toFixed(6).padStart(12)} | ` +
        `${error.toExponential(2).padStart(10)} | ` +
        `${passed ? '✓' : '✗'}`
    );
});

// ============================================================================
// COMPREHENSIVE ROUND-TRIP TESTS
// ============================================================================

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║         Comprehensive Round-Trip Tests                  ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

let passCount = 0;
const totalTests = 1000;

for (let i = 0; i < totalTests; i++) {
    const originalRAU = Math.random() * 4;
    const degrees = RAUAngleConverter.rauToDegrees(originalRAU);
    const recoveredRAU = RAUAngleConverter.degreesToRAU(degrees);
    
    const error = Math.abs((originalRAU % 4) - (recoveredRAU % 4));
    if (error < 1e-9) passCount++;
}

console.log(`Round-trip accuracy: ${passCount}/${totalTests} (${(passCount/totalTests*100).toFixed(2)}%)`);

if (passCount === totalTests) {
    console.log('✓ Perfect round-trip conversion!');
} else {
    console.log(`✗ ${totalTests - passCount} conversions had errors > 1e-9`);
}

console.log('\n' + '═'.repeat(60) + '\n');

// ============================================================================
// EXPORT
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RAUAngleConverter;
}
