var play = 1;
var end = 0;
gamestate = play;


var monkey, monkey_running, ground, bananagroup, backimage, back, obstaclegroup;
var banana, bananaImage, obstacle, obstacleImage, gameoverimage,
    gameover;
var FoodGroup, obstacleGroup;
var score = 0;



function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backimage = loadImage("forest1.jpg");
  gameoverimage = loadImage("gameover.png");
  

}

function setup() {
  createCanvas(800, 400);

  back = createSprite(400, 200, 1600, 400);
  back.addImage(backimage);
  back.velocityX = -2

  ground = createSprite(400, 350, 1000, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;

  monkey = createSprite(100, 300, 15, 15);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  gameover = createSprite(400,200,100,100);
  gameover.addImage(gameoverimage);
  gameover.scale = 0.1;
  

  obstacleGroup = new Group();
  bananaGroup = new Group();


}


function draw() {
  background("white");

  if (gamestate === play) {

    monkeyplayer();
    fruit();
    
    gameover.visible = false;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (back.x < 200) {
      back.x = back.width / 2;
    }

    if (keyDown("space") && monkey.y >= 293) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.4;

    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score = score+2
    }
    if (obstacleGroup.isTouching(monkey)) {
      gamestate = end
      gameover.visible = true;

    }
  } else if (gamestate === end) {
    monkey.velocityX = 0;
    
    ground.velocityX = 0;
    
    back.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    


  }

  monkey.collide(ground);


  drawSprites();

  stroke("black");
  textSize(20);
  fill("white");
 // score = 120 / 60;
  text("Survival Time: " + score, 100, 50);


}

function monkeyplayer() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(800, 320, 15, 15);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;

    obstacleGroup.add(obstacle);

  }
}


function fruit() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(800, 200, 20, 20);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    bananaGroup.add(banana);

  }
}