let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const squares = document.querySelectorAll(".square");
const messageText = document.getElementById("message");
const resetButton = document.getElementById("reset-button");

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];
function handleSquareClick(event) {
    const clickedSquare = event.target;
    const clickedIndex = parseInt(clickedSquare.id);

    if (board[clickedIndex] !== "" || !isGameActive) {
        return;
    }

    board[clickedIndex] = currentPlayer;
    clickedSquare.textContent = currentPlayer;
    
    clickedSquare.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageText.textContent = `Player ${currentPlayer} Wins! `;
        isGameActive = false;
        return;
    }

    // Resolves logic parameters if all slots clear with no match lines
    if (!board.includes("")) {
        messageText.textContent = "It's a Draw! ";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageText.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    messageText.textContent = "Tic Tac Toe";
    
    squares.forEach(square => {
        square.textContent = "";
        square.classList.remove("x", "o");
    });
}

squares.forEach(square => square.addEventListener("click", handleSquareClick));
resetButton.addEventListener("click", resetGame);

