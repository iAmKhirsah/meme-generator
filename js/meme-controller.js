'use strict';

function init() {
  displayImgs();
  initCanvas();
}
function displayImgs() {
  var imgs = imagesForMemes();
  var strHTML = '';
  imgs.forEach((img) => {
    strHTML += `<img src="${img.url}" id="${img.id}" onclick="createMeme(this)">`;
    document.querySelector('.grid-container').innerHTML = strHTML;
  });
}
