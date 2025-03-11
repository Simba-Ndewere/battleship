import "./index.css";
import Dom from "./dom/dom.js";
import ship from './domain/ship.js';
import gameboard from "./domain/gameboard.js";

const shuffleShips = document.getElementById('shuffle');
const newGame = document.getElementById('newGame');
const playerGameBoard = gameboard();

Dom.createBoardGrids();

const createShips = () => {
    
    const cruiser = ship(2);
    const battleship = ship(4);
    const submarine = ship(3);
    const aircraft = ship(5);
    const destroyer = ship(3);

    Dom.playerDefaultPlacement(battleship, 'a', 12, playerGameBoard, "green");
    Dom.playerDefaultPlacement(cruiser, 'u', 46, playerGameBoard, "black");
    Dom.playerDefaultPlacement(submarine, 'u', 40, playerGameBoard, "yellow");
    Dom.playerDefaultPlacement(aircraft, 'a', 81, playerGameBoard, "purple");
    Dom.playerDefaultPlacement(destroyer, 'u', 89, playerGameBoard,"red");
}

shuffleShips.addEventListener('click', function () {
    Dom.clearBoardCells();
    Dom.placeShipsOnBoard(playerGameBoard.shuffle());
});

newGame.addEventListener('click', function () {
    console.log("new game");
});

window.onload = createShips();

