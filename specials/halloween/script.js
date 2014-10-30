// SOURCE: http://www.thinkful.com/learn/halloween-programming-tutorial/
// Play scary sound after a few seconds

var sound = new Audio("specials/halloween/file.wav");
setTimeout(function () {
  sound.load();
  sound.play();
}, 1000);

