/**
 * UI Controls and Results Display
 * Manages slider synchronization, panel behavior, and results formatting
 */

// ============================================================================
// CONTROL ELEMENT REFERENCES
// ============================================================================

const Controls = {
  // Vector controls
  uLength: document.getElementById('uLength'),
  uAngle: document.getElementById('uAngle'),
  vLength: document.getElementById('vLength'),
  vAngle: document.getElementById('vAngle'),
  
  // Angle mode selector
  angleMode: document.getElementById('angleMode'),
  
  // Simple RAU controls
  simpleSliderParam: document.getElementById('paramSlider'),
  introPhaseTextBox: document.getElementById('paramValue')
};

// ============================================================================
// SLIDER-TEXTBOX SYNCHRONIZATION
// ============================================================================

/**
 * Create bidirectional sync between slider and textbox
 * @param {HTMLElement} slider - Range input element
 * @param {HTMLElement} textbox - Text input element
 * @param {Function} [callback] - Called on value change
 */
function syncSliderTextbox(slider, textbox, callback) {
  if (!slider || !textbox) return;
  
  // Slider -> Textbox
  slider.addEventListener('input', () => {
    textbox.value = slider.value;
    if (callback) callback(parseFloat(slider.value));
  });
  
  // Textbox -> Slider with validation
  textbox.addEventListener('change', () => {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    let value = parseFloat(textbox.value);
    
    // Validate and clamp
    if (isNaN(value)) {
      value = parseFloat(slider.value);
    } else {
      value = Math.max(min, Math.min(max, value));
    }
    
    slider.value = value;
    textbox.value = value;
    
    if (callback) callback(value);
  });
}

/**
 * Initialize all slider-textbox pairs
 */
function initializeSliderSync() {
  // Setup bidirectional sync for intro phase
  syncSliderTextbox(
    Controls.simpleSliderParam,
    Controls.introPhaseTextBox,
    (value) => {
      setSection1Phase(value);
      updateResultsDisplay();
    }
  );
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeSliderSync);

// ============================================================================
// PANEL UI
// ============================================================================

/**
 * Initialize draggable panel functionality
 */
function initUI() {
  const panel = document.getElementById('formulaPanel');
  const header = document.getElementById('formulaHeader');
  const chevron = document.getElementById('formulaChevron');
  const headerControls = document.getElementById('toggleHeaderControls');
  const angleModeSidebar = document.getElementById('angleModeSidebar');
  const precisionControl = document.getElementById('precisionControl');
  
  if (!panel || !header || !chevron) return;
  
  let isSlim = false;
  let areHeaderControlsVisible = true;
  
  // Toggle panel collapse
  chevron.addEventListener('click', () => {
    isSlim = !isSlim;
    panel.classList.toggle('slim', isSlim);
    chevron.textContent = isSlim ? '▶' : '◀';
    
    // Re-render MathJax when expanding
    if (!isSlim && window.MathJax) {
      MathJax.typesetPromise().catch(err => console.error('MathJax error:', err));
    }
  });
  
  // Toggle header controls visibility
  if (headerControls) {
    headerControls.addEventListener('click', () => {
      areHeaderControlsVisible = !areHeaderControlsVisible;
      
      // Toggle precision control
      if (precisionControl) {
        precisionControl.style.display = areHeaderControlsVisible ? 'block' : 'none';
      }
      
      // Toggle angle mode selector if in section 2
      if (angleModeSidebar) {
        const isSection2 = !document.getElementById('section1')?.classList.contains('active');
        if (isSection2) {
          angleModeSidebar.style.display = areHeaderControlsVisible ? 'block' : 'none';
        }
      }
      
      headerControls.textContent = areHeaderControlsVisible ? '◀' : '▶';
    });
  }
  
  // Make panel draggable
  makeDraggable(panel, header);
}

/**
 * Make an element draggable by a handle
 * @param {HTMLElement} element - Element to drag
 * @param {HTMLElement} handle - Drag handle element
 */
