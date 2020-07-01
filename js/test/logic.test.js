import * as Logic from '../logic';

test('Player element should have pName attribute', () => {
  expect(Logic.Player('testPlayer', 0).pName).toBe('testPlayer');
});

test('Player element should have pWins attribute', () => {
  expect(Logic.Player('testPlayer', 0).pWins).toBe(0);
});

test('If no players information exists in local storage the players inside the game must be an empty array', () => {
  expect(Logic.Game().players.length).toBe(0);
});

test('The game should be saved in an array item', () => {
  expect(Array.isArray(Logic.Game().players)).toBe(true);
});

test('The game should have the game winning combinations stored in an array item', () => {
  expect(Array.isArray(Logic.Game().winCombinations)).toBe(true);
});

test('The game should have 8 winning combinations', () => {
  expect(Logic.Game().winCombinations.length).toEqual(8);
});

test('The game should start with the turn attribute settled in true', () => {
  expect(Logic.Game().turnSwap()).toBe(true);
});
