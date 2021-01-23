'use strict'
var clicked = new Audio("./audio/click.mp3");
var flagged = new Audio("./audio/flagged.mp3");
var lose = new Audio("./audio/loser.mp3");
var win = new Audio("./audio/win.mp3");
var steppedOnMine = new Audio("./audio/steppedOnMine.mp3");

var minutesLabel = document.querySelector(".minutes");
var secondsLabel = document.querySelector(".seconds");
var gTotalSeconds = 0;




function buildBoard(size) {
  var board = [];
  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      }
    }
  }
  setMinesAtRandomCell(board);
  setMinesNegsCount(board);
  return board
}


function resetLvl() {
  var elEmoji = document.querySelector('.emoji');
  elEmoji.innerText = '😇';
  gElBoard.classList.remove('explode');
  gLives = 3;
  gElLives.innerText = FULLLIVES;
  gHintsCounter = 3;
  var elHints = document.querySelectorAll('.hint');
  elHints.forEach(el => {
    el.innerHTML = hintOnIcon;
    el.classList.remove('no-hover');
    el.classList.remove('selected');
  })
}


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateBestScore() {
  var elBestScore = document.querySelector('.best-score');
  // var elTime = document.querySelector('.timer');
  var min = minutesLabel.innerText
  var sec = secondsLabel.innerText
  elBestScore.innerText = min + ':' + sec;
}

function resetTimer() {
  secondsLabel.innerText = '00';
  minutesLabel.innerText = '00';
  gTotalSeconds = 0;
  clearInterval(gInterval);
  gInterval = null;
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