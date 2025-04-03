import "./index.css";
import dom from "./dom/dom.js";
import ship from './domain/ship.js';
import gameboard from "./domain/gameboard.js";
import player from "./domain/player.js";

const shuffleShips = document.getElementById('shuffle');
const newGame = document.getElementById('newGame');
const computerBoard = document.querySelector(".board2");

const playerGameBoard = gameboard();
const computerGameBoard = gameboard();

const currentPlayer = player();
const computerPlayer = player();

const hitShips = [];
const firstShipCoordinates = [];

const directionArray = [];

const attackedCells = [];
const hitCells = [];

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
    dom.lockUnlockBoard(0);
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
        dom.lockUnlockBoard(1);
    } else {
        location.reload();
    }
});

const attackPlayerBoard = (id) => {
    let changeTurn = [];
    changeTurn = playerGameBoard.receiveAttack(id, "playerCell");
    attackedCells.push(id);

    if (changeTurn) {
        dom.hitOrMissDisplay("miss");
        dom.displayPlayerTurn(0);
        dom.lockUnlockBoard(1);

        if (hitCells.length == 1) {
            changeDirection();
        }

        if(hitCells.length > 1){
            hitCells.push(firstShipCoordinates[0]);
            oppositeDirection();
        }

    } else {
        dom.hitOrMissDisplay("hit");
        dom.displayPlayerTurn(1);
        console.log("HIT");
        const ship = checkShipHit(id);

        if (hitCells.length == 0) {
            const direction = initialDirection(id);
            directionArray.push(initialDirection(id));

            if(direction == 'noLeft' || direction == 'noRight' || direction == 'noDown' || direction == 'noUp'){
                changeDirection();
            }
        }

        if (!hitShips.includes(ship)) {
            hitShips.push(ship);
            firstShipCoordinates.push(id);
        }

        if (hitShips[0].coordinates.includes(id)) {
            hitCells.push(id);
        }

        setTimeout(function () {
            checkForAdjacentCells();
        }, 4000);
    }
}

computerBoard.addEventListener("click", (event) => {
    let changeTurn = [];

    if (event.target.classList.contains("cell2")) {
        let id = Number(event.target.id.substring(12));
        changeTurn = computerGameBoard.receiveAttack(id, "computerCell");
    }

    if (changeTurn) {
        dom.lockUnlockBoard(0);
        dom.hitOrMissDisplay("miss");
        dom.displayPlayerTurn(1);
        setTimeout(function () {

            if (hitShips.length == 0) {
                let randomNumber = computerPick(100);
                attackPlayerBoard(randomNumber);
            } else {
                //continue with adjacent cells
                checkForAdjacentCells();
            }
        }, 4000);
    } else {
        dom.hitOrMissDisplay("hit");
        dom.displayPlayerTurn(0);
    }
});

const checkForAdjacentCells = () => {
    //always continue with ship at [0]
    console.log("called");
    //check ship sunk 
    let newShip = checkShipSunk();

    if (newShip) {
        console.log("ship sunk");
        //delete from hitShips[0]
        console.log("firstShipcoordinates" + firstShipCoordinates);
        console.log("hitCells" + hitCells);
        console.log("ship[0] coordinates" + hitShips[0].coordinates);

        firstShipCoordinates.shift();
        hitCells.length = 0;
        hitShips.shift();
        directionArray.length = 0;

        if (firstShipCoordinates != 0) {
            hitCells.push(firstShipCoordinates[0]);
            //directionArray.push(initialDirection(firstShipCoordinates[0]));
            const direction = initialDirection(firstShipCoordinates[0]);
            directionArray.push(initialDirection(firstShipCoordinates[0]));
            
            if(direction == 'noLeft' || direction == 'noRight' || direction == 'noDown' || direction == 'noUp'){
                changeDirection();
            }
            checkForAdjacentCells();
        } else {
            let randomNumber = computerPick(100);
            attackPlayerBoard(randomNumber);
        }
        //delete from firstShipCoordinates[0]
        //clear hitCells and place firstShipCoordinates[1] at hitCell[0]
        //attack new ship

    } else {
        console.log("switch");
        console.log("direction array" + directionArray);
        switch (directionArray[directionArray.length - 1]) {
            case 'left': attackPlayerBoard(hitCells[hitCells.length - 1] - 1);
                break;
            case 'right': attackPlayerBoard(hitCells[hitCells.length - 1] + 1);
                break;
            case 'up': attackPlayerBoard(hitCells[hitCells.length - 1] - 10);
                break;
            case 'down': attackPlayerBoard(hitCells[hitCells.length - 1] + 10);
                break;
        }
    }
}

