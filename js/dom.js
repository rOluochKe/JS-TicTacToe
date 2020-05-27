// variables

const cells = document.getElementsByClassName('cell');
const reset = document.getElementById('reset');
const start = document.getElementById('start');
const grid = document.querySelector('.tic-grid');

var clickCounter = 0;

const turn = document.getElementById('turn-checker');
const gameWinner = document.getElementById('game-winner');


// Event listeners

document.addEventListener('DOMContentLoaded', startGame);
reset.addEventListener('click', resetGame)
start.addEventListener('click', startGame)
grid.addEventListener('click', () => {
    if (clickCounter % 2 !== 0) {
        printCross()
    } else {
        printCircle()
    }
});



// functions

function startGame () {
    clickCounter = 0;
    start.disabled = true;
    Array.prototype.forEach.call(cells, (cell) => {
        cell.innerHTML = '';
        cell.dataset.tri = 'false';
    });
    printCross()
}

function resetGame () {
    clickCounter = 0;
    start.disabled = false;
    Array.prototype.forEach.call(cells, (cell) => {
        cell.innerHTML = '';
        cell.dataset.tri = 'false';
    });
    printCross()
}

function printCross () {
    start.disabled = true;
    turn.innerHTML = "Player #1 it's your turn";
    Array.prototype.forEach.call(cells, (cell) => {
        if (cell.dataset.tri === 'false') {
            cell.addEventListener('click', () => {
                cell.dataset.tri = 'true';
                cell.dataset.player = '1';
                cell.innerHTML = '<i class="fas fa-3x fa-times"></i>';
                clickCounter += 1;
            });
        }
    });
    console.log(clickCounter);
}

function printCircle () {
    turn.innerHTML = "Player #2 it's your turn";
    Array.prototype.forEach.call(cells, (cell) => {
        if (cell.dataset.tri === 'false') {
            cell.addEventListener('click', () => {
                cell.dataset.tri = 'true';
                cell.dataset.player = '2';
                cell.innerHTML = '<i class="far fa-3x fa-circle"></i>';
                clickCounter += 1;
            });
        }
    });
    console.log(clickCounter);
}
