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
  var generator = document.querySelector('.meme-generator');
  var gallery = document.querySelector('.grid-container');
  var memes = document.querySelector('.meme-container');
  if (!isViable) {
    generator.classList.remove('hidden');
    gallery.classList.add('hidden');
    memes.classList.add('hidden');
  } else if (isViable === 'memes') {
    gallery.classList.add('hidden');
    generator.classList.add('hidden');
    memes.classList.remove('hidden');
  } else {
    gallery.classList.remove('hidden');
    generator.classList.add('hidden');
    memes.classList.add('hidden');
  }
}
