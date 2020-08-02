const testSec = document.getElementsByClassName("test-container")[0];
const resultsSec = document.getElementsByClassName("results")[0];

var context;
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight - 75;

//Positions
var x = canvasWidth / 2;
var y = 0;

//Change in vertical position
var dy = 5;
var myInterval;

//Attempt counter
var counter = 3;

function init() {
  context = ballCanvas.getContext("2d");
  myInterval = setInterval(bounceBall, 20);
  context.canvas.width = canvasWidth;
  context.canvas.height = canvasHeight;
}

function bounceBall() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.fillStyle = "white";

  context.fillRect(0, (canvasHeight * 2) / 5, canvasWidth, canvasHeight / 5);

  context.fillStyle = "black";

  // Draws a circle of radius 20
  context.beginPath();
  context.arc(x, y, canvasHeight / 12, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
  if (y < 0 || y > canvasHeight) dy = -dy;
  y += dy;
}

function buttonHandler() {
  if (y > (canvasHeight * 2) / 5 && y < (canvasHeight * 3) / 5) {
    // if the user passes, show them the results
    clearInterval(myInterval);
    testSec.classList.toggle("section__show");
    resultsSec.classList.toggle("section__show");
  } else {
    counter -= 1;
    document.getElementById("gameButton").innerHTML =
      "You have " + counter + " attempts";
    if (counter == 0) {
      // if the user fails all three attempts, redirect them to go home
      window.location.href = "sloshed.html";
    }
  }
}
