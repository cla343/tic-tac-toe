/*
const boardDiv = document.querySelector(".board");

for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    boardDiv.appendChild(cell);
}
*/
// 
const X_Class = 'x';
const O_Class = 'o';
const WINNING_COMBOS = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
]
const cellElements = document.querySelectorAll('.cell');
const board = document.querySelector('.board');
const winningTextElement = document.querySelector('.winning-text');
const winningMessage = document.querySelector('.winning-message');
const restartButton = document.querySelector('.reset');
let xTurn = true;

startGame();
restartGame();

function startGame() {
    document.querySelector('.board').classList.add('x');
    cellElements.forEach(cell => {
        cell.classList.remove(X_Class);
        cell.classList.remove(O_Class);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    });
    winningMessage.classList.add('hidden');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? X_Class : O_Class;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
    switchTurns(); 
    }
}

function endGame(draw) {
    if(draw) {
        winningTextElement.innerText = "Draw!"
        winningMessage.classList.remove('hidden');
    } else {
        winningTextElement.innerText = `${xTurn ? "X's" : "O's"} Win!`;
        winningMessage.classList.remove('hidden');
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurns() {
    xTurn = !xTurn;
    board.classList.toggle(X_Class);
    board.classList.toggle(O_Class);
}

function checkWin(currentClass) {
   return WINNING_COMBOS.some(combination => {
    return combination.every(index => {
    return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_Class) || cell.classList.contains(O_Class)
    })
}

function restartGame() {
    restartButton.addEventListener('click', startGame);
}