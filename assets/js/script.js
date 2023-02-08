function showPage(pageId, data=null) {
  let page = "";
  switch(pageId) {
    case 1: page += 
      '<div id="duck1" onclick="raak(10,1)" style="top:225px; left:300px;" class="duck"></div> \
      <div id="duck2" onclick="raak(10,2)" style="top:350px; left:800px;" class="duck"></div> \
      <div id="duck3" onclick="raak(25,3)" style="top:150px; left:1100px;" class="duck"></div> \
      <div id="duck4" onclick="raak(50,4)" style="top:400px; left:400px;" class="duck"></div> \
    <div id="scoreboard"><div id="score"></div>SCORE<div id="highscore"></div>HIGHSCORE<div id="timer"></div>TIME LEFT'

    break;
    case 2: page += 
    '<div id="container"> \
      <img src="https://i.ibb.co/GTzrZb8/title.png" alt="logo"> \
      <h2>Welcome to duckhunt!, Shoot as many ducks as you can. Everytime you shoot there is cooldown of half a second. Good luck!<h2> \
      <button type="button" class="start" onclick="start()">Start</button> \
    </div>'

    break;
    case 3: page += 
    '<div id="container"> \
      <img src="https://i.ibb.co/GTzrZb8/title.png" alt="logo"> \
      <h2>Thank you for playing! Click the Restart button if you want to replay the game.<h2> \
      <h2>Your last score: <div id="score">'+score+'</div> <h2> \
      <h2>Your highscore: <div id="highscore">'+highscore+'</div> <h2> \
      <button type="button" class="start" onclick="start()">Restart</button> \
    </div>'
    
    break;
  }
  document.body.innerHTML = page;
}

showPage(2);

var score = 0;
var scoreboard
var wait = 0;

function moveDucks(maxHeight = window.innerHeight * 0.5) {
  for (let a = 1; a < 5; a++) {
    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;

    let duckTop = Math.floor(Math.random() * maxHeight + viewportHeight * 0.1);
    let duckLeft = Math.floor(Math.random() * viewportWidth * 0.8 + viewportWidth * 0.1);

    let duck = document.getElementById("duck" + a);
    duck.style.top = duckTop + "px";
    duck.style.left = duckLeft + "px";

    if (duckLeft > viewportWidth / 2) {
      duck.style.transform = "scaleX(1)";
    } else {
      duck.style.transform = "scaleX(-1)";
    }
  }
}

var moveDuckIntervalId = null;

var highscore = -1;
function start() {
  showPage(1);

  score = 0;
  scoreboard = document.getElementById("score");
  wait = 0;
  scoreboard.innerHTML = score;

  if(moveDuckIntervalId===null) 
  {
    moveDuckIntervalId = setInterval(moveDucks, 1250);
  }
  
  var menu = new Audio("https://fi.zophar.net/soundfiles/nintendo-nes-nsf/duck-hunt/2%20-%20Duck%20Hunt%20Intro.mp3");
  menu.play();

  if (localStorage.getItem("highScore")) {
    highscore = localStorage.getItem("highScore");
  } else {
    highscore = 0;
  }
  document.getElementById("highscore").innerHTML = highscore;

  var timeLeft = 30;
  var timer = document.getElementById('timer');
  
  function countdown() {
    if (timeLeft == 0) {
      clearTimeout(timerId);
      showPage(3, score);
    } else {
      timer.innerHTML = timeLeft;
      timeLeft--;
    }
  }
  
  var timerId = setInterval(countdown, 1000);
  countdown();
}

function updateHighScore() {
  if (score > highscore) {
    highscore = score;
    document.getElementById("highscore").innerHTML = highscore;
    localStorage.setItem("highscore", highscore);
  }
}

function wacht() {
  wait = 0;
}

let lastShotTime = 0;

function raak(value, id) {
  let currentTime = Date.now();

  if (currentTime - lastShotTime < 500) {
    return;
  }

  lastShotTime = currentTime;
  
  score = score + value;
  scoreboard.innerHTML = score;
  if ((score > highscore) && (highscore != -1)) {
    highscore = score;
    document.getElementById("highscore").innerHTML = highscore;
    localStorage.setItem("highScore", highscore);
  }

  var gunshot = new Audio("https://fi.zophar.net/soundfiles/nintendo-nes-nsf/duck-hunt/10%20-%20SFX%20Gun%20Shot.mp3");
  gunshot.play();
}