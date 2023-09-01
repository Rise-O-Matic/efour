// Global variables
var board;
var whitePieces = ['P', 'R', 'N', 'B', 'Q', 'K'];
var blackPieces = ['P', 'R', 'N', 'B', 'Q', 'K'];
var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
var notationInputField = document.getElementById('notationInput');
var generatedAlgebraicNotation; // The notation generated by the program
var currentPieceWhite, currentPieceBlack, currentSquareWhite, currentSquareBlack; // The current piece and square
var showCoordinates = false; // Default value


// Initialize the board with unmovable pieces
function initBoard() {
    
    // Randomly choose between white and black for the orientation
    var randomOrientation = Math.random() < 0.5 ? 'white' : 'black';
    // Randomly choose between white and black for the pieces
    var randomPieceColor = Math.random() < 0.5 ? 'white' : 'black';

    // Configuration for the chessboard
    var cfg = {
        draggable: false,
        position: 'empty',
        pieceTheme: 'libs/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
        showNotation: showCoordinates,  // Use the global variable directly
        orientation: randomOrientation  // set the orientation here
    };

    // Initialize the board
    board = Chessboard('board', cfg);

    // Update the background color based on orientation
    var mainElement = document.querySelector('main');
    if (randomOrientation === 'white') {
        mainElement.className = 'white-oriented';  // Lighter color for white orientation
    } else {
        mainElement.className = 'black-oriented';  // Darker color for black orientation
    }

    // Generate and place a random piece based on randomPieceColor
    randomPieceAndPosition(randomPieceColor === 'white');
    updateInfoPanel(randomOrientation, currentLevel.mode, "Enter the notation for the " + randomPieceColor + " piece");

}


// Generate a random algebraic notation and return it as an object
function generateAlgebraicNotation(color) {
    // Choose the correct array based on color
    const pieces = color === 'white' ? whitePieces : blackPieces;

    var piece = pieces[Math.floor(Math.random() * pieces.length)];
    
    // Adjust ranks based on piece type
    if (piece === "P") { // White pawn
        piece = ""; // Convert notation
        ranks.splice(ranks.indexOf('1'), 1); // Remove '1' from ranks
    } else if (piece === "p") { // Black pawn
        piece = ""; // Convert notation 
        ranks.splice(ranks.indexOf('8'), 1); // Remove '8' from ranks
    }

    var randomFile = files[Math.floor(Math.random() * files.length)];
    var randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    
    var notation = piece + randomFile + randomRank;
    
    console.log(`Generated Random Notation (Correct Answer): ${notation}`);

    generatedAlgebraicNotation = notation; // Store the generated notation

    return {
        notation: notation,
        piece: piece || 'P', // Use 'P' as the default piece for empty string notation
        square: randomFile + randomRank
    };
}


// Transcode the algebraic notation into the format for board.position
function transcodeNotationForBoardPosition(notation, color) {
    var piece;
    var square;

    if (notation.length === 2) {
        piece = 'P';
        square = notation;
    } else if (notation.length === 3) {
        piece = notation.charAt(0).toUpperCase();
        square = notation.substr(1, 2);
    } else {
        console.error("Invalid notation:", notation);
        return {};
    }

    var position = {};
    position[square] = (color === 'white' ? 'w' : 'b') + piece;

    console.log(`Notation: ${notation}, Resultant position object:`, position);
    return position;
}


// Generate and place a random piece (or two for the dual mode)
function randomPieceAndPosition(isWhite, isTwoPieces = false) {
    const placePiece = (color) => {
        const pieceData = generateAlgebraicNotation(color);
        const position = transcodeNotationForBoardPosition(pieceData.notation, color);
        board.position(position, false);  // Update this line to set the new position
        return pieceData;
    };

    // Clear the board before placing new pieces
    board.position('empty', false);

    if (isWhite) {
        const whiteData = placePiece('white');
        currentPieceWhite = whiteData.piece;
        currentSquareWhite = whiteData.square;
    } else {
        const blackData = placePiece('black');
        currentPieceBlack = blackData.piece;
        currentSquareBlack = blackData.square;
    }

    if (isTwoPieces) {
        let secondColor = isWhite ? 'black' : 'white';
        let secondData;
        do {
            secondData = placePiece(secondColor);
        } while (secondData.square === (isWhite ? currentSquareWhite : currentSquareBlack));

        if (isWhite) {
            currentPieceBlack = secondData.piece;
            currentSquareBlack = secondData.square;
        } else {
            currentPieceWhite = secondData.piece;
            currentSquareWhite = secondData.square;
        }
    }
}


document.addEventListener("DOMContentLoaded", function() {

    // Initialize the board
    initBoard();
    console.log('Board initialized');
});


// Create a function to reset all the elements
function resetGame() {
    initBoard();
    const whiteData = generateAlgebraicNotation('white');
}


document.getElementById('coordinateToggle').addEventListener('change', function() {
    showCoordinates = this.checked;  // Update the global variable

    // Retrieve the current board position before re-initializing
    const currentPosition = board.position();

    const cfg = {
        draggable: false,
        position: currentPosition,
        pieceTheme: 'libs/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
        showNotation: showCoordinates  // Update this to reflect the value of showCoordinates
    };
    
    board = Chessboard('board', cfg);  // Re-initialize the board with the updated configuration

    // No need to reset the game here, the board will keep its current state
});



//Update the Info Panel
function updateInfoPanel(orientation, level, prompt) {
    document.getElementById('boardOrientation').innerText = orientation;
    document.getElementById('currentLevel').innerText = level;
    document.getElementById('userPrompt').innerText = prompt;
}


// Handle user input
document.getElementById('notationInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {  // Check if the 'Enter' key was pressed
        var inputValue = notationInputField.value.trim();
        // Log the user's input
        console.log('User Input: ', inputValue);

        if (validateUserInput(inputValue)) {
            console.log('Correct notation');
            // Randomize board orientation along with generating a new random piece and position
            initBoard(true); 
            notationInputField.value = '';  // Clear the input field
        } else {
            console.log('Incorrect notation');
            notationInputField.value = '';  // Clear the input field
        }
    }
});


// Current level configuration
var currentLevel = {
    mode: 'full',
    turn: 'white',
    coordinates: true
};


function validateFullNotation(input) {
    console.log('Expected Notation:', generatedAlgebraicNotation);

    return input === generatedAlgebraicNotation;
}


function validateUserInput(input) {
    switch (currentLevel.mode) {
        case 'full':
            return validateFullNotation(input);
        default:
            console.error("Invalid game mode:", currentLevel.mode);
            return false;
    }
}

