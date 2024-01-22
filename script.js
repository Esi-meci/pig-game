'use strict';

// Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const curScorePlayer_1 = document.getElementById('current--0');
const curScorePlayer_2 = document.getElementById('current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

function switchPlayer() {
  // empty the current score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // switch player
  // activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  currentScore = 0;
  // switching the bright color
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

let scores, currentScore, activePlayer, playing;
// Starting Conditions
function reset() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player2.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  // dice.style.display = 'none';
}

reset();

// the rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generatinga a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display the dice
    diceEl.classList.remove('hidden');

    //   immature way to achieve
    //   if (dice === 1) {
    //     diceEl.src = 'dice-1.png';
    //   }
    //   proffesional way to achive it
    diceEl.src = `dice-${dice}.png`;

    // 3. add the rolled dice to the current score
    if (dice != 1) {
      // add score to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // curScorePlayer_1.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //   document.getElementById(`current--${activePlayer}`).textContent = 0;

    // score already 100
    if (scores[activePlayer] >= 20) {
      // finish the game
      // set playing to false
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // switch to the next play if not up to 100
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  reset();
});
