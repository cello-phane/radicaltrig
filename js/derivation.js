// ===== DERIVATION CANVAS  =====
const canvas = document.getElementById('derivCanvas');

const ctx = canvas.getContext('2d');
const scale = 250;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function toCanvas(x, y) {
    return { x: centerX + x * scale, y: centerY - y * scale };
}

function getColors() {
    const isDark = document.body.classList.contains('dark-mode');
    return {
        grid: isDark ? '#1a1a2e' : '#e0e0e0',
        axis: isDark ? '#555' : '#999',
        circle: isDark ? '#00ff88' : '#0066cc',
        diagonal: isDark ? '#ffa500' : '#ff8800',
        construction: isDark ? '#00d4ff' : '#0088cc',
        line: isDark ? '#ff6b9d' : '#cc0066',
        angle: isDark ? '#ffd93d' : '#ffaa00',
        target: isDark ? '#8899ff' : '#4455cc',
        linear: isDark ? '#7ba7ff' : '#4488ff',
        warp: isDark ? '#c299ff' : '#a366ff',
        diff: '#ff8800',
        mirror: isDark ? '#6a8fd8' : '#4682dc',
        text: isDark ? '#eee' : '#333'
    };
}

// ============================================================================
// WARP POLYNOMIAL (rau_warp_11 — confirmed double-precision coefficients)
// Same derivation as in geom.js: w(t) = 0.5 + warp11(t), an 11th-order
// odd Horner polynomial in v = t - 0.5. Defined locally here (rather
// than shared from geom.js) because this file's initial drawDerivation()
// call at the bottom runs before geom.js has executed, given the
// <script> order in index.html.
//
// Two tiers, mirroring geom.js's RAU_WARP / RAU_WARP_QUALITY and the C
// library's RAU_WARP_QUALITY — kept at the same default (tier 0) so
// this canvas, the protractor, the red line, and the C library's default
// build all agree with each other unless deliberately switched together.
// ============================================================================
const DERIV_WARP_QUALITY = 0; // 0 = tier 0 (default, matches geom.js and the C library), 1 = v2

function derivMakeWarp11(C1, C2, C3, C4, C5, C6) {
    return function warp11(t) {
        const v = t - 0.5;
        const v2 = v * v;
        let poly = C6;
        poly = v2 * poly + C5;
        poly = v2 * poly + C4;
        poly = v2 * poly + C3;
        poly = v2 * poly + C2;
        poly = v2 * poly + C1;
        return v * poly;
    };
}

const derivWarp11_tier0 = derivMakeWarp11(
    0.78539816339744830962, // = pi/4, exact
    0.64607158024987317298,
    0.63401589172451679138,
    0.68515350354689586789,
    0.32501622369042378935,
    1.51901679307446258196
);

const derivWarp11_tier1 = derivMakeWarp11(
    0.7853981633974483, // unchanged from tier 0 — pi/4, exact
    0.6460261721112686,
    0.6346711435786873,
    0.6812793876895539,
    0.33448057938003534,
    1.5121252251949524
);

const DERIV_WARP = {
    apply(t) {
        return 0.5 + (DERIV_WARP_QUALITY === 1 ? derivWarp11_tier1(t) : derivWarp11_tier0(t));
    }
};

/**
 * Draw the full |x|+|y|=1 diamond and, for each of the other three
 * quadrants, a light context dot showing where the SAME t lands once
 * mirrored/rotated into that quadrant (linear t only — the point isn't
 * to re-run the warp comparison four times over, just to show that the
 * Q0 construction is one edge of a symmetric whole). Q0's own point is
 * left to the detailed construction elsewhere in drawDerivation.
 * @param {number} diagX - Q0 diagonal point x (raw t)
 * @param {number} diagY - Q0 diagonal point y (raw t)
 * @param {Object} colors
 */
