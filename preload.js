// ============================================
window.MathJax = {
  tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
  svg: { fontCache: 'global' }
};

// Global Utilities
// ============================================
function changeFontSize(changeAmount, id_name) {
  let element = document.getElementById(id_name);
  if (element) {
    let currentSize = parseInt(element.style.fontSize) || 13;
    let newSize = currentSize + changeAmount;
    if (newSize < 8) newSize = 8;
    element.style.fontSize = newSize + 'px';
  }
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

}
function toggleMathBlock() {
  const mathBlock = document.getElementById('mathBlock');
  if (mathBlock.classList.contains('collapsed')) {
    mathBlock.classList.remove('collapsed');
    mathBlock.style.maxHeight = mathBlock.scrollHeight + 'px';
  } else {
    mathBlock.style.maxHeight = '0';
    mathBlock.classList.add('collapsed');
  }
}
