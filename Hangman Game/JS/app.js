const modal = document.querySelector("#modal");
const instructions = document.querySelector("#instructions");
const game = document.querySelector("#game");
const close = document.querySelector("#close");
const menu = document.querySelector("#menu");
const gameScreen = document.querySelector("#game_screen");
const livesText = document.querySelector("#lives");
const head = document.querySelector("#head");
const leftArm = document.querySelector("#left_arm");
const rightArm = document.querySelector("#right_arm");
const midArms = document.querySelector("#mid_arms");
const leftLeg = document.querySelector("#left_leg");
const midLegs = document.querySelector("#mid_legs");
const rightLeg = document.querySelector("#right_leg");
const showWord = document.querySelector("#show_word");
const lengthOfWord = document.querySelector("#length");
const guessBtn = document.querySelector("#guess");
const showError = document.querySelector("#show_error");
const showMessage = document.querySelector("#show_message");
const wordDisp = document.querySelector("#word_disp");
const contentDisplay = document.querySelector("#content__display");
// live count and word to be guesses vars
let totalLives = 5;
const wordToBeGuessed = "home";
let show = "";
// helper functions
function showSuccessMessage(message, ele, time) {
  ele.parentElement.classList.remove("disp_hide");
  ele.textContent = message;
  setTimeout(() => {
    ele.parentElement.classList.add("disp_hide");
  }, time);
}
function reloadPage() {
  location.reload();
}
function goToMenu() {
  modal.classList.add("disp_hide");
  menu.classList.remove("disp_hide");
  gameScreen.classList.remove("disp_hide");
}
function resetEverything() {
  totalLives = 5;
  head.classList.add("disp_hide");
  leftArm.classList.add("disp_hide");
  midArms.classList.add("disp_hide");
  rightArm.classList.add("disp_hide");
  leftLeg.classList.add("disp_hide");
  midLegs.classList.add("disp_hide");
  rightLeg.classList.add("disp_hide");
  guessBtn.previousElementSibling.value = "";
  livesText.textContent = totalLives;
  lengthOfWord.textContent = returnLength(wordToBeGuessed);
  show = wordToBlanks(wordToBeGuessed);
  showWord.textContent = show;
}
// show blanks equal to length of words
function wordToBlanks(word) {
  let show = "";
  for (let i = 0; i < word.length; i++) {
    show += "-";
  }
  return show;
}
function returnLength(word) {
  return word.length;
}
// will check word and if it exists then will return -1 if it doesnt then
// it will return either 1 or 0
function checkWord(guess, word) {
  let index;
  let wordGuessState = show;
  if (show.includes(guess)) {
    return {
      status: -1,
      word: show,
    };
  } else {
    let flag = 0;
    for (let i = 0; i < word.length; i++) {
      if (word[i] === guess) {
        wordGuessState =
          wordGuessState.substring(0, i) +
          guess +
          wordGuessState.substring(i + 1);
        flag = 1;
      }
    }
    if (flag == 1) {
      return {
        status: 1,
        word: wordGuessState,
      };
    } else {
      return {
        status: 0,
        word: wordGuessState,
      };
    }
  }
}
//show parts of a man will take lives
function hangmanShowWhenWrong(lives) {
  if (lives == 4) {
    head.classList.remove("disp_hide");
  } else if (lives == 3) {
    leftArm.classList.remove("disp_hide");
    midArms.classList.remove("disp_hide");
  } else if (lives == 2) {
    rightArm.classList.remove("disp_hide");
  } else if (lives == 1) {
    leftLeg.classList.remove("disp_hide");
    midLegs.classList.remove("disp_hide");
  } else if (lives == 0) {
    rightLeg.classList.remove("disp_hide");
  }
}
//main runner function
function validateGuess(e) {
  if (totalLives != 0) {
    const userGuess = e.target.previousElementSibling.value;
    let guessCharacter;
    if (userGuess.length == 0) {
      showSuccessMessage("Input field cannot be empty", showError, 2000);
      return;
    } else if (!isNaN(userGuess)) {
      showSuccessMessage("Numbers are not allowed!!!", showError, 2000);
      return;
    } else if (userGuess.length > 1) {
      showSuccessMessage("Enter Single Character", showMessage, 2000);
      return;
    }
    guessCharacter = userGuess[0].toLowerCase();

    let obj = checkWord(guessCharacter, wordToBeGuessed);
    if (obj.status == 1) {
      show = obj.word;
      showWord.textContent = show.toUpperCase();
      if (show.toLowerCase() === wordToBeGuessed.toLocaleLowerCase()) {
        modal.classList.remove("disp_hide");

        contentDisplay.innerHTML = `<h1 > You Won! </h1> <p style='text-align:center'> Word was indeed ${wordToBeGuessed.toUpperCase()}</p> <br> <br> <div class="menu__section_options">
              <button id="again" onClick='reloadPage()'>Play Again</button>
              <button id="menu" onClick='goToMenu()'>Menu</button>
            </div>`;
        return;
      }
    } else if (obj.status == 0) {
      totalLives -= 1;
      hangmanShowWhenWrong(totalLives);
      livesText.textContent = totalLives;
      if (totalLives == 0) {
        modal.classList.remove("disp_hide");

        contentDisplay.innerHTML = `<h1> You Lost! </h1> <p style='text-align:center'> Word was ${wordToBeGuessed.toUpperCase()}</p> <br> <br> <div class="menu__section_options">
          <button id="again" onClick='reloadPage()'>Play Again</button>
          <button id="menu" onClick='goToMenu()'>Menu</button>
        </div>`;
        return;
      } else {
        showSuccessMessage("Wrong Guess!!! Try Again", showError, 2000);
      }
    } else if (obj.status == -1) {
      showSuccessMessage("Already Guessed!!!", showMessage, 2000);
    }
  }
  guessBtn.previousElementSibling.value = "";
}

//event listeners
window.addEventListener("load", () => {
  resetEverything();
});
instructions.addEventListener("click", () => {
  modal.classList.remove("disp_hide");
  contentDisplay.innerHTML = ` <h1>Instructions</h1>
  <hr />
  <ol>
    <li>User is required to give input which will be checked later</li>
    <li>User will have 5 lives</li>
    <li>If input is wrong, player life will be lost by 1</li>
    <li>
      If the input is correct life will remain the same and guess will be
      put in the correct place
    </li>
    <li>For every wrong guess hangman body part will be added</li>
    <li>On game over correct word will be shown</li>
  </ol>`;
});
close.addEventListener("click", () => {
  modal.classList.add("disp_hide");
});
game.addEventListener("click", () => {
  menu.classList.add("disp_hide");
  gameScreen.classList.remove("disp_hide");
  resetEverything();
});
guessBtn.addEventListener("click", validateGuess);