function drawQuadrantMirror(diagX, diagY, colors) {
    // Diamond edges: (1,0)-(0,1)-(-1,0)-(0,-1)-(1,0)
    const d1 = toCanvas(1, 0), d2 = toCanvas(0, 1), d3 = toCanvas(-1, 0), d4 = toCanvas(0, -1);
    ctx.strokeStyle = colors.diff;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(d1.x, d1.y);
    ctx.lineTo(d2.x, d2.y);
    ctx.lineTo(d3.x, d3.y);
    ctx.lineTo(d4.x, d4.y);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Rotate (diagX, diagY) by 90*q degrees CCW for q = 1, 2, 3.
    // Matches the quadrant rule already documented for the forward
    // pipeline: Q1 = (-y, x), Q2 = (-x, -y), Q3 = (y, -x).
    const mirrored = [
        { x: -diagY, y: diagX },   // Q1
        { x: -diagX, y: -diagY },  // Q2
        { x: diagY, y: -diagX },   // Q3
    ];

    const origin = toCanvas(0, 0);
    mirrored.forEach((p) => {
        const cp = toCanvas(p.x, p.y);
        ctx.strokeStyle = colors.mirror;
        ctx.globalAlpha = 0.55;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(cp.x, cp.y);
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.fillStyle = colors.mirror;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
    });
}

