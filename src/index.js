import "./index.css";
import dom from "./dom/dom.js";
import ship from './domain/ship.js';
import gameboard from "./domain/gameboard.js";
import player from "./domain/player.js";

const shuffleShips = document.getElementById('shuffle');
const newGame = document.getElementById('newGame');
const playerBoard = document.querySelector(".board1");
const computerBoard = document.querySelector(".board2");

const playerGameBoard = gameboard();
const computerGameBoard = gameboard();

const currentPlayer = player();
const computerPlayer = player();
let playerTurn = 0; // 0 for player and 1 for computer

dom.createBoardGrids();

const createDefaultPlayerShips = () => {

    const cruiser = ship(2);
    const battleship = ship(4);
    const submarine = ship(3);
    const aircraft = ship(5);
    const destroyer = ship(3);

    const ships = [cruiser, battleship, submarine, aircraft, destroyer];

    const startingPositions = [12, 46, 40, 81, 89];

    for (let a = 0; a < ships.length; a++) {
        if (ships[a].length > 3) {
            dom.playerDefaultPlacement(ships[a], 'a', startingPositions[a], playerGameBoard);
        } else {
            dom.playerDefaultPlacement(ships[a], 'u', startingPositions[a], playerGameBoard);
        }
        playerGameBoard.ships.push(ships[a]);
    }
    currentPlayer.addGameBoard(playerGameBoard);
}

shuffleShips.addEventListener('click', function () {
    dom.clearBoardCells();
    dom.placePlayerShipsOnBoard(playerGameBoard.shuffle());
});

newGame.addEventListener('click', (event) => {
    if (event.target.textContent === 'Start Game') {
        dom.placeComputerShipsOnBoard(computerGameBoard.shuffle());
        dom.removeShuffleButton();
        computerPlayer.addGameBoard(computerGameBoard);
    } else {
        location.reload();
    }
});

playerBoard.addEventListener("click", (event) => {
    let changeTurn = true;

    if (event.target.classList.contains("cell")) {
        let id = Number(event.target.id.substring(10));
        changeTurn = playerGameBoard.receiveAttack(id, "playerCell");
    }

    if (changeTurn) {
        dom.hitOrMissDisplay("miss");
        dom.displayPlayerTurn(0);
        dom.lockUnlockBoard(1);
    } else {
        dom.hitOrMissDisplay("hit");
        dom.displayPlayerTurn(1);
    }
});

computerBoard.addEventListener("click", (event) => {
    let changeTurn = true;

    if (event.target.classList.contains("cell2")) {
        let id = Number(event.target.id.substring(12));
        changeTurn = computerGameBoard.receiveAttack(id, "computerCell");
    }

    if (changeTurn) {
        dom.lockUnlockBoard(0);
        dom.hitOrMissDisplay("miss");
        dom.displayPlayerTurn(1);
    } else {
        dom.hitOrMissDisplay("hit");
        dom.displayPlayerTurn(0);
    }
});

window.onload = createDefaultPlayerShips();

