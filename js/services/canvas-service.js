'use strict';
var gMeme;

function moveText(value) {
  var meme = getMeme();
  var increment = 10;
  switch (value) {
    case 'up':
      meme.lines[meme.selectedLineIdx].pos.y -= increment;
      break;
    case 'down':
      meme.lines[meme.selectedLineIdx].pos.y += increment;
      break;
    case 'left':
      meme.lines[meme.selectedLineIdx].pos.x -= increment;
      break;
    case 'right':
      meme.lines[meme.selectedLineIdx].pos.x += increment;
  }
  drawMeme(meme);
}

function fontSizeChange(value) {
  var meme = getMeme();
  var increment = 10;
  if (value === '+') {
    meme.lines[meme.selectedLineIdx].size += increment;
  }
  if (value === '-') {
    meme.lines[meme.selectedLineIdx].size -= increment;
  }
  if (meme.lines[meme.selectedLineIdx].size <= 10) {
    meme.lines[meme.selectedLineIdx].size = 10;
  }
  drawMeme(meme);
}
function addLine() {
  var meme = getMeme();
  var pos = getCanvasPos();
  if (meme.lines.length === 0) {
    meme.lines[meme.lines.length] = {
      txt: '',
      size: 40,
      align: 'center',
      color: 'white',
      strokeColor: 'black',
      font: 'Impact',
      pos: { x: pos.x / 2, y: pos.y + 60 },
      isDrag: false,
    };
  }
  if (meme.lines.length === 1)
    meme.lines[meme.lines.length] = {
      txt: '',
      size: 40,
      align: 'center',
      color: 'white',
      strokeColor: 'black',
      font: 'Impact',
      pos: { x: pos.x / 2, y: pos.y - 60 },
      isDrag: false,
    };
  else
    meme.lines[meme.lines.length] = {
      txt: '',
      size: 40,
      align: 'center',
      color: 'white',
      strokeColor: 'black',
      font: 'Impact',
      pos: { x: pos.x / 2, y: pos.y / 2 },
      isDrag: false,
    };
  console.log(pos);
  drawText(meme);
  switchLines();
}

function switchLines() {
  var meme = getMeme();
  if (meme.lines.length - 1 === meme.selectedLineIdx) meme.selectedLineIdx = 0;
  else meme.selectedLineIdx++;
  drawMeme(meme);
  inputText();
}
function deleteLine() {
  var meme = getMeme();
  meme.lines.splice(meme.selectedLineIdx, 1);
  if (meme.lines.length > 0) {
    meme.selectedLineIdx = 0;
    drawMeme(meme);
  } else {
    drawMeme(meme);
  }
}

function currMeme(img) {
  var pos = getCanvasPos();
  var meme = {
    selectedImgId: img.id,
    selectedLineIdx: 0,
    lines: [
      {
        txt: '',
        size: 40,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        font: 'Impact',
        pos: { x: pos.x / 2, y: 60 },
        isDrag: false,
      },
    ],
  };
  setMeme(meme);
}
function saveMeme() {
  drawMeme(getMeme(), true);
  var savedMemes = [];
  var memeImg = getElCanvas().toDataURL();
  if (loadFromStorage('savedMemes')) savedMemes = loadFromStorage('savedMemes');
  savedMemes.push(memeImg);
  saveToStorage('savedMemes', savedMemes);
}

function setColor(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].color = value;
  drawMeme(meme);
}
function setStrokeColor(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].strokeColor = value;
  drawMeme(meme);
}
function setTextAlignment(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].align = value;
  drawMeme(meme);
}
function changeFont(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].font = value;
  drawMeme(meme);
}
function setMeme(meme) {
  saveToStorage('memes', meme);
}
function getMeme() {
  return loadFromStorage('memes');
}

function isDrag(drag) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].isDrag = drag;
  setMeme(meme);
}
function dragText(dx, dy) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].pos.x += dx;
  meme.lines[meme.selectedLineIdx].pos.y += dy;
  setMeme(meme);
}

function isTextClicked(clickedPos, deSelect = false) {
  var memes = getMeme();
  var rectPos = getRectPos(memes);
  var clickedIdx;
  var isClicked = false;
  rectPos.forEach((pos) => {
    if (
      clickedPos.x >= pos.posXstart &&
      clickedPos.x <= pos.posXend &&
      clickedPos.y >= pos.posYstart &&
      clickedPos.y <= pos.posYend
    )
      clickedIdx = pos.memeIdx;
  });
  if (!deSelect) {
    if (clickedIdx > -1) {
      memes.selectedLineIdx = clickedIdx;
      setMeme(memes)
      renderClickedText(
        rectPos[clickedIdx].posX,
        rectPos[clickedIdx].txtSize,
        rectPos[clickedIdx].posY,
        rectPos[clickedIdx].size
      );
      isClicked = true;
    }
  }
  return isClicked;
}
function getRectPos(memes, idx = '') {
  var ctx = getElCtx();
  var rectPos = [];
  memes.lines.forEach((meme, memeIdx) => {
    var txtSize = ctx.measureText(meme.txt).width;
    var size = meme.size;
    var posX = meme.pos.x;
    var posY = meme.pos.y;
    if (idx === memeIdx) {
      var posXstart = posX - txtSize / 2 - 30;
      var posYstart = posY - size * 2;
      var posXend = posX + txtSize / 6 + 20;
      var posYend = posY + size / 2;
      posX = posX - txtSize / 2 - 15;
      posY = posY - size - 5;
      txtSize += 30;
      size += 15;
      rectPos.push({
        posXstart,
        posYstart,
        posXend,
        posYend,
        memeIdx,
        size,
        txtSize,
        posX,
        posY,
      });
    } else if (!idx) {
      var posXstart = posX - txtSize / 2 - 30;
      var posYstart = posY - size * 2;
      var posXend = posX + txtSize / 6 + 20;
      var posYend = posY + size / 2;
      posX = posX - txtSize / 2 - 15;
      posY = posY - size - 5;
      txtSize += 30;
      size += 15;
      rectPos.push({
        posXstart,
        posYstart,
        posXend,
        posYend,
        memeIdx,
        size,
        txtSize,
        posX,
        posY,
      });
    }
  });
  return rectPos;
}
