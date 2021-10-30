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
  var ctx = getElCtx();
  var elCanvas = getElCanvas();
  hidePages();
  setImg(img);
  currMeme(img);
  aspectRatio();
  inputText();
  ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
}
function drawMeme(meme) {
  clearCanvas();
  drawMemeImg();
  drawText(meme);
  setMeme(meme);
}
function drawMemeImg() {
  var ctx = getElCtx();
  var elCanvas = getElCanvas();
  var img = getImg();
  ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
}
function drawText(meme) {
  var ctx = getElCtx();
  ctx.lineWidth = 2;
  meme.lines.forEach((entry) => {
    ctx.strokeStyle = entry.strokeColor;
    ctx.fillStyle = entry.color;
    ctx.textAlign = entry.align;
    ctx.font = `${entry.size}px ${entry.font}`;
    ctx.fillText(entry.txt.toUpperCase(), entry.pos.x, entry.pos.y);
    ctx.strokeText(entry.txt.toUpperCase(), entry.pos.x, entry.pos.y);
  });
  setMeme(meme);
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

// function addTouchListeners() {
//   var canvas = getElCanvas();
//   canvas.addEventListener('touchmove', onMove);
//   canvas.addEventListener('touchstart', onDown);
//   canvas.addEventListener('touchend', onUp);
// }

function aspectRatio() {
  var elContainer = document.querySelector('.canvas-container');
  var meme = getMeme();
  var img = getImg();
  var elCanvas = getElCanvas();
  elCanvas.width = elContainer.offsetWidth - 5;
  elCanvas.height = (img.height * elCanvas.width) / img.width;
  drawMeme(meme);
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

function changeText(value) {
  var meme = getMeme();
  if (meme.lines.length === 0) {
    addLine();
  }
  meme.lines[meme.selectedLineIdx].txt = value;
  drawMeme(meme);
}
// function onDown(ev) {
//   const pos = getEvPos(ev);
//   if (!isTextClicked(pos)) return;
//   setCircleDrag(true);
//   gStartPos = pos;
//   document.body.style.cursor = 'grabbing';
// }
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

function setImg(img) {
  gImg = img;
}
function getImg() {
  return gImg;
}

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
  var elCanvas = getElCanvas();
  var pos = { x: elCanvas.width, y: elCanvas.height };
  return pos;
}
function renderClickedText(posXstart, posXend, posYstart, posYend) {
  var ctx = getElCtx();
  ctx.strokeStyle = 'black';
  ctx.strokeRect(posXstart, posYstart, posXend, posYend);
}

function clearCanvas() {
  var elCanvas = getElCanvas();
  var ctx = getElCtx();
  ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
}

function onImgInput(ev) {
  loadImageFromInput(ev, createMeme);
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
    gImg = img;
  };
  reader.readAsDataURL(ev.target.files[0]);
}
