'use strict'

const MINE = '💣';
const LIFE = '💖';
const FLAG = '🚩'
const HINT = '💡'
const EMPTY = '.';

var gBoard= []
var gLevel= {
    SIZE:4,
    MINES: 2
}
var gGame = { 
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0 
}


function initGame() {
   gGame.isOn = true
    gBoard = buildBoard(gLevel.SIZE);
    console.table(gBoard);
    renderBoard(gBoard)
    
}

function buildBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 1,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
        }
    
    }

    return board
}


