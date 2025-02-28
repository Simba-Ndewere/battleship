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
    const gameboardObject = gameboard();
    const array = ['C2', 'F2'];
    const array2 = ['A3', 'A5'];
    const array3 = ['B9', 'F9'];
    const array4 = ['J9', 'J7'];
    const array5 = ['G5', 'G4'];

    gameboardObject.addCoordinates(array);
    gameboardObject.addCoordinates(array2);
    gameboardObject.addCoordinates(array3);
    gameboardObject.addCoordinates(array4);
    gameboardObject.addCoordinates(array5);

    gameboardObject.shuffle();

    const coordinates = gameboardObject.shipCoordinates;

    expect(coordinates).not.toEqual(expect.arrayContaining([['C2', 'F2']]));

});