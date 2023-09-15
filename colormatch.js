let colors2 = [
  'red',
  'blue',
  'green',
  'yellow',
  'cyan',
  'orange',
  '#ff00ff',
  'purple',
  '#00ff00',
  'grey',
];

let squares = [];
let gapSize = 20;
let rows = 4;
let cols = 5;
let selectedSquare1 = null;
let selectedSquare2 = null;
let squaresRemaining = 20;
let highScore2 = 1000;
var timer2 = 0;
let shouldTimerChange = true;
var endTime;
let needSquares = true;
let restart = false;

function setup2() {
  createCanvas(960, 640);
  
  
  let colorPool = colors2.concat(colors2);
  
  for (let i = colorPool.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [colorPool[i], colorPool[j]] = [colorPool[j], colorPool[i]];
  }
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = 160 + j * (100 + gapSize) + gapSize;
      let y = 100 + i * (100 + gapSize) + gapSize;
      let index = i * cols + j;
      squares[index] = {
        x: x,
        y: y,
        color: colorPool[index],
        visible: true,
        selected: false,
        border: false
      };
    }
  }
}

function draw2 () {
  
  if(restart) {
    restartGame();
  }
  
  
  background(203, 195, 227);
  fill(170);
  rectMode(CORNER)
  rect(800,30,110,70);
  textAlign(CENTER);
  textSize(20);
  fill(0);
  text("Restart", 855, 70);
  
  if(shouldTimerChange) {
  timer2 += 1/60;
  }
  
  textAlign(LEFT);
  textSize(20);
  fill(0);
  textFont('Comic Sans MS');
  text("Time :  " + timer2.toFixed(2), 30, 30);
  if(squaresRemaining == 0) {
    shouldTimerChange = false;
    endTime = timer2;
  }
  if(endTime<highScore2) {
    highScore2 = endTime;
  }
  if(highScore2<1000){
    text("High score :  " + highScore2.toFixed(2), 30, 60);
  }
  else {
    text("High score :  ", 30, 60);
  }
  textAlign(CENTER);
  textSize(40);
  text("Match all the squares!", 480, 70);
  for (let i = 0; i < squares.length; i++) {
    let sq = squares[i];
    if (sq.visible) {
      fill(sq.color);
      if (sq.border) {
        stroke(255);
        strokeWeight(3);
      } else {
        noStroke();
      }
      rect(sq.x, sq.y, 100, 100,10);
    }
  }
  
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


function restartGame() {
  
  let colorPool = colors2.concat(colors2);
  
  for (let i = colorPool.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [colorPool[i], colorPool[j]] = [colorPool[j], colorPool[i]];
  }
  
  for (let i = 0; i < squares.length; i++) {
    squares[i].color = colorPool[i];
    squares[i].visible = true;
    squares[i].selected = false;
    squares[i].border = false;
  }
  
  selectedSquare1 = null;
  selectedSquare2 = null;
  squaresRemaining = 20;
  timer2 = 0;
  shouldTimerChange = true;
  needSquares = true;
  restart = false;
}