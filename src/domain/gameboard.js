function gameboard() {
    return {
        allShipsSunk: false,
        shipCoordinates: [],

        receiveAttack: function(coordinates) {
            
        },

        addCoordinates: function(coordinates){
            this.shipCoordinates.push(coordinates);
        },

        shuffle: function() {

        }
    }
}

export default gameboard;