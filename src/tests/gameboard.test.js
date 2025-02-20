import gameboard from '../domain/gameboard';

test('', () => {
    const gameboardObject = gameboard();
    expect(gameboardObject.allShipsSunk).toBe(false);
    expect(gameboardObject.coordinates).toEqual([]);
    expect(gameboardObject).toHaveProperty("receiveAttack");
});