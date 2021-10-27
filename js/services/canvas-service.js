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
  if (text === '') text = meme.lines[meme.selectedLineIdx].txt;
  else meme.lines[meme.selectedLineIdx].txt = text;
  meme.lines.forEach((entry) => {
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = entry.color;
    gCtx.textAlign = entry.align;
    gCtx.font = `${entry.size}px meme-font`;
    gCtx.fillText(entry.txt.toUpperCase(), entry.pos.x, entry.pos.y);
    gCtx.strokeText(entry.txt.toUpperCase(), entry.pos.x, entry.pos.y);
  });
}

function moveText(value) {
  var meme = getMeme();
  meme = meme.lines[meme.selectedLineIdx];
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
  meme = meme.lines[meme.selectedLineIdx];
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
function addLine() {
  var meme = getMeme();
  var pos = getCanvasPos();
  var counter = lineCounter(meme);
  if (counter === 1)
    meme.lines[counter] = {
      txt: 'I always consume Falafel',
      size: 40,
      align: 'center',
      color: 'white',
      pos: { x: pos.x / 2, y: pos.y - 60 },
    };
  else
    meme.lines[counter] = {
      txt: 'I consume dog',
      size: 40,
      align: 'center',
      color: 'white',
      pos: { x: pos.x / 2, y: pos.y / 2 },
    };
  switchLines();
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function switchLines() {
  var meme = getMeme();
  var counter = lineCounter(meme);
  if (counter - meme.selectedLineIdx - 1 === 0) meme.selectedLineIdx = 0;
  else meme.selectedLineIdx++;
  inputText();
  drawText();
}

function lineCounter(meme) {
  var counter = 0;
  meme.lines.forEach((line) => {
    counter++;
  });
  return counter;
}

function setColor(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].color = value;
  drawText();
}
