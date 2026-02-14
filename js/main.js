/**
 * Main Application Controller for RAU Visualization
 * Manages global state and initializes UI components
 */

// ============================================================================
// APPLICATION STATE
// ============================================================================

const AppState = {
  // Section 1: Introduction/Simple RAU visualization
  section1: {
    phase: 0
  },
  
  // Section 2: Vector visualization
  section2: {
    u: { x: 120, y: 0 },
    v: { x: 100, y: 0 },
    uAngle: 30,
    vAngle: 90,
    angleBetweenDeg: 0,
    ccw: false
  },
  
  // UI settings
  ui: {
    precision: 6,
    maxPrecision: 15,
    angleMode: 'between',
    angleWrapMode: false,
    biasMode: false,
    defaultMode: true,
    currentSection: 'section1',
    theme: 'light' // Store in memory instead of localStorage
  }
};

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  PRECISION_MIN: 0,
  PRECISION_MAX: 15,
  PRECISION_DEFAULT: 6,
  FONT_SIZE_MIN: 8,
  FONT_SIZE_DEFAULT: 13
};

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initializeSections();
  initializeTheme();
  initializeSectionToggle();
  initializeAngleModeCheckboxes();
  initializePrecisionControl();
  
  // Initialize canvas visualizations
  initRAUCanvas();
  initVectorCanvas();
  
  // Initial display update
  updateResultsDisplay();
});

function toggleMathBlock() {
    const mb = document.getElementById('mathBlock');
    if (mb.classList.contains('collapsed')) {
        mb.classList.remove('collapsed');
        mb.style.maxHeight = mb.scrollHeight + 'px';
    } else {
        mb.style.maxHeight = '0';
        mb.classList.add('collapsed');
    }
}

/**
 * Initialize section visibility
 */
function initializeSections() {
  const section1 = document.getElementById('section1');
  const section2 = document.getElementById('section2');
  
  if (section1) {
    section1.classList.add('active');
    AppState.ui.currentSection = 'section1';
  }
  
  if (section2) {
    section2.classList.remove('active');
  }
}

/**
 * Initialize theme system (in-memory, no localStorage)
 */
function initializeTheme() {
  const themeBtn = document.getElementById('themeToggle');
  if (!themeBtn) return;
  
  // Set initial theme from state
  if (AppState.ui.theme === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '☀️ Light Mode';
  } else {
    themeBtn.textContent = '🌙 Dark Mode';
  }
  
  // Theme toggle handler
  themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    AppState.ui.theme = isDark ? 'dark' : 'light';
    themeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
}

/**
 * Initialize section toggle functionality
 */
function initializeSectionToggle() {
  const toggleBtn = document.getElementById('toggleButton');
  const section1 = document.getElementById('section1');
  const section2 = document.getElementById('section2');
  const angleModeSidebar = document.getElementById('angleModeSidebar');
  
  if (!toggleBtn || !section1 || !section2) return;
  
  toggleBtn.addEventListener('click', () => {
    const showing1 = section1.classList.contains('active');
    
    // Toggle sections
    section1.classList.toggle('active', !showing1);
    section2.classList.toggle('active', showing1);
    
    // Update state
    AppState.ui.currentSection = showing1 ? 'section2' : 'section1';
    
    // Show/hide angle mode selector
    if (angleModeSidebar) {
      angleModeSidebar.style.display = showing1 ? 'block' : 'none';
    }
    
    // Update button text
    toggleBtn.textContent = showing1
      ? 'Switch to Introduction'
      : 'Switch to Vector Diagram';
    
    // Refresh display
    updateResultsDisplay();
  });
}

/**
 * Initialize angle mode checkboxes
 */
function initializeAngleModeCheckboxes() {
  const wrappedAngle = document.getElementById('wrappedAngle');
  const biasAngle = document.getElementById('biasAngle');
  const defaultAngle = document.getElementById('defaultAngle');
  
  // Set initial states
  if (wrappedAngle) {
    wrappedAngle.checked = AppState.ui.angleWrapMode;
    wrappedAngle.addEventListener('change', function() {
      AppState.ui.angleWrapMode = this.checked;
      initVectorCanvas();
    });
  }
  
  if (biasAngle) {
    biasAngle.checked = AppState.ui.biasMode;
    biasAngle.addEventListener('change', function() {
      AppState.ui.biasMode = this.checked;
      initVectorCanvas();
    });
  }
  
  if (defaultAngle) {
    defaultAngle.checked = AppState.ui.defaultMode;
    defaultAngle.addEventListener('change', function() {
      AppState.ui.defaultMode = this.checked;
      initVectorCanvas();
    });
  }
}

// ============================================================================
// PRECISION CONTROL
// ============================================================================

/**
 * Create precision control UI element
 * @returns {HTMLElement} Precision control container
 */
