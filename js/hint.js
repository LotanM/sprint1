'use strict'
var gHintsCounter = 3;
var hintOnIcon = '<img src="./icon/bulbOn.png">'
var hintOffIcon = '<img height="40px" src="./icon/bulbOff.png">';
var gIsHintOn;


function hintClicked(elHint) {
    if (gHintsCounter > 0) {
        elHint.classList.add('selected');
        gHintsCounter--
        gIsHintOn = true;
    }
}

function useHint(elCell, i, j) {
    var elHint = document.querySelector('.hint.selected');
    revealNegs(elCell, i, j);
    setTimeout(() => {
        UnRevealNegs(elCell, i, j);
        elHint.innerHTML = hintOffIcon;
        elHint.classList.add('no-hover');
        elHint.classList.remove('selected');
    }, 1000);
}



function revealNegs(elCell, i, j) {
    var posI = i;
    var posJ = j;
    for (var i = posI - 1; i <= posI + 1; i++) {//1,1
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue
            var currCell = gBoard[i][j];
            if (currCell.isShown || currCell.isMarked) continue
            elCell = document.querySelector(`.cell-${i}-${j}`);
            elCell.style.backgroundColor = '#CFD8DC';
            if (currCell.minesAroundCount > 0) elCell.innerText = currCell.minesAroundCount
            if (currCell.isMine) revealMine(elCell);
        }
    }
}

function UnRevealNegs(elCell, i, j) {
    var posI = i;
    var posJ = j;
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue
            var currCell = gBoard[i][j];
            if (currCell.isShown || currCell.isMarked) continue
            elCell = document.querySelector(`.cell-${i}-${j}`);
            elCell.style.backgroundColor = '#B0BEC5';
            if (currCell.minesAroundCount > 0) elCell.innerText = '';
        }
    }
}