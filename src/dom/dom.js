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
}

export default Dom;
