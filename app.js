let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random() * (max - min + 1)) + min,
    guessesLeft = 5;

console.log(winningNum);
const gameWrapper = document.querySelector('#game'),
      minNumber = document.querySelector('.min-num'),
      maxNumber = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessButton = document.querySelector('#guess-button'),
      message = document.querySelector('.message');
      
minNumber.textContent = min;
maxNumber.textContent = max;


// Event listener to toggle play-again --- browser refresh
guessButton.addEventListener('click', startGame);
gameWrapper.addEventListener('mousedown', playAgain);
  

function startGame() {
  let guess = parseInt(guessInput.value);

  // Confirm input conditions ----- input >= min number <= max number
  if (isNaN(guess) || guess < min || guess > max) {
    guessInput.value = '';
    guessInput.style.borderColor = 'red';
    showMessage(`Input must be between ${min} and ${max}`, 'red');
    
  } else if (guess !== winningNum) {
    
    guessInput.style.borderColor = 'red';
    guessesLeft -= 1;
    
      if (guessesLeft === 1) {
          guessInput.value = '';
          showMessage(`${guess} is incorrect, You have ${guessesLeft} guess left!`, 'red');
      } else {
          guessInput.value = '';
          showMessage(`${guess} is incorrect, You have ${guessesLeft} guesses left!`, 'red');
        }
        
        if (guessesLeft == 0) {
          guessInput.value = '';
          toggleGameOver(false, `Game Over, YOU LOST!`)
        }
      }
        
    if (guess === winningNum) {
      guessInput.value = '';
      toggleGameOver(true, `${winningNum} is correct. YOU WIN!`);
  } 
}

function toggleGameOver(won, msg) {
  let colour;
  won === true ? colour = 'green' : colour = 'red';

  guessInput.disabled = true;
  guessInput.style.borderColor = colour;
  message.style.color = colour;
  showMessage(msg);

  guessButton.value = 'RETRY';
  guessButton.classList.add('play-again');
}

function showMessage(msg, msgColour) {
  message.innerText = msg;
  message.style.color = msgColour;
}

// RETRY Function to fire off when players loses or wins
function playAgain(e) {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
}