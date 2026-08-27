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
        text: isDark ? '#eee' : '#333'
    };
}

// ============================================================================
// WARP POLYNOMIAL (rau_warp_11 — confirmed double-precision coefficients)
// Same derivation as in protractor.js: w(t) = 0.5 + warp11(t), an
// 11th-order odd Horner polynomial in v = t - 0.5, fit so that evenly
// spaced t produces (nearly) evenly spaced angle t*90deg once projected.
// Defined locally here (rather than shared from geom.js) because this
// file's initial drawDerivation() call at the bottom runs before
// geom.js has executed, given the <script> order in index.html.
// ============================================================================
const DERIV_WARP = (function() {
    const C1 = 0.78539816339744830962; // = pi/4, exact
    const C2 = 0.64607158024987317298;
    const C3 = 0.63401589172451679138;
    const C4 = 0.68515350354689586789;
    const C5 = 0.32501622369042378935;
    const C6 = 1.51901679307446258196;

    function warp11(t) {
        const v = t - 0.5;
        const v2 = v * v;
        let poly = C6;
        poly = v2 * poly + C5;
        poly = v2 * poly + C4;
        poly = v2 * poly + C3;
        poly = v2 * poly + C2;
        poly = v2 * poly + C1;
        return v * poly;
    }

    return {
        apply(t) { return 0.5 + warp11(t); }
    };
})();

function drawDerivation() {
    const colors = getColors();
    const t = parseFloat(document.getElementById('derivTSlider').value);
    const showGrid = document.getElementById('derivShowGrid').checked;
    const showLabels = document.getElementById('derivShowLabels').checked;
    const showConstruction = document.getElementById('derivShowConstruction').checked;
    const useWarpEl = document.getElementById('derivUseWarp');
    const useWarp = useWarpEl ? useWarpEl.checked : false;

    // p is the chord parameter actually used to place the point.
    // Linear mode: p === t (raw parameter, non-uniform in angle).
    // Warp mode:   p = DERIV_WARP.apply(t) (corrected, ~uniform in angle).
    const p = useWarp ? DERIV_WARP.apply(t) : t;
    
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
    
    // Diagonal line
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
    
    // Calculations — all downstream math uses p (the actually-placed
    // parameter), not the raw slider value t
    const diagX = 1 - p, diagY = p;
    const r = Math.sqrt(1 - 2*p + 2*p*p);
    const circleX = diagX / r, circleY = diagY / r;
    
    const pDiag = toCanvas(diagX, diagY);
    const pCircle = toCanvas(circleX, circleY);
    const origin = toCanvas(0, 0);

    // Ideal target angle (what a perfectly uniform parameter would give)
    const targetAngleRad = t * (Math.PI / 2);

    // If in warp mode, draw a faint ghost ray at the ideal target angle
    // so the gap between "where warp lands" and "where it should land"
    // is visible directly on the canvas
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
        // Line from origin to diagonal point (showing distance r)
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
        
        // Vertical and horizontal construction lines from diagonal point
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
    
    // Line from origin to circle (radius = 1)
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(pCircle.x, pCircle.y);
    ctx.stroke();
    
    // Points
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
    
    // Angle arc
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
    
    // Update displays
    document.getElementById('derivTValue').textContent = t.toFixed(3);
    document.getElementById('derivDiagX').textContent = diagX.toFixed(3);
    document.getElementById('derivDiagY').textContent = diagY.toFixed(3);
    document.getElementById('derivR').textContent = r.toFixed(3);
    document.getElementById('derivCos').textContent = circleX.toFixed(3);
    document.getElementById('derivSin').textContent = circleY.toFixed(3);
    document.getElementById('derivAngle').textContent = (angleRad * 180 / Math.PI).toFixed(1) + '°';

    // Target angle + deviation readout (only meaningful once you're
    // comparing against a "desired uniform" t; shown in both modes so
    // the linear-mode error is visible too, not just the warp-mode fix)
    const targetDeg = t * 90;
    const actualDeg = angleRad * 180 / Math.PI;
    const deltaDeg = actualDeg - targetDeg;
    const targetEl = document.getElementById('derivTargetAngle');
    const deltaEl = document.getElementById('derivDeltaAngle');
    if (targetEl) targetEl.textContent = targetDeg.toFixed(1) + '°';
    if (deltaEl) deltaEl.textContent = (deltaDeg >= 0 ? '+' : '') + deltaDeg.toFixed(3) + '°';
}
window.setDerivT = function(value) {
    document.getElementById('derivTSlider').value = value;
    drawDerivation();
};

// Event listeners
document.getElementById('derivTSlider').addEventListener('input', drawDerivation);
document.getElementById('derivShowGrid').addEventListener('change', drawDerivation);
document.getElementById('derivShowLabels').addEventListener('change', drawDerivation);
document.getElementById('derivShowConstruction').addEventListener('change', drawDerivation);
const derivUseWarpEl = document.getElementById('derivUseWarp');
if (derivUseWarpEl) derivUseWarpEl.addEventListener('change', drawDerivation);
document.getElementById('themeToggle').addEventListener('click', () => setTimeout(drawDerivation, 50));
    
// Initial draw
drawDerivation();
