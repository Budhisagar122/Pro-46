var alien,alienImg,bgImg,enemyImg,enemy,bullets,bulletImg,space;
var bulletsGroup,score=0,bullet1,bullet2,enemyGroup,bg2Img;
var gameState="start";

function preload(){
  bgImg=loadImage("bg.jpg")
  alienImg=loadImage("alien.png")
  enemyImg=loadImage("enemy1.png")
  bulletImg=loadImage("bullets.png");
  bg2Img=loadImage("bg2.jpg")
}
function setup() {
  createCanvas(700,700);
    space=createSprite(350,350,700,700);
    space.addImage("bgImg",bgImg);
    space.scale=0.4;
    space.velocityY=-1;

  
    alien=createSprite(300, 600,30,30);
    alien.scale=0.8;
    alien.addImage("alienImg",alienImg);

    
    bulletsGroup=createGroup();
    enemyGroup=createGroup();
  var rand=Math.round(random(1,700));
  console.log(rand);

  
}

function draw() {

  if(gameState==="start"){
    background(bg2Img);

    fill("orange")
    textSize(40);
    text("WAR OF ALENS",150,100)

    textSize(20);
    fill("green")
    text("Press S to start the game!!",150,200)
    fill("blue")
    text("To Play the Game:",50,240)
    text("1.Press 'left' arrow key to move alien towards left.",50,280)
    text("2.Press 'right' arrow key to move alien towards right.",50,320)
    text("3.Press 'space' to fire and kill the enemies.",50,360)
    
    fill("red")
    text("Rules of the Game:",50,400)
    text("1.If any enemy hits alien then the game is over.",50,440)
    text("2.If you have scored 10 marks then you have won the match.",50,480)
         
    if(keyWentDown("s")){
      gameState="play";
    }
    
  }
  
  if(gameState==="play"){
    if(space.y<0){
      space.y=350;
    }
    
    spawnEnemy();

    if(keyDown("LEFT_ARROW")){
      alien.velocityX=-4;
    }
    if(keyDown("RIGHT_ARROW")){
      alien.velocityX=4;
    }
    if(keyWentDown("space")){
      spawnBullet1();
      spawnBullet2();
    }

    if(bulletsGroup.isTouching(enemyGroup)){
      enemyGroup.destroyEach();
      bulletsGroup.destroyEach();
      score=score+1;
    }
    if(enemyGroup.isTouching(alien)){
      gameState="end";
    }
    drawSprites();
    
    if(score===10){
      textSize(40);
      text("Yah! You won the match",150,200)
      
      alien.destroy();
      enemyGroup.destroyEach();
    }
  textSize(20);
  fill("white")
  text("Score :"+score,20,20) 
   
    
  }

  if(gameState==="end"){
    alien.destroy();
  enemyGroup.destroyEach();
    textSize(40);
    fill("red");
    text("Game Over",250,300);
    text("Better luck next time",200,350);
  }

  
  
}
function spawnEnemy(){
  if(World.frameCount%150===0){
    enemy=createSprite(300,10,60,60)
    enemy.scale=0.4;
    enemy.addImage("enemyImg",enemyImg);
    enemy.x=Math.round(random(100,500));
    enemy.velocityY=7;
    enemy.setCollider("rectangle",0,0,enemy.width,enemy.height);
   enemy.debug = false

    enemyGroup.add(enemy);
  }
}
function spawnBullet1(){
  bullet1=createSprite(320,550,5,5);
  bullet1.x=alien.x;
  bullet1.y=alien.y;
  bullet1.scale=0.05;
  bullet1.velocityY=-7;
  bullet1.addImage("bulletImg",bulletImg)
  bulletsGroup.add(bullet1);
}
function spawnBullet2(){
  bullet2=createSprite(280,550,5,5);
  bullet2.x=alien.x;
  bullet2.y=alien.y;
  bullet2.scale=0.05;
  bullet2.velocityY=-7;
  bullet2.addImage("bulletImg",bulletImg)
  bulletsGroup.add(bullet2);

}