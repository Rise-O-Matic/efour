/*====gameCoordinateTraining.js====*/

var correctSquare = "a1"; // Global variable to store the correct square

function updateCorrectAnswer() { // Update the correct answer
  correctAnswer = levels[levelCounter - 1].correctAnswer(correctSquare);
  console.log(`Correct answer: ${correctAnswer}`);
}

function placePawn() {
  var pawnColor = currentOrientation === 'white' ? 'w' : 'b'; // Set the pawn color based on the board orientation
  console.log("Pawn color: ", pawnColor);
  board.position({[correctSquare]: pawnColor + 'P'}); 
}



function gameCoordinateTraining() {
  // Update the correct answer square.
  correctSquare = getRandomSquare();
  updateCorrectAnswer();
  placePawn();

  document.getElementById("userInput").placeholder = levels[levelCounter - 1].helper;

  //console.log("New correctSquare: ", correctSquare);
  //console.log("New correctAnswer: ", correctAnswer);
}
