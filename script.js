const displayWordEl = document.querySelector(".dispaly-word");
const incorrectGuessesEl = document.querySelector(".incorrect span");
const hintTextEl = document.querySelector(".hint-text span");
const keyboardEl = document.querySelector(".keyboard");
const hangmanDrawEl = document.querySelector(".hangman-draw");
const popupEl = document.querySelector(".popup");
const playAgainBtn = document.querySelector("#play-again");
const popupImage = popupEl.querySelector("img");
const popupTitle = popupEl.querySelector("h2");
const popupMessage = popupEl.querySelector("p");
const successSound = document.getElementById("success");
const failSound = document.getElementById("fail");
const finishSound = document.getElementById("finish");
const winSound = document.getElementById("win");
const wordList = [
  { word: "guitar", hint: "A musical instrument with strings." },
  { word: "oxygen", hint: "A colorless, odorless gas essential for life." },
  {
    word: "mountain",
    hint: "A large natural elevation of the Earth's surface.",
  },
  {
    word: "painting",
    hint: "An art form using colors on a surface to create images or expression.",
  },
  {
    word: "astronomy",
    hint: "The scientific study of celestial objects and phenomena.",
  },
  { word: "football", hint: "A popular sport played with a spherical ball." },
  { word: "chocolate", hint: "A sweet treat made from cocoa beans." },
  {
    word: "butterfly",
    hint: "An insect with colorful wings and a slender body.",
  },
  { word: "history", hint: "The study of past events and human civilization." },
  {
    word: "pizza",
    hint: "A savory dish consisting of a round, flattened base with toppings.",
  },
  {
    word: "jazz",
    hint: "A genre of music characterized by improvisation and syncopation.",
  },
  {
    word: "camera",
    hint: "A device used to capture and record images or videos.",
  },
  {
    word: "diamond",
    hint: "A precious gemstone known for its brilliance and hardness.",
  },
  { word: "adventure", hint: "An exciting or daring experience." },
  {
    word: "science",
    hint: "The systematic study of the structure and behavior of the physical and natural world.",
  },
  { word: "bicycle", hint: "A human-powered vehicle with two wheels." },
  {
    word: "sunset",
    hint: "The daily disappearance of the sun below the horizon.",
  },
  {
    word: "coffee",
    hint: "A popular caffeinated beverage made from roasted coffee beans.",
  },
  {
    word: "dance",
    hint: "A rhythmic movement of the body often performed to music.",
  },
  {
    word: "galaxy",
    hint: "A vast system of stars, gas, and dust held together by gravity.",
  },
];
let currentWord, correctLetters, wrongGuesses;
const maxWrongGuesses = 6;
const resetGame = () => {
  correctLetters = [];
  wrongGuesses = 0;
  hangmanDrawEl.className = "hangman-draw";
  incorrectGuessesEl.innerText = `${wrongGuesses} / ${maxWrongGuesses}`;
  popupEl.classList.remove("show");
  Array.from(keyboardEl.children).forEach((button) => {
    button.disabled = false;
  });
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  hintTextEl.innerText = hint;
  displayWordEl.innerHTML = currentWord
    .split("")
    .map(() => `<span></span>`)
    .join("");
};
const gameOver = (isVictory) => {
  failSound.pause();
  successSound.pause();
  setTimeout(() => {
    const modalText = isVictory
      ? `You found the word:`
      : "The correct word was:";
    popupImage.src = `img/${isVictory ? "victory" : "lost"}.gif`;
    popupTitle.innerText = isVictory ? "Congrats!" : "Game Over!";
    popupMessage.innerHTML = `${modalText} <span>${currentWord}</span>`;
    popupEl.classList.add("show");
    if (isVictory) {
      winSound.play();
    } else {
      finishSound.play();
    }
  }, 500);
};
const processGuess = (letter, button) => {
  button.disabled = true;
  if (currentWord.includes(letter)) {
    [...currentWord].forEach((char, index) => {
      if (char === letter) {
        correctLetters.push(char);
        const span = displayWordEl.querySelectorAll("span")[index];
        span.innerText = char;
        span.classList.add("no-border");
      }
    });
    successSound.currentTime = 0;
    successSound.play();
  } else {
    wrongGuesses++;
    hangmanDrawEl.classList.add(`wrong-${wrongGuesses}`);
    failSound.currentTime = 0;
    failSound.play();
  }

  incorrectGuessesEl.innerText = `${wrongGuesses} / ${maxWrongGuesses}`;
  if (wrongGuesses === maxWrongGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  const letter = String.fromCharCode(i);
  button.className = "keyboard-box";
  button.innerText = letter;
  keyboardEl.appendChild(button);

  button.addEventListener("click", () => processGuess(letter, button));
}
playAgainBtn.addEventListener("click", resetGame);
resetGame();
