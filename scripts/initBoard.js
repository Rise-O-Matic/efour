


/*====initBoard.js====*/

let hintTimeout;  // Declare this variable at the top scope to manage the timeout
var board; // Global variable to store the chessboard object
var lastOrientation; // Variable to store the last orientation
var currentOrientation; // Variable to store the current orientation

// Console log the current Orientation
console.log('Current orientation:', currentOrientation);

function initBoard() {
  updateBoard();
}

// Create the board with unmovable pieces
function updateBoard() {

  // Get the current level configuration
  var currentLevelConfig = levels[levelCounter-1];

  currentOrientation = levels[levelCounter-1].boardOrientation; // Get the board orientation from the current level configuration
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
  
  // Create the board with the current orientation
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

  // Function to update the notation display mode
  function updateNotationDisplay(mode) {
    var rankNotations = document.querySelectorAll('.notation-322f9.numeric-fc462');
    var fileNotations = document.querySelectorAll('.notation-322f9.alpha-d2270');
  
  console.log('Current mode:', mode);
  
  if (rankNotations[0]) {
    console.log('Rank notations before:', rankNotations[0].textContent, rankNotations[0].style.display);
  } else {
    console.log('Rank notations not found');
  }
  
  if (fileNotations[0]) {
    console.log('File notations before:', fileNotations[0].textContent, fileNotations[0].style.display);
  } else {
    console.log('File notations not found');
  }
  
  
    //Set the notation display mode according to the current level configuration
    if (mode === 'ranks') {
      console.log('Applying styles for mode: ranks');
      fileNotations.forEach(el => { el.style.display = 'none'; el.textContent = ''; });
      rankNotations.forEach(el => { el.style.display = 'block'; });
    } else if (mode === 'files') {
      console.log('Applying styles for mode: files');
      rankNotations.forEach(el => { el.style.display = 'none'; el.textContent = ''; });
      fileNotations.forEach(el => { el.style.display = 'block'; }); 
    } else if (mode === 'blind-ranks') {
      console.log('Applying styles for mode: blind-ranks');
      rankNotations.forEach(el => { el.style.display = ''; el.textContent = '?'; });
      fileNotations.forEach(el => { el.style.display = 'none'; el.textContent = ''; });
    } else if (mode === 'blind-files') {
      console.log('Applying styles for mode: blind-files');
      rankNotations.forEach(el => { el.style.display = 'none'; el.textContent = ''; });
      fileNotations.forEach(el => { el.style.display = ''; el.textContent = '?'; });
    } else if (mode === 'blind-both') {
      console.log('Applying styles for mode: blind-both');
      rankNotations.forEach(el => { el.style.display = ''; el.textContent = '?'; });
      fileNotations.forEach(el => { el.style.display = ''; el.textContent = '?'; });
    } else {
      console.log('Applying default styles');
      fileNotations.forEach(el => { el.style.display = 'block'; });
      rankNotations.forEach(el => { el.style.display = 'block'; });
    }
      
      console.log('Rank notations after:', rankNotations[0].textContent, rankNotations[0].style.display);
      console.log('File notations after:', fileNotations[0].textContent, fileNotations[0].style.display);
    
    }
  
  // Update the notation display mode
  updateNotationDisplay(levels[levelCounter-1].displayMode);
  

  // Update the info panel with the current level information
  document.getElementById('levelNameElement').innerText = currentLevelConfig.levelName;
  document.getElementById('levelCounterElement').innerText = currentLevelConfig.levelNumber;

  gameMode()

}


