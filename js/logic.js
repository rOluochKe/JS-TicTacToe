/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const Player = (name, wins) => {
  const pName = name;
  const pWins = wins;
  return { pName, pWins };
};

const Game = () => {
  const winCombinations = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]];

  const getPlayersLS = () => {
    const playersArr = localStorage.getItem('players') === null ? [] : JSON.parse(localStorage.getItem('players'));
    return playersArr;
  };

  const players = getPlayersLS();

  let xTurn = false;

  const turnSwap = () => {
    xTurn = !xTurn;
    return xTurn;
  };

  const winCheck = () => {
    const playerWinner1 = winCombinations.some(combination => combination.every(index => cellsArr[index].dataset.player === '1'));
    const playerWinner2 = winCombinations.some(combination => combination.every(index => cellsArr[index].dataset.player === '2'));
    return [playerWinner1, playerWinner2];
  };

  const updatePlayerStats = (playersToUpdate) => {
    localStorage.setItem('players', JSON.stringify(playersToUpdate));
  };

  return {
    players, updatePlayerStats, turnSwap, winCheck,
  };
};

const resetGame = () => {
  window.location.reload();
};
