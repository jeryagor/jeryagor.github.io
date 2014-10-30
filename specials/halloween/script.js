// SOURCE: http://www.thinkful.com/learn/halloween-programming-tutorial/
// Timers slightly modified

var ghost = document.getElementsByClassName("ghost-container")[0];
var sound = new Audio("file.wav");

//Shows ghost and plays sound after five seconds
setTimeout(function () {
  sound.load();
  sound.play();
  ghost.style.visibility = "visible";
}, 4000);

//Hides ghost two seconds after appears
setTimeout(function () {
  ghost.style.visibility = "hidden";
}, 6000);
