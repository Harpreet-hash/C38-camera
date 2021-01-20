
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, ground;
var score, gameState, monkey;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {

ground=createSprite(200,380,800,20);

monkey=createSprite(10,340,10,50);
monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.1;


obstacleGroup=createGroup();
FoodGroup=createGroup();

gameState="play";
score=0;

camera.position.x=50;

  
}



function draw() {
  
  background(255);
  ground.x=camera.position.x;
  monkey.x=camera.position.x-100;
 console.log(camera.position.y)
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(gameState==="play")
      {
        if(keyDown("space")&&monkey.collide(ground)){
        monkey.velocityY=-25;
      }
      monkey.velocityY=monkey.velocityY+2;
      
       if(camera.position.x%300===0){
          spawnObstacles();
       }
       if(camera.position.x%150===0){
          spawnBananas();
       }
       if(obstacleGroup.isTouching(monkey)){
         gameState="over";
         
       }
        if(FoodGroup.isTouching(monkey)){
          FoodGroup.destroyEach();
        }
       
       score=Math.floor(World.frameCount/World.frameRate);
  }
  
  
 
  monkey.collide(ground);
         textSize(20);
  text("Survival Time: "+score,camera.position.x,150);
  fill("red");
  
 if(gameState==="over"){ 
   monkey.velocityX=0;
         
         text("RIP",camera.position.x,200);
         obstacleGroup.destroyEach();
         FoodGroup.destroyEach();

        //  obstacleGroup.setVelocityEach(0,0);
        //  FoodGroup.setVelocityEach(0,0);
        //  obstacleGroup.setLifetimeEach(-1);
        //  FoodGroup.setLifetimeEach(-1);
         
 }
  
  
  camera.position.x+=5;
  camera.position.y=monkey.y-50;
  
  drawSprites();
    
  
}
function spawnObstacles(){
 
  var obstacle=createSprite(random(camera.position.x+200,camera.position.x+500),353,10,10);
  obstacle.addImage(obstaceImage);
  obstacle.scale=0.1;
 // obstacle.x=random(400,500);
  
  obstacleGroup.add(obstacle);
  //obstacle.velocityX=-5;
  obstacle.lifetime=280;
  
}
function spawnBananas(){
  var banana=createSprite(random(camera.position.x+200,camera.position.x+500),350,10,10);
  banana.y=random(250,300);
  console.log("ho rahe")

  banana.addImage(bananaImage);
  banana.scale=0.05; 
  FoodGroup.add(banana);
  //banana.velocityX=-5;
  banana.lifetime=280;
 



  
}






