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

function hidePages(isViable = '') {
  var generatorContainer = document.querySelector('.generator-container');
  var gallery = document.querySelector('.grid-container');
  var memes = document.querySelector('.meme-container');
  if (!isViable) {
    generatorContainer.classList.remove('hidden');
    gallery.classList.add('hidden');
    memes.classList.add('hidden');
  } else if (isViable === 'memes') {
    gallery.classList.add('hidden');
    generatorContainer.classList.add('hidden');
    memes.classList.remove('hidden');
  } else {
    generatorContainer.classList.add('hidden');
    gallery.classList.remove('hidden');
    memes.classList.add('hidden');
  }
}
