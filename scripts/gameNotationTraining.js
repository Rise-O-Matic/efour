


/*====gameNotationTraining.js====*/

/*This is the script for the Algebraic Notation Training game
Global initialization for all games is performed in main.js*/

//var inputField = document.getElementById("userInput"); // Initialize the input field

document.getElementById("inputFieldHelper").innerHTML = "Enter the coordinate...";
  
  // Function to update the board with the moves
  function updateBoardWithMoves(chess, move) {
      board.position(chess.fen());
  
      const fromSquare = move.from;
      const toSquare = move.to;
      
      // Add arrow from the fromSquare to toSquare
      //board.addArrow(fromSquare, toSquare, 'blue');
  }
  
  //Function to generate a random move
  function generateRandomMove() {
      
      // Initialize board with one white and one black piece
      const chess = generateLegalPosition();
      
      // Simulate and output a random legal move for white
      const legalMovesWhite = chess.moves({ verbose: true });
      if (legalMovesWhite.length > 0) {
          const randomMoveWhite = legalMovesWhite[Math.floor(Math.random() * legalMovesWhite.length)];
          chess.move(randomMoveWhite.san);
          
          updateBoardWithMoves(chess, randomMoveWhite); // Update board for white's move
          console.log(`White moves: ${randomMoveWhite.san}`);
      }
      
      // Simulate and output a random legal move for black
      const legalMovesBlack = chess.moves({ verbose: true });
      if (legalMovesBlack.length > 0) {
          const randomMoveBlack = legalMovesBlack[Math.floor(Math.random() * legalMovesBlack.length)];
          chess.move(randomMoveBlack.san);
  
          updateBoardWithMoves(chess, randomMoveBlack); // Update board for black's move
          console.log(`Black moves: ${randomMoveBlack.san}`);
      }
  }