function drawDerivation() {
    const colors = getColors();
    const t = parseFloat(document.getElementById('derivTSlider').value);
    const showGrid = document.getElementById('derivShowGrid').checked;
    const showLabels = document.getElementById('derivShowLabels').checked;
    const showConstruction = document.getElementById('derivShowConstruction').checked;
    const showAllQuadrantsEl = document.getElementById('derivShowAllQuadrants');
    const showAllQuadrants = showAllQuadrantsEl ? showAllQuadrantsEl.checked : false;

    // Mode comes from the SAME shared control that drives the protractor
    // ticks, the red-line canvas, and the sidebar (AppState.ui.paramMode,
    // set in main.js / read via getUIState() in uiControls.js). Falls
    // back to 'linear' if getUIState isn't available yet.
    const uiState = (typeof getUIState === 'function') ? getUIState() : null;
    const mode = (uiState && uiState.paramMode) || 'linear';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Grid
    if (showGrid) {
        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 1;
        for (let i = -2; i <= 2; i += 0.2) {
            const p1 = toCanvas(i, -2), p2 = toCanvas(i, 2);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            
            const p3 = toCanvas(-2, i), p4 = toCanvas(2, i);
            ctx.beginPath();
            ctx.moveTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.stroke();
        }
    }
    
    // Axes
    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 2;
    const xStart = toCanvas(-1.3, 0), xEnd = toCanvas(1.3, 0);
    ctx.beginPath();
    ctx.moveTo(xStart.x, xStart.y);
    ctx.lineTo(xEnd.x, xEnd.y);
    ctx.stroke();
    
    const yStart = toCanvas(0, -1.3), yEnd = toCanvas(0, 1.3);
    ctx.beginPath();
    ctx.moveTo(yStart.x, yStart.y);
    ctx.lineTo(yEnd.x, yEnd.y);
    ctx.stroke();
    
    // Axis labels
    if (showLabels) {
        ctx.fillStyle = colors.text;
        ctx.font = '12px monospace';
        const p1Label = toCanvas(1, 0);
        ctx.fillText('1', p1Label.x + 5, p1Label.y + 15);
        const p2Label = toCanvas(0, 1);
        ctx.fillText('1', p2Label.x - 15, p2Label.y + 5);
    }
    
    // Unit circle
    const center = toCanvas(0, 0);
    ctx.strokeStyle = colors.circle;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(center.x, center.y, scale, 0, 2 * Math.PI);
    ctx.stroke();

    // Raw (linear-t) Q0 diagonal point — needed as the mirror basis
    // regardless of mode, and as one half of dual mode
    const rawDiagX = 1 - t, rawDiagY = t;

    // Four-quadrant context overlay (diamond + mirrored dots). Drawn
    // early so the detailed Q0 construction layers on top of it.
    if (showAllQuadrants) {
        drawQuadrantMirror(rawDiagX, rawDiagY, colors);
    }
    
    // Diagonal line (Q0 edge)
    const p1 = toCanvas(1, 0), p2 = toCanvas(0, 1);
    ctx.strokeStyle = colors.diagonal;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    
    // Diagonal endpoints
    ctx.fillStyle = colors.diagonal;
    ctx.beginPath();
    ctx.arc(p1.x, p1.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p2.x, p2.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    if (showLabels) {
        ctx.fillStyle = colors.diagonal;
        ctx.font = '12px monospace';
        ctx.fillText('(1, 0)', p1.x + 10, p1.y + 15);
        ctx.fillText('(0, 1)', p2.x - 35, p2.y - 5);
    }

    const origin = toCanvas(0, 0);

    // ========================================================================
    // DUAL MODE — linear point and warped point shown together, with an
    // orange segment connecting them (same construction as the Desmos
    // reference: solid blue = linear, dashed purple = warped, orange =
    // the gap between them).
    // ========================================================================
    if (mode === 'dual') {
        const w = DERIV_WARP.apply(t);
        const warpDiagX = 1 - w, warpDiagY = w;

        const rLin = Math.sqrt(1 - 2*t + 2*t*t);
        const linCircleX = rawDiagX / rLin, linCircleY = rawDiagY / rLin;
        const rWarp = Math.sqrt(1 - 2*w + 2*w*w);
        const warpCircleX = warpDiagX / rWarp, warpCircleY = warpDiagY / rWarp;

        const pRawDiag = toCanvas(rawDiagX, rawDiagY);
        const pWarpDiag = toCanvas(warpDiagX, warpDiagY);
        const pLinCircle = toCanvas(linCircleX, linCircleY);
        const pWarpCircle = toCanvas(warpCircleX, warpCircleY);

        if (showConstruction) {
            // drop-lines to the x-axis for both diagonal points
            ctx.strokeStyle = '#888';
            ctx.globalAlpha = 0.6;
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            const rawBottom = toCanvas(rawDiagX, 0);
            ctx.beginPath(); ctx.moveTo(pRawDiag.x, pRawDiag.y); ctx.lineTo(rawBottom.x, rawBottom.y); ctx.stroke();
            const warpBottom = toCanvas(warpDiagX, 0);
            ctx.beginPath(); ctx.moveTo(pWarpDiag.x, pWarpDiag.y); ctx.lineTo(warpBottom.x, warpBottom.y); ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
        }

        // solid blue: linear, origin -> diagonal point -> circle point
        ctx.strokeStyle = colors.linear;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(pLinCircle.x, pLinCircle.y);
        ctx.stroke();

        // dashed purple: warped, origin -> circle point
        ctx.strokeStyle = colors.warp;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(pWarpCircle.x, pWarpCircle.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // diagonal points
        ctx.fillStyle = colors.linear;
        ctx.beginPath(); ctx.arc(pRawDiag.x, pRawDiag.y, 6, 0, 2*Math.PI); ctx.fill();
        ctx.fillStyle = colors.warp;
        ctx.beginPath(); ctx.arc(pWarpDiag.x, pWarpDiag.y, 6, 0, 2*Math.PI); ctx.fill();

        // circle points
        ctx.fillStyle = colors.linear;
        ctx.beginPath(); ctx.arc(pLinCircle.x, pLinCircle.y, 7, 0, 2*Math.PI); ctx.fill();
        ctx.fillStyle = colors.warp;
        ctx.beginPath(); ctx.arc(pWarpCircle.x, pWarpCircle.y, 7, 0, 2*Math.PI); ctx.fill();

        // orange difference segment — the whole point of dual mode
        ctx.strokeStyle = colors.diff;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(pLinCircle.x, pLinCircle.y);
        ctx.lineTo(pWarpCircle.x, pWarpCircle.y);
        ctx.stroke();

        if (showLabels) {
            ctx.font = '11px monospace';
            ctx.fillStyle = colors.linear;
            ctx.fillText('linear t', pLinCircle.x + 10, pLinCircle.y + 16);
            ctx.fillStyle = colors.warp;
            ctx.fillText('warped t', pWarpCircle.x + 10, pWarpCircle.y - 8);
        }

        const linAngleRad = Math.atan2(linCircleY, linCircleX);
        const warpAngleRad = Math.atan2(warpCircleY, warpCircleX);

        document.getElementById('derivTValue').textContent = t.toFixed(3);
        document.getElementById('derivDiagX').textContent = warpDiagX.toFixed(3);
        document.getElementById('derivDiagY').textContent = warpDiagY.toFixed(3);
        document.getElementById('derivR').textContent = rWarp.toFixed(3);
        document.getElementById('derivCos').textContent = warpCircleX.toFixed(3);
        document.getElementById('derivSin').textContent = warpCircleY.toFixed(3);
        document.getElementById('derivAngle').textContent = (warpAngleRad * 180 / Math.PI).toFixed(1) + '°';

        const targetDeg = t * 90;
        const gapDeg = (warpAngleRad - linAngleRad) * 180 / Math.PI;
        const targetEl = document.getElementById('derivTargetAngle');
        const deltaEl = document.getElementById('derivDeltaAngle');
        const deltaLabelEl = document.getElementById('derivDeltaLabel');
        if (targetEl) targetEl.textContent = targetDeg.toFixed(1) + '°';
        if (deltaLabelEl) deltaLabelEl.textContent = 'gap (warp − linear)';
        if (deltaEl) deltaEl.textContent = (gapDeg >= 0 ? '+' : '') + gapDeg.toFixed(3) + '°';
        return;
    }

    // ========================================================================
    // LINEAR / WARP MODE — single point, as before
    // ========================================================================
    const useWarp = mode === 'warp';
    const p = useWarp ? DERIV_WARP.apply(t) : t;
    const diagX = 1 - p, diagY = p;
    const r = Math.sqrt(1 - 2*p + 2*p*p);
    const circleX = diagX / r, circleY = diagY / r;
    
    const pDiag = toCanvas(diagX, diagY);
    const pCircle = toCanvas(circleX, circleY);

    // Ideal target angle (what a perfectly uniform parameter would give)
    const targetAngleRad = t * (Math.PI / 2);

    // In warp mode, draw a faint ghost ray at the ideal target angle so
    // the gap between "where warp lands" and "where it should land" is
    // visible directly on the canvas
    if (useWarp) {
        const gx = Math.cos(targetAngleRad), gy = Math.sin(targetAngleRad);
        const gStart = toCanvas(gx * 0.15, gy * 0.15);
        const gEnd = toCanvas(gx * 1.15, gy * 1.15);
        ctx.strokeStyle = colors.target;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(gStart.x, gStart.y);
        ctx.lineTo(gEnd.x, gEnd.y);
        ctx.stroke();
        ctx.setLineDash([]);
        if (showLabels) {
            ctx.fillStyle = colors.target;
            ctx.font = '10px monospace';
            ctx.fillText('ideal t·90°', gEnd.x + 4, gEnd.y);
        }
    }
    
    // Construction lines
    if (showConstruction) {
        ctx.strokeStyle = colors.construction;
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(pDiag.x, pDiag.y);
        ctx.stroke();
        ctx.setLineDash([]);
        
        if (showLabels) {
            ctx.fillStyle = colors.construction;
            ctx.font = '12px monospace';
            const midX = (origin.x + pDiag.x) / 2;
            const midY = (origin.y + pDiag.y) / 2;
            ctx.fillText(useWarp ? 'r = √(1-2w+2w²)' : 'r = √(1-2t+2t²)', midX + 10, midY - 5);
        }
        
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        
        const pDiagBottom = toCanvas(diagX, 0);
        ctx.beginPath();
        ctx.moveTo(pDiag.x, pDiag.y);
        ctx.lineTo(pDiagBottom.x, pDiagBottom.y);
        ctx.stroke();
        
        const pDiagLeft = toCanvas(0, diagY);
        ctx.beginPath();
        ctx.moveTo(pDiag.x, pDiag.y);
        ctx.lineTo(pDiagLeft.x, pDiagLeft.y);
        ctx.stroke();
        
        ctx.setLineDash([]);
        
        if (showLabels) {
            ctx.fillStyle = '#888';
            ctx.font = '11px monospace';
            ctx.fillText(useWarp ? '1-w' : '1-t', pDiagBottom.x - 10, pDiagBottom.y + 15);
            ctx.fillText(useWarp ? 'w' : 't', pDiagLeft.x - 20, pDiagLeft.y);
        }
    }
    
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(pCircle.x, pCircle.y);
    ctx.stroke();
    
    ctx.fillStyle = colors.diagonal;
    ctx.beginPath();
    ctx.arc(pDiag.x, pDiag.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    if (showLabels) {
        ctx.fillStyle = colors.diagonal;
        ctx.font = 'bold 13px monospace';
        ctx.fillText(`(${diagX.toFixed(3)}, ${diagY.toFixed(3)})`, pDiag.x + 10, pDiag.y - 10);
    }
    
    ctx.fillStyle = colors.line;
    ctx.beginPath();
    ctx.arc(pCircle.x, pCircle.y, 7, 0, 2 * Math.PI);
    ctx.fill();
    
    if (showLabels) {
        ctx.fillStyle = colors.line;
        ctx.font = 'bold 13px monospace';
        ctx.fillText(`(${circleX.toFixed(3)}, ${circleY.toFixed(3)})`, pCircle.x + 10, pCircle.y + 20);
    }
    
    const angleRad = Math.atan2(circleY, circleX);
    ctx.strokeStyle = colors.angle;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, scale * 0.2, 0, -angleRad, true);
    ctx.stroke();
    
    if (showLabels) {
        ctx.fillStyle = colors.angle;
        ctx.font = '14px monospace';
        const labelDist = scale * 0.25;
        const labelX = origin.x + labelDist * Math.cos(-angleRad / 2);
        const labelY = origin.y + labelDist * Math.sin(-angleRad / 2);
        ctx.fillText('θ', labelX - 5, labelY + 5);
    }
    
    document.getElementById('derivTValue').textContent = t.toFixed(3);
    document.getElementById('derivDiagX').textContent = diagX.toFixed(3);
    document.getElementById('derivDiagY').textContent = diagY.toFixed(3);
    document.getElementById('derivR').textContent = r.toFixed(3);
    document.getElementById('derivCos').textContent = circleX.toFixed(3);
    document.getElementById('derivSin').textContent = circleY.toFixed(3);
    document.getElementById('derivAngle').textContent = (angleRad * 180 / Math.PI).toFixed(1) + '°';

    const targetDeg = t * 90;
    const actualDeg = angleRad * 180 / Math.PI;
    const deltaDeg = actualDeg - targetDeg;
    const targetEl = document.getElementById('derivTargetAngle');
    const deltaEl = document.getElementById('derivDeltaAngle');
    const deltaLabelEl = document.getElementById('derivDeltaLabel');
    if (targetEl) targetEl.textContent = targetDeg.toFixed(1) + '°';
    if (deltaLabelEl) deltaLabelEl.textContent = 'deviation';
    if (deltaEl) deltaEl.textContent = (deltaDeg >= 0 ? '+' : '') + deltaDeg.toFixed(3) + '°';
}
window.setDerivT = function(value) {
    document.getElementById('derivTSlider').value = value;
    drawDerivation();
};
window.drawDerivation = drawDerivation;

// Event listeners
document.getElementById('derivTSlider').addEventListener('input', drawDerivation);
document.getElementById('derivShowGrid').addEventListener('change', drawDerivation);
document.getElementById('derivShowLabels').addEventListener('change', drawDerivation);
document.getElementById('derivShowConstruction').addEventListener('change', drawDerivation);
const derivShowAllQuadrantsEl = document.getElementById('derivShowAllQuadrants');
if (derivShowAllQuadrantsEl) derivShowAllQuadrantsEl.addEventListener('change', drawDerivation);
document.getElementById('themeToggle').addEventListener('click', () => setTimeout(drawDerivation, 50));
    
// Initial draw
drawDerivation();
