function shipObject(shipLength) {
    return {
        length: shipLength,
        sunk: false,
        hitSum: 0,
        coordinates: [],

        hit: function () {
            this.hitSum = this.hitSum + 1
        },

        isSunk: function () {
            this.sunk = true
        },

        getCoordinates: function () {
            return this.coordinates;
        }
    }
}

export default shipObject;