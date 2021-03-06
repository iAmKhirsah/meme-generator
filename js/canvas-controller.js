'use strict';
var gCtx;
var gElCanvas;
var gImg;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function initCanvas() {
  getCanvas();
  addMouseListeners();
  addTouchListeners();
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
function drawMeme(meme, deSelect = false) {
  clearCanvas();
  drawMemeImg();
  drawText(meme);
  renderSelectedLine(deSelect);
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
    ctx.setLineDash([0, 0]);
    ctx.font = `${entry.size}px ${entry.font}`;
    ctx.fillText(entry.txt.toUpperCase(), entry.pos.x, entry.pos.y);
    ctx.strokeText(entry.txt.toUpperCase(), entry.pos.x, entry.pos.y);
  });
  setMeme(meme);
}
function renderSelectedLine(deSelect) {
  var meme = getMeme();
  if (meme.selectedLineIdx <= meme.lines.length) {
    isTextClicked(meme.lines[meme.selectedLineIdx].pos, deSelect);
  }
}
function addMouseListeners() {
  var canvas = getElCanvas();
  window.addEventListener('resize', () => {
    aspectRatio();
  });
  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  var canvas = getElCanvas();
  canvas.addEventListener('touchmove', onMove);
  canvas.addEventListener('touchstart', onDown);
  canvas.addEventListener('touchend', onUp);
}

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
function onDown(ev) {
  const pos = getEvPos(ev);
  if (isTextClicked(pos)) {
    isDrag(true);
  }
}
function onMove(ev) {
  var meme = getMeme();
  if (meme.lines[meme.selectedLineIdx].isDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - meme.lines[meme.selectedLineIdx].pos.x;
    const dy = pos.y - meme.lines[meme.selectedLineIdx].pos.y;
    dragText(dx, dy);
    var newMeme = getMeme();
    drawMeme(newMeme);
  }
}
function onUp() {
  isDrag(false);
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
  ctx.setLineDash([5, 5]);
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
