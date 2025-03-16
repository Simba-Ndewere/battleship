function shipObject(shipLength, shipIdentification) {
    return {
        length: shipLength,
        sunk: false,
        hitSum: 0,
        coordinates: [],
        shipId: shipIdentification,

        hit: function () {
            this.hitSum = this.hitSum + 1
        },

        isSunk: function () {
            this.sunk = true
        },

        getCoordinates: function () {
            return this.coordinates;
        },

        addCoordinates: function(coordinates) {
            this.coordinates = coordinates;
        },

        getShipIdentification: function(){
            return this.shipId;
        }
    }
}

export default shipObject;