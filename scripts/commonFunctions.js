


/*====commonFunctions.js====*/

const correctAnswerSound = new Audio("assets/sounds/correctAnswer.ogg");
const levelUpSound = new Audio("assets/sounds/levelUp.ogg");
const errorSound = new Audio("assets/sounds/error.ogg");
const deleteSound = new Audio("assets/sounds/delete.ogg");

// Function to save the game state
function saveGameState() {
  localStorage.setItem('gameState', JSON.stringify({
    level: levelCounter,
    score: score
  }));
}


// Function to generate random positions for a given color
function getRandomSquare() {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    return randomFile + randomRank;
  }

  
//keydown event listener that plays a sound when the user presses backsapce and prevents any other sound from playing
document.addEventListener('keydown', function(event) {
  if (event.code === 'Backspace') {
    deleteSound.play();
  }
}
);


// Function to validate user inputs
function inputValidation() {
let inputField = document.getElementById("userInput"); 
  
  inputField.addEventListener("input", function(event) {// Listen for input events
    let userInput = event.target.value;
    let isMatch = true;
  
    // Loop to compare each character
    for(let i = 0; i < userInput.length; i++) {
      if(userInput[i] !== correctAnswer[i]) {
        isMatch = false;
        break;
      }
    }
  
    // If any character doesn't match, apply strike-thru and make it red
    if(!isMatch) {
      errorSound.play();
      inputField.style.textDecoration = "line-through";
      inputField.style.color = "red";
    } else {
      inputField.style.textDecoration = "none";
      inputField.style.color = "black";
    }
  
    // If fully correct, accept answer
    if(userInput === correctAnswer) {
      updateProgressBar();

      // Clear the field
      inputField.value = "";
      
      
    }
  });
}

// Function to spawn particles
function spawnParticles(numParticles) {
  const container = document.getElementById('particle-container');

  for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 5 + 1; // create random size between 1
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `50%`;
      particle.style.top = `50%`;
      container.appendChild(particle);

      // Animate the particle
      setTimeout(() => {
          particle.style.left = `${Math.random() * 100}vw`;
          particle.style.top = `${Math.random() * 100}vh`;
          particle.style.opacity = 0;
      }, 10);

      // Remove the particle after animation
      setTimeout(() => {
          particle.remove();
      }, 2000);
  }
}

function levelUp() {
  levelUpSound.play();
  spawnParticles(200);
  progressBar.value = 0; 
  score = 0; 

  // Increment the level counter
  levelCounter++;

  // Clear the board
  board.clear();

  // Display the overlay for the next level
  setTimeout(levelStart, 0);
}

// Function to alternate the board orientation
function alternateBoardOrientation() {
  if (levels[levelCounter].orientation === 'alternating') {
    if (currentOrientation === 'white') {
      board.orientation('black');
      currentOrientation = 'black';
    } else {
      board.orientation('white');
      currentOrientation = 'white';
    }
  }
}

// Update the progress bar and level up if necessary
function updateProgressBar() {
  var progressBar = document.getElementById("progressBar");
  
  score += 10; //add 10 points to the score for each correct answer

  progressBar.value = score; // Update the progress bar value
  
  if (score >= 100) {
    levelUp();
    
  }else{
    correctAnswerSound.play();
    initBoard(levelCounter);
  }
}

function levelStart() {
  // Get the current level configuration
  var currentLevelConfig = levels[levelCounter-1];

  // Access the overlay element
  var overlay = document.getElementById('overlay');

  // Update the overlay with the level information
  overlay.innerText = 'Level ' + currentLevelConfig.levelNumber + ': ' + currentLevelConfig.levelName;

  // Display the overlay
  //overlay.style.display = 'flex';

  // Set a timeout to hide the overlay and initiate the next level setup after 3 seconds
  setTimeout(function() {
    overlay.style.display = 'none';
    initBoard();
  }, );
}

// Function to focus the user input field
function focusInputField() {
  document.getElementById('userInput').focus();
}