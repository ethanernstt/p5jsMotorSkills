
let bg;
let mainMenuOn = true;
let gameSelectOn = false;
let settingsOn = false;
let fallingObjectsOn = false;
let matchingColorsOn = false;
let followLineOn = false;
let endScreenOn = false;

function preload()
{
    menuScreen = loadImage('Untitled design.jpg');
}

function setup() {
  
  createCanvas(960, 640);  

    setup1();

    setup2();
  
    setup3();
  
}

function draw() {
  
  if(mainMenuOn) {
    mainMenu();
  }
  
  else if(settingsOn) {
    settings();
  }
  
  else if(gameSelectOn) {
    gameSelect();
  }
  
  else if(fallingObjectsOn) {
    fallingObjects();
  }
  
  else if(matchingColorsOn) {
    matchingColors();
  }
  
  else if(followLineOn) {
    followLine();
  }
  
  else if(endScreenOn) {
    endScreen();
  }
  
}

function mainMenu() {
  background(menuScreen);
  textSize(70);
  fill(0);
  textAlign(CENTER);
  textFont('Arial')
 
  text("MOVING ALONG",width/2,110);
  textSize(40);
  text("Get your hands moving with these fun exercises!",width/2,210);
  
  let col = color(203, 195, 227);

  strokeWeight(0.5);
  stroke(0);
  rectMode(CENTER);
  fill(col);
  rect(182.5,425,265,150);
  textSize(28);
  fill(0);
  
  textFont('Comic Sans MS')
  text("GET STARTED",182.5,430)
  
  fill(col);
  rect(524,425,265,150);
  fill(0);
  text("SETTINGS",524,430);
  
  fill(col);
  rect(821.75,425,176.5,100);
  fill(0);
  text("EXIT",821.75,430);
 }

function gameSelect () {
  let col = color(203, 195, 227);
  background(menuScreen);
  
  textFont('Helvetica');
  textSize(55);
  textAlign(CENTER);
  fill(0);
  text("Select an exercise to get started!",480,87.5);
  
  rectMode(CENTER);
  fill(col);
  rect(500,200,500,100);
  fill(0);
  textSize(35);
  textFont('Comic Sans MS')
  text("MATCHING COLORS", 500,210);
  
  fill(col);
  rect(500,362.5,500,100);
  fill(0);
  textSize(35);
  textFont('Comic Sans MS')
  text("FOLLOW THE LINE", 500,372.5);
  
  fill(col);
  rect(500,525,500,100);
  fill(0);
  textSize(35);
  textFont('Comic Sans MS')
  text("FALLING OBJECTS", 500,535);
  
  fill(col);
  rect(125,525,150,100);
  textSize(25);
  fill(0);
  text("MAIN",125,515);
  text("MENU", 125,555);
}

function settings () {
  background(203, 195, 227);
  textSize(75)
  textAlign(CENTER)
  textFont("Comic Sans MS")
  text("Settings", width/2, 300)
  
  fill(200);
  rect(125,525,150,100);
  textSize(25);
  fill(0);
  text("MAIN",125,515);
  text("MENU", 125,555);
}

function endScreen () {
  background(203, 195, 227);
  textSize(75)
  textAlign(CENTER)
  textFont("Comic Sans MS")
  text("Thanks for Playing!", width/2, 300)
}

function matchingColors () {
  if(matchingColorsOn) {
    draw2();
  }
}

function followLine () {
  if(followLineOn){
   draw1();
}
}

function fallingObjects () {
  if(fallingObjectsOn) {
    draw3();
  }
}

function mouseClicked() {
  
  if(matchingColorsOn) {
      if(mouseX>800 && mouseX<910 && mouseY>30 && mouseY<100) {
    timer = 0;
    needSquares = false;
    restart = true;
  }
  let clickedSquare = null;
  for (let i = 0; i < squares.length; i++) {
    let sq = squares[i];
    if (sq.visible && mouseX > sq.x && mouseX < sq.x + 100 && mouseY > sq.y && mouseY < sq.y + 100) {
      clickedSquare = sq;
      break;
    }
  }
  if (clickedSquare !== null) {
    if (selectedSquare1 === null) {
      selectedSquare1 = clickedSquare;
      selectedSquare1.border = true;
    } else if (selectedSquare2 === null && selectedSquare1 !== clickedSquare) {
      selectedSquare2 = clickedSquare;
      selectedSquare2.border = true;
      if (selectedSquare1.color === selectedSquare2.color) {
        setTimeout(function() {
          selectedSquare1.visible = false;
          selectedSquare2.visible = false;
          selectedSquare1 = null;
          selectedSquare2 = null;
          squaresRemaining -= 2;
          if (squaresRemaining === 0) {
            endTime = timer;
          }
        }, 500);
      } else {
        setTimeout(function() {
          selectedSquare1.border = false;
          selectedSquare2.border = false;
          selectedSquare1 = null;
          selectedSquare2 = null;
        }, 500);
      }
    }
  }
  }
  if(mainMenuOn && mouseX > 50 && mouseX < 315 && mouseY > 350 && mouseY < 500) {
      mainMenuOn = false;
      gameSelectOn = true;
    }
  
  else if(mainMenuOn && mouseX > 391.5 && mouseX < 656.5 && mouseY > 350 && mouseY < 500) {
      mainMenuOn = false;
      settingsOn = true;
    }
  
  else if(mainMenuOn && mouseX > 733.5 && mouseX < 910 && mouseY > 375 && mouseY < 475) {
      mainMenuOn = false;
      endScreenOn = true;
  }
  
  else if(gameSelectOn && mouseX > 250 && mouseX < 750 && mouseY > 150 && mouseY < 250) {
    gameSelectOn = false;
    matchingColorsOn = true;
  }
  
  else if(gameSelectOn && mouseX > 250 && mouseX < 750 && mouseY > 312.5 && mouseY < 412.5) {
    gameSelectOn = false;
    followLineOn = true;
  }
  
  else if(gameSelectOn && mouseX > 250 && mouseX < 750 && mouseY > 475 && mouseY < 575) {
    gameSelectOn = false;
    fallingObjectsOn = true;
  }
  
  else if(gameSelectOn && mouseX > 50 && mouseX < 200 && mouseY > 475 && mouseY < 575) {
    gameSelectOn = false;
    mainMenuOn = true;
  }
  else if(matchingColorsOn && mouseX > 815 && mouseX < 925 && mouseY > 545 && mouseY < 615) {
    matchingColorsOn = false;
    mainMenuOn = true;
  }
  
  else if(followLineOn && mouseX > 815 && mouseX < 925 && mouseY > 545 && mouseY < 615) {
    followLineOn = false;
    mainMenuOn = true;
  }
  
  else if(fallingObjectsOn && mouseX > 815 && mouseX < 925 && mouseY > 70 && mouseY < 140) {
    fallingObjectsOn = false;
    mainMenuOn = true;
  }
  
  else if(settingsOn && mouseX > 50 && mouseX < 200 && mouseY > 475 && mouseY < 575) {
    settingsOn = false;
    mainMenuOn = true;
  }
}

