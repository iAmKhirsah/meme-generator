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
  var meme = getMeme();
  gCtx.lineWidth = 2;
  meme = meme.lines[0];
  if (text === '') text = meme.txt;
  else meme.txt = text;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = 'white';
  gCtx.textAlign = meme.align;
  gCtx.font = `${meme.size}px meme-font`;
  gCtx.fillText(meme.txt.toUpperCase(), meme.pos.x, meme.pos.y);
  gCtx.strokeText(meme.txt.toUpperCase(), meme.pos.x, meme.pos.y);
}

function moveText(value) {
  var meme = getMeme();
  meme = meme.lines[0];
  var increment = 10;
  switch (value) {
    case 'up':
      meme.pos.y -= increment;
      break;
    case 'down':
      meme.pos.y += increment;
      break;
    case 'left':
      meme.pos.x -= increment;
      break;
    case 'right':
      meme.pos.x += increment;
  }
  drawText();
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
