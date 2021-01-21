'use strict'
const MINE = '💥';
const FLAG = '🏴';

var gBoard;
var gInterval;
var timerClick = 1;
var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}



function levelClicked(elLvl) {
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
    timerClick--;
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerText = '😇';
}

function initGame() {
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard);
    gGame.isOn = true;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    resetTimer();
}

function resetTimer() {
    secondsLabel.innerText = '00';
    minutesLabel.innerText = '00';
    clearInterval(gInterval);
}

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



function cellClicked(elCell, i, j) { //leftClicked
    if (gGame.isOn) {
        if (timerClick === 1) { //start timer
            gInterval = setInterval(setTime, 1000);
            timerClick++
        }
        var clickedCell = gBoard[i][j];
        if (!clickedCell.isMine && !clickedCell.isShown) {
            clickedCell.isShown = true;
            elCell.innerText = clickedCell.minesAroundCount;
            elCell.style.backgroundColor = '#CFD8DC';
            gGame.shownCount++
            checkGameOver();
            if (clickedCell.minesAroundCount === 0) {
                elCell.innerText = '';
                expandShown(gBoard, elCell, i, j);
            }
        } else if (clickedCell.isMine) { //gameOver
            revealeAllMines()
            gGame.isOn = false;
            clearInterval(gInterval);
            gGame.secsPassed = gTotalSeconds;
        }
        clicked.play();
        console.log(gGame.shownCount);
    }
}


function cellMarked(elCell, i, j) { //right clicked
    elCell.addEventListener('contextmenu', function (ev) { //cancels menu
        ev.preventDefault();
    }, false);
    if (gGame.isOn) {
        if (timerClick === 1) { //start timer
            gInterval = setInterval(setTime, 1000);
            timerClick++
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

function revealeAllMines() {
    var elEmoji = document.querySelector('.emoji')
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            var currElCell = document.querySelector(`.cell-${i}-${j}`)
            if (currCell.isMine) {
                currCell.isShown = true;
                currElCell.innerText = MINE;
                currElCell.style.backgroundColor = '#E74C3C'
                gGame.isOn = false;
                elEmoji.innerText = '☠️';
            }
        }
    }
}

function checkGameOver() {
    var cellsCount = (gLevel.SIZE ** 2) - gLevel.MINES;
    if (gGame.markedCount === gLevel.MINES && gGame.shownCount === cellsCount) {
        gGame.isOn = false;
        clearInterval(gInterval);
        gGame.secsPassed = gTotalSeconds;
        var elEmoji = document.querySelector('.emoji')
        elEmoji.innerText = '🎊🥳🎊';
    }
}




// When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
// NOTE: start with a basic implementation that only opens the non-mine 1
// st degree neighbors
// BONUS: if you have the time later, try to work more like the real algorithm (see description
// at the Bonuses section below)
function expandShown(board, elCell, i, j) {
    var posI = i;
    var posJ = j;
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === posI && j === posJ) continue
            var currCell = board[i][j]
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            if (currCell.minesAroundCount !== 0) continue
            if (currCell.minesAroundCount === 0) {
                if (currCell.isShown) gGame.shownCount--
                currCell.isShown = true;
                gGame.shownCount++
                elCell.style.backgroundColor = '#CFD8DC';
            }
        }
    }
}
