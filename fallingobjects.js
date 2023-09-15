let player; 
let objects = []; 
let score3 = 0; 
let highScore3 = 0;
let timeLeft = 30; 
let timer3;
let finalScore;

function setup3() {
  createCanvas(960, 640);

  player = new Player(width / 2, height - 50, 50, 50);

  timer3 = setInterval(function() {
    
  } );
}

function draw3() {
  background(203, 195, 227);
      strokeWeight(1);
  textFont('Comic Sans MS')
  textAlign(CENTER);
  rectMode(CENTER)
  fill(170);
  rect(870,70,110,70);
  textSize(20);
  fill(0);
  text("MAIN",870,60);
  text("MENU", 870,90);


  textSize(20);
  fill(0);
  textAlign(LEFT);
  if(timeLeft > 0) {
    timeLeft-=1/60;
    }
    else {
      timeLeft = 60;
      
    }
  textFont('Comic Sans MS')
  text("Time : " + timeLeft.toFixed(2), 30, 30);

  textSize(20);
  text("Score : " + score3, 30, 60);
  
  if(timeLeft<0.1) {
    if(score3>highScore3) {
      highScore3 = score3;
    }
    score3 = 0;
  }
  
  text("High Score :  " + highScore3, 30, 90);

  if (frameCount % 60 == 0) {
    let obj = new FallingObject(random(width), 0, 30);
    objects.push(obj);
  }

  player.update();
  player.display();

  for (let i = objects.length - 1; i >= 0; i--) {
    objects[i].update();
    objects[i].display();

    if (objects[i].collides(player)) {
      objects.splice(i, 1);
      score3++;
    }

    if (objects[i].y > height) {
      objects.splice(i, 1);
    }
  }
  
  if (timeLeft == 0) {
    clearInterval(timer);
    timeLeft = 30;
    textSize(64);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2);
    noLoop();
  }
}

class Player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  update() {
    
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }

    this.x = constrain(this.x, 0, width - this.w);
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }
}

class FallingObject {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = random(3, 7);
  }

  update() {
   
    this.y += this.speed;
  }

   display() {
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.r, this.r);
  }

  collides(player) {
    
    let d = dist(this.x, this.y, player.x + player.w / 2, player.y + player.h / 2);
    if (d < this.r / 2 + player.w / 2) {
      return true;
    } else {
      return false;
    }
  }
}