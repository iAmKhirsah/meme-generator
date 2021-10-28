'use strict';
var gKeywords = { happy: 6, trump: 2, dog: 3, child: 5, hands: 5 };
var gMeme;

function imagesForMemes() {
  var imgs = [
    { id: 101, url: './img/001.jpg', keywords: ['happy'] },
    { id: 102, url: './img/002.jpg', keywords: ['success', 'child'] },
    { id: 103, url: './img/003.jpg', keywords: ['trump'] },
    { id: 104, url: './img/004.jpg', keywords: ['happy', 'dog'] },
    { id: 105, url: './img/005.jpg', keywords: ['happy', 'dog', 'child'] },
    { id: 106, url: './img/006.jpg', keywords: ['reaction'] },
    { id: 107, url: './img/007.jpg', keywords: ['evil', 'child'] },
    { id: 108, url: './img/008.jpg', keywords: ['fingers'] },
    { id: 109, url: './img/009.jpg', keywords: ['hands'] },
    { id: 110, url: './img/010.jpg', keywords: ['happy', 'hands', 'aliens'] },
    { id: 111, url: './img/011.jpg', keywords: ['aliens', 'hands'] },
    { id: 112, url: './img/012.jpg', keywords: ['sarcasm', 'hands'] },
    { id: 113, url: './img/013.jpg', keywords: ['child', 'dance', 'happy'] },
    { id: 114, url: './img/014.jpg', keywords: ['trump', 'hands'] },
    { id: 115, url: './img/015.jpg', keywords: ['child', 'shock'] },
    { id: 116, url: './img/016.jpg', keywords: ['dog'] },
    { id: 117, url: './img/017.jpg', keywords: ['obama', 'funny'] },
    { id: 118, url: './img/018.jpg', keywords: ['men', 'love'] },
    { id: 119, url: './img/019.jpg', keywords: ['success'] },
    { id: 120, url: './img/020.jpg', keywords: ['choice', 'glasses'] },
    {
      id: 121,
      url: './img/021.jpg',
      keywords: ['one', 'does', 'not', 'simply', 'walk', 'into', 'mordor'],
    },
    { id: 122, url: './img/022.jpg', keywords: ['oprah', 'success'] },
    { id: 123, url: './img/023.jpg', keywords: ['putin', 'fingers'] },
    { id: 124, url: './img/024.jpg', keywords: ['happy', 'reaction'] },
    { id: 125, url: './img/025.jpg', keywords: ['everywhere'] },
  ];
  return imgs;
}

function currMeme(img) {
  var pos = getCanvasPos();
  gMeme = {
    selectedImgId: img.id,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'I never eat Falafel',
        size: 40,
        align: 'center',
        color: 'white',
        pos: { x: pos.x / 2, y: 60 },
      },
    ],
  };
}

function getMeme() {
  return gMeme;
}

function shareMeme() {
  var elCanvas = getElCanvas();
  const imgDataUrl = elCanvas.toDataURL('image/jpeg');
  function onSuccess(uploadedImgUrl) {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`
    );
  }
  doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append('img', imgDataUrl);

  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log('Got back live url:', url);
      onSuccess(url);
    })
    .catch((err) => {
      console.error(err);
    });
}
