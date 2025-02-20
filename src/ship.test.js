import shipObject from './ship'

test('ship object', () => {
    expect(shipObject(4)).toMatchObject({
        length: 4,
        sunk: false,
        hitSum: 0,
    });
    expect(shipObject(3)).toHaveProperty("hit");
    expect(shipObject(3)).toHaveProperty("isSunk");
});

test('ship is sunk test', () => {
    const data = shipObject(3);
    expect(data.sunk).not.toBeTruthy();
    data.isSunk();
    expect(data.sunk).toBeTruthy();
});

test('ship is hit test', () => {
    const data = shipObject(3);
    expect(data.hitSum).toBe(0);
    data.hit();
    expect(data.hitSum).toBe(1);
});
