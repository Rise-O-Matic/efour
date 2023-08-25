document.addEventListener("DOMContentLoaded", function() {
    var board,
        game = new Chess();
        currentPiece,  // Declare global variable for the current piece
        currentSquare;  // Declare global variable for the current square's position
        
    var cfg = {
        draggable: true,
        position: 'empty',
        onDragStart: onDragStart,
        onDrop: onDrop,
        pieceTheme: 'libs/chessboardjs/img/chesspieces/wikipedia/{piece}.png'
    };

    board = Chessboard('myBoard', cfg);

    var pieces = ['P', 'R', 'N', 'B', 'Q', 'K'];
    var squares = [
        'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
        'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
        'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
        'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
        'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
        'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
        'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
        'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',

    ];

// Global variables
var currentPiece, currentSquare;

function randomPieceAndPosition() {
    currentPiece = pieces[Math.floor(Math.random() * pieces.length)];
    currentSquare = squares[Math.floor(Math.random() * squares.length)];

    game.clear();
    game.put({ type: currentPiece.toLowerCase(), color: 'w' }, currentSquare);

    var fen = game.fen();
    console.log("Generated FEN:", fen);
    console.log("Correct Answer: Piece -", currentPiece, "Square -", currentSquare);  // Reporting the correct answer to the console
    board.position(fen, false);
}

document.getElementById('notationInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        var inputValue = e.target.value.trim().toUpperCase();
        
        var userPiece = (inputValue.length === 3) ? inputValue[0] : 'P'; // Default to Pawn if not specified
        var userSquare = (inputValue.length === 3) ? inputValue.substr(1).toLowerCase() : inputValue.toLowerCase();

        var currentPosition = board.position();
        var pieceAtSquare = currentPosition[userSquare];
        
        console.log("Piece at square (from board.position()):", pieceAtSquare);
        console.log("User's expected piece:", userPiece);

        if (pieceAtSquare && pieceAtSquare[1] === userPiece) {
            randomPieceAndPosition();
            e.target.value = '';
        } else {
            console.log('Incorrect notation');
        }        
    }
});







 randomPieceAndPosition();

    function onDragStart(source, piece, position, orientation) {
        if (game.in_checkmate() === true || game.in_draw() === true || 
            piece.search(/^b/) !== -1) {
            return false;
        }
    }

    function onDrop(source, target) {
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        if (move === null) return 'snapback';

        updateStatus();
    }

    function updateStatus() {
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Black';
        }

        if (game.in_checkmate()) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }
        else if (game.in_draw()) {
            status = 'Game over, drawn position';
        }
        else {
            status = moveColor + ' to move';
            if (game.in_check()) {
                status += ', ' + moveColor + ' is in check';
            }
        }

        console.log(status);
    };
});