function makeDraggable(element, handle) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    handle.style.cursor = 'grabbing';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    element.style.left = (e.clientX - offsetX) + 'px';
    element.style.top = (e.clientY - offsetY) + 'px';
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
    handle.style.cursor = 'grab';
  });
}

// Initialize panel UI
document.addEventListener('DOMContentLoaded', initUI);

// ============================================================================
// ANGLE MODE CALCULATIONS
// ============================================================================

/**
 * Calculate angle based on selected mode
 * @param {{x: number, y: number}} u - First vector
 * @param {{x: number, y: number}} v - Second vector
 * @returns {{rau: number, signedDeg: number, unsignedDeg: number, ccw: boolean}}
 */
function calculateAngleMode(u, v) {
  const uiState = getUIState();
  const section2 = AppState.section2;
  
  let p = atanVec(u, v);
  const ccwDirection = section2.ccw;
  const angleBetweenDeg = section2.angleBetweenDeg;
  
  // Bias mode: always going ccw/cw from u
  if (uiState.biasMode) {
    return {
      rau: p,
      signedDeg: -Math.abs(angleBetweenDeg),
      unsignedDeg: Math.abs(angleBetweenDeg),
      ccw: false
    };
  }
  
  // Default mode: standard angle measurement
  if (uiState.defaultMode) {
    p = ccwDirection ? 4 - p : p;
    return {
      rau: p,
      signedDeg: angleBetweenDeg * (ccwDirection ? 1 : -1),
      unsignedDeg: Math.abs(angleBetweenDeg),
      ccw: ccwDirection
    };
  }
  
  // Wrap mode: complement angle
  if (uiState.angleWrapMode) {
    p = ccwDirection ? p : 4 - p;
    const wrapped = 360 - Math.abs(angleBetweenDeg);
    return {
      rau: p,
      signedDeg: (ccwDirection || angleBetweenDeg === 0) ? -wrapped : wrapped,
      unsignedDeg: Math.min(Math.abs(angleBetweenDeg), wrapped),
      ccw: (ccwDirection || angleBetweenDeg === 0) ? false : true
    };
  }
  
  // Fallback
  return {
    rau: p,
    signedDeg: angleBetweenDeg,
    unsignedDeg: Math.abs(angleBetweenDeg),
    ccw: ccwDirection
  };
}

// ============================================================================
// RESULTS DISPLAY
// ============================================================================

/**
 * Update results display based on current section
 */
function updateResultsDisplay() {
  const results = document.getElementById('resultsContent');
  if (!results) return;
  
  const section1 = document.getElementById('section1');
  const isSection1 = section1?.classList.contains('active');
  
  if (isSection1) {
    displaySection1Results(results);
  } else {
    displaySection2Results(results);
  }
}

/**
 * Display results for Section 1 (Simple RAU)
 * @param {HTMLElement} resultsElement - Results container
 */
function displaySection1Results(resultsElement) {
  const phase = AppState.section1.phase;
  
  const rs = radicalSine(phase);
  const rc = radicalCosine(phase);
  const rt = radicalTan(phase);
  const radian = rauToRad(phase);
  const degrees = radian * (180 / Math.PI);
  
  const tanDisplay = Math.abs(rt) > 1e6 ? 'undefined' : formatValue(rt);
  
  resultsElement.textContent = 
`RAU Phase = ${formatValue(phase)}
Radian = ${formatValue(radian)} (${degrees.toFixed(5)}°)
_______________________________
tan(θ) = ${tanDisplay}
sin(θ) = ${formatValue(rs)}
cos(θ) = ${formatValue(rc)}`;
}

/**
 * Display results for Section 2 (Vector comparison)
 * @param {HTMLElement} resultsElement - Results container
 */
function displaySection2Results(resultsElement) {
  const angleMode = Controls.angleMode.value;
  
  if (angleMode === 'between') {
    displayBetweenMode(resultsElement);
  } else {
    displayIndividualMode(resultsElement);
  }
}

