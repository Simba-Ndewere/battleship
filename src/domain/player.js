function player(gameBoard) {
    return {
        board: gameBoard,

        getGameBoard: function() {
            return this.board;
        }
    }

}

export default player;