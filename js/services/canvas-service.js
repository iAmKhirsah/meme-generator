'use strict';

function drawMeme() {
  clearCanvas();
  var meme = getMeme();
  drawMemeImg(meme.selectedImgId);
}

function drawMemeImg(id) {
  var img = document.getElementById(`${id}`);
  gCtx.drawImage(img, 0, 0, img.width, img.height);
}

function drawText(text = '') {
  drawMeme();
  var pos = getCanvasPos();
  var meme = getMeme();
  gCtx.lineWidth = 2;
  meme = meme.lines[0];
  if (text === '') text = meme.txt;
  else meme.txt = text;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = 'white';
  gCtx.font = `${meme.size}px meme-font`;
  gCtx.fillText(meme.txt.toUpperCase(), pos.x / 2, 50);
  gCtx.strokeText(meme.txt.toUpperCase(), pos.x / 2, 50);
}

function fontSizeChange(value) {
  var meme = getMeme();
  var increment = 5;
  meme = meme.lines[0];
  if (value === '+') {
    meme.size += increment;
  }
  if (value === '-') {
    meme.size -= increment;
  }
  if (meme.size < 5) {
    meme.size = 5;
  }
  drawText();
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}
