// variables

const cells = document.getElementsByClassName('cell');
const cellsArr = [...cells]
const reset = document.getElementById('reset');
const start = document.getElementById('start');
const turn = document.getElementById('turn-checker');
const gameWinner = document.getElementById('game-winner');
const pOneName = document.getElementById('pOneName').value
const pTwoName = document.getElementById('pTwoName').value
const mainContainer = document.getElementById('mainContainer')

const winCombinations = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]]

let xTurn = true;
// Event listeners

reset.addEventListener('click', resetGame)
pForm.addEventListener('submit', function () {
    if (validateEmptiness(pOneName, pTwoName)) {
        startGame();
        
    }
    console.log(pOneName, pTwoName);
    // Jquery for modal
    $('#bAddPlayerName').modal('toggle');
});


// functions

function startGame () {
    start.disabled = true;
    cellsArr.forEach((cell) => {
        cell.innerHTML = '';
        cell.addEventListener('click', () => {
            cell.dataset.tri = 'true'
            if (xTurn) {
                cell.dataset.player = '1';
                cell.innerHTML = '<i class="fas fa-3x fa-times"></i>';
                turn.innerHTML = "Player #2 it's your turn"
            } else {
                cell.dataset.player = '2';
                cell.innerHTML = '<i class="far fa-3x fa-circle"></i>';
                turn.innerHTML = "Player #1 it's your turn"
            }
            turnSwap()
            winCheck()
        }, {once: true});
    });
}

function resetGame () {
   location.reload();
}

function turnSwap () {
    xTurn = !xTurn;
}

function winCheck () {
    let playerWinner1 = winCombinations.some( combination => {
        return combination.every( index => {
            return cellsArr[index].dataset.player === '1'
        })
    });
    let playerWinner2 = winCombinations.some( combination => {
        return combination.every( index => {
            return cellsArr[index].dataset.player === '2'
        })
    });
    if (playerWinner1) {
        gameWinner.innerHTML = 'Player 1 won the game';
        cellsArr.forEach(cell => { cell.style.pointerEvents = 'none'; });
    } else if (playerWinner2) {
        gameWinner.innerHTML = 'Player 2 won the game';
        cellsArr.forEach(cell => { cell.style.pointerEvents = 'none'; });
    } else if (cellsArr.every(cell => { return cell.dataset.tri === 'true'})) {
        gameWinner.innerHTML = 'Draw game';
    }
}

// Validating player names
function validateEmptiness(pOneName, pTwoName) {
    let enable = false;
    if ( pOneName !== '' && pTwoName !== '' ) {
      enable = true;
    } else {
      const divNode = document.createElement('div');
      divNode.classList.add('message');
      divNode.innerHTML = 'Please fill the all fields';
      mainContainer.appendChild(divNode);
      setTimeout(() => {
        mainContainer.removeChild(divNode);
      }, 3000);
    }
    return enable;
}
