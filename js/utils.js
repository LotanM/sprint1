'use strict'


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + randomColor
}

function timer() {
  startTime = Date.now();
  gInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    document.querySelector(".timer").innerHTML = (elapsedTime / 1000).toFixed(3);
  }, 100);
}

function countMines(cellI, cellJ, mat) {
  var minesAroundCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= mat[i].length) continue;
      if (mat[i][j].element === MINE) minesAroundCount++;
    }
  }
  return minesAroundCount
}