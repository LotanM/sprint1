'use strict'
const MINE = '💥';
const FLAG = '🏴';

var gBoard;
var gInterval;
// clearInterval(gInterval); <<< to stop timer
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

function initGame() {
    gBoard = buildBoard(4)
    renderBoard(gBoard)
}

// Builds the board
// Set mines at random locations
// Call setMinesNegsCount() Return the created board
function buildBoard(size) {
    var board = []
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
    setMinesAtRandomCell(board)
    setMinesNegsCount(board)
    console.table(board);
    return board
}


function setMinesAtRandomCell(board) {
    var minesAmount = gLevel.MINES;
    while (minesAmount !== 0) {
        var idxI = getRandomIntInclusive(0, board.length - 1)
        var idxJ = getRandomIntInclusive(0, board.length - 1)
        var rdmCell = board[idxI][idxJ]
        if (!rdmCell.isMine) {
            rdmCell.isMine = true;
            minesAmount--;
        }
    }
}



// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            // var cell = board[i][j];
            strHTML += `<td class="cell" oncontextmenu="cellMarked(this, ${i}, ${j}); return false;" onclick="cellClicked(this, ${i}, ${j})"></td>`
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

//Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    var clickedCell = gBoard[i][j];
    if (!clickedCell.isShown) {
        if (!clickedCell.isMine) {
            elCell.innerText = clickedCell.minesAroundCount; //neighbors count number
            elCell.style.backgroundColor = '#CFD8DC';
            clickedCell.isShown = true;
        } else {
            elCell.innerText = MINE;
            checkGameOver()
        }
        audio.play();
    }
    if (timerClick === 1) { //start timer
        gInterval = setInterval(setTime, 1000);
        timerClick++
    }
    console.log(gBoard);
}


//Count mines around each cell and set the cell's minesAroundCount
function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) { //loop board
        for (var j = 0; j < board.length; j++) { // loop board
            var currCell = board[i][j];
            var num = countMines(i, j, board);
            currCell.minesAroundCount = num
        }
    }
    return num
}


// Called on right click to mark a cell (suspected to be a mine)
// Search the web (and implement) how to hide the context menu on right click
function cellMarked(elCell, i, j) {
    elCell.addEventListener('contextmenu', function (ev) {
        ev.preventDefault();
    }, false)
    elCell.innerText = FLAG;
    if (elCell.innerText === FLAG) gBoard[i][j].isMarked = true;
    if (gBoard[i][j].isMine) console.log('you flagged a bomb!');
    console.log(gBoard);
}

// Game ends when all mines are
// marked, and all the other cells
// are shown
function checkGameOver() {
    console.log('gameover?');
}



// When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
// NOTE: start with a basic implementation that only opens the non-mine 1
// st degree neighbors
// BONUS: if you have the time later, try to work more like the real algorithm (see description
// at the Bonuses section below)

function expandShown(board, elCell, i, j) {
    
}