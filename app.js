let gameSequence = [];
let userSequence = [];

let started = false;
let level = 0;
let count = 0;
let highestScore = 0;
let btns = ["red", "green", "yellow", "purple"];

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

h3.innerText = `Highest Score: ${highestScore}`;

document.addEventListener("keypress", () => {
  if (started == false) {
    console.log("Game has Started.");
    started = true;

    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");

  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("userflash");

  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 300);
}

function levelUp() {
  userSequence = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIndex = Math.floor(Math.random() * 3);
  let randomColor = btns[randomIndex];
  let randomBtn = document.querySelector(`.${randomColor}`);

  gameSequence.push(randomColor);
  console.log(gameSequence);

  btnFlash(randomBtn);
}

function checkBtn(index) {
  if (userSequence[index] === gameSequence[index]) {
    if (userSequence.length == gameSequence.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `GAME OVER! Your score was <b>${level}<b> <br/>Press any key to start again`;
    
    document.querySelector("html").style.backgroundColor = "red";
    
    setTimeout(function () {
      document.querySelector("html").style.backgroundColor = "white";
    }, 100);

    if (level > highestScore) {
      highestScore = level;
      h3.innerText = `Highest Score: ${highestScore}`;
    }

    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSequence.push(userColor);

  checkBtn(userSequence.length - 1);
}

let allBtns = document.querySelectorAll(".btns");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}