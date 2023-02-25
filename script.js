let gameboard = ["X", "X", "X", "", "", "", "", "", ""];
currentMark = "O";

// Grabbin DOM
const playerMark = document.getElementById("player-mark")
const resetBtn = document.getElementById("resetBtn");
const gameCells = document.getElementsByClassName("game-cell");

// Listeners
resetBtn.addEventListener("click", () => {
    // console.log(gameCells);
    for (let i = 0; i < gameCells.length; i++){
        gameCells[i].innerText = "";
    }
    gameboard = ["", "", "", "", "", "", "", "", ""]
});

document.querySelectorAll('.game-cell').forEach(item =>{
    item.addEventListener('click', (e) => {
        playerMark.innerText = currentMark;
        e.target.innerText = togglePlayer();
        let targetID = e.target.id;
        markBoard(targetID, currentMark);
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

    // console.log(winConditions[0][0]);
    // for (let i of winConditions){
    //     console.log(i);
    //     for (let j of i){
    //         console.log(j);
    //         console.log(gameboard[j]);
    //     }
    // }

    function checkX(arrayofIndexes){
        for (let i of arrayofIndexes){
            if (gameboard[i] === "X"){
                console.log(`X is present at index ${[i]}`);
            }
            else{
                console.log(`X not present at index ${[i]}`)
                break;
            }
        }
    }
    console.log(checkX(winConditions[0]));
}

checkWin();