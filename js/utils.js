'use strict'


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + randomColor
}

function timer() {
  startTime = Date.now();
  gInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    document.querySelector(".timer").innerHTML = (elapsedTime / 1000).toFixed(3);
  }, 100);
}