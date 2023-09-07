


/*====initBoard.js====*/

let hintTimeout;  // Declare this variable at the top scope to manage the timeout
var board; // Global variable to store the chessboard object
var lastOrientation; // Variable to store the last orientation
var currentOrientation; // Variable to store the current orientation

// Initialize the board with unmovable pieces
function initBoard() {

  //console.log("InitBoard called");
  console.log("Current levelCounter: ", levelCounter);

  // Get the current level configuration
  var currentLevelConfig = levels[levelCounter-1];

  var currentOrientation = levels[levelCounter-1].boardOrientation; // Get the board orientation from the current level configuration
  if (currentOrientation === "random") {
      currentOrientation = Math.random() < 0.5 ? "white" : "black"; // Randomly set to "white" or "black"
  }

  // Clear any existing timeouts
  clearTimeout(hintTimeout);
    
  // Check if the orientation has changed and apply the rotation if it has
  if (lastOrientation && lastOrientation !== currentOrientation) {
    var boardElement = document.getElementById('board');
    boardElement.classList.add('rotate-board');
    console.log('rotating board');
    
    // Remove the class after the animation duration (1s) to reset it
    setTimeout(() => boardElement.classList.remove('rotate-board'), 1000);
  }

  window.onload = function() {
    updateNotationDisplay(levels[levelCounter-1].displayMode);
  };
  
  
  // Initialize the board with the current orientation
  board = Chessboard('board', {
    draggable: false,
    position: 'empty',
    pieceTheme: 'libs/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
    showNotation: levels[levelCounter - 1].displayCoordinates,
    orientation: currentOrientation
  });

  // Update the last orientation variable
  lastOrientation = currentOrientation;

  // Update the background color based on orientation
  var mainElement = document.querySelector('main');
    var orientationSpan = document.getElementById('boardOrientation'); // <-- Get the span that will display orientation

    if (currentOrientation === 'white') {
        mainElement.className = 'white-oriented';
        orientationSpan.innerText = 'White'; // <-- Update the span text
    } else {
        mainElement.className = 'black-oriented';
        orientationSpan.innerText = 'Black'; // <-- Update the span text
    }

  // Update the info panel with the current level information

  document.getElementById('levelNameElement').innerText = currentLevelConfig.levelName;
  document.getElementById('levelCounterElement').innerText = currentLevelConfig.levelNumber;

  gameMode()

}
