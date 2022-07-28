// You'll create a simple word guessing game where the user gets infinite tries to guess the word (like Hangman without the hangman, or like Wheel of Fortune without the wheel and fortune).

// Create two global arrays: one to hold the letters of the word (e.g. 'F', 'O', 'X'), and one to hold the current guessed letters (e.g. it would start with '_', '_', '_' and end with 'F', 'O', 'X').

//                           0    1    2    3 
const secretWordLetters = [ 'T', 'E', 'S', 'T' ];
const guessedLetters    = [ '_', '_', '_', '_' ];

// Write a function called guessLetter that will:
// Take one argument, the guessed letter.

const guessLetter = function( userGuess ){

  console.log(`in guessLetter(), argument userGuess = ${userGuess}`);
  
  // Use this variable to remember what happens in the loop, overall -
  // were ANY of the letters in the secret word a match with the user's guess
  let correctGuessMade = false;

  // Iterate through the word letters
  for (let i = 0; i < secretWordLetters.length; i++) {
    const currentSecretLetter = secretWordLetters[i];
    console.log(i, `currentSecretLetter: ${currentSecretLetter}`);

    // ...and see if the guessed letter is in there.
    if( secretWordLetters[i] === userGuess ){
      // console.log(`MATCH!`);
      // If the guessed letter matches a word letter, changed the guessed letters array to reflect that.
      // Copy the correct letter into the corresponding slot (i.e. same index) of the guessedLetters array - to keep track of which letters were correctly guessed as the game progresses
      guessedLetters[i] = secretWordLetters[i]; 
      console.log( `Correct guess for ${userGuess}! ${guessedLetters} `);

      correctGuessMade = true; // so we can check after the loop is finished

      // break; // stop checking the rest of the letters, i.e. no free duplicates

    } 
    // else {
    //   // Incorrect guess! Print a message
    //   // NOPE!  IT'S TOO EARLY TO SAY INCORRECT GUESS HERE -
    //   // the loop might still be going, checking other letters later on
    //   console.log(`Incorrect guess for ${userGuess}`);
    // }


  } // for

  // ONLY after the loop has finished checking ALL the letters in the word,
  // and NONE of them matched the userGuess, can you say it was an incorrect guess
  if( correctGuessMade === false ){
    console.log(`BAD GUESS`);
  }

  // How to tell if the game is over?

  console.log(`Current game state:  ${guessedLetters}`);

}; // guessLetter()


guessLetter( 'E' ); // should register a correct guess
// guessLetter( 'S' ); // should register a correct guess
// guessLetter( 'T' ); // should register a correct guess
// guessLetter( 'T' ); // should register a correct guess

// When it's done iterating, it should log the current guessed letters ('F__') and congratulate the user if they found a new letter.
// It should also figure out if there are any more letters that need to be guessed, and if not, it should congratulate the user for winning the game.
// Pretend you don't know the word, and call guessLetter multiple times with various letters to check that your program works.
