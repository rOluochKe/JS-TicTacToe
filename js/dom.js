import { Player, Game, resetGame } from './logic';

const cells = document.getElementsByClassName('cell');
const cellsArr = [...cells];
const reset = document.getElementById('reset');
const start = document.getElementById('start');
const turn = document.getElementById('turn-checker');
const gameWinner = document.getElementById('game-winner');
const mainContainer = document.getElementById('mainContainer');

const Board = (p1, p2, g) => {
  const player1 = p1;
  const player2 = p2;
  const game = g;
  const { players } = game;

  const playerWins = (player) => {
    turn.innerText = '';
    gameWinner.innerHTML = `Congrats! ${player.pName}, you won the game!`;
    players[players.findIndex(playerArr => playerArr.pName === player.pName)].pWins += 1;
    game.updatePlayerStats(players);
    cellsArr.forEach(cell => { cell.style.pointerEvents = 'none'; });
  };

  const showScore = () => {
    document.getElementById('pOneWins').innerText = `Wins: ${player1.pWins}`;
    document.getElementById('pTwoWins').innerText = `Wins: ${player2.pWins}`;
  };

  const showWinner = (playerWinner1, playerWinner2) => {
    if (playerWinner1) {
      playerWins(player1);
    } else if (playerWinner2) {
      playerWins(player2);
    } else if (cellsArr.every(cell => cell.dataset.tri === 'true')) {
      turn.innerText = '';
      gameWinner.innerHTML = "It's a draw!";
    }

    showScore();
  };

  const startGame = () => {
    start.disabled = true;
    cellsArr.forEach((cell) => {
      cell.innerHTML = '';
      cell.addEventListener('click', () => {
        cell.dataset.tri = 'true';
        if (game.turnSwap()) {
          cell.dataset.player = '1';
          cell.innerHTML = '<i class="fas fa-3x fa-times"></i>';
          turn.innerHTML = `${player2.pName} it's your turn`;
        } else {
          cell.dataset.player = '2';
          cell.innerHTML = '<i class="far fa-3x fa-circle"></i>';
          turn.innerHTML = `${player1.pName} it's your turn`;
        }

        showWinner(game.winCheck()[0], game.winCheck()[1]);
      }, { once: true });
    });
  };

  return {
    startGame, showScore,
  };
};

const validateEmptiness = (stringOne, stringTwo) => {
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
};

reset.addEventListener('click', resetGame);
document.addEventListener('submit', () => {
  const pOneName = document.getElementById('pOne').value;
  const pTwoName = document.getElementById('pTwo').value;
  if (validateEmptiness(pOneName, pTwoName)) {
    const game = Game();
    const { players } = game;
    let player1;
    let player2;
    const found1 = players.find(playerArr => playerArr.pName === pOneName);
    const found2 = players.find(playerArr => playerArr.pName === pTwoName);

    if (found1 !== undefined) {
      player1 = found1;
    } else {
      player1 = Player(pOneName, 0);
      players.push(player1);
    }
    if (found2 !== undefined) {
      player2 = found2;
    } else {
      player2 = Player(pTwoName, 0);
      players.push(player2);
    }

    document.getElementById('pOneStats').innerText = player1.pName;
    document.getElementById('pTwoStats').innerText = player2.pName;
    const board = Board(player1, player2, game);
    game.updatePlayerStats(players);
    board.showScore();
    board.startGame(player1, player2);
  }

  // eslint-disable-next-line no-undef
  $('#bAddPlayerName').modal('toggle');
});
