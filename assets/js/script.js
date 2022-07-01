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

function moveDucks() {
  for (a = 1; a < 5; a++) {
    document.getElementById("duck" + a).style.top = Math.floor(Math.random() * 500 + 1) + "px";
    document.getElementById("duck" + a).style.left = Math.floor(Math.random() * 1300 + 1) + "px";
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

  fetch("./data.txt").then(x => x.text()).then(y => showHighScore(y));

  function showHighScore(_highscore) {
    highscore = _highscore;
    document.getElementById("highscore").innerHTML = highscore;
  }

  var timeLeft = 29;
  var timer = document.getElementById('timer');
  
  var timerId = setInterval(countdown, 1000);
  
  function countdown() {
    if (timeLeft == 0) {
      clearTimeout(timerId);
      showPage(3, score);
    } else {
      timer.innerHTML = timeLeft;
      timeLeft--;
    }
  }
}

function wacht() {
  wait = 0;
}

function raak(value, id) {
  if (wait == 0) {
    score = score + value;
    scoreboard.innerHTML = score;
    if ((score > highscore) && (highscore != -1)) {
      highscore = score;
      document.getElementById("highscore").innerHTML = highscore;
      fetch("./savehighscore.php?highscore=" + highscore);
    }
    wait = 1;
    setTimeout(wacht, 500);
  }

  var gunshot = new Audio("https://fi.zophar.net/soundfiles/nintendo-nes-nsf/duck-hunt/10%20-%20SFX%20Gun%20Shot.mp3");
  gunshot.play();
}