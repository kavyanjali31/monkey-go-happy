//create variables for objects
var monkey,player_running;
var ground;
var backImage,backgr;
var score=0;
var bananaImage,banana,bananasGroup;
var obstacle,obstacleImage,obstaclesGroup;
var END=0;
var gameState="PLAY";
var PLAY=1;

function preload() {
//loading animation  
  backImage=loadImage("jungle.jpg")
  player_running=      loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
}
function setup(){
  createCanvas(400,400);
  
  //creating sprites
  backgr=createSprite(0,0,800,400);
  backgr.addImage("backgr",backImage);
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player=createSprite(100,335,20,50);
  player.addAnimation("Running",player_running);
  player.scale=0.13;
  
   ground = createSprite(400,350,800,10);
   ground.x=backgr.width/2;
   ground.velocityX=-4;
   ground.visible=false;
  
 //creating groups
  bananasGroup=new Group();
  obstaclesGroup=new Group();
}


function draw() {
  background(220);
  
  //resetting the background
   if(backgr.x<0){
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
 }
  //introducing game states
 if (gameState==="PLAY"){
   score=score+Math.round(getFrameRate()/60);
   
   //resetting the ground
  if(ground.x<0){
  ground.x=ground.width/2;
  ground.velocityX=-4;
}
  //making it jump
  player.velocityY=player.velocityY+0.8;
  if (keyDown("space")&& player.y<=335) {
  player.velocityY = -12 ;
  }

  player.collide(ground);
   
   //increment in score
   if (player.isTouching(bananasGroup)){
  score=score+2;
  bananasGroup.destroyEach();
    }
   
   //gamestate into end
  if (player.isTouching(obstaclesGroup)){
  gameState="END";
    }
   bananas();
   obstacles();
 }
    //increment of scale
     switch(score){
      case 10:player.scale=0.12;
        break;
        case 20:player.scale=0.14;
        break;
        case 30:player.scale=0.16;
        break;
        case 40:player.scale=0.18;
        break;
        default:break 
 }
        
    drawSprites();
   //displaying of score
   stroke("white");
   fill("white")
   textSize(20);
   text("Survival Time "+score,100,50) ; 
         
    if (gameState==="END"){
    text("GAME OVER",200,200);
    stroke("white");
    textSize(20);
      
    ground.velocityX=0;
    backgr.velocityX=0;
      
    bananasGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
      
    obstaclesGroup.setLifetimeEach=-1;
    bananasGroup.setLifetimeEach=-1;
    player.collide(ground);
  }
     }

  function bananas(){
if (frameCount%80===0) {
var banana= createSprite(400,290,40,10);
  banana.addImage("banana",bananaImage);
banana.y=random(150,200);
banana.velocityX=-4;
bananasGroup.add(banana);
banana.scale=0.05;
bananasGroup.setLifetimeEach=200;
}
  }
  function obstacles(){
    if (frameCount%300===0) {
    var obstacle = createSprite(400,330,40,10);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.y=330;
    obstacle.scale=0.15;
    obstacle.velocityX=-4;
    obstaclesGroup.add(obstacle);
    bananasGroup.setLifetimeEach=200;
        }
  }      