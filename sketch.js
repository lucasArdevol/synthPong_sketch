//canvas
let width = 960;
let height = 540;

//ball
let ballXPos = width/2;
let ballYPos = height/2-30;
let ballSize = 40;
let raio = ballSize/2;
let ballXSpeed = -10;
let ballYSpeed = 10;
let hit = false;
let ballDir = true;
let ballAnimFrame = 0;
let animSpeed = 0;
    
//racket Left
let racketXSize = 25;
let racketYSize = 120;
let racketXPos = 20;
let racketYPos = height/2-racketYSize/2-30;
let racketSpeed = 10;

//racket Right
let racket2XPos = width-50;
let racket2YPos = height/2-racketYSize/2-30;
let racket2Speed;
let racket2Move;

//score
let scorePlayer = 0;
let scoreEnemy = 0;

//sounds
let sfxHit;
let sfxPoint;
let bgm;

//sprites
let ballSprite;
let ballLight;
let racketSprite;
let bg;
let city;
let cityXPos = 0;

function preload(){
  bgm = loadSound("resources/Match2.ogg");
  sfxHit = loadSound("resources/sfx_004.ogg");
  sfxPoint = loadSound("resources/sfx_013.ogg");
  ballSprite = loadImage("resources/sprites.png");
  ballLight = loadImage("resources/light.png");
  racketSprite = loadImage("resources/racket.png");
  bg = loadImage("resources/bg_fase2.png");
  city = loadImage("resources/Fundo_City.jpg");
}

function setup() {
  createCanvas(width, height);
  bgm.loop();
}

function draw() {
  background(0);
  image(city, cityXPos, height/2-100, width, 200);
  image(city, cityXPos+width, height/2-100, width, 200);
  image(bg, 0, 0, width, height);
  objectBall();
  objectRacket();
  scoreBoard();
  backgroundAnimation();
}

function backgroundAnimation(){
  cityXPos -= 30;
  if (cityXPos < 0 - width){
    cityXPos = 0;
  }
}

function objectBall(){
  showBall();
  movingBall();
  collisionBall();
  racketCollide(racketXPos, racketYPos);
  racketCollide(racket2XPos, racket2YPos); 
  directionBall();

  
  function showBall(){
    if (animSpeed <= 50){
      animSpeed += 25;
      if (animSpeed >=50 && ballAnimFrame < 922){
        ballAnimFrame += 40;
        animSpeed = 0;
      }else if (animSpeed >=50 && ballAnimFrame > 922){
        ballAnimFrame = 0;
        animSpeed = 0; 
      }
    }
    
    image(ballSprite, ballXPos-raio, ballYPos-raio, ballSize, ballSize, 2+ballAnimFrame, 2, 37, 37);
    
    image(ballLight, ballXPos-25, ballYPos-25, 50,50);
  }

  function movingBall(){
    ballXPos += ballXSpeed;
    ballYPos += ballYSpeed;
  }

  function collisionBall(){
    
    //AI point
    if(ballXPos < 0){
      ballXPos = width/2;
      ballYPos = height/2-30;
      ballXSpeed *= -1
      scoreEnemy +=1;
      sfxPoint.play();
    }

    //Player point
    if(ballXPos > width){
      ballXPos = width/2
      ballYPos = height/2-30;
      ballXSpeed *= -1
      scorePlayer +=1
      sfxPoint.play();
    }

    //Y Bounce
    if(ballYPos - raio < 0 || ballYPos + raio > height-60){
      ballYSpeed *= -1;
      sfxHit.play();
    }
    
      
  }
  
  function racketCollide(x, y){
    //Racket Bounce
    hit = collideRectCircle(x, y, racketXSize, racketYSize, ballXPos, ballYPos, raio);
    if (hit && ballDir){
      ballXSpeed *= -1
      sfxHit.play();
    }      
  }
  
  function directionBall(){
    if (ballXSpeed < 0 && ballXPos < width/2 || ballXSpeed > 0 && ballXPos > width/2 ){
      ballDir = true;
    }else {
      ballDir = false;
    }
  }
    
}

function objectRacket(){
  showRacket(racketXPos, racketYPos);
  showRacket(racket2XPos, racket2YPos);
  movementRacketLeft();
  movementRacketRight();
  
  function showRacket(x, y){
    image(racketSprite, x, y, racketXSize, racketYSize);
  }
  
  function movementRacketLeft(){
    if (keyIsDown(UP_ARROW) || keyIsDown(87)){
      if (racketYPos + racketYSize/2-60 > 0){
        racketYPos -= racketSpeed;
      }
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){
      if (racketYPos < height-racketYSize-60){
        racketYPos += racketSpeed;
      }
    }
  }
  
  function movementRacketRight(){
    //racket2Speed = ballYPos - racket2YPos - racketYSize/2;
    racket2Move = parseInt(Math.random() * 30);
    if(racket2Move < 15){
      if(racket2YPos + racketYSize/2 > ballYPos){
        racket2YPos -= racketSpeed;
      }else if(racket2YPos - racketYSize/2 < ballYPos){
        racket2YPos += racketSpeed;
      }
    }
  }
}

function scoreBoard(){
  textAlign(CENTER);
  textSize(30);
  textStyle(BOLD);
  fill(30);
  rect(0, height-60, width, height);
  fill(color('magenta'));
  quad(0, height-60, 125, height-60, 100, height, 0, height);
  fill(255);
  text(scorePlayer, 50, height-20);
  fill(color('magenta'));
  quad(width, height-60, width-125, height-60, width-100, height, width, height);
  fill(255);
  text(scoreEnemy, width-50, height-20);
}

