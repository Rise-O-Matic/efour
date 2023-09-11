


/*====main.js====*/

var levelCounter = 1; // Global variable to store the level counter
var levelNumber = 1;  // Global variable to store the level index number assigned to each level
var levelName = 'Placeholder'; // Global variable to store the level name
var board; // Global variable to store the chessboard object
var score = 0; // Global variable to store the score


var gameMode = gameCoordinateTraining; // Global variable to set the game


// Level configuration
const levels = [
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        boardOrientation: 'white',
        levelName: 'Files as White',
        helper: "Enter the pawn's file (a-h)...",
        correctAnswer: (correctSquare => correctSquare[0]),
        displayCoordinates: true,
        displayMode: 'files'
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Files as White, Blind',
        boardOrientation: 'white',
        helper: "Enter the pawn's file (a-h)...",
        correctAnswer: (correctSquare => correctSquare[0]),
        displayCoordinates: true,
        displayMode: 'blind-files'
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Ranks as White',
        boardOrientation: 'white',
        helper: "Enter the pawn's rank (1-8)...",
        correctAnswer: (correctSquare => correctSquare[1]),
        displayCoordinates: true,
        displayMode: 'ranks'
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Ranks as White, Blind',
        boardOrientation: 'white',
        helper: "Enter the pawn's rank (1-8)...",
        correctAnswer: (correctSquare => correctSquare[1]),
        displayCoordinates: true,
        displayMode: 'blind-ranks'
    
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Coordinates as White',
        boardOrientation: 'white',
        helper: "Enter the pawn's coordinate (a1-h8)...",
        correctAnswer: (correctSquare => correctSquare),
        displayCoordinates: true,
        displayMode: 'default'
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Coordinates as White, Blind',
        boardOrientation: 'white',
        helper: "Enter the pawn's coordinate (a1-h8)...",
        correctAnswer: (correctSquare => correctSquare),
        displayCoordinates: true,
        displayMode: 'blind-both'
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        boardOrientation: 'black',
        levelName: 'Files as Black',
        helper: "Enter the pawn's file (a-h)...",
        correctAnswer: (correctSquare => correctSquare[0]),
        displayCoordinates: true,
        displayMode: 'files'
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Files as Black, Blind',
        boardOrientation: 'black',
        helper: "Enter the pawn's file (a-h)...",
        correctAnswer: (correctSquare => correctSquare[0]),
        displayCoordinates: true,
        displayMode: 'blind-files'
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Ranks as Black',
        boardOrientation: 'black',
        helper: "Enter the pawn's rank (1-8)...",
        correctAnswer: (correctSquare => correctSquare[1]),
        displayCoordinates: true,
        displayMode: 'ranks'
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Ranks as Black, Blind',
        boardOrientation: 'black',
        helper: "Enter the pawn's rank (1-8)...",
        correctAnswer: (correctSquare => correctSquare[1]),
        displayCoordinates: true,
        displayMode: 'blind-ranks'
    
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Coordinates as Black',
        boardOrientation: 'black',
        helper: "Enter the pawn's coordinate (a1-h8)...",
        correctAnswer: (correctSquare => correctSquare),
        displayCoordinates: true,
        displayMode: 'default'
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Coordinates as Black, Blind',
        boardOrientation: 'black',
        helper: "Enter the pawn's coordinate (a1-h8)...",
        correctAnswer: (correctSquare => correctSquare),
        displayCoordinates: true,
        displayMode: 'blind-both'
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Coordinates, Player Randomized',
        boardOrientation: 'random',
        helper: "Enter the pawn's coordinate (a1-h8)...",
        correctAnswer: (correctSquare => correctSquare),
        displayCoordinates: true,
        displayMode: 'default'
    },
    {// Level configuration object
        gameMode: gameCoordinateTraining,
        levelName: 'Coordinates, Player Randomized, Blind',
        boardOrientation: 'random',
        helper: "Enter the pawn's coordinate (a1-h8)...",
        correctAnswer: (correctSquare => correctSquare),
        displayCoordinates: true,
        displayMode: 'blind-both'
    },                        
            

    // ... (other levels can be added here in a similar manner


].map((level, index) => ({// Add the level number to each level configuration object
    ...level,
    levelNumber: index + 1,
  }));  

//Function to skip levels

  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.code === 'ArrowRight') {
        // Increment the levelCounter to skip to the next level
        levelCounter++;
        
        // Call the function to initialize the new level
        levelUp();

        console.log('Skipped to level: ' + levelCounter);
    } else if (event.ctrlKey && event.shiftKey && event.code === 'ArrowLeft') {
        // Decrement the levelCounter to go back to the previous level
        levelCounter = Math.max(levelCounter - 1, 1);
        
        // Call the function to initialize the new level
        initBoard(levelCounter);

        console.log('Went back to level: ' + levelCounter);
    }
});

function initializeLevel(level) {
    // Your code to initialize the new level here
    // ...
}




let correctAnswer = levels[levelCounter - 1].correctAnswer(correctSquare);  // Global variable to store the correct answer

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    initBoard(levelCounter);
    correctAnswer = levels[levelCounter - 1].correctAnswer(correctSquare);
    inputValidation();
});