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
    const array = ['cell46', 'cell36'];
    gameboardObject.addCoordinates(array);
    expect(gameboardObject.shipCoordinates).toStrictEqual([['cell46', 'cell36']]);
});

test('test shuffling ship coordinates', () => {

    const uniqueCells = [];
    const gameboardObject = gameboard();

    const array4 = ['cell81', 'cell82', 'cell83', 'cell84' , 'cell85'];
    const array5 = ['cell12', 'cell13', 'cell14', 'cell15']
    gameboardObject.addCoordinates(array4);
    gameboardObject.addCoordinates(array5);

    gameboardObject.shuffle();
    
    expect(gameboardObject.shipCoordinates[0]).toHaveLength(5);
    for(let a = 0; a < gameboardObject.shipCoordinates.length; a++){
        for(let b = 0; b < gameboardObject.shipCoordinates[a].length; b++){
            let cellNumber = Number(gameboardObject.shipCoordinates[a][b].substring(4));
            expect(cellNumber).toBeGreaterThanOrEqual(0);
            expect(cellNumber).toBeLessThanOrEqual(99);

            expect(uniqueCells).not.toContain(cellNumber);
            uniqueCells.push(cellNumber);
        }
    }

    for(let a = 0; a < gameboardObject.shipCoordinates.length; a++){
        for(let b = 0; b < gameboardObject.shipCoordinates[a].length; b++){
            let cell = gameboardObject.shipCoordinates[a][b].substring(0,4);
            expect(cell).toEqual('cell');
        }
    }


});
