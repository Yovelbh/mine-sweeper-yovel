'use strict'

const MINE = "💣";
const LIFE = "💖";
const FLAG = "🚩";
const HINT = "💡";
const EMPTY = "";

var gBoard;
var newGame = false;

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


function gameOver() {
    gGame.isOn = false;
    endStopWatch()
    console.log('end')
}


function changeLevel(SIZE, MINES) {
    gLevel.SIZE = SIZE;
    gLevel.MINES = MINES;
    initGame()
}

function initGame() {
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard)
    getRandomMine(gBoard)
    newGame = true;

}

function buildBoard(SIZE) {
    
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = createCell();

        }
    }
    return board;
}


function createCell() {
    var cell = {
        minesAroundCount: 4,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell;
}


function setMinesNegsCount(board, rowIdx, colIdx) {

    board.minesAroundCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            var cell = board[i][j];
            if (cell.isMine) board.minesAroundCount++;
        }
    }
    return board.minesAroundCount;
}


function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    var minesAround = setMinesNegsCount(gBoard, i, j);
    cell.isShown = true;
    if (!gGame.isOn) {
        startStopWatch()
        gGame.isOn = true;
    }
    if (elCell.isMarked) return
    if (cell.isMine) {
        elCell.innerHTML = `<span class="numbers">${MINE}</span>`;
    } else {
        elCell.innerHTML = `<span class="numbers">${minesAround}</span>`;
    }
    if (cell.isMine && cell.isShown) gameOver();
}


function cellMarked(elCell) {
    if (newGame) {
        startStopWatch()
        gGame.isOn = true;
    }
    if (!elCell.isMarked) {
        elCell.innerHTML = `<span class="numbers">${FLAG}</span>`;
        elCell.isMarked = true;
        gGame.markedCount++
    } else {
        elCell.innerHTML = `<span class="numbers">${EMPTY}</span>`;
        elCell.isMarked = false;
        gGame.markedCount--
    }
}

function getRandomMine(gBoard) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var randomI = getRandomIntInclusive(0, gBoard.length - 1)
        var randomj = getRandomIntInclusive(0, gBoard.length - 1)
        gBoard[randomI][randomj].isMine = true;
    }
}

function checkGameOver() {
    if (elCell.isMine && elCell.isShown) console.log('GAME OVER');
}

function gameOver() {
    gGame.isOn = false;
    endStopWatch()
    console.log('end')
}






