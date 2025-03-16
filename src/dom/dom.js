
class Dom {
    static colours = ["black", "green", "blue", "purple", "yellow"];
    static colour = 0;

    static createBoardGrids() {
        const board1 = document.querySelector(".board1");
        const board2 = document.querySelector(".board2");

        for (let a = 0; a < 100; a++) {
            const cell = document.createElement("div");
            const cell2 = document.createElement("div");

            cell.classList.add("cell");
            cell2.classList.add("cell2");

            cell.id = 'playerCell' + a;
            cell2.id = 'computerCell' + a;
            board1.appendChild(cell);
            board2.appendChild(cell2);
        }
    }

    static playerDefaultPlacement(ship, direction, startingPosition, gameboard) {
        let coordinates = [];
        for (let a = 0; a < ship.length; a++) {
            const cell = document.getElementById("playerCell" + startingPosition);
            cell.classList.add("shipPlacement");
            cell.style.border = "solid 5px " + this.colours[this.colour];
            coordinates.push(startingPosition);

            if (direction === 'a') {
                startingPosition = startingPosition + 1;
            }

            if (direction === 'u') {
                startingPosition = startingPosition - 10;
            }
        }
        this.colour = this.colour + 1;
        gameboard.addCoordinates(coordinates);
        ship.addCoordinates(coordinates);
    }

    static clearBoardCells() {
        for (let a = 0; a < 100; a++) {
            let cell = document.getElementById("playerCell" + a);
            if (cell.classList.contains("shipPlacement")){
                cell.classList.remove("shipPlacement");
                cell.style.border = "none";
            }
        }
    }

    static placePlayerShipsOnBoard(coordinates) {
        for(let b = 0; b < coordinates.length; b++){
            for (let a = 0; a < coordinates[b].length; a++) {
                const cell = document.getElementById("playerCell" + coordinates[b][a]);
                cell.classList.add("shipPlacement");
                cell.style.border = "solid 5px " + this.colours[b];
            }
        }
    }

    static placeComputerShipsOnBoard(coordinates){
        for(let b = 0; b < coordinates.length; b++){
            for (let a = 0; a < coordinates[b].length; a++) {
                const cell = document.getElementById("computerCell" + coordinates[b][a]);
                cell.classList.add("shipPlacement");
                cell.style.border = "solid 5px " + this.colours[b];
            }
        }
    }

    static removeShuffleButton() {
        const shuffleShipsButton = document.getElementById("shuffle");
        shuffleShipsButton.classList.add("hideShuffleButton");
        const newGameButton = document.querySelector(".startGameText");
        newGameButton.textContent = "Quit Game";
    }
}

export default Dom;
