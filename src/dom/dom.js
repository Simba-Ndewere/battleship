
class Dom {

    static createBoardGrids(){
        const board1 = document.querySelector(".board1");
        const board2 = document.querySelector(".board2");

        for(let a = 0; a < 100; a++){
            const cell = document.createElement("div");
            const cell2 = document.createElement("div");

            cell.classList.add("cell");
            cell2.classList.add("cell2");

            cell.id = 'cell' + a;
            cell2.id = 'cell2' + a;
            board1.appendChild(cell);
            board2.appendChild(cell2);
        }
    }

    static playerDefaultPlacement(ship, direction, startingPosition) {
        for(let a = 0; a < ship.length; a++){
            const cell = document.getElementById("cell" + startingPosition);
            cell.classList.add("shipPlacement");

            if(direction === 'a'){
                startingPosition = startingPosition + 1;
            }

            if(direction === 'u'){
                startingPosition = startingPosition - 10;
            }

        }
    }
}

export default Dom;
