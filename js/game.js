'use strict'

const MINE = '💥';
const FLAG = '🏴';
var gBoard;
var gElBoard = document.querySelector('.board');
var gInterval;

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard);
    gGame.isOn = true;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    resetTimer();
}


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var tdCell = `${i}-${j}`;
            strHTML += `<td class="cell-${tdCell}"  oncontextmenu="cellMarked(this, ${i}, ${j}); return false;" onclick="cellClicked(this, ${i}, ${j})"></td>`
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



function levelClicked(elLvl) {
    resetLvl();
    if (elLvl.innerText === 'Easy') {
        gLevel = { SIZE: 4, MINES: 2 }
        initGame()
    }
    if (elLvl.innerText === 'Medium') {
        gLevel = { SIZE: 8, MINES: 12 }
        initGame()
    }
    if (elLvl.innerText === 'Hard') {
        gLevel = { SIZE: 12, MINES: 30 }
        initGame()
    }
}



function cellClicked(elCell, i, j) { //leftClicked
    if (gGame.isOn) {
        if (!gInterval) { //start timer
            gInterval = setInterval(setTime, 1000);
        }
        if (gIsHintOn) {
            useHint(elCell, i, j)
            gIsHintOn = false;
        } else {
            var clickedCell = gBoard[i][j];
            elCell.style.backgroundColor = '#CFD8DC';
            if (!clickedCell.isMine && !clickedCell.isShown) {
                clickedCell.isShown = true;
                gGame.shownCount++
                if (clickedCell.minesAroundCount === 0) {
                    elCell.innerText = '';
                    expandShown(gBoard, elCell, i, j);
                } else {
                    elCell.innerText = clickedCell.minesAroundCount;
                    checkGameOver();
                }
            } else if (clickedCell.isMine) {
                substractLife();
                revealMine(elCell);
            }
        }
        clicked.play();
    }
}


function cellMarked(elCell, i, j) { //right clicked
    elCell.addEventListener('contextmenu', function (ev) { //cancels menu
        ev.preventDefault();
    }, false);
    if (gGame.isOn) {
        if (!gInterval) { //start timer
            gInterval = setInterval(setTime, 1000);
        }
        var clickedCell = gBoard[i][j]
        if (clickedCell.isShown) {
            return;
        }
        if (!clickedCell.isMarked) {
            clickedCell.isMarked = true;
            elCell.innerText = FLAG;
        } else {
            clickedCell.isMarked = false;
            elCell.innerText = '';
        }
        if (clickedCell.isMine && clickedCell.isMarked) {
            gGame.markedCount++;
            checkGameOver();
        } else if (clickedCell.isMine && !clickedCell.isMarked) gGame.markedCount--
        flagged.play();
    }
}



function checkGameOver() {
    var cellsCount = (gLevel.SIZE ** 2) - gLevel.MINES;
    if (gGame.markedCount === gLevel.MINES && gGame.shownCount === cellsCount) {
        gGame.isOn = false;
        updateBestScore()
        clearInterval(gInterval);
        gGame.secsPassed = gTotalSeconds;
        var elEmoji = document.querySelector('.emoji')
        elEmoji.innerText = '🎊🥳🎊';
        win.play();
    }
}



function expandShown(board, elCell, i, j) {
    var posI = i;
    var posJ = j;
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === posI && j === posJ) continue
            var currCell = board[i][j];
            elCell = document.querySelector(`.cell-${i}-${j}`);
            if (currCell.minesAroundCount >= 0) {
                if (!currCell.isShown) {
                    currCell.isShown = true;
                    elCell.style.backgroundColor = '#CFD8DC';
                    gGame.shownCount++;
                    if (currCell.minesAroundCount > 0) elCell.innerText = currCell.minesAroundCount
                }
            }
        }
    }
}

