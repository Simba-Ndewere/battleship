class Dom {

    static createBoard1Grid(){
        const board1 = document.querySelector(".board1");
        const board2 = document.querySelector(".board2");

        for(let a = 0; a < 100; a++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = 'cell' + a;
            board1.appendChild(cell);
        }
    }
}

export default Dom;
