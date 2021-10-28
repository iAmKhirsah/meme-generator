'use strict';
var gCtx;
var gElCanvas;
var gImg;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function initCanvas() {
  getCanvas();
  addMouseListeners();
  // addTouchListeners();
}

function createMeme(img) {
  hidePages();
  setImg(img);
  currMeme(img);
  aspectRatio();
  inputText();
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}
function addMouseListeners() {
  var canvas = getElCanvas();
  // canvas.addEventListener('mousemove', onMove);
  window.addEventListener('resize', () => {
    aspectRatio();
  });
  // canvas.addEventListener('mousedown', onDown);
  // canvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  var canvas = getElCanvas();
  canvas.addEventListener('touchmove', onMove);
  canvas.addEventListener('touchstart', onDown);
  canvas.addEventListener('touchend', onUp);
}

function getCanvas() {
  gElCanvas = document.querySelector('#my-canvas');
  gCtx = gElCanvas.getContext('2d');
}
function getElCtx() {
  return gCtx;
}
function getElCanvas() {
  return gElCanvas;
}
function aspectRatio() {
  var elContainer = document.querySelector('.canvas-container');
  var img = getImg();
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = (img.height * gElCanvas.width) / img.width;
  drawMeme();
}

function setImg(img) {
  gImg = img;
}
function getImg() {
  return gImg;
}

function inputText() {
  var meme = getMeme();
  if (meme.lines.length === 0) {
    addLine();
    return;
  }
  var input = document.querySelector('.input');
  input.value = meme.lines[meme.selectedLineIdx].txt;
}
function drawMemeImg() {
  var img = getImg();
  // var img = document.getElementById(`${id}`);
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function changeText(value) {
  var meme = getMeme();
  if (meme.lines.length === 0) {
    addLine();
  }
  meme.lines[meme.selectedLineIdx].txt = value;
  drawMeme();
}

function drawText() {
  var meme = getMeme();
  gCtx.lineWidth = 2;
  meme.lines.forEach((entry) => {
    gCtx.strokeStyle = entry.strokeColor;
    gCtx.fillStyle = entry.color;
    gCtx.textAlign = entry.align;
    gCtx.font = `${entry.size}px ${entry.font}`;
    gCtx.fillText(entry.txt.toUpperCase(), entry.pos.x, entry.pos.y);
    gCtx.strokeText(entry.txt.toUpperCase(), entry.pos.x, entry.pos.y);
  });
}

// function onDown(ev) {
//   const pos = getEvPos(ev);
//   if (!isTextClicked(pos)) return;
//   setCircleDrag(true);
//   gStartPos = pos;
//   document.body.style.cursor = 'grabbing';
// }

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function getCanvasPos() {
  var pos = { x: gElCanvas.width, y: gElCanvas.height };
  return pos;
}
function renderClickedText(posXstart, posXend, posYstart, posYend) {
  gCtx.strokeStyle = 'black';
  gCtx.strokeRect(posXstart, posYstart, posXend, posYend);
}

function downloadMeme(elLink) {
  var imgContent = gElCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}
