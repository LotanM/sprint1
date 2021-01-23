'use strict'
var gLives = 3;

const FULLLIVES = '❤️❤️❤️'
var gElLives = document.querySelector('.lives');


function substractLife() {
    gLives--
    if (gLives === 2) {
        gElLives.innerText = '❤️❤️💔'
        gElLives.classList.toggle('explode');
        steppedOnMine.play();
    }
    if (gLives === 1) {
        gElLives.innerText = '❤️💔💔'
        steppedOnMine.play();
    }
    if (gLives === 0) {
        gElLives.innerText = '💔💔💔'
        revealeAllMines()
        resetTimer();
        gGame.isOn = false;
        gGame.secsPassed = gTotalSeconds;
        gElBoard.classList.add('explode');
        lose.play();
    }
}