const checkShipSunk = () => {
    return hitShips[0].isSunk();
}

const computerPick = (max) => {
    let exit = false;
    let generatedNumber = 0; attackedCells[attackedCells.length]
    while (!exit) {
        generatedNumber = Math.floor(Math.random() * max);
        if (!attackedCells.includes(generatedNumber)) {
            attackedCells.push(generatedNumber);
            exit = true;
        }
    }
    return generatedNumber
}

const oppositeDirection = () => {
    switch (directionArray[directionArray.length - 1]) {
        case 'left':
            directionArray.push('right');
            break;
        case 'right':
            directionArray.push('left');
            break;
        case 'down':
            directionArray.push('up');
            break;
        case 'top':
            directionArray.push('down');
            break;
    }
}

const checkOutOfBounds = (id) => {
    let overboard = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 9, 19, 29, 39, 49, 59, 69, 79, 89, 99];

    if (overboard.includes(id)) {
        return true;
    } else {
        return false;
    }
}

const checkShipHit = (coordinate) => {
    const ship = playerGameBoard.checkShipHit(coordinate);
    return ship;
}

const random = (max) => {
    return Math.floor(Math.random() * max);
}


const changeDirection = () => {
    const directions = ["left", "right", "up", "down"];
    let exit = true;
    console.log("check direction");
    while (exit) {
        const newDirection = directions[random(4)];

        if (directionArray[0] == 'noDown' && newDirection == 3) {
            continue;
        }

        if (directionArray[0] == 'noUp' && newDirection == 2) {
            continue;
        }

        if (directionArray[0] == 'noRight' && newDirection == 1) {
            continue;
        }

        if (directionArray[0] == 'noLeft' && newDirection == 0) {
            continue;
        }

        if (directionArray.includes('noLeft') && directionArray.includes('noUp')) {
            if (newDirection == 0) {
                continue;
            }

            if (newDirection == 2) {
                continue;
            }
        }

        if (directionArray.includes('noRight') && directionArray.includes('noUp')) {
            if (newDirection == 1) {
                continue;
            }

            if (newDirection == 2) {
                continue;
            }
        }

        if (directionArray.includes('noRight') && directionArray.includes('noDown')) {
            if (newDirection == 1) {
                continue;
            }

            if (newDirection == 3) {
                continue;
            }
        }

        if (directionArray.includes('noLeft') && directionArray.includes('noDown')) {
            if (newDirection == 0) {
                continue;
            }

            if (newDirection == 3) {
                continue;
            }
        }

        if (!directionArray.includes(newDirection)) {
            directionArray.push(newDirection);
            exit = false;
        }
    }
}


const initialDirection = (coordinate) => {
    let direction = '';
    let numDirection = random(4);

    let topEdge = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let bottomEdge = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];

    let leftEdge = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    let rightEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];


    switch (numDirection) {
        case 0: direction = 'up'
            break;
        case 1: direction = 'down'
            break;
        case 2: direction = 'right'
            break;
        case 3: direction = 'left'
            break;
    }

    if (topEdge.includes(coordinate))
        direction = 'noUp';

    if (bottomEdge.includes(coordinate))
        direction = 'noDown';

    if (leftEdge.includes(coordinate))
        direction = 'noLeft';

    if (rightEdge.includes(coordinate))
        direction = 'noRight';


    switch (coordinate) {
        case 0: directionArray.push('noUp');
            break;
        case 9: directionArray.push('noUp');
            break;
        case 90: directionArray.push('noDown');
            break;
        case 99: directionArray.push('noDown');
            break;
    }

    return direction;
}

window.onload = createDefaultPlayerShips();

