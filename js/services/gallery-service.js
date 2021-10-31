'use strict';
var gKeywords = { happy: 6, trump: 2, dog: 3, child: 5, hands: 5 };

function imagesForMemes() {
  var imgs = [
    { id: makeId(), url: './img/001.jpg', keywords: ['happy'] },
    { id: makeId(), url: './img/002.jpg', keywords: ['success', 'child'] },
    { id: makeId(), url: './img/003.jpg', keywords: ['trump'] },
    { id: makeId(), url: './img/004.jpg', keywords: ['happy', 'dog'] },
    { id: makeId(), url: './img/005.jpg', keywords: ['happy', 'dog', 'child'] },
    { id: makeId(), url: './img/006.jpg', keywords: ['reaction'] },
    { id: makeId(), url: './img/007.jpg', keywords: ['evil', 'child'] },
    { id: makeId(), url: './img/008.jpg', keywords: ['fingers'] },
    { id: makeId(), url: './img/009.jpg', keywords: ['hands'] },
    {
      id: makeId(),
      url: './img/010.jpg',
      keywords: ['happy', 'hands', 'aliens'],
    },
    { id: makeId(), url: './img/011.jpg', keywords: ['aliens', 'hands'] },
    { id: makeId(), url: './img/012.jpg', keywords: ['sarcasm', 'hands'] },
    {
      id: makeId(),
      url: './img/013.jpg',
      keywords: ['child', 'dance', 'happy'],
    },
    { id: makeId(), url: './img/014.jpg', keywords: ['trump', 'hands'] },
    { id: makeId(), url: './img/015.jpg', keywords: ['child', 'shock'] },
    { id: makeId(), url: './img/016.jpg', keywords: ['dog'] },
    { id: makeId(), url: './img/017.jpg', keywords: ['obama', 'funny'] },
    { id: makeId(), url: './img/018.jpg', keywords: ['men', 'love'] },
    { id: makeId(), url: './img/019.jpg', keywords: ['success'] },
    { id: makeId(), url: './img/020.jpg', keywords: ['choice', 'glasses'] },
    {
      id: makeId(),
      url: './img/021.jpg',
      keywords: ['one', 'does', 'not', 'simply', 'walk', 'into', 'mordor'],
    },
    { id: makeId(), url: './img/022.jpg', keywords: ['oprah', 'success'] },
    { id: makeId(), url: './img/023.jpg', keywords: ['putin', 'fingers'] },
    { id: makeId(), url: './img/024.jpg', keywords: ['happy', 'reaction'] },
    { id: makeId(), url: './img/025.jpg', keywords: ['everywhere'] },
  ];
  return imgs;
}

function searchKeyword(keyword) {
  var key = keyword.innerText;
  if (!key) key = keyword;
  var imgs = imagesForMemes();
  var filteredImgs = imgs.filter((img) => {
    return img.keywords.includes(key);
  });
  displayImgs(filteredImgs);
}
