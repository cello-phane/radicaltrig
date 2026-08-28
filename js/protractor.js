/**
 * RAU Protractor Visualization
 * Draws interactive protractor with RAU tick marks
 */

// ============================================================================
// RAU MATH UTILITIES
// ============================================================================

const RAU = (function() {
  const PI = Math.PI;
  
  return {
    /**
     * Convert RAU parameter t [0,1] to normalized vector direction
     * @param {number} t - RAU parameter in [0, 1]
     * @returns {{x: number, y: number}} Normalized direction vector
     */
    tToVector(t) {
      const vx = 1 - t;
      const vy = t;
      const len = Math.hypot(vx, vy) || 1;
      return { x: vx / len, y: vy / len };
    },
    
    /**
     * Convert RAU parameter to angle in radians
     * @param {number} t - RAU parameter in [0, 1]
     * @returns {number} Angle in radians [0, π/2]
     */
    tToAngle(t) {
      const v = this.tToVector(t);
      return Math.atan2(v.y, v.x);
    },
    
    /**
     * Convert angle to RAU parameter (inverse mapping)
     * @param {number} theta - Angle in radians [0, π/2]
     * @returns {number} RAU parameter in [0, 1]
     */
    angleToT(theta) {
      const tanValue = Math.tan(theta);
      const t = tanValue / (1 + tanValue);
      return Math.max(0, Math.min(1, t));
    },
    
    /**
     * Format RAU parameter for display
     * @param {number} t - RAU parameter
     * @param {number} [decimals=3] - Number of decimal places
     * @returns {string} Formatted string
     */
    formatT(t, decimals = 3) {
      return t.toFixed(decimals);
    },
    
    /**
     * Format angle in degrees for display
     * @param {number} theta - Angle in radians
     * @param {number} [decimals=2] - Number of decimal places
     * @returns {string} Formatted string with degree symbol
     */
    formatDeg(theta, decimals = 2) {
      return (theta * 180 / PI).toFixed(decimals);
    },
    
    /**
     * Format angle in radians for display
     * @param {number} theta - Angle in radians
     * @param {number} [decimals=3] - Number of decimal places
     * @returns {string} Formatted string
     */
    formatRad(theta, decimals = 3) {
      return theta.toFixed(decimals);
    }
  };
})();

// NOTE: RAU_WARP is no longer defined in this file. geom.js (loaded
// before this script — see index.html's <script> order) now defines
// the single shared RAU_WARP + applyDisplayWarp used by the protractor
// ticks below, the red-line canvas (vectorDraw.js), and the sidebar
// readout (uiControls.js). Having two `const RAU_WARP` declarations
// across scripts sharing one global scope would throw a redeclaration
// error, so this was the one removed in favor of the shared copy.

// ============================================================================
// PROTRACTOR STATE
// ============================================================================

const ProtractorState = {
  ticks: 72,
  radius: 117,
  labelMode: 't', // 't', 'deg', 'rad', or 'none'
  currentT: 0.0,
  mode: 'linear' // 'linear' (raw t, non-uniform) or 'warp' (warped t, uniform)
};
const PI_HALF = Math.PI / 2;

// ============================================================================
// SVG UTILITIES
// ============================================================================

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Create SVG element with attributes
 * @param {string} tag - SVG element tag name
 * @param {Object} [attrs={}] - Attributes to set
 * @returns {SVGElement} Created element
 */
