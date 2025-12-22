// Shared global variables
let currentPhaseSection1 = 0;
let currentPhaseSection2 = 0;
let currentU = { x: 120, y: 0 };
let currentV = { x: 100, y: 0 };
let anglebetweenDeg = 0;
let uAng = 0;
let vAng = 0;
let ccw = false;
let displayPrecision = 6; // Default to 5 decimal places
let maxDigitsofPrecision = 15;
let angleWrapMode;
let biasMode;
let defaultMode = true;
let introPhase = 0;
document.getElementById("wrappedAngle").checked = angleWrapMode;
document.getElementById("biasAngle").checked = biasMode;
document.getElementById("defaultAngle").checked = defaultMode;
document.addEventListener('DOMContentLoaded', () => {
  initRAUCanvas();
  initVectorCanvas();

  const toggleBtn = document.getElementById('toggleButton');
  const themeBtn = document.getElementById('themeToggle');
  const s1 = document.getElementById('section1');
  const s2 = document.getElementById('section2');
  if (s1) {
      s1.classList.add("active");
  }
  // --- Load saved theme ---
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = 'Light';
  }

  // --- Theme toggle ---
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const dark = document.body.classList.contains('dark-mode');
    themeBtn.textContent = dark ? 'Light' : 'Dark';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });

  // --- Section toggle ---
  toggleBtn.addEventListener('click', () => {
    const showing1 = s1.classList.contains('active');
    s1.classList.toggle('active', !showing1);
    s2.classList.toggle('active', showing1);
    
  // Show/hide angleMode selector based on section
  document.getElementById('angleModeSidebar').style.display = showing1 ? 'block' : 'none';
  updateResultsDisplay();
  
  toggleBtn.textContent = showing1
    ? 'Switch to Introduction'
    : 'Switch to Vector Diagram';
  });

  wrappedAngle.addEventListener("change", function() {
  	if (this.checked) {
  		angleWrapMode = true;
  	} else {
  		angleWrapMode = false;
  	}
  	initVectorCanvas();
  });
  biasAngle.addEventListener("change", function() {
  	if (this.checked) {
  		biasMode = true;
  	} else {
  		biasMode = false;
  	}
  	initVectorCanvas();
  });
  defaultAngle.addEventListener("change", function() {
  	if (this.checked) {
  		defaultMode = true;
  	} else {
  		defaultMode = false;
  	}
  	initVectorCanvas();
  });
});

// Precision Control
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
    input.min = '0';
    input.max = maxDigitsofPrecision.toString();
    input.value = displayPrecision.toString();
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
    display.textContent = formatValue(Math.PI, displayPrecision);

    // Update precision on input
    input.addEventListener('input', (e) => {
        const precision = parseInt(e.target.value) || 0;
        setPrecision(precision);
        display.textContent = formatValue(Math.PI, precision);
    });

    label.appendChild(input);
    label.appendChild(display);
    container.appendChild(label);

    return container;
}

function changeFontSize(changeAmount, id) {
    let el = document.getElementById(id);
    if (el) {
        let size = parseInt(el.style.fontSize) || 13;
        size += changeAmount;
        if (size < 8) size = 8;
        el.style.fontSize = size + 'px';
    }
}

function setPrecision(digits) {
  displayPrecision = Math.max(0, Math.min(maxDigitsofPrecision, digits));
  updateResultsDisplay();
}

function formatValue(value, precision = displayPrecision) {
  if (typeof value !== 'number' || !isFinite(value)) return '—';
  return value.toFixed(precision);
}

// ================================
// Initialize precision control in sidebar
// ================================
function initPrecisionControl() {
  const formulaBody = document.getElementById('formulaBody');
  if (!formulaBody) return;
  
  formulaBody.insertBefore(createPrecisionControl(), formulaBody.firstChild);
}

// Call this after DOM is ready
document.addEventListener('DOMContentLoaded', initPrecisionControl);
