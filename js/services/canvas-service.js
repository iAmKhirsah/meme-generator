'use strict';
var gMeme;

function moveText(value) {
  var meme = getMeme();
  // meme = meme.lines[meme.selectedLineIdx];
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
  var increment = 5;
  if (value === '+') {
    meme.lines[meme.selectedLineIdx].size += increment;
  }
  if (value === '-') {
    meme.lines[meme.selectedLineIdx].size -= increment;
  }
  if (meme.size < 5) {
    meme.lines[meme.selectedLineIdx].size = 5;
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
  drawText(meme);
  switchLines();
}

function switchLines() {
  var meme = getMeme();
  if (meme.lines.length - 1 === meme.selectedLineIdx) meme.selectedLineIdx = 0;
  else meme.selectedLineIdx++;
  drawText(meme);
  inputText();
  // var rectPos = getRectPos(meme, meme.selectedLineIdx);
  // isTextClicked(rectPos);
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
      },
    ],
  };
  setMeme(meme);
}
function saveMeme() {
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
