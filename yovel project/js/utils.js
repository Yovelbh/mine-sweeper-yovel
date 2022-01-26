'use strict'

function renderBoard(board) {
    var strHTMl = ``
    for (var i = 0; i < board.length; i++) {
        strHTMl += `<tr>`
        for (var j = 0; j < board.length; j++) {
            strHTMl += `<td data-i="${i}" data-j="${j}" class="cell hidden" onclick="cellClicked(this,${i},${j})" 
            oncontextmenu="cellMarked(event)"></td>`
        }
        strHTMl += `</tr>`
    }
    document.querySelector('.board').innerHTML = strHTMl
}

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomIntInclusive(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j]) neighborsCount++;
        }
    }
    return neighborsCount;
}

function toggleGame(elBtn) {
    // console.log('gGameInterval', gGameInterval)
    if (gGameInterval) {
        clearInterval(gGameInterval)
        gGameInterval = null;
        elBtn.innerText = 'Start';
    } else {
        gGameInterval = setInterval(play, GAME_FREQ);
        elBtn.innerText = 'Pause';
    }

}


function setRandomMines(minesCount) {
    for (var i = 0; i < minesCount; i++) {
        gBoard[getRandomInt(0, gBoard.length - 1)][getRandomInt(0, gBoard[0].length - 1)].isMine = true
    }
}


