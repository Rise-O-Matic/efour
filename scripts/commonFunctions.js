


/*====commonFunctions.js====*/

const correctAnswerSound = new Audio("assets/sounds/correctAnswer.ogg");
const levelUpSound = new Audio("assets/sounds/levelUp.ogg");
const errorSound = new Audio("assets/sounds/error.ogg");
const deleteSound = new Audio("assets/sounds/delete.ogg");


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
      
      // Reinitialize the board
        initBoard(levelCounter);
        updateNotationDisplay(levels[levelCounter-1].displayMode);
    }
  });
}


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


function updateProgressBar() {
    var progressBar = document.getElementById("progressBar");
    
    score += 10; //add 10 points to the score for each correct answer

    progressBar.value = score; // Update the progress bar value
    
    if (score >= 100) {
      //console.log("Level up");
      //console.log("New levelCounter: ", levelCounter);
      //console.log("Display Coordinates for next level: ", levels[levelCounter].displayCoordinates);
      levelUpSound.play();
      spawnParticles(200);
      score = 0; // Reset the score
      progressBar.value = 0; // Explicitly reset the progress bar value
      levelCounter++; // Increment the counter (global variable)
      //document.getElementById('currentLevel').innerText = `Level ${levelCounter}:`; // Update the span text
      initBoard(levelCounter);

    }else{
      correctAnswerSound.play();
    }
}

function getAbsolutePosition(elementId) { // Function to get the absolute position of an element
  const element = document.getElementById(elementId);
  const rect = element.getBoundingClientRect();

  const absoluteTop = rect.top + window.scrollY;
  const absoluteLeft = rect.left + window.scrollX;

  return {
      top: absoluteTop,
      left: absoluteLeft
  };
}

function updateNotationDisplay(mode) {
  if (mode === 'ranks') {
      document.querySelectorAll('.notation-322f9.alpha-d2270').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.notation-322f9.numeric-fc462').forEach(el => el.style.display = 'block');
  } else if (mode === 'files') {
      document.querySelectorAll('.notation-322f9.numeric-fc462').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.notation-322f9.alpha-d2270').forEach(el => el.style.display = 'block');
  } else {
      document.querySelectorAll('.notation-322f9.alpha-d2270').forEach(el => el.style.display = 'block');
      document.querySelectorAll('.notation-322f9.numeric-fc462').forEach(el => el.style.display = 'block');
  }
  
}

