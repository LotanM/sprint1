'use strict'
var clicked = new Audio("click.mp3");
var flagged = new Audio("flagged.mp3");
var minutesLabel = document.querySelector(".minutes");
var secondsLabel = document.querySelector(".seconds");
var gTotalSeconds = 0;


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function setTime() {
  ++gTotalSeconds;
  secondsLabel.innerHTML = pad(gTotalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(gTotalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function countMines(cellI, cellJ, mat) {
  var minesAroundCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= mat[i].length) continue;
      if (mat[i][j].isMine) minesAroundCount++;
    }
  }
  return minesAroundCount
}

function mouseDown() {
  if (gGame.isOn) {
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerText = '😨';
  }
}
function mouseUp() {
  if (gGame.isOn) {
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerText = '😇';
  }
}