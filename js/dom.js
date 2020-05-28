/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

// variables
const cells = document.getElementsByClassName('cell');
const cellsArr = [...cells];
const reset = document.getElementById('reset');
const start = document.getElementById('start');
const turn = document.getElementById('turn-checker');
const gameWinner = document.getElementById('game-winner');
const mainContainer = document.getElementById('mainContainer');

// Event listeners
reset.addEventListener('click', resetGame);
document.addEventListener('submit', () => {
  const pOneName = document.getElementById('pOne').value;
  const pTwoName = document.getElementById('pTwo').value;
  if (validateEmptiness(pOneName, pTwoName)) {
    const found1 = players.find(playerArr => playerArr.pName === pOneName);
    const found2 = players.find(playerArr => playerArr.pName === pTwoName);
    if (found1 === undefined) {
      player1 = new Player(pOneName, 0);
      players.push(player1);
    } else {
      player1 = found1;
    }
    if (found2 === undefined) {
      player2 = new Player(pTwoName, 0);
      players.push(player2);
    } else {
      player2 = found2;
    }

    updatePlayerStats(players);

    document.getElementById('pOneStats').innerText = player1.pName;
    document.getElementById('pTwoStats').innerText = player2.pName;
    showScore();

    startGame();
  }
  // Jquery for modal
  $('#bAddPlayerName').modal('toggle');
});


// functions
function startGame() {
  start.disabled = true;
  cellsArr.forEach((cell) => {
    cell.innerHTML = '';
    cell.addEventListener('click', () => {
      cell.dataset.tri = 'true';
      if (xTurn) {
        cell.dataset.player = '1';
        cell.innerHTML = '<i class="fas fa-3x fa-times"></i>';
        turn.innerHTML = `${player2.pName} it's your turn`;
      } else {
        cell.dataset.player = '2';
        cell.innerHTML = '<i class="far fa-3x fa-circle"></i>';
        turn.innerHTML = `${player1.pName} it's your turn`;
      }
      turnSwap();
      showWinner(winCheck()[0], winCheck()[1]);
    }, { once: true });
  });
}

// Show winner
function showWinner (playerWinner1, playerWinner2) {
if (playerWinner1) {
    playerWins(player1)
    } else if (playerWinner2) {
    playerWins(player2)
    } else if (cellsArr.every(cell => cell.dataset.tri === 'true')) {
    turn.innerText = '';
    gameWinner.innerHTML = "It's a draw!";
    }
}

// Get player winnings
function playerWins (player) {
    turn.innerText = '';
    gameWinner.innerHTML = `Congrats! ${player.pName}, you won the game!`;
    players[players.findIndex(playerArr => playerArr.pName === player.pName)].pWins += 1;
    updatePlayerStats(players);
    showScore();
    cellsArr.forEach(cell => { cell.style.pointerEvents = 'none'; });
}

// Validating player names
function validateEmptiness(stringOne, stringTwo) {
  let enable = false;
  if (stringOne !== '' && stringTwo !== '') {
    enable = true;
  } else {
    const divNode = document.createElement('div');
    divNode.classList.add('message');
    divNode.innerHTML = 'Please fill the all fields';
    mainContainer.appendChild(divNode);
    setTimeout(() => {
      mainContainer.removeChild(divNode);
    }, 3500);
  }
  return enable;
}

// Showing players scores
function showScore() {
  document.getElementById('pOneWins').innerText = `Wins: ${player1.pWins}`;
  document.getElementById('pTwoWins').innerText = `Wins: ${player2.pWins}`;
}