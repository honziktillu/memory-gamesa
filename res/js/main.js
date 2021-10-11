const button = document.getElementById("button");
const counter = document.getElementById("counter");
const status = document.getElementById("status");
const gameButton = document.getElementsByClassName("game-button");

let ready = false;
let roundArray = [];
let stepCounter = 0;
let level = 1;

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const start = () => {
  button.style.display = "none";
  newRound();
};

button.onclick = start; //2.

const newRound = async () => {
  let i = 0;
  let rN;
  for (i; i < level + 1; i++) {
    status.innerText = "LADINK";
    console.log("LADINK");
    window.speechSynthesis.speak(new SpeechSynthesisUtterance("LOADING"));
    rN = randomNumber(0, 3);
    roundArray[i] = rN;
    await showColor(rN); //1.
  }
  status.innerText = "DONE";
  console.log("DONE");
  window.speechSynthesis.speak(new SpeechSynthesisUtterance("DONE"));
  ready = true;
};

const showColor = async (number) => {
  console.log({ number });
  switch (number) {
    case 0:
      gameButton[0].style.backgroundColor = "rgba(255, 0, 0, 1)";
      return new Promise((resolve) =>
        setTimeout(() => {
          gameButton[0].style.backgroundColor = "rgba(255, 0, 0, 0.2)";
          setTimeout(() => {
            resolve();
          }, 1500);
        }, 1000)
      );
    case 1:
      gameButton[1].style.backgroundColor = "rgba(0, 255, 0, 1)";
      return new Promise((resolve) =>
        setTimeout(() => {
          gameButton[1].style.backgroundColor = "rgba(0, 255, 0, 0.2)";
          setTimeout(() => {
            resolve();
          }, 1500);
        }, 1000)
      );
    case 2:
      gameButton[2].style.backgroundColor = "rgba(0, 0, 255, 1)";
      return new Promise((resolve) =>
        setTimeout(() => {
          gameButton[2].style.backgroundColor = "rgba(0, 0, 255, 0.2)";
          setTimeout(() => {
            resolve();
          }, 1500);
        }, 1000)
      );
    case 3:
      gameButton[3].style.backgroundColor = "rgba(229, 255, 0, 1)";
      return new Promise((resolve) =>
        setTimeout(() => {
          gameButton[3].style.backgroundColor = "rgba(229, 255, 0, 0.2)";
          setTimeout(() => {
            resolve();
          }, 1500);
        }, 1000)
      );
  }
};

const click = async () => {
  if (!ready) {
    return;
  }
  ready = false;
  const element = event.target;
  const number = parseInt(element.dataset.color);
  await showColor(number);
  if (number === roundArray[stepCounter]) {
    ready = true;
    stepCounter++;
  } else {
    status.innerText = "OMEGALUL";
    console.log("OMEGALUL");
    window.speechSynthesis.speak(new SpeechSynthesisUtterance("OMEGALUL"));
    stepCounter = 0;
    roundArray = [];
    level = 1;
    counter.innerText = 0;
    button.style.display = "block";
    return;
  }
  if (stepCounter > level) {
    level++;
    stepCounter = 0;
    counter.innerText++;
    roundArray = [];
    newRound();
  }
};

let i = 0;
for (i; i < gameButton.length; i++) {
    gameButton[i].onclick = click;
}
