'use strict';
var gCtx;
var gElCanvas;

function initCanvas() {
  getCanvas();
}

function createMeme(img) {
  hidePages();
  resizeCanvas(img);
  gCtx.drawImage(img, 0, 0, img.width, img.height);
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
  gElCanvas.width = img.width;
  gElCanvas.height = img.height;
}
