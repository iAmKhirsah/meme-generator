'use strict';

function drawMeme() {
  clearCanvas();
  var meme = getMeme();
  drawMemeImg(meme.selectedImgId);
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
  meme.selectedLineIdx++;
  inputText();
  drawText();
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}
/// *** TODO ALL THE BELOW *** ///
/// TO FIND INDEX IN getRectPos SINCE ITS ALL UNDEFINED ///
function switchLines() {
  var meme = getMeme();
  var counter = lineCounter(meme);
  console.log('counter', counter);
  if (counter - meme.selectedLineIdx - 1 === 0) meme.selectedLineIdx = 0;
  else meme.selectedLineIdx++;
  inputText();
  drawText();
  var rectPos = getRectPos(meme, meme.selectedLineIdx);
  isTextClicked(rectPos);
}

function lineCounter(meme) {
  var counter = 0;
  meme.lines.forEach(function () {
    counter++;
    console.log('for each', counter);
  });
  return counter;
}

function setColor(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].color = value;
  drawText();
}

function isTextClicked(clickedPos) {
  var memes = getMeme();
  var rectPos = getRectPos(memes);
  console.log('rectPos', rectPos);
  var clickedIdx;
  rectPos.forEach((pos) => {
    if (
      clickedPos.x >= pos.posXstart &&
      // clickedPos.x <= pos.posXend &&
      clickedPos.y >= pos.posYstart
    )
      clickedIdx = pos.idx;
  });
  if (clickedIdx) {
    renderClickedText(
      rectPos[clickedIdx].posXstart,
      rectPos[clickedIdx].posXend,
      rectPos[clickedIdx].posYstart,
      rectPos[clickedIdx].posYend
    );
  }
}

function getRectPos(memes, idx) {
  console.log(idx);
  var ctx = getElCtx();
  var rectPos = [];
  var lmao = memes.lines.forEach((meme, memeIdx) => {
    var txtSize = ctx.measureText(meme.txt).width;
    console.log('meme idx', memeIdx);
    var size = meme.size;
    if (idx === memeIdx) {
      console.log('hello if');
      return {
        posXstart: posX - txtSize / 2 - 30,
        posYstart: posY - size,
        posXend: txtSize + 60,
        posYend: size + 10,
      };
    } else if (!idx) {
      console.log('hello else');
      var posX = meme.pos.x;
      var posY = meme.pos.y;
      var posXstart = posX - txtSize / 2 - 30;
      var posYstart = posY - size;
      var posXend = txtSize + 60;
      var posYend = size + 10;
      rectPos.push({ posXstart, posYstart, posXend, posYend, memeIdx });
      return rectPos;
    }
  });
  return lmao;
}
