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