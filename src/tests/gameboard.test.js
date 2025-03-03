import gameboard from '../domain/gameboard';


test('', () => {
    const gameboardObject = gameboard();
    expect(gameboardObject.allShipsSunk).toBe(false);
    expect(gameboardObject.shipCoordinates).toEqual([]);
    expect(gameboardObject).toHaveProperty("receiveAttack");

    expect(gameboardObject).toHaveProperty("shuffle");
});

test('test adding coordinates', () => {
    const gameboardObject = gameboard();
    const array = ['C8', 'F8'];
    gameboardObject.addCoordinates(array);
    expect(gameboardObject.shipCoordinates).toStrictEqual([['C8', 'F8']]);
});

test('test shuffling ship coordinates', () => {
  
});