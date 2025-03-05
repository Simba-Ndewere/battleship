import ship from './ship'

function gameboard() {
    return {
        allShipsSunk: false,
        shipCoordinates: [],

        receiveAttack: function (coordinates) {

        },

        addCoordinates: function (coordinates) {
            this.shipCoordinates.push(coordinates);
        },

        shuffle: function () {

            let topEdge = [0,1,2,3,4,5,6,7,8,9];
            let leftEdge = [0,10,20,30,40,50,60,70,80,90];
            let rightEdge = [9,19,29.39,49,59,69,79,89,99];
            let bottomEdge = [91,92,93,94,95,96,97,98,99];

            let shipsArray = [];
            let duplicateCells = [];

            this.shipCoordinates.length = 0;
            //clear DOM

            const cruiser = ship(2);
            shipsArray.push(cruiser);
            const battleship = ship(4);
            shipsArray.push(battleship);
            const submarine = ship(3);
            shipsArray.push(submarine);
            const aircraft = ship(5);
            shipsArray.push(aircraft);
            const destroyer = ship(3);
            shipsArray.push(destroyer);

            return shipsArray;
        },

        direction: function (max) {
            return Math.floor(Math.random() * max);
        },


        startingPosition: function (max) {
            return Math.floor(Math.random() * max);
        }


    }
}

export default gameboard;