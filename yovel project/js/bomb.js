'use strict'

function placeMines(board) {  
    for (var i = 0; i < gLevel.mines; i++) {     
        var rowIdx = getRandomIntInclusive(0, board.length - 1);    
         var colIdx = getRandomIntInclusive(0, board.length - 1);     
         board[rowIdx][colIdx].isMine = true;     board[rowIdx][colIdx] = MINE.text;     
         setMinesNegsCount(board, rowIdx, colIdx);   } }

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

    if(cell.isMine) {
        elCell.innerHTML = `<span class="numbers">${MINE}</span>`
    } else {
        elCell.innerHTML = `<span class="numbers">${minesAround}</span>`;
    }


}