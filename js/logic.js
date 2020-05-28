// Winning combinations
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

// Player objects
class Player {
  constructor(pName, pWins) {
    this.pName = pName;
    this.pWins = pWins;
  }
}

// Check for winnings
function winCheck() {
  const playerWinner1 = winCombinations.some(combination => combination.every(index => cellsArr[index].dataset.player === '1'));
  const playerWinner2 = winCombinations.some(combination => combination.every(index => cellsArr[index].dataset.player === '2'));
  return [playerWinner1, playerWinner2]
}

// Reset play
function resetGame() {
  window.location.reload();
}

// Turn player
function turnSwap() {
  xTurn = !xTurn;
}

// Updating localStorage
function getPlayersLS() {
  let playersArr;

  if (localStorage.getItem('players') === null) {
    playersArr = [];
  } else {
    playersArr = JSON.parse(localStorage.getItem('players'));
  }
  return playersArr;
}

// Updating players statistics
function updatePlayerStats(players) {
  localStorage.setItem('players', JSON.stringify([]));
  localStorage.setItem('players', JSON.stringify(players));
}