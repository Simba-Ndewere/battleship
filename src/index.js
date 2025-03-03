import "./index.css";
import Dom from "./dom/dom.js";
import ship from './domain/ship.js';
import gameboard from "./domain/gameboard.js";

const shuffleShips = document.getElementById('shuffle');
const newGame = document.getElementById('newGame');

Dom.createBoardGrids();

const createShips = () => {
    const playerGameBoard = gameboard();

    const cruiser = ship(2);

    const battleship = ship(4);
    const submarine = ship(3);
    const aircraft = ship(5);
    const destroyer = ship(3);

    Dom.playerDefaultPlacement(battleship, 'a', 12);
    Dom.playerDefaultPlacement(cruiser, 'u', 46);
    Dom.playerDefaultPlacement(submarine, 'u', 40);
    Dom.playerDefaultPlacement(aircraft, 'a', 81);
    Dom.playerDefaultPlacement(destroyer, 'u', 89);
}

shuffleShips.addEventListener('click', function () {
    console.log("shuffle");
});

newGame.addEventListener('click', function () {
    console.log("new game");
});

window.onload = createShips();

