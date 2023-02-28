// Variables
let gameboard = ["", "", "", "", "", "", "", "", ""];
let currentMark = "O";
let tempX = new Set();
let tempO = new Set();

// Grabbin DOM
const playerMark = document.getElementById("player-mark")
const resetBtn = document.getElementById("resetBtn");
const gameCells = document.getElementsByClassName("game-cell");
const winModal = document.getElementById("modal-container");
const newGameBtn = document.getElementById("newGameBtn");
const winnerText = document.getElementById("winner");

// Listeners
resetBtn.addEventListener("click", () => {
    resetGame();
});

document.querySelectorAll('.game-cell').forEach(item =>{
    item.addEventListener('click', (e) => {
        //Store the cell ID in a variable
        let targetID = parseInt(e.target.id);

        //Check if the target square is already filled, if so just return
        if (gameboard[targetID] != ""){
            console.log("That cell is taken");
            return;
        }
        else{
        //Setting announcement text to whoevers turn it is (X/O)
        playerMark.innerText = currentMark;
        //Setting cell to X or O depending on player
        e.target.innerText = togglePlayer();
        //Mark the board at target id with current mark
        markBoard(targetID, currentMark);
        //Check if mark is X or O and add to proper set
        currentMark === "X" ? tempX.add(targetID) : tempO.add(targetID);
        checkWin();
        // console.log(Array.from(tempX.values()));
        // console.log(Array.from(tempO.values()));
        // console.log(gameboard);
        }
    });
});

newGameBtn.addEventListener('click', () => {
    winModal.classList.remove('show');
    winModal.style.display = "none";
    resetGame();
});


// Constructor and objects
function Player (mark) {
    this.mark = mark;
}

const player1 = new Player ("X");
const player2 = new Player ("O");


// Functions
function togglePlayer(){
    if (currentMark === player1.mark){
        currentMark = player2.mark
    }
    else {
        currentMark = player1.mark
    }
    return currentMark;
}

function resetGame(){
    for (let i = 0; i < gameCells.length; i++){
        gameCells[i].innerText = "";
    }
    tempX.clear();
    tempO.clear();
    gameboard = ["", "", "", "", "", "", "", "", ""]
}

function markBoard(index, currentMark){
    gameboard[index] = currentMark;
}

function checkWin() {
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
            winModal.style.display = "";
            winModal.classList.add('show');
            winnerText.innerText = "Player X Wins!";
        }

        if (tempO.has(winConditions[i][0]) && tempO.has(winConditions[i][1]) && tempO.has(winConditions[i][2])) {
            // console.log("O WINS");
            winModal.style.display = "";
            winModal.classList.add('show');
            winnerText.innerText = "Player O Wins!";
        }
    }

    if (!gameboard.includes("")){
        winModal.style.display = "";
        winModal.classList.add('show');
        winnerText.innerText = "Tie Game!";
    }
}