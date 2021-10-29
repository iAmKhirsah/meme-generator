'use strict';
var gMeme;

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
  drawMeme();
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
  drawMeme();
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
    };
  drawText();
  switchLines();
}

function switchLines() {
  var meme = getMeme();
  if (meme.lines.length - 1 === meme.selectedLineIdx) meme.selectedLineIdx = 0;
  else meme.selectedLineIdx++;
  inputText();
  drawText();
  // var rectPos = getRectPos(meme, meme.selectedLineIdx);
  // isTextClicked(rectPos);
}
function deleteLine() {
  var meme = getMeme();
  meme.lines.splice(meme.selectedLineIdx, 1);
  if (meme.lines.length > 0) {
    meme.selectedLineIdx = 0;
    drawMeme();
  } else {
    drawMeme();
  }
}
function currMeme(img) {
  var pos = getCanvasPos();
  gMeme = {
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
      },
    ],
  };
}

function setColor(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].color = value;
  drawMeme();
}
function setStrokeColor(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].strokeColor = value;
  drawMeme();
}
function setTextAlignment(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].align = value;
  drawMeme();
}
function changeFont(value) {
  var meme = getMeme();
  meme.lines[meme.selectedLineIdx].font = value;
  drawMeme();
}
function getMeme() {
  return gMeme;
}

// A MONUMENT TO MY FAILURES //

// function isTextClicked(clickedPos) {
//   var memes = getMeme();
//   var rectPos = getRectPos(memes);
//   var clickedIdx;
//   rectPos.forEach((pos) => {
//     if (
//       clickedPos.x >= pos.posXstart &&
//       // clickedPos.x <= pos.posXend &&
//       clickedPos.y >= pos.posYstart
//     )
//       clickedIdx = pos.idx;
//   });
//   if (clickedIdx) {
//     renderClickedText(
//       rectPos[clickedIdx].posXstart,
//       rectPos[clickedIdx].posXend,
//       rectPos[clickedIdx].posYstart,
//       rectPos[clickedIdx].posYend
//     );
//   }
// }

// function getRectPos(memes, idx) {
//   var ctx = getElCtx();
//   var rectPos = [];
//   var lmao = memes.lines.forEach((meme, memeIdx) => {
//     var txtSize = ctx.measureText(meme.txt).width;
//     var size = meme.size;
//     if (idx === memeIdx) {
//       return {
//         posXstart: posX - txtSize / 2 - 30,
//         posYstart: posY - size,
//         posXend: txtSize + 60,
//         posYend: size + 10,
//       };
//     } else if (!idx) {
//       var posX = meme.pos.x;
//       var posY = meme.pos.y;
//       var posXstart = posX - txtSize / 2 - 30;
//       var posYstart = posY - size;
//       var posXend = txtSize + 60;
//       var posYend = size + 10;
//       rectPos.push({ posXstart, posYstart, posXend, posYend, memeIdx });
//       return rectPos;
//     }
//   });
//   return lmao;
// }
