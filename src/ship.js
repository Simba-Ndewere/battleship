function shipObject(shipLength) {
    return {
        length: shipLength,
        sunk: false,
        hitSum: 0,

        hit: function () {
            this.hitSum = this.hitSum + 1
        },

        isSunk: function () {
            this.sunk = true
        }
    }
}

export default shipObject;