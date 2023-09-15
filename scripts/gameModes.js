function gameCoordinateTraining() {
    // Update the correct answer square.
    var correctSquare = "a1";
    correctSquare = getRandomSquare();
    
    function updateCorrectAnswer() { // Update the correct answer
      correctAnswer = levels[levelCounter - 1].correctAnswer(correctSquare);
      console.log(`Correct answer: ${correctAnswer}`);
    }
  
    function placePawn() {
      var pawnColor = currentOrientation === 'white' ? 'w' : 'b'; // Set the pawn color based on the board orientation
      //console.log("Pawn color: ", pawnColor);
      board.position({[correctSquare]: pawnColor + 'P'}); 
    }
  
    updateCorrectAnswer();
    placePawn();
  
    document.getElementById("userInput").placeholder = levels[levelCounter - 1].helper;
  
    //console.log("New correctSquare: ", correctSquare);
    //console.log("New correctAnswer: ", correctAnswer);
  }
  


function gamePieceCoordinates() {
    var correctSquare = "a1";
    console.log("gamePieceCoordinates function called");
    // Update the correct answer piece.
    correctPiece = getRandomPiece();
    // Update the correct answer square.
    correctSquare = getRandomSquare();

    function updateCorrectAnswer() { // Update the correct answer
        correctAnswer = levels[levelCounter - 1].correctAnswer(correctPiece + correctSquare); // <-- Pass the correct piece and square to the correctAnswer function
        console.log(`Correct answer: ${correctAnswer}`);
    }

    function placePiece() {
        var pieceColor = currentOrientation === 'white' ? 'w' : 'b'; // Set the piece color based on the board orientation
        //console.log("Piece color: ", pieceColor);
        //console.log("Piece type: ", correctPiece);
        board.position({[correctSquare]: pieceColor + correctPiece});
    }

    updateCorrectAnswer();
    placePiece();

    document.getElementById("userInput").placeholder = levels[levelCounter - 1].helper; // Update the placeholder text

}


function gamePieceTraining() {
    //console.log("gamePieceTraining function called");
    // Update the correct answer piece.
    correctPiece = getRandomPiece();
    
    function updateCorrectAnswer() { // Update the correct answer
        correctAnswer = levels[levelCounter - 1].correctAnswer(correctPiece);
        console.log(`Correct answer: ${correctAnswer}`);
    }
    
    function placePiece() {
        var pieceColor = currentOrientation === 'white' ? 'w' : 'b'; // Set the piece color based on the board orientation
        //console.log("Piece color: ", pieceColor);
        //console.log("Piece type: ", correctPiece);
        board.position({[correctSquare]: pieceColor + correctPiece});
}
    
    updateCorrectAnswer();
    placePiece();

    document.getElementById("userInput").placeholder = levels[levelCounter - 1].helper;
}       