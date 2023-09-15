var canvasWidth = 960;
var canvasHeight = 640;

let lineStartX = 0;
let lineEndX = 800;
let lineY = 320;
let linePoints = [];
var x;
var y;
var xStart;

var cursorX = 0;
var cursorY = 0;
var cursorSize = 20;

var penaltySize = 50;
var penaltyColor = "#FF0000";

var onTrack = false;

var startTime = 30;
var elapsedTime;
var timerDuration = 30 * 1000;
var timer = 30;
var maxTime = 30;
var highScore = 0;
var gameDuration = 30 * 1000;

var score = 0;
var lastScoreUpdateTime = 0;
var scoreUpdateInterval = 3;

var lastLineUpdateTime = 0;
var lineUpdateInterval = 5000; 

function setup1() {
   
createCanvas(canvasWidth, canvasHeight);

  noCursor();
  cursor(CROSS);

   startTime += 1/60;
  createLine();
}

function draw1() {
  background(203, 195, 227);

  strokeWeight(7);
  stroke("#000000");
  for (let i = 0; i < linePoints.length - 1; i++) {
    line(linePoints[i].x, linePoints[i].y, linePoints[i + 1].x, linePoints[i + 1].y);
  }

  fill("#00FF00");
  ellipse(cursorX, cursorY, cursorSize);

  let halfCursor = cursorSize / 2;
  onTrack = false;
  for (let i = 0; i < linePoints.length - 1; i++) {
    let distToLine = distApart(cursorX, cursorY, linePoints[i].x, linePoints[i].y, linePoints[i + 1].x, linePoints[i + 1].y);
    if (distToLine <= halfCursor) {
      onTrack = true;
      break;
    }
  }

  if (!onTrack) {
    fill(penaltyColor);
    noStroke();
    rect(cursorX - penaltySize / 8, cursorY - penaltySize / 8, penaltySize, penaltySize);
  }
  
  strokeWeight(2);
  textAlign(CENTER);
  textSize(35);
  fill(0);
  noStroke();
  text("Trace your mouse back and forth along the line!",480, 100)

  textSize(20);
  textAlign(LEFT);
  if (startTime > 0) {
    startTime-=1/60;
  }
  
  if(startTime < 0) {
    startTime = 30;
  }
  text("Time :  " + startTime.toFixed(2), 30, 500);
timer += 1/60;

  if (timer >= scoreUpdateInterval) {
    
    if(score % 2 === 0 || score === 0){
    
    if (cursorX >= lineEndX && onTrack) {
      score++;
    }
    timer = 0;
  }
  
  else {
    if (cursorX <= 120 && onTrack) {
      score++;
    }
    timer = 0;
  }
    }
  text("Score :  " + score, 30, 535);

 

  if (startTime < 0.1) {
    if(score > highScore){
    highScore = score;
    }
    score = 0;
    linePoints = [];
    createLine();
    startTime = 30;
    lastLineUpdateTime = startTime;
  }
  text("High Score :  " + highScore, 30, 570);
  
    strokeWeight(1);
  textFont('Comic Sans MS')
  textAlign(CENTER);
  rectMode(CENTER)
  fill(170);
  rect(870,580,110,70);
  textSize(20);
  fill(0);
  text("MAIN",870,575);
  text("MENU", 870,600);
}

function createLine() {
  x = lineStartX;
  y = lineY;
  while (x < lineEndX) {
    x += random(50, 100);
    xStart = x;
    y += random(-70, 70);
    y = constrain(y, 150, 450);
    x = constrain(x,0, 910);
    linePoints.push({ x: x, y: y });
  }
}

function mouseMoved() {

  cursorX = mouseX;
  cursorY = mouseY;
}

 if (startTime - lastLineUpdateTime >= lineUpdateInterval && elapsedTime <= gameDuration) {
    linePoints = [];
    createLine();
    lastLineUpdateTime = millis();
  }


function distApart(x, y, x1, y1, x2, y2) {
  let xDiff = x2 - x1;
  let yDiff = y2 - y1;
  let total = ((x - x1) * xDiff + (y - y1) * yDiff) / (xDiff * xDiff + yDiff * yDiff);
  total = constrain(total, 0, 1);
  let distToLine = dist(x, y, x1 + total * xDiff, y1 + total * yDiff);
  return distToLine;
}