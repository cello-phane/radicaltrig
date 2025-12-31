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

// ============================================================================
// PROTRACTOR STATE
// ============================================================================

const ProtractorState = {
  ticks: 72,
  radius: 117,
  labelMode: 't', // 't', 'deg', 'rad', or 'none'
  currentT: 0.0
};

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
  
  // Draw tick marks
  drawTicks(svg, cx, cy, radius);
  
  // Draw axis reference line
  drawAxisLine(svg, cx, cy, radius);
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
 * Draw tick marks and labels
 * @param {SVGSVGElement} svg - SVG container
 * @param {number} cx - Center X
 * @param {number} cy - Center Y
 * @param {number} radius - Tick radius
 */
function drawTicks(svg, cx, cy, radius) {
  const ticks = ProtractorState.ticks;
  const labelMode = ProtractorState.labelMode;
  const labelInterval = Math.max(1, Math.floor(ticks / 12));
  
  for (let i = 0; i <= ticks; i++) {
    const t = i / ticks;
    const v = RAU.tToVector(t);
    
    // Outer point (on arc)
    const outer = {
      x: v.x * radius,
      y: -v.y * radius // Negative Y for SVG coordinate system
    };
    
    // Inner point (tick start)
    const tickLength = (i % 4 === 0) ? 8 : 3;
    const inner = {
      x: v.x * (radius - tickLength),
      y: -v.y * (radius - tickLength)
    };
    
    // Draw tick line
    const line = createSVGElement('line', {
      x1: outer.x,
      y1: outer.y,
      x2: inner.x,
      y2: inner.y,
      stroke: (i % 4 === 0) ? 'rgba(46,226,196,0.95)' : 'rgba(255,255,255,0.12)',
      'stroke-width': (i % 4 === 0) ? 2 : 1
    });
    
    svg.appendChild(line);
    
    // Draw label if applicable
    if (labelMode !== 'none' && (i === 0 || i === ticks || i % labelInterval === 0)) {
      drawLabel(svg, t, v, radius, i % 4 === 0);
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
