
// -UI Controls-

// Control element references
const controls = {
    uLength: document.getElementById('uLength'),
    uAngle: document.getElementById('uAngle'),
    vLength: document.getElementById('vLength'),
    vAngle: document.getElementById('vAngle'),
    angleMode: document.getElementById('angleMode'),
    simpleSliderParam: document.getElementById('paramSlider'),
    introPhaseTextBox: document.getElementById('paramValue')
};

// Slider/Textbox

function syncSliderToTextbox(slider, textbox, callback) {
    slider.addEventListener('input', () => {
        textbox.value = slider.value;
        if (callback) callback(parseFloat(slider.value));
    });
}

function syncTextboxToSlider(textbox, slider, callback) {
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

// Setup bidirectional sync
syncSliderToTextbox(controls.simpleSliderParam, controls.introPhaseTextBox, updateResultsDisplay);
syncTextboxToSlider(controls.introPhaseTextBox, controls.simpleSliderParam, (val) => {
    introPhase = val;
    updateResultsDisplay();
});


// -Panel-
function initUI() {
    const panel = document.getElementById('formulaPanel');
    const header = document.getElementById('formulaHeader');
    const chev = document.getElementById('formulaChevron');
    const headCtrls = document.getElementById('toggleHeaderControls');
    const hdrAngMode = document.getElementById('angleModeSidebar');
    const hdrprecContrl = document.getElementById('precisionControl');

    if (!panel || !header || !chev) return;
    
    let isSlim = false;
	 let isCollapsed = false;
	 
    // Toggle panel collapse
    chev.addEventListener('click', () => {
        isSlim = !isSlim;
        panel.classList.toggle('slim', isSlim);
        chev.textContent = isSlim ? '▶' : '◀';
        
        // Re-render MathJax when expanding
        if (!isSlim && window.MathJax) {
            MathJax.typesetPromise().catch(console.error);
        }
    });
    
	 // Toggle header collapse
    headCtrls.addEventListener('click', () => {
		isCollapsed = hdrprecContrl || (hdrprecContrl && !hdrAngMode) ? !isCollapsed : isCollapsed;

			if (hdrprecContrl.style.display === "none") {
			    hdrprecContrl.style.display = "block";
			} else {
			    hdrprecContrl.style.display = "none";
			}

		if (hdrAngMode && !document.getElementById('section1')?.classList.contains('active')) {
			if (hdrAngMode.style.display === "none") {
			    hdrAngMode.style.display = "block";
			} else {
			    hdrAngMode.style.display = "none";
			}
		}
		headCtrls.textContent = isCollapsed ? '▶' : '◀';
    });
    
    // Draggable panel
    makeDraggable(panel, header);
}

function makeDraggable(element, handle) {
    let isDragging = false;
    let offsetX, offsetY;

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

// Angle Mode Calculation
function calculateAngleMode(u, v, angleWrapMode, biasMode, defaultMode) {
    let p = atanVec(u, v);
    let ccwDirection = ccw;
    
    if (biasMode) {
        // Bias mode: always going ccw/cw from u (for now)
        return {
            rau: p,
            signedDeg: -Math.abs(anglebetweenDeg),
            unsignedDeg: Math.abs(anglebetweenDeg),
            ccw: true
        };
    }
    
    if (defaultMode) {
        // Default mode: standard angle measurement
        p = ccwDirection ? 4 - p : p;
        return {
            rau: p,
            signedDeg: anglebetweenDeg * (ccwDirection ? 1 : -1),
            unsignedDeg: Math.abs(anglebetweenDeg),
            ccw: ccwDirection
        };
    }
    
    if (angleWrapMode) {
        // Wrap mode(inverse of default): complement angle
        p = ccwDirection ? p : 4 - p;
        const wrapped = 360 - Math.abs(anglebetweenDeg);
        return {
            rau: p,
            signedDeg: ccwDirection ? -wrapped : wrapped,
            unsignedDeg: Math.min(Math.abs(anglebetweenDeg), wrapped),
            ccw: ccwDirection ? false : true
        };
    }
    
    // Fallback
    return {
        rau: p,
        signedDeg: anglebetweenDeg,
        unsignedDeg: Math.abs(anglebetweenDeg),
        ccw: ccwDirection
    };
}

// Results Display
function updateResultsDisplay() {
    const results = document.getElementById('resultsContent');
    const s1 = document.getElementById('section1');
    const isS1 = s1?.classList.contains('active');

    if (isS1) {
        displaySection1Results(results);
    } else {
        displaySection2Results(results);
    }
}

function displaySection1Results(results) {
    const p = parseFloat(controls.introPhaseTextBox.value);
    const rs = radicalSine(p);
    const rc = radicalCosine(p);
    const rt = radicalTan(p);
    const radian = rauToRad(p);
    const degrees = radian * (180 / Math.PI);

    results.textContent = `RAU Phase = ${formatValue(p, 6)}
Radian = ${formatValue(radian)} (${degrees.toFixed(3)}°)
_______________________________
tan(θ) = ${Math.abs(rt) > 1e6 ? 'undefined' : formatValue(rt)}
sin(θ) = ${formatValue(rs)}
cos(θ) = ${formatValue(rc)}`;
}

function displaySection2Results(results) {
    const mode = controls.angleMode.value;
    const u = currentU;
    const v = currentV;
    
    const uMag = Math.hypot(u.x, u.y);
    const vMag = Math.hypot(v.x, v.y);
    const cross = u.x * v.y - u.y * v.x;
    const dot = u.x * v.x + u.y * v.y;
    
    const fmt = (n, w = 8, d = 2) => n.toFixed(d).padStart(w);

    if (mode === 'between') {
        displayBetweenMode(results, u, v, uMag, vMag, cross, dot, fmt);
    } else {
        displayIndividualMode(results, u, v, uMag, vMag, cross, dot, fmt);
    }
}

function displayBetweenMode(results, u, v, uMag, vMag, cross, dot, fmt) {
    const angleData = calculateAngleMode(u, v, angleWrapMode, biasMode, defaultMode);
    
    const rs = radicalSine(angleData.rau);
    const rc = radicalCosine(angleData.rau);
    const rt = radicalTan(angleData.rau);
    const rad = rauToRad(angleData.rau);

    results.textContent = `Vector u = (${fmt(u.x)}, ${fmt(u.y)})
  |u| = ${fmt(uMag)}
Vector v = (${fmt(v.x)}, ${fmt(v.y)})
  |v| = ${fmt(vMag)}
Dot product = ${fmt(dot)}
Cross product = ${fmt(cross)}
_______________________________
Signed angle (u→v) = ${formatValue(angleData.signedDeg, 1)}° ${angleData.ccw ? '(CCW)' : '(CW)'}
Angle between = ${formatValue(angleData.unsignedDeg, 1)}°
_______________________________
RAU Phase = ${formatValue(angleData.rau)}
Radian = ${formatValue(rad)}
_______________________________
tan(θ) = ${Math.abs(rt) > 1e6 ? 'undefined' : formatValue(rt)}
sin(θ) = ${formatValue(rs)}
cos(θ) = ${formatValue(rc)}`;
}

function displayIndividualMode(results, u, v, uMag, vMag, cross, dot, fmt) {
    const refvec = { x: 1, y: 0 };
    
    const uP = atanVec(u, refvec);
    const vP = atanVec(v, refvec);
    
    const uS = radicalSine(uP);
    const uC = radicalCosine(uP);
    const vS = radicalSine(vP);
    const vC = radicalCosine(vP);

    results.textContent = `Vector u:
  Components = (${fmt(u.x)}, ${fmt(u.y)})
  Magnitude = ${fmt(uMag)}
  _______________________________
  Angle from +x = ${uAng}° (CCW)
  RAU Phase = ${formatValue(uP)}
  _______________________________
  rsin(u) = ${formatValue(uS)}
  rcos(u) = ${formatValue(uC)}

Vector v:
  Components = (${fmt(v.x)}, ${fmt(v.y)})
  Magnitude = ${fmt(vMag)}
  _______________________________
  Angle from +x = ${vAng}° (CCW)
  RAU Phase = ${formatValue(vP)}
  _______________________________
  rsin(v) = ${formatValue(vS)}
  rcos(v) = ${formatValue(vC)}

Dot product = ${fmt(dot)}
Cross product = ${fmt(cross)}`;
}

// Utility: Format number with padding
function formatValue(value, precision = displayPrecision) {
    if (typeof value !== 'number' || !isFinite(value)) return '—';
    return value.toFixed(precision);
}
 
// // Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initUI();
});
