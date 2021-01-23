'use strict'


function setMinesAtRandomCell(board) {
    var minesAmount = gLevel.MINES;
    while (minesAmount !== 0) {
        var idxI = getRandomIntInclusive(0, board.length - 1);
        var idxJ = getRandomIntInclusive(0, board.length - 1);
        var rdmCell = board[idxI][idxJ]
        if (!rdmCell.isMine) {
            rdmCell.isMine = true;
            minesAmount--;
        }
    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            var num = countMines(i, j, board);
            currCell.minesAroundCount = num;
        }
    }
    return num
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


function revealMine(elCell) {
    elCell.innerText = MINE;
    elCell.style.backgroundColor = '#E74C3C';
    if (gLives !== 0) {
        setTimeout(function () {
            elCell.innerText = '';
            elCell.style.backgroundColor = '#B0BEC5';
        }, 300)
    }
}

function revealeAllMines() {
    var elEmoji = document.querySelector('.emoji')
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            var currElCell = document.querySelector(`.cell-${i}-${j}`)
            if (currCell.isMine) {
                currCell.isShown = true;
                gGame.isOn = false;
                currElCell.innerText = MINE;
                elEmoji.innerText = '☠️';
                currElCell.style.backgroundColor = '#E74C3C'
            }
        }
    }
}