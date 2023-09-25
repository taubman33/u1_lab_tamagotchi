//lets create our Tamagotchi game logic here!

/*----- constants -----*/

const INIT_STATE = {
    boredom: 0,
    hunger: 0,
    sleepiness: 0,
  };
  let state
const MAX_CYCLES = 30;
/*----- state variables -----*/

let boredom; // integer
let hunger; // integer
let sleepiness; // integer

let age; // integer
let cycles; // integer

let timer; // object
let interval; // integer

/*----- cached elements  -----*/

const boredomStatEl = document.querySelector("#boredom-stat");
const hungerStatEl = document.querySelector("#hunger-stat");
const sleepyStatEl = document.querySelector("#sleepiness-stat");

const gameMessageEl = document.querySelector("#tama-message");

const gameBtnEls = document.querySelectorAll("button");
const gamePlayAgainEl = document.querySelector("#restart");
/*----- event listeners -----*/

gameBtnEls.forEach((btn) => btn.addEventListener("click", handleBtnClick));
gamePlayAgainEl.addEventListener("click", init);

/*----- functions -----*/


  function init() {
    state = { ...INIT_STATE }; // create a copy of the default data
  // console.log("init", state)
    age = 0; // integer
    cycles = 0; // integer
  
    interval = 1000; // integer
    timer = setInterval(runGame, interval); // object
  
    render();
  }

function resetUI() {
    // display game over messaging
    gamePlayAgainEl.classList.add("hidden");
    gameMessageEl.classList.add("hidden");
  }

function runGame() {
    cycles++;
    
    if (cycles >= MAX_CYCLES) {
        winGame();
        return;
    }
  
    if (continueGame()) {
      // console.log("continue")
      updateStats();
  
      // Icebox - call checkAge helper function to age up Tama
      // Icebox - add aging cycle to calculate aging up tama as a factor of cycles.
      // Icebox - add a message render state or game engine for parsing the state > UI changes. 
  
    } else {
      // if any stat is >= 10 -> end game cycle
      return gameOver();
    }
  
    render();
  }

function winGame(){
  alert('Congratulations! You won the game!');
  clearInterval(timer); 
}
  function continueGame() {
    const testGame = Object.values(state).every((stat) => stat < 10);
    // console.log(testGame)
    return testGame;
  
  }

function updateStats() {
  
    for (key in state) {
      // console.log("update", key)
      updateStat(key, Math.floor(Math.random() * 3));
    }
  
  }

function updateStat(stat, value) {
   // normalize data to prevent state values less than 0
    if (state[stat] + value >= 0) {
      state[stat] += value;
    } else {
      state[stat] = 0;
    }
    console.log(state, stat)
  }

function render() {
    renderStats();
    resetIt()
  }

function renderStats() {
// console.log("render", state)
    boredomStatEl.innerHTML = state.boredom;
    hungerStatEl.textContent = state.hunger;
    sleepyStatEl.textContent = state.sleepiness;
  
  }
  
function handleBtnClick(e) {
  
    const convertProp = {
      feed: "hunger",
      sleep: "sleepiness",
      play: "boredom",
    };
    
    
    const btnText = convertProp[e.target.innerText];
    
    
    const newValue = -1 * (3 + Math.floor(Math.random() * 3));
    
    
    updateStat(btnText, newValue);
  
    
    render();
  }
  
  
function gameOver() {
    // alert player game over
    alert('Game Over!')
  
    // stop timer
    clearInterval(timer);
  
    location.reload()
  }


/*----- functions -----*/


function gameOver() {
    // alert player game over
    gamePlayAgainEl.classList.remove("hidden");
    gameMessageEl.classList.remove("hidden");
  
    // stop timer
    clearInterval(timer);
  }

function resetIt() {
    // clear the end-game message
    resetUI();
  
    // ... the rest of our code
  }
  
 
  init()