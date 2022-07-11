'use strict';

const checkBtnElem = document.querySelector('.check'),
  againBtnElem = document.querySelector('.again'),
  guessFieldElem = document.querySelector('.guess'),
  numberFieldElem = document.querySelector('.number'),
  highScoreFieldElem = document.querySelector('.highscore'),
  messageElem = document.querySelector('.message'),
  scoreElem = document.querySelector('.score'),
  bodyElem = document.querySelector('body'),
  moonBtn = document.querySelector('.moon'),
  sunBtn = document.querySelector('.sun');

let randomNumber = Math.trunc(Math.random() * 20 + 1);
let highScore = 0;
let score = 20;

numberFieldElem.textContent = '?';

const setMessageText = message => {
  messageElem.textContent = message;
};
const setScoreText = message => {
  scoreElem.textContent = message;
};

moonBtn.addEventListener('click', () => {
  bodyElem.classList.add('dark');
  moonBtn.style.display = 'none';
  sunBtn.style.display = 'block';
  if (bodyElem.classList.contains('light-win')) {
    bodyElem.classList.remove('light-win');
    bodyElem.classList.remove('dark');
    bodyElem.classList.add('dark-win');
  }
});
sunBtn.addEventListener('click', () => {
  bodyElem.classList.remove('dark');
  sunBtn.style.display = 'none';
  moonBtn.style.display = 'block';
  if (bodyElem.classList.contains('dark-win')) {
    bodyElem.classList.remove('dark-win');
    bodyElem.classList.add('light-win');
  }
});

checkBtnElem.addEventListener('click', () => {
  const guessNum = Number(guessFieldElem.value);

  if (!guessNum) {
    setMessageText(`There isn't a number`);
  } else if (guessNum === randomNumber) {
    setMessageText(`You're win!`);
    if (highScore < score) {
      highScore = score;
      highScoreFieldElem.textContent = highScore;
    }
    numberFieldElem.textContent = randomNumber;
    if (bodyElem.classList.contains('dark')) {
      bodyElem.classList.remove('dark');
      bodyElem.classList.add('dark-win');
    } else {
      bodyElem.classList.add('light-win');
    }
    numberFieldElem.style.width = '30rem';
  } else if (guessNum !== randomNumber) {
    if (score > 1) {
      guessNum > randomNumber
        ? setMessageText(`Too High! 📈`)
        : setMessageText(`Too Low! 📉`);
      score--;
      setScoreText(score);
    } else {
      setMessageText(`💥 You're loose!`);
      setScoreText(0);
    }
  }
});

againBtnElem.addEventListener('click', () => {
  score = 20;
  randomNumber = Math.trunc(Math.random() * 20 + 1);

  messageElem.textContent = 'Start guessing...';
  setScoreText(score);
  numberFieldElem.textContent = '?';
  guessFieldElem.value = '';

  if (bodyElem.classList.contains('light-win')) {
    bodyElem.classList.remove('light-win');
  } else {
    bodyElem.classList.remove('dark-win');
    bodyElem.classList.add('dark');
  }
  numberFieldElem.style.width = '15rem';
});