function createPrecisionControl() {
  const container = document.createElement('div');
  container.id = 'precisionControl';
  
  Object.assign(container.style, {
    margin: '12px 0',
    padding: '12px',
    background: 'var(--bg)',
    borderRadius: '6px',
    border: '1px solid #ddd'
  });
  
  const label = document.createElement('label');
  Object.assign(label.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
    fontSize: '13px'
  });
  label.textContent = 'Precision: ';
  
  const input = document.createElement('input');
  input.type = 'number';
  input.id = 'precisionInput';
  input.min = CONFIG.PRECISION_MIN.toString();
  input.max = CONFIG.PRECISION_MAX.toString();
  input.value = AppState.ui.precision.toString();
  
  Object.assign(input.style, {
    width: '60px',
    padding: '4px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '13px'
  });
  
  const display = document.createElement('span');
  display.id = 'precisionDisplay';
  
  Object.assign(display.style, {
    marginLeft: '8px',
    padding: '4px 8px',
    background: 'var(--accent)',
    borderRadius: '3px',
    fontFamily: 'monospace',
    fontSize: '12px',
    color: 'var(--card)'
  });
  display.textContent = formatValue(Math.PI, AppState.ui.precision);
  
  // Update precision on input
  input.addEventListener('input', (e) => {
    const precision = parseInt(e.target.value) || 6;
    setPrecision(precision);
    display.textContent = formatValue(Math.PI, precision);
  });
  
  label.appendChild(input);
  label.appendChild(display);
  container.appendChild(label);
  
  return container;
}

/**
 * Initialize precision control in sidebar
 */
function initializePrecisionControl() {
  const formulaBody = document.getElementById('formulaBody');
  if (!formulaBody) return;
  
  const precisionControl = createPrecisionControl();
  formulaBody.insertBefore(precisionControl, formulaBody.firstChild);
}

/**
 * Set display precision
 * @param {number} digits - Number of decimal places
 */
function setPrecision(digits) {
  AppState.ui.precision = Math.max(
    CONFIG.PRECISION_MIN,
    Math.min(CONFIG.PRECISION_MAX, digits)
  );
  updateResultsDisplay();
}

/**
 * Format numerical value with current precision
 * @param {number} value - Number to format
 * @param {number} [precision] - Override default precision
 * @returns {string} Formatted number or placeholder
 */
function formatValue(value, precision) {
  const p = precision !== undefined ? precision : AppState.ui.precision;
  
  if (typeof value !== 'number' || !isFinite(value)) {
    return '—';
  }
  
  return value.toFixed(p);
}

// ============================================================================
// FONT SIZE CONTROL
// ============================================================================

/**
 * Change font size for an element
 * @param {number} changeAmount - Amount to change (positive or negative)
 * @param {string} elementId - ID of element to modify
 */
function changeFontSize(changeAmount, elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  let currentSize = parseInt(element.style.fontSize) || CONFIG.FONT_SIZE_DEFAULT;
  let newSize = currentSize + changeAmount;
  
  // Enforce minimum
  if (newSize < CONFIG.FONT_SIZE_MIN) {
    newSize = CONFIG.FONT_SIZE_MIN;
  }
  
  element.style.fontSize = newSize + 'px';
}

// ============================================================================
// GETTERS FOR STATE (Used by other modules)
// ============================================================================

/**
 * Get current section data
 * @returns {Object} Current section state
 */
function getCurrentSectionState() {
  const section = AppState.ui.currentSection;
  return section === 'section1' ? AppState.section1 : AppState.section2;
}

/**
 * Get UI state
 * @returns {Object} UI configuration state
 */
function getUIState() {
  return AppState.ui;
}

/**
 * Update section 1 phase
 * @param {number} phase - New phase value
 */
function setSection1Phase(phase) {
  AppState.section1.phase = phase;
}

/**
 * Update section 2 vectors
 * @param {{x: number, y: number}} u - U vector
 * @param {{x: number, y: number}} v - V vector
 */
function setSection2Vectors(u, v) {
  AppState.section2.u = u;
  AppState.section2.v = v;
}

/**
 * Update section 2 angle data
 * @param {number} angleBetweenDeg - Angle between vectors
 * @param {boolean} ccw - Counter-clockwise flag
 */
function setSection2AngleData(angleBetweenDeg, ccw) {
  AppState.section2.angleBetweenDeg = angleBetweenDeg;
  AppState.section2.ccw = ccw;
}

/**
 * Update section 2 individual angles
 * @param {number} uAngle - U vector angle in degrees
 * @param {number} vAngle - V vector angle in degrees
 */
function setSection2Angles(uAngle, vAngle) {
  AppState.section2.uAngle = uAngle;
  AppState.section2.vAngle = vAngle;
}

// Make state accessors globally available
window.AppState = AppState;
window.getCurrentSectionState = getCurrentSectionState;
window.getUIState = getUIState;
window.setSection1Phase = setSection1Phase;
window.setSection2Vectors = setSection2Vectors;
window.setSection2AngleData = setSection2AngleData;
window.setSection2Angles = setSection2Angles;
window.formatValue = formatValue;
window.changeFontSize = changeFontSize;
