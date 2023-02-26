// Variables
let gameboard = ["", "", "", "", "", "", "", "", ""];
let currentMark = "O";
let tempX = new Set();
let tempO = new Set();

// Grabbin DOM
const playerMark = document.getElementById("player-mark")
const resetBtn = document.getElementById("resetBtn");
const gameCells = document.getElementsByClassName("game-cell");

// Listeners
resetBtn.addEventListener("click", () => {
    for (let i = 0; i < gameCells.length; i++){
        gameCells[i].innerText = "";
    }
    gameboard = ["", "", "", "", "", "", "", "", ""]
});

document.querySelectorAll('.game-cell').forEach(item =>{
    item.addEventListener('click', (e) => {
        playerMark.innerText = currentMark;
        e.target.innerText = togglePlayer();
        let targetID = parseInt(e.target.id);
        markBoard(targetID, currentMark);
        currentMark === "X" ? tempX.add(targetID) : tempO.add(targetID);
        checkWin();
        console.log(Array.from(tempX.values()));
        console.log(Array.from(tempO.values()));
        console.log(gameboard);
    });
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
            console.log("X WINS");
        }

        if (tempO.has(winConditions[i][0]) && tempO.has(winConditions[i][1]) && tempO.has(winConditions[i][2])) {
            console.log("O WINS");
        }
    }
}