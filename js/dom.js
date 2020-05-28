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
const winCombinations = [[0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

let xTurn = true;
// let players = [];
const players = getPlayersLS();

// Objects

class Player {
  constructor(pName, pWins) {
    this.pName = pName;
    this.pWins = pWins;
  }
}

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
      winCheck();
    }, { once: true });
  });
}

function resetGame() {
  window.location.reload();
}

function turnSwap() {
  xTurn = !xTurn;
}

function winCheck() {
  const playerWinner1 = winCombinations.some(combination => combination.every(index => cellsArr[index].dataset.player === '1'));
  const playerWinner2 = winCombinations.some(combination => combination.every(index => cellsArr[index].dataset.player === '2'));
  if (playerWinner1) {
    turn.innerText = '';
    gameWinner.innerHTML = `Congrats! ${player1.pName}, you won the game!`;
    players[players.findIndex(player => player.pName === player1.pName)].pWins += 1;
    updatePlayerStats(players);
    showScore();
    cellsArr.forEach(cell => { cell.style.pointerEvents = 'none'; });
  } else if (playerWinner2) {
    turn.innerText = '';
    gameWinner.innerHTML = `Congrats! ${player2.pName}, you won the game!`;
    players[players.findIndex(player => player.pName === player2.pName)].pWins += 1;
    updatePlayerStats(players);
    showScore();
    cellsArr.forEach(cell => { cell.style.pointerEvents = 'none'; });
  } else if (cellsArr.every(cell => cell.dataset.tri === 'true')) {
    turn.innerText = '';
    gameWinner.innerHTML = "It's a draw!";
  }
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

function getPlayersLS() {
  let playersArr;

  if (localStorage.getItem('players') === null) {
    playersArr = [];
  } else {
    playersArr = JSON.parse(localStorage.getItem('players'));
  }
  return playersArr;
}

function updatePlayerStats(players) {
  localStorage.setItem('players', JSON.stringify([]));
  localStorage.setItem('players', JSON.stringify(players));
}

function showScore() {
  document.getElementById('pOneWins').innerText = `Wins: ${player1.pWins}`;
  document.getElementById('pTwoWins').innerText = `Wins: ${player2.pWins}`;
}