/**
 * Canvas Drawing and Interaction
 * Handles both RAU unit circle and vector visualization canvases
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CANVAS_CONFIG = {
  GRID_SPACING: 50,
  GRID_COLOR: '#ddd',
  AXIS_COLOR: '#444',
  VECTOR_U_COLOR: '#ff4444',
  VECTOR_V_COLOR: '#4444ff',
  KNOB_RADIUS: 6,
  HIT_THRESHOLD: 12,
  ARC_QUALITY_MIN: 6,
  ARC_QUALITY_MAX: 48
};

// ============================================================================
// SHARED STATE
// ============================================================================

let dragging = null; // Track which element is being dragged: null, 'u', 'v', or 'intro'

// ============================================================================
// SECTION 1: RAU UNIT CIRCLE VISUALIZATION
// ============================================================================

/**
 * Initialize RAU canvas with interactive angle selector
 */
function initRAUCanvas() {
  const canvas = document.getElementById('simpleCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const slider = document.getElementById('paramSlider');
  const valueDisplay = document.getElementById('paramValue');
  
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) * 0.34;
  
  // ------------------------
  // DRAWING FUNCTIONS
  // ------------------------
  
  /**
   * Draw grid background
   */
  function drawGrid() {
    ctx.strokeStyle = CANVAS_CONFIG.GRID_COLOR;
    ctx.lineWidth = 1;
    let spacing = CANVAS_CONFIG.GRID_SPACING-5;
    for (let i = -10; i <= 10; i++) {
      // Vertical
      ctx.beginPath();
      ctx.moveTo(cx + i * spacing, 0);
      ctx.lineTo(cx + i * spacing, canvas.height);
      ctx.stroke();
      
      // Horizontal
      ctx.beginPath();
      ctx.moveTo(0, cy + i * spacing);
      ctx.lineTo(canvas.width, cy + i * spacing);
      ctx.stroke();
    }
  }
  
  /**
   * Draw unit circle
   */
  function drawCircle() {
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  /**
   * Draw radius and knob at current phase
   */
  function drawRadius() {
    const phase = AppState.section1.phase;
    const components = getRotationComponents(phase);
    
    const px = cx + components.cos * radius;
    const py = cy - components.sin * radius;
    
    // Radius line
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();
    
    // Knob
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(px, py, CANVAS_CONFIG.KNOB_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }
  
  /**
   * Main draw function
   */
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawCircle();
    drawRadius();
  }
  
  // ------------------------
  // INTERACTION
  // ------------------------
  
  /**
   * Update position based on mouse coordinates
   */
  function updatePosition(mx, my) {
    const dx = mx - cx;
    const dy = my - cy;
    const angle = RAUConverter.vectorToRAU({ x: dx, y: dy }, { x: 1, y: 0 });
    
    // Update state
    setSection1Phase(angle);
    
    // Update UI elements
    slider.value = angle;
    valueDisplay.value = formatValue(angle, 6);
    
    updateResultsDisplay();
    draw();
  }
  
  // Click handler
  canvas.addEventListener('click', (e) => {
    if (dragging === 'intro') return; // Don't trigger on drag release
    
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    updatePosition(mx, my);
  });
  
  // Drag handlers
  canvas.addEventListener('mousedown', () => {
    dragging = 'intro';
  });
  
  canvas.addEventListener('mousemove', (e) => {
    if (dragging !== 'intro') return;
    
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    updatePosition(mx, my);
  });
  
  document.addEventListener('mouseup', () => {
    if (dragging === 'intro') {
      dragging = null;
    }
  });
  
  // Slider synchronization
  slider.addEventListener('input', () => {
    const phase = parseFloat(slider.value);
    setSection1Phase(phase);
    valueDisplay.value = formatValue(phase, 6);
    updateResultsDisplay();
    draw();
  });
  
  valueDisplay.addEventListener('change', () => {
    const phase = parseFloat(valueDisplay.value);
    setSection1Phase(phase);
    slider.value = phase;
    updateResultsDisplay();
    draw();
  });
  
  // Initial draw
  draw();
}

// ============================================================================
// SECTION 2: VECTOR VISUALIZATION
// ============================================================================

/**
 * Initialize vector canvas with two draggable vectors
 */
function initVectorCanvas() {
  const canvas = document.getElementById('vectorCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  
  // Get control references
  const controls = {
    uLength: document.getElementById('uLength'),
    uAngle: document.getElementById('uAngle'),
    vLength: document.getElementById('vLength'),
    vAngle: document.getElementById('vAngle'),
    angleMode: document.getElementById('angleMode')
  };
  
  // ------------------------
  // DRAWING FUNCTIONS
  // ------------------------
  
  /**
   * Draw grid background
   */
  function drawGrid() {
    ctx.strokeStyle = CANVAS_CONFIG.GRID_COLOR;
    ctx.lineWidth = 1;
    
    for (let i = -10; i <= 10; i++) {
      // Vertical
      ctx.beginPath();
      ctx.moveTo(cx + i * CANVAS_CONFIG.GRID_SPACING, 0);
      ctx.lineTo(cx + i * CANVAS_CONFIG.GRID_SPACING, canvas.height);
      ctx.stroke();
      
      // Horizontal
      ctx.beginPath();
      ctx.moveTo(0, cy + i * CANVAS_CONFIG.GRID_SPACING);
      ctx.lineTo(canvas.width, cy + i * CANVAS_CONFIG.GRID_SPACING);
      ctx.stroke();
    }
  }
  
  /**
   * Draw vectors u and v
   */
  function drawVectors(u, v) {
    // Vector U
    ctx.strokeStyle = CANVAS_CONFIG.VECTOR_U_COLOR;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + u.x, cy + u.y);
    ctx.stroke();
    
    ctx.fillStyle = CANVAS_CONFIG.VECTOR_U_COLOR;
    ctx.beginPath();
    ctx.arc(cx + u.x, cy + u.y, CANVAS_CONFIG.KNOB_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    
    // Vector V
    ctx.strokeStyle = CANVAS_CONFIG.VECTOR_V_COLOR;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + v.x, cy + v.y);
    ctx.stroke();
    
    ctx.fillStyle = CANVAS_CONFIG.VECTOR_V_COLOR;
    ctx.beginPath();
    ctx.arc(cx + v.x, cy + v.y, CANVAS_CONFIG.KNOB_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }
  
  /**
   * Draw gradient arc between vectors
   * @param {number} startAngle - Start angle in radians
   * @param {number} endAngle - End angle in radians
   * @param {number} radius - Arc radius
   */
  function drawArcGradient(startAngle, endAngle, radius) {
    const color1 = [255, 100, 100];
    const color2 = [100, 100, 255];
    
    // Calculate arc properties
    let angleDiff = endAngle - startAngle;
    while (angleDiff > Math.PI * 2) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI * 2) angleDiff += Math.PI * 2;
    
    const absAngleDiff = Math.abs(angleDiff);
    
    // For tiny arcs, use solid color
    if (absAngleDiff < 0.01) {
      ctx.fillStyle = `rgb(${color1[0]},${color1[1]},${color1[2]})`;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
      return;
    }
    
    // Try conic gradient (best performance)
    if (ctx.createConicGradient) {
      const gradient = ctx.createConicGradient(startAngle, cx, cy);
      const fraction = absAngleDiff / (Math.PI * 2);
      
      gradient.addColorStop(0, `rgb(${color1[0]},${color1[1]},${color1[2]})`);
      gradient.addColorStop(fraction, `rgb(${color2[0]},${color2[1]},${color2[2]})`);
      
      // Add intermediate stop for large arcs
      if (fraction > 0.5) {
        const midR = Math.round((color1[0] + color2[0]) / 2);
        const midG = Math.round((color1[1] + color2[1]) / 2);
        const midB = Math.round((color1[2] + color2[2]) / 2);
        gradient.addColorStop(0.5, `rgb(${midR},${midG},${midB})`);
      }
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
      return;
    }
    
    // Fallback: segment-based gradient
    const arcLength = absAngleDiff * radius; // FIXED: moved before usage
    const segments = Math.max(
      CANVAS_CONFIG.ARC_QUALITY_MIN,
      Math.min(CANVAS_CONFIG.ARC_QUALITY_MAX, Math.ceil(arcLength / 15))
    );
    const angleStep = angleDiff / segments;
    
    for (let i = 0; i < segments; i++) {
      const t1 = i / segments;
      const t2 = (i + 1) / segments;
      const a1 = startAngle + angleStep * i;
      const a2 = startAngle + angleStep * (i + 1);
      
      // Interpolate colors
      const r1 = Math.round(color1[0] * (1 - t1) + color2[0] * t1);
      const g1 = Math.round(color1[1] * (1 - t1) + color2[1] * t1);
      const b1 = Math.round(color1[2] * (1 - t1) + color2[2] * t1);
      
      const r2 = Math.round(color1[0] * (1 - t2) + color2[0] * t2);
      const g2 = Math.round(color1[1] * (1 - t2) + color2[1] * t2);
      const b2 = Math.round(color1[2] * (1 - t2) + color2[2] * t2);
      
      // Edge points for gradient
      const x1 = cx + radicalCosine(degToRau(a1)) * radius;
      const y1 = cy + radicalSine(degToRau(a1)) * radius;
      const x2 = cx + radicalCosine(degToRau(a2)) * radius;
      const y2 = cy + radicalSine(degToRau(a2)) * radius;
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, `rgb(${r1},${g1},${b1})`);
      gradient.addColorStop(1, `rgb(${r2},${g2},${b2})`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, a1, a2);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  // ------------------------
  // MAIN RENDER FUNCTION
  // ------------------------
  
  function render() {
    const uLen = parseFloat(controls.uLength.value);
    const vLen = parseFloat(controls.vLength.value);
    const uAngleDeg = parseFloat(controls.uAngle.value);
    const vAngleDeg = parseFloat(controls.vAngle.value);
    
    // Convert to radians (canvas Y is inverted)
    const uA = degToRad(uAngleDeg);
    const vA = degToRad(vAngleDeg);
    
    // Calculate vector components
    const u = {
      x: uLen * Math.cos(uA),
      //x: uLen * radicalCosine(degToRau(uAngleDeg)), // slighty imprecise because degrees(360 steps for now)
      y: -uLen * Math.sin(uA) // Invert Y for canvas
      //y: -uLen * radicalSine(degToRau(uAngleDeg)) // Invert Y for canvas // slighty imprecise because degrees(360 steps for now)
    };
    
    const v = {
      x: vLen * Math.cos(vA),
      //x: vLen * radicalCosine(degToRau(vAngleDeg)), // slighty imprecise because degrees(360 steps for now)
      y: -vLen * Math.sin(vA) // Invert Y for canvas
      //y: -vLen * radicalSine(degToRau(vAngleDeg)) // Invert Y for canvas // slighty imprecise because degrees(360 steps for now)
    };
    
    // Update state
    setSection2Vectors(u, v);
    setSection2Angles(uAngleDeg, vAngleDeg);
    
    // Calculate angle between vectors
    const signedAngle = vAngleDeg - uAngleDeg;
    const unsignedAngle = Math.abs(signedAngle);
    const ccw = signedAngle > 0;
    
    setSection2AngleData(unsignedAngle, ccw);
    
    // Clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawVectors(u, v);
    
    // Draw arc based on mode
    const arcRadius = 0.5 * Math.max(uLen, vLen);
    const uiState = getUIState();
    
    if (uiState.angleWrapMode) {
      // Draw long way around
      drawArcGradient(
        (ccw ? -uA : -vA) + 2 * Math.PI,
        (ccw ? -uA : -vA) + 2 * Math.PI + degToRad(360 - unsignedAngle),
        arcRadius
      );
    } else if (uiState.biasMode) {
      const bias = ccw ? Math.PI * 2 : degToRad(unsignedAngle);
      const startAngle = Math.min(uA, bias);
      const endAngle = startAngle - degToRad(Math.abs(360 - (ccw ? signedAngle : unsignedAngle)));
      
      drawArcGradient(
        ccw ? bias - startAngle : -(vA + bias),
        ccw ? Math.abs(endAngle - Math.PI * 2) : -(uA - degToRad(unsignedAngle)),
        arcRadius
      );
      
      const newAngle = !ccw 
        ? 360 + radToDeg(endAngle - startAngle) 
        : radToDeg(startAngle - endAngle);
      setSection2AngleData(newAngle, ccw);
    } else if (uiState.defaultMode) {
      // Draw between vectors (short way)
      drawArcGradient(
        -Math.max(uA, vA),
        -Math.min(uA, vA),
        arcRadius
      );
    }
    
    // Update results display
    updateResultsDisplay();
  }
  
  // ------------------------
  // INTERACTION
  // ------------------------
  
  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    // Get current vector endpoints
    const u = AppState.section2.u;
    const v = AppState.section2.v;
    
    const uEnd = { x: cx + u.x, y: cy + u.y };
    const vEnd = { x: cx + v.x, y: cy + v.y };
    
    // Check which vector was clicked
    const distU = Math.hypot(mx - uEnd.x, my - uEnd.y);
    const distV = Math.hypot(mx - vEnd.x, my - vEnd.y);
    
    if (distU < CANVAS_CONFIG.HIT_THRESHOLD) {
      dragging = 'u';
    } else if (distV < CANVAS_CONFIG.HIT_THRESHOLD) {
      dragging = 'v';
    }
  });
  
  canvas.addEventListener('mousemove', (e) => {
    if (!dragging || dragging === 'intro') return;
    
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left - cx;
    const my = e.clientY - rect.top - cy;
    
    const len = Math.hypot(mx, my);
    const angleDeg = rauToDeg(RAUConverter.vectorToRAU({ x: mx, y: my }, { x: 1, y: 0 }));
    
    if (dragging === 'u') {
      controls.uLength.value = len;
      controls.uAngle.value = angleDeg;
      updateValueDisplay('uLengthVal', formatValue(len, 0));
      updateValueDisplay('uAngleVal', formatValue(angleDeg, 0), '°');
    } else if (dragging === 'v') {
      controls.vLength.value = len;
      controls.vAngle.value = angleDeg;
      updateValueDisplay('vLengthVal', formatValue(len, 0));
      updateValueDisplay('vAngleVal', formatValue(angleDeg, 0), '°');
    }
    
    render();
  });
  
  document.addEventListener('mouseup', () => {
    if (dragging === 'u' || dragging === 'v') {
      dragging = null;
    }
  });
  
  // Control event listeners
  Object.entries(controls).forEach(([key, control]) => {
    if (!control) return;
    
    control.addEventListener('input', (e) => {
      const val = e.target.value;
      
      if (key === 'uAngle' || key === 'vAngle') {
        updateValueDisplay(key + 'Val', val, '°');
      } else if (key !== 'angleMode') {
        updateValueDisplay(key + 'Val', val);
      }
      
      render();
    });
  });
  
  // Initial render
  render();
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Update value display element
 * @param {string} id - Element ID
 * @param {string|number} value - Value to display
 * @param {string} [suffix=''] - Optional suffix
 */
function updateValueDisplay(id, value, suffix = '') {
  const element = document.getElementById(id);
  if (!element) return;
  
  const displayValue = typeof value === 'number' ? formatValue(value) : value;
  element.textContent = `${displayValue}${suffix}`;
}

// Make functions globally available
window.initRAUCanvas = initRAUCanvas;
window.initVectorCanvas = initVectorCanvas;
