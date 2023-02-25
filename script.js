const gameboard = [];
currentMark = "O";

// Grabbin DOM
const playerMark = document.getElementById("player-mark")
const resetBtn = document.getElementById("resetBtn");
const gameCells = document.getElementsByClassName("game-cell");

// Listeners
resetBtn.addEventListener("click", () => {
    console.log(gameCells);
    for (let i = 0; i < gameCells.length; i++){
        gameCells[i].innerText = "";
    }
});

document.querySelectorAll('.game-cell').forEach(item =>{
    item.addEventListener('click', (e) => {
        playerMark.innerText = currentMark;
        e.target.innerText = toggleMark();
    });
});

// Constructor and objects
function Player (sign) {
    this.sign = sign;
}

const player1 = new Player ("X");
const player2 = new Player ("O");


// Functions
function toggleMark(){
    if (currentMark === "X"){
        currentMark = "O"
    }
    else {
        currentMark = "X"
    }
    return currentMark;
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
}



