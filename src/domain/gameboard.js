import ship from './ship'

function gameboard() {
    return {
        allShipsSunk: false,
        shipCoordinates: [],
        duplicateCells: [],

        receiveAttack: function (coordinates) {

        },

        addCoordinates: function (coordinates) {
            this.shipCoordinates.push(coordinates);
        },

        shuffle: function () {

            let shipsArray = [];

            this.shipCoordinates.length = 0;
            this.duplicateCells.length = 0;

            const cruiser = ship(2);
            shipsArray.push(cruiser);
            let cruiserAxes = this.direction(2);
            let cruiserCoordinates = this.generateCoordinates(cruiser, cruiserAxes);
            this.shipCoordinates.push(cruiserCoordinates);            

            const battleship = ship(4);
            shipsArray.push(battleship);
            let battleshipAxes = this.direction(2);
            let battleshipCoordinates = this.generateCoordinates(battleship, battleshipAxes);
            this.shipCoordinates.push(battleshipCoordinates);

            const submarine = ship(3);
            shipsArray.push(submarine);
            let submarineAxes = this.direction(2);
            let submarineCoordinates = this.generateCoordinates(submarine, submarineAxes);
            this.shipCoordinates.push(submarineCoordinates);

            const aircraft = ship(5);
            shipsArray.push(aircraft);
            let aircraftAxes = this.direction(2);
            let aircraftCoordinates = this.generateCoordinates(aircraft, aircraftAxes);
            this.shipCoordinates.push(aircraftCoordinates);

            const destroyer = ship(3);
            shipsArray.push(destroyer);
            let destroyerAxes = this.direction(2);
            let destroyerCoordinates = this.generateCoordinates(destroyer, destroyerAxes);
            this.shipCoordinates.push(destroyerCoordinates);
            
            console.log(this.shipCoordinates);
            return shipsArray;
        },

        generateCoordinates: function (ship, axes) {

            let complete = false;
            let exit = false;
            let shipLength = ship.length;
            let shipCoordinates = [];

            while (!exit) {
                let startingPosition = this.direction(100);

                if (!this.duplicateCells.includes(startingPosition)) {
                    this.duplicateCells.push(startingPosition);
                    shipCoordinates.push(startingPosition);
                }

                let direction = axes == 1 ? this.verticalDirection(startingPosition) : this.horizontalDirection(startingPosition);

                for (let a = 1; a < shipLength; a++) {
                    if (axes == 1) {
                        if (direction === 'up') {
                            startingPosition = startingPosition - 10;

                        } else {
                            startingPosition = startingPosition + 10;
                        }


                    } else {
                        if (direction === 'left') {
                            startingPosition = startingPosition - 1;
                        } else {
                            startingPosition = startingPosition + 1;
                        }

                    }

                    if (this.duplicateCells.includes(startingPosition)) {
                        shipCoordinates.length = 0;
                        break;
                    } else {
                        shipCoordinates.push(startingPosition);
                        this.duplicateCells.push(startingPosition);
                    }

                    if (startingPosition < 0 || startingPosition > 99) {
                        shipCoordinates.length = 0;
                        break;
                    }

                    if (a == shipLength -1){
                        complete = true;
                    }
                }

                if(complete){
                    exit = true;
                }
            }
            return shipCoordinates;
        },

        direction: function (max) {
            return Math.floor(Math.random() * max);
        },

        verticalDirection: function (sp) {
            let direction = '';

            let topEdge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            let bottomEdge = [91, 92, 93, 94, 95, 96, 97, 98, 99];

            direction = this.direction(2) == 0 ? 'up' : 'down'

            if (topEdge.includes(sp))
                direction = 'down';

            if (bottomEdge.includes(sp))
                direction = 'up';

            return direction;
        },

        horizontalDirection: function (sp) {
            let direction = '';

            let leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
            let rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];

            direction = this.direction(2) == 0 ? 'right' : 'left'

            if (leftEdge.includes(sp))
                direction = 'right';

            if (rightEdge.includes(sp))
                direction = 'left';

            return direction;
        }
    }
}

export default gameboard;