function createSVGElement(tag, attrs = {}) {
  const element = document.createElementNS(SVG_NS, tag);
  
  for (const key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
  
  return element;
}

/**
 * Clear all children from SVG element
 * @param {SVGElement} svg - SVG element to clear
 */
function clearSVG(svg) {
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
}

// ============================================================================
// COORDINATE TRANSFORMATION
// ============================================================================

/**
 * Convert screen coordinates to SVG viewBox coordinates
 * @param {SVGSVGElement} svg - SVG element
 * @param {number} clientX - Screen X coordinate
 * @param {number} clientY - Screen Y coordinate
 * @returns {SVGPoint} Point in SVG coordinate system
 */
function screenToSVG(svg, clientX, clientY) {
  const rect = svg.getBoundingClientRect();
  const relX = clientX - rect.left;
  const relY = clientY - rect.top;
  
  // Create SVG point
  const pt = svg.createSVGPoint();
  
  // Map from pixel coordinates to viewBox coordinates
  // ViewBox is [-260, -5, 517, 11]
  pt.x = relX * (517 / rect.width) - 260;
  pt.y = relY * (11 / rect.height) - 5;
  
  // Transform using inverse screen CTM
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

// ============================================================================
// PROTRACTOR DRAWING
// ============================================================================

/**
 * Draw protractor with RAU tick marks
 */
function drawProtractor() {
  const svg = document.getElementById('prosvg');
  if (!svg) return;
  
  clearSVG(svg);
  
  const radius = ProtractorState.radius;
  const cx = 0;
  const cy = 0;
  
  // Draw quarter-circle arc (0° to 90°)
  drawArc(svg, cx, cy, radius);

  // In warp mode, draw the faint ideal-uniform reference grid first so
  // the real ticks draw on top of it. Skipped in dual mode — the orange
  // gap segments are already the comparison, a third overlay would just
  // add clutter.
  if (ProtractorState.mode === 'warp') {
    drawIdealGrid(svg, cx, cy, radius);
  }
  
  // Draw tick marks
  drawTicks(svg, cx, cy, radius);
  
  // Draw axis reference line
  drawAxisLine(svg, cx, cy, radius);

  updateProtractorReadout();
}

/**
 * Draw quarter-circle arc
 * @param {SVGSVGElement} svg - SVG container
 * @param {number} cx - Center X
 * @param {number} cy - Center Y
 * @param {number} radius - Arc radius
 */
function drawArc(svg, cx, cy, radius) {
  // Start at 0° (right), end at 90° (up)
  const start = { x: radius, y: 0 };
  const end = { x: 0, y: -radius };
  
  // SVG arc path
  const pathData = `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 0 ${end.x} ${end.y}`;
  
  const arc = createSVGElement('path', {
    d: pathData,
    stroke: 'rgba(255,255,255,0.06)',
    'stroke-width': 2,
    fill: 'none'
  });
  
  svg.appendChild(arc);
}

/**
 * Draw faint reference ticks at the ideal uniform-angle grid
 * (t * 90 degrees, evenly spaced) so the warp-mode ticks can be
 * visually compared against the target they're trying to hit.
 * @param {SVGSVGElement} svg - SVG container
 * @param {number} cx - Center X
 * @param {number} cy - Center Y
 * @param {number} radius - Arc radius
 */
function drawIdealGrid(svg, cx, cy, radius) {
  const ticks = ProtractorState.ticks;
  const majorEvery = Math.max(1, Math.floor(ticks / 12)); // ~12 reference marks

  for (let i = 0; i <= ticks; i += majorEvery) {
    const t = i / ticks;
    const theta = t * PI_HALF;
    const gx1 = Math.cos(theta) * (radius + 10);
    const gy1 = -Math.sin(theta) * (radius + 10);
    const gx2 = Math.cos(theta) * (radius - 6);
    const gy2 = -Math.sin(theta) * (radius - 6);

    svg.appendChild(createSVGElement('line', {
      x1: gx1, y1: gy1, x2: gx2, y2: gy2,
      stroke: 'rgba(255,255,255,0.18)',
      'stroke-width': 1,
      'stroke-dasharray': '2 3'
    }));
  }
}

/**
 * Draw tick marks and labels
 * @param {SVGSVGElement} svg - SVG container
 * @param {number} cx - Center X
 * @param {number} cy - Center Y
 * @param {number} radius - Tick radius
 */
function drawOneTick(svg, v, radius, isMajor, color) {
  const tickLength = isMajor ? 8 : 3;
  const outer = { x: v.x * radius, y: -v.y * radius };
  const inner = { x: v.x * (radius - tickLength), y: -v.y * (radius - tickLength) };
  svg.appendChild(createSVGElement('line', {
    x1: outer.x, y1: outer.y, x2: inner.x, y2: inner.y,
    stroke: color,
    'stroke-width': isMajor ? 2 : 1
  }));
}

function drawTicks(svg, cx, cy, radius) {
  const ticks = ProtractorState.ticks;
  const labelMode = ProtractorState.labelMode;
  const labelInterval = Math.max(1, Math.floor(ticks / 12));
  const mode = ProtractorState.mode;

  for (let i = 0; i <= ticks; i++) {
    const t = i / ticks;
    const isMajor = i % 4 === 0;

    // Dual mode: at major ticks, draw BOTH linear and warped placement
    // plus an orange segment showing the gap between them. Minor ticks
    // stay on the plain linear backdrop to avoid clutter (12 orange
    // segments already tells the story — 72 would just be noise).
    if (mode === 'dual' && isMajor) {
      const vLin = RAU.tToVector(t);
      const vWarp = RAU.tToVector(RAU_WARP.apply(t));

      drawOneTick(svg, vLin, radius, true, 'rgba(120,170,255,0.95)');
      drawOneTick(svg, vWarp, radius, true, 'rgba(46,226,196,0.95)');

      const outerLin = { x: vLin.x * radius, y: -vLin.y * radius };
      const outerWarp = { x: vWarp.x * radius, y: -vWarp.y * radius };
      svg.appendChild(createSVGElement('line', {
        x1: outerLin.x, y1: outerLin.y, x2: outerWarp.x, y2: outerWarp.y,
        stroke: '#ff8800', 'stroke-width': 1.5, opacity: 0.9
      }));

      if (labelMode !== 'none') drawLabel(svg, t, vWarp, radius, true);
      continue;
    }

    // p is the actual chord parameter used to place the point.
    // Linear mode / dual-minor-ticks: p === t (raw, non-uniform).
    // Warp mode: p = RAU_WARP.apply(t) (corrected, ~uniform).
    // RAU_WARP comes from geom.js (loaded before this file).
    const p = (mode === 'warp') ? RAU_WARP.apply(t) : t;
    const v = RAU.tToVector(p);

    drawOneTick(svg, v, radius, isMajor, isMajor ? 'rgba(46,226,196,0.95)' : 'rgba(255,255,255,0.12)');

    // Label always shows t (the intended fraction), not p, since
    // that's what the person set on the dial
    if (labelMode !== 'none' && (i === 0 || i === ticks || i % labelInterval === 0)) {
      drawLabel(svg, t, v, radius, isMajor);
    }
  }
}

/**
 * Draw tick label
 * @param {SVGSVGElement} svg - SVG container
 * @param {number} t - RAU parameter
 * @param {{x: number, y: number}} v - Direction vector
 * @param {number} radius - Base radius
 * @param {boolean} isMajor - Whether this is a major tick
 */
function drawLabel(svg, t, v, radius, isMajor) {
  const labelMode = ProtractorState.labelMode;
  let text = '';
  
  // Format text based on mode
  switch (labelMode) {
    case 't':
      text = RAU.formatT(t, 3);
      break;
    case 'deg':
      text = RAU.formatDeg(RAU.tToAngle(t), 1) + '°';
      break;
    case 'rad':
      text = RAU.formatRad(RAU.tToAngle(t), 2) + 'r';
      break;
    default:
      return;
  }
  
  // Calculate label position (slightly outside arc)
  const labelOffset = 20;
  const lx = v.x * (radius + labelOffset);
  const ly = -v.y * (radius + labelOffset);
  
  // Calculate rotation angle (perpendicular to radius)
  const theta = RAU.tToAngle(t);
  const rotationDeg = -theta * 180 / Math.PI;
  
  // Create text element
  const textElement = createSVGElement('text', {
    x: lx,
    y: ly,
    fill: 'var(--text)',
    'font-size': isMajor ? 10 : 8,
    'text-anchor': 'middle',
    'dominant-baseline': 'middle',
    transform: `rotate(${rotationDeg} ${lx} ${ly})`
  });
  
  textElement.textContent = text;
  svg.appendChild(textElement);
}

/**
 * Draw axis reference line
 * @param {SVGSVGElement} svg - SVG container
 * @param {number} cx - Center X
 * @param {number} cy - Center Y
 * @param {number} radius - Line length
 */
function drawAxisLine(svg, cx, cy, radius) {
  const line = createSVGElement('line', {
    x1: 0,
    y1: 0,
    x2: radius,
    y2: 0,
    stroke: 'rgba(255,255,255,0.03)',
    'stroke-width': 1
  });
  
  svg.appendChild(line);
}

/**
 * Compute and display the max deviation between the actual arc angle
 * and the ideal uniform grid (t * 90 degrees), across all ticks.
 */
function updateProtractorReadout() {
  const el = document.getElementById('protractorReadout');
  if (!el) return;

  const ticks = ProtractorState.ticks;
  const mode = ProtractorState.mode;

  if (mode === 'dual') {
    let maxGap = 0;
    for (let i = 0; i <= ticks; i++) {
      const t = i / ticks;
      const linDeg = RAU.tToAngle(t) * 180 / Math.PI;
      const warpDeg = RAU.tToAngle(RAU_WARP.apply(t)) * 180 / Math.PI;
      const gap = Math.abs(warpDeg - linDeg);
      if (gap > maxGap) maxGap = gap;
    }
    el.textContent = `dual · max gap between linear and warped placement: ${maxGap.toFixed(2)}° (orange segments show it directly at major ticks)`;
    return;
  }

  const useWarp = mode === 'warp';
  let maxDeltaDeg = 0;

  for (let i = 0; i <= ticks; i++) {
    const t = i / ticks;
    const p = useWarp ? RAU_WARP.apply(t) : t;
    const actualDeg = RAU.tToAngle(p) * 180 / Math.PI;
    const targetDeg = t * 90;
    const d = Math.abs(actualDeg - targetDeg);
    if (d > maxDeltaDeg) maxDeltaDeg = d;
  }

  el.textContent = useWarp
    ? `warped t · max deviation from ideal grid: ${maxDeltaDeg.toFixed(4)}°`
    : `linear t · max deviation from ideal grid: ${maxDeltaDeg.toFixed(2)}° (uncorrected)`;
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
  // Tick count control
  const tickCount = document.getElementById('tickCount');
  if (tickCount) {
    tickCount.addEventListener('input', (e) => {
      ProtractorState.ticks = parseInt(e.target.value);
      
      const tickVal = document.getElementById('tickVal');
      if (tickVal) {
        tickVal.textContent = e.target.value;
      }
      
      drawProtractor();
    });
  }
  
  // Label mode control
  const labelMode = document.getElementById('labelMode');
  if (labelMode) {
    labelMode.addEventListener('change', (e) => {
      ProtractorState.labelMode = e.target.value;
      drawProtractor();
    });
  }

  // Shared parameter mode control (linear / warp / dual) — this is the
  // single control for the whole "Introduction to RAU" section: it
  // drives the protractor ticks here, the draggable red line in
  // vectorDraw.js, the sidebar readout in uiControls.js, AND the
  // Diagonal Derivation canvas in derivation.js, all via the one
  // AppState.ui.paramMode field.
  const paramModeSel = document.getElementById('paramMode');
  if (paramModeSel) {
    paramModeSel.addEventListener('change', (e) => {
      ProtractorState.mode = e.target.value;
      if (window.AppState) {
        window.AppState.ui.paramMode = e.target.value;
      }
      drawProtractor();
      if (typeof window.refreshIntroCanvas === 'function') {
        window.refreshIntroCanvas();
      }
      if (typeof window.updateResultsDisplay === 'function') {
        window.updateResultsDisplay();
      }
      if (typeof window.drawDerivation === 'function') {
        window.drawDerivation();
      }
    });
  }
  
  // Theme toggle (redraw on theme change)
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Small delay to allow theme CSS to apply
      setTimeout(drawProtractor, 10);
    });
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Draw initial protractor
drawProtractor();

// Set up event listeners
initializeEventListeners();

// Expose RAU utilities globally
window.RAU = RAU;
