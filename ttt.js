const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMarker = (index, marker) => {
        if (board[index] === "") { // Only allow placing if empty
            board[index] = marker;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, placeMarker, resetBoard };
})();

const Player = (name, marker) => {
    return { name, marker };
};

const GameController = (function () {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    let currentPlayer = player1;
    let scores = { "Player 1": 0, "Player 2": 0 };

    const winningTextElement = document.querySelector('.winning-text');
    const winningMessage = document.querySelector('.winning-message');

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const playRound = (index) => {
        if (Gameboard.getBoard()[index] !== "") return; // Stop function if cell is occupied

        if (Gameboard.placeMarker(index, currentPlayer.marker)) {
            updateUI();
            if (checkWin()) {
                scores[currentPlayer.name]++;
                updateScoreUI();
                winningTextElement.innerText = `${currentPlayer.marker} Win!`;
                winningMessage.classList.remove('hidden');
            }
            if (checkTie()) {
                winningTextElement.innerText = "Draw!"
                winningMessage.classList.remove('hidden');
            }
            switchTurn();
        }
    };

    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];
        return winPatterns.some(pattern => 
            pattern.every(index => board[index] === currentPlayer.marker)
        );
    };

    const checkTie = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    };

    const resetGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        winningMessage.classList.add('hidden');
        updateUI();
    };

    const updateUI = () => {
        document.querySelectorAll(".cell").forEach((cell, index) => {
            cell.textContent = Gameboard.getBoard()[index];
        });
    };

    const updateScoreUI = () => {
        document.getElementById("player1-score").textContent = scores["Player 1"];
        document.getElementById("player2-score").textContent = scores["Player 2"];
    };
    
    return { playRound, resetGame };
})();

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (Gameboard.getBoard()[index] === "") {
                GameController.playRound(index);
                cell.textContent = Gameboard.getBoard()[index];
            }
        });
    });

    document.getElementById("reset-btn").addEventListener("click", () => {
        GameController.resetGame();
    });
});
