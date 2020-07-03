import { Board, validateEmptiness } from '../dom';

describe('DOM JS objects and functions testing', () => {
  test('Board object should have Player 1 attribute', () => {
    expect(Board('Player1', 'Player2', 'GameObject {...}').player1).toBe('Player1');
  });
  test('Board object should have Player 2 attribute', () => {
    expect(Board('Player1', 'Player2', 'GameObject {...}').player2).toBe('Player2');
  });
  test('Board object should have Game attribute', () => {
    expect(Board('Player1', 'Player2', 'GameObject {...}').game).toBe('GameObject {...}');
  });
  test('Validate Emptiness, if form inputs are not empty then: true', () => {
    expect(validateEmptiness('test', 'string')).toBe(true);
  });
});