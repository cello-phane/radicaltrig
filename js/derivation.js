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
        text: isDark ? '#eee' : '#333'
    };
}

function drawDerivation() {
    const colors = getColors();
    const t = parseFloat(document.getElementById('derivTSlider').value);
    const showGrid = document.getElementById('derivShowGrid').checked;
    const showLabels = document.getElementById('derivShowLabels').checked;
    const showConstruction = document.getElementById('derivShowConstruction').checked;
    
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
    
    // Calculations
    const diagX = 1 - t, diagY = t;
    const r = Math.sqrt(1 - 2*t + 2*t*t);
    const circleX = diagX / r, circleY = diagY / r;
    
    const pDiag = toCanvas(diagX, diagY);
    const pCircle = toCanvas(circleX, circleY);
    const origin = toCanvas(0, 0);
    
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
            ctx.fillText('r = √(1-2t+2t²)', midX + 10, midY - 5);
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
            ctx.fillText('1-t', pDiagBottom.x - 10, pDiagBottom.y + 15);
            ctx.fillText('t', pDiagLeft.x - 20, pDiagLeft.y);
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
document.getElementById('themeToggle').addEventListener('click', () => setTimeout(drawDerivation, 50));
    
// Initial draw
drawDerivation();