/**
 * Display angle between two vectors
 * @param {HTMLElement} resultsElement - Results container
 */
function displayBetweenMode(resultsElement) {
  const u = AppState.section2.u;
  const v = AppState.section2.v;
  
  const uMag = Math.hypot(u.x, u.y);
  const vMag = Math.hypot(v.x, v.y);
  const cross = u.x * v.y - u.y * v.x;
  const dot = u.x * v.x + u.y * v.y;
  
  const angleData = calculateAngleMode(u, v);
  
  const rs = radicalSine(angleData.rau);
  const rc = radicalCosine(angleData.rau);
  const rt = radicalTan(angleData.rau);
  const rad = rauToRad(angleData.rau);
  
  const tanDisplay = Math.abs(rt) > 1e6 ? 'undefined' : formatValue(rt);
  const fmt = (n) => n.toFixed(2).padStart(8);
  
  resultsElement.textContent = 
`Vector u = (${fmt(u.x)}, ${fmt(u.y)})
  |u| = ${fmt(uMag)}
Vector v = (${fmt(v.x)}, ${fmt(v.y)})
  |v| = ${fmt(vMag)}
Dot product = ${fmt(dot)}
Cross product = ${fmt(cross)}
_______________________________
Signed angle (u→v) = ${formatValue(angleData.signedDeg, 1)}° ${angleData.ccw ? '(CCW)' : '(CW)'}
Angle between = ${formatValue(Math.abs(angleData.signedDeg) > Math.abs(angleData.unsignedDeg) ? 360-angleData.unsignedDeg : angleData.unsignedDeg, 1)}°
_______________________________
RAU Phase = ${formatValue(angleData.rau)}
Radian = ${formatValue(rad)}
_______________________________
tan(θ) = ${tanDisplay}
sin(θ) = ${formatValue(rs)}
cos(θ) = ${formatValue(rc)}`;
}

/**
 * Display individual vector angles
 * @param {HTMLElement} resultsElement - Results container
 */
function displayIndividualMode(resultsElement) {
  const u = AppState.section2.u;
  const v = AppState.section2.v;
  
  const uMag = Math.hypot(u.x, u.y);
  const vMag = Math.hypot(v.x, v.y);
  const cross = u.x * v.y - u.y * v.x;
  const dot = u.x * v.x + u.y * v.y;
  
  const refVec = { x: 1, y: 0 };
  
  const uPhase = atanVec(u, refVec);
  const vPhase = atanVec(v, refVec);
  
  const uSin = radicalSine(uPhase);
  const uCos = radicalCosine(uPhase);
  const vSin = radicalSine(vPhase);
  const vCos = radicalCosine(vPhase);
  
  const uAngle = AppState.section2.uAngle;
  const vAngle = AppState.section2.vAngle;
  
  const fmt = (n) => n.toFixed(2).padStart(8);
  
  resultsElement.textContent = 
`Vector u:
  Components = (${fmt(u.x)}, ${fmt(u.y)})
  Magnitude = ${fmt(uMag)}
  _______________________________
  Angle from +x = ${uAngle}° (CCW)
  RAU Phase = ${formatValue(uPhase)}
  _______________________________
  rsin(u) = ${formatValue(uSin)}
  rcos(u) = ${formatValue(uCos)}

Vector v:
  Components = (${fmt(v.x)}, ${fmt(v.y)})
  Magnitude = ${fmt(vMag)}
  _______________________________
  Angle from +x = ${vAngle}° (CCW)
  RAU Phase = ${formatValue(vPhase)}
  _______________________________
  rsin(v) = ${formatValue(vSin)}
  rcos(v) = ${formatValue(vCos)}

Dot product = ${fmt(dot)}
Cross product = ${fmt(cross)}`;
}

// Make function globally available
window.updateResultsDisplay = updateResultsDisplay;
