// Global variables
var board;
var pieces = ['P', 'R', 'N', 'B', 'Q', 'K'];
var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
var currentPieceWhite, currentPieceBlack, currentSquareWhite, currentSquareBlack;

// Initialize the board with unmovable pieces
function initBoard() {
    var cfg = {
        draggable: false,
        position: 'empty',
        pieceTheme: 'libs/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
        showNotation: false,
    };
    board = Chessboard('board', cfg);
}

function getRandomPieceAndSquare() {
    const notation = generateRandomPieceAndSquare();
    return {
        notation: notation,
        piece: notation.charAt(0),
        square: notation.substr(1)
    };
}

// Consolidated function for generating a random piece and square
function generateRandomPieceAndSquare() {

    var piece = pieces[Math.floor(Math.random() * pieces.length)];
    // Adjust ranks based on piece type
    if (piece === "P") { // White pawn
        piece = ""; // Convert notation
        ranks.splice(ranks.indexOf('1'), 1); // Remove '1' from ranks
    } else if (piece === "p") { // Black pawn
        ranks.splice(ranks.indexOf('8'), 1); // Remove '8' from ranks
    }

    var randomFile = files[Math.floor(Math.random() * files.length)];
    var randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    
    var notation = piece + randomFile + randomRank;
    
    console.log(`Generated Random Notation (Correct Answer): ${notation}`);
    return notation;
}

// Convert the algebraic notation into the format for board.position
function transcodeNotationForBoardPosition(notation, color) {
    var piece;
    var square;

    if (notation.length === 2) {
        piece = 'P';
        square = notation;
    } else if (notation.length === 3) {
        piece = notation.charAt(0);
        square = notation.substr(1, 2);
    } else {
        console.error("Invalid notation:", notation);
        return {};
    }

    var position = {};
    position[square] = (color === 'white' ? 'w' : 'b') + piece.toUpperCase();

    console.log(`Notation: ${notation}, Resultant position object:`, position);
    return position;
}


// Use the transcoded notation to place a piece on the board
function placePieceOnBoard(notation, color) {
    var position = transcodeNotationForBoardPosition(notation, color);
    board.position(position, false);
}

// Generate and place a random piece (or two for the dual mode)
function randomPieceAndPosition(isTwoPieces = false) {
    const whiteData = getRandomPieceAndSquare();
    currentPieceWhite = whiteData.piece;
    currentSquareWhite = whiteData.square;
    placePieceOnBoard(whiteData.notation, 'white');
    
    if (isTwoPieces) {
        let blackData;
        do {
            blackData = getRandomPieceAndSquare();
        } while (blackData.square === currentSquareWhite);
        
        currentPieceBlack = blackData.piece;
        currentSquareBlack = blackData.square;
        placePieceOnBoard(blackData.notation, 'black');
    }
}


document.addEventListener("DOMContentLoaded", function() {
    initBoard();
    randomPieceAndPosition();
});

// Handle user input
document.getElementById('notationInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        var inputValue = e.target.value.trim();
        if (validateUserInput(inputValue)) {
            console.log('Correct notation');
            randomPieceAndPosition(currentLevel.mode === 'dual');
        } else {
            console.log('Incorrect notation');
        }
    }
});


// Current level configuration
var currentLevel = {
    mode: 'full',
    turn: 'white',
    coordinates: true
};

function validatePieceOnly(input) {
    if (currentLevel.turn === 'white') {
        return input === currentPieceWhite;
    } else {
        return input === currentPieceBlack;
    }
}

function validateRankOnly(input) {
    if (currentLevel.turn === 'white') {
        return input === currentSquareWhite.charAt(1);
    } else {
        return input === currentSquareBlack.charAt(1);
    }
}

function validateFileOnly(input) {
    if (currentLevel.turn === 'white') {
        return input === currentSquareWhite.charAt(0);
    } else {
        return input === currentSquareBlack.charAt(0);
    }
}

function validateFullNotation(input) {
    if (currentLevel.turn === 'white') {
        return input === (currentPieceWhite + currentSquareWhite);
    } else {
        return input === (currentPieceBlack + currentSquareBlack);
    }
}

function validateDualNotation(input) {
    var firstPiece = input.charAt(0);
    var firstSquare = input.substr(1, 2);
    var secondPiece = input.charAt(3);
    var secondSquare = input.substr(4, 2);
    
    return (firstPiece === currentPieceWhite && firstSquare === currentSquareWhite) && 
           (secondPiece === currentPieceBlack && secondSquare === currentSquareBlack);
}

function validateUserInput(input) {
    switch (currentLevel.mode) {
        case 'piece':
            return validatePieceOnly(input);
        case 'rank':
            return validateRankOnly(input);
        case 'file':
            return validateFileOnly(input);
        case 'full':
            return validateFullNotation(input);
        case 'dual':
            return validateDualNotation(input);
        default:
            console.error("Invalid game mode:", currentLevel.mode);
            return false;
    }
}

