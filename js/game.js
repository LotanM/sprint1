'use strict'
var gBoard;
const MINE = '*';
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
                element: null
            }
            var currCell = board[i][j];
            if (i === 1 && j === 1 ||
                i === 0 && j === 1) {
                currCell.isShown = true;
                if (currCell.isShown) currCell.element = MINE;
            }
        }
    }
    setMinesNegsCount(board)
    console.log(board);
    console.table(board);
    return board
}

// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j];
            strHTML += `<td class="cell" onclick="cellClicked(this, ${i}, ${j})">`
            if (cell.isShown === true) {
                strHTML += MINE
            }
            strHTML += '</td>'
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



//Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    console.log(elCell);
    return elCell
}


//Count mines around each cell and set the cell's minesAroundCount
function setMinesNegsCount(board) {
    var minesAroundCount = 0;

    for (var i = 0; i < board.length; i++) {
        console.log(board[i])



        for (var j = 0; j < board.length; j++) {
        }





    }

    // for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    //     for (var j = pos.j - 1; j <= pos.j + 1; j++) {
    //         var currCell = gCinema[i][j]

    //         if (currCell.isBooked) seatsAroundCount--
    //     }
    // }
    // console.log(minesAroundCount);
    return minesAroundCount;
}




// Called on right click to mark a cell (suspected to be a mine)
// Search the web (and implement) how to hide the context menu on right click
function cellMarked(elCell) {

}

// Game ends when all mines are
// marked, and all the other cells
// are shown
function checkGameOver() {

}



// When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
// NOTE: start with a basic implementation that only opens the non-mine 1
// st degree neighbors
// BONUS: if you have the time later, try to work more like the real algorithm (see description
// at the Bonuses section below)

function expandShown(board, elCell, i, j) {

}