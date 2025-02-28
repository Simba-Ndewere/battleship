import "./index.css";
import Dom from "./dom/dom.js";

const shuffleShips = document.getElementById('shuffle');
const newGame = document.getElementById('newGame');

Dom.createBoardGrids();

shuffleShips.addEventListener('click', function () {
    console.log("shuffle");
});

newGame.addEventListener('click', function() {
    console.log("new game");
});


