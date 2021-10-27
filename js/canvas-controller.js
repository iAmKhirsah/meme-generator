'use strict';
var gCtx;
var gElCanvas;

function initCanvas() {
  getCanvas();
}

function createMeme(img) {
  hidePages();
  resizeCanvas(img);
  currMeme(img);
  inputText();
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function hidePages() {
  var generator = document.querySelector('.meme-generator');
  var gallery = document.querySelector('.grid-container');
  gallery.classList.toggle('hidden');
  generator.classList.toggle('hidden');
}

function getCanvas() {
  gElCanvas = document.querySelector('#my-canvas');
  gCtx = gElCanvas.getContext('2d');
}

function resizeCanvas(img) {
  gElCanvas.height = (img.height * gElCanvas.width) / img.width;
}

function inputText() {
  var meme = getMeme();

  var input = document.querySelector('.input');
  input.value = meme.lines[meme.selectedLineIdx].txt;
}

function getCanvasPos() {
  var pos = { x: gElCanvas.width, y: gElCanvas.height };
  return pos;
}
