let buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

let body = document.querySelector("body");
let title = document.querySelector(".heading");
let boxes = document.querySelectorAll(".box");

document.addEventListener("keypress", () => {
  if (!started) {
    nextSequence();
    title.innerText = "level " + level;
    started = true;
  }
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    var userChosenColor = box.getAttribute('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    body.classList.add("game-over");
    title.innerText = "Game Over, Press Any Key to Restart"

    setTimeout(() => {
      body.classList.remove("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  title.innerText = "level " + level;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  let animation = document.querySelector("#" + randomChosenColour);
  animation.classList.add("animation")
  setTimeout(() => {
    animation.classList.remove("animation")
  }, 100)
  playSound(randomChosenColour);
}


function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3")
  audio.play();
}

function animatePress(currentColor) {
  document.querySelector("." + currentColor).classList.add(".pressed");
  setTimeout(() => {
    document.querySelector("." + currentColor).classList.remove(".pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}