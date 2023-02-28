const Player = (sign) => {
    this.sign = sign;
    
    const getSign = () => {
        return sign;
    }

    return {getSign};
}

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const markBoard = (index, currentMark) =>{
        board[index] = currentMark;
    }

    const getField = (index) =>{
        if (index > board.length) return;
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return {
        markBoard, getField, board, reset
    }
})();

const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let tempX = new Set();
    let tempO = new Set();
    let currentMark = "X";

    const resetGame = (gameCells) => {
        for (let i = 0; i < gameCells.length; i++){
            gameCells[i].innerText = "";
        }
        tempX.clear();
        tempO.clear();
        gameBoard.reset();
    }

    const togglePlayer = () => {
        if (currentMark === playerX.getSign()){
            currentMark = playerO.getSign()
        }
        else {
            currentMark = playerX.getSign()
        }
        return currentMark;
    }

    const checkWin = () => {
        const winConditions = [
            [0, 1, 2], 
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    
        for (i = 0; i < winConditions.length; i++) {
            if (tempX.has(winConditions[i][0]) && tempX.has(winConditions[i][1]) && tempX.has(winConditions[i][2])) {
                // console.log("X WINS");
                displayController.winModal.style.display = "";
                displayController.winModal.classList.add('show');
                displayController.winnerText.innerText = "Player O Wins!";
            }
    
            if (tempO.has(winConditions[i][0]) && tempO.has(winConditions[i][1]) && tempO.has(winConditions[i][2])) {
                // console.log("O WINS");
                displayController.winModal.style.display = "";
                displayController.winModal.classList.add('show');
                displayController.winnerText.innerText = "Player X Wins!";
            }
        }
    
        if (!gameBoard.board.includes("")){
            displayController.winModal.style.display = "";
            displayController.winModal.classList.add('show');
            displayController.winnerText.innerText = "Tie Game!";
        }
    }

    return {checkWin, togglePlayer, resetGame, tempO, tempX};
})();

const displayController = (() => {
    const playerMark = document.querySelector("#player-mark")
    const resetBtn = document.querySelector("#resetBtn");
    const gameCells = document.querySelectorAll(".game-cell");
    const winModal = document.querySelector("#modal-container");
    const newGameBtn = document.querySelector("#newGameBtn");
    const winnerText = document.querySelector("#winner");

    resetBtn.addEventListener("click", () => {
        gameController.resetGame(gameCells);
    });
    
    document.querySelectorAll('.game-cell').forEach(item =>{
        item.addEventListener('click', (e) => {
            //Store the cell ID in a variable
            let targetID = parseInt(e.target.id);
    
            //Check if the target square is already filled, if so just return
            if (gameBoard.getField(targetID) != ""){
                console.log("That cell is taken");
                return;
            }
            else{
            //Setting announcement text to whoevers turn it is (X/O)
            playerMark.innerText = gameController.togglePlayer();

            //Setting cell to X or O depending on player
            e.target.innerText = gameController.togglePlayer();

            //Mark the board at target id with current mark
            gameBoard.markBoard(e.target.id, gameController.togglePlayer());

            //Check if mark is X or O and add to proper set
            playerMark.innerText === "X" ? gameController.tempX.add(targetID) : gameController.tempO.add(targetID);
            gameController.checkWin();
            console.log(Array.from(gameController.tempX.values()));
            console.log(Array.from(gameController.tempO.values()));
            }
        });
    });
    
    newGameBtn.addEventListener('click', () => {
        winModal.classList.remove('show');
        winModal.style.display = "none";
        gameController.resetGame(gameCells);
    });

    return {winModal, winnerText}
})();