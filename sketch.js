// declaring matter.js stuff
const Engine = Matter.Engine;
const Constraint = Matter.Constraint;
const Bodies = Matter.Bodies;
const World = Matter.World;

//declaring game objects
var bg;
var playerImg, player;

var ground;
var Redge;
var Ledge;
var Uedge;

var spikes;
var tri, triImg;

var candy;
var candySpr;

var st1;
var st2;
var st3;
var st4;
var st5;
var st6;
var st7;
var st8;


function preload() {
  //loading images
  bg = loadImage("background.jpeg")

  playerImg = loadAnimation("om nom.png", "mouth.png", "hungry.png");

  triImg = loadImage("TSpikes.png")
}
function setup() {
  //creating canvas
  canvas = createCanvas(displayWidth - 30, displayHeight - 150);

  //matter.js setup
  myEngine = Engine.create();
  myWorld = myEngine.world;

  //creating ground and edges
  ground = new Ground(width / 2, height - 45, canvas.width, 20);
  Ledge = new Ground(-5, height / 2, 20, canvas.height);
  Redge = new Ground(1258, height / 2, 20, canvas.height);

  //creating Uedge as a spikes to give it a red color
  Uedge = new Spikes(width / 2, 0, canvas.width, 20);

  //creating the candy
  candy = new Candy(50, height - 90, 20)


  //adjusting frameRate to slow down the speed of animation and creating player
  // frameRate(4)
  player = createSprite(width - 60, height - 510, 20, 50);
  player.addAnimation("running", playerImg);
  player.scale = 0.2;


  //creating blockk stages on which the stars should stand
  st1 = new Stage1(width / 2 - 180, height - 150, canvas.width - 180, 20)
  st2 = new Stage1(width - 0, height - 150, 300, 20)

  st3 = new Stage1(width -445, height - 255, canvas.width -180, 20)
  st4 = new Stage1(width -1250, height - 255, 300, 20)

  st5 = new Stage1(width / 2 - 180, height - 360, canvas.width - 180, 20)
  st6 = new Stage1(width - 0, height - 360, 300, 20)

  st7 = new Stage1(width -445, height - 465, canvas.width -180, 20)
  st8 = new Stage1(width -1250, height - 465, 300, 20)

  //matter.js engine
  Engine.run(myEngine);
}
function draw() {
  Engine.update(myEngine)
  //displaying invisible bodies
  ground.display();
  Ledge.display();
  Redge.display();

  //displaying visible bodies
  background(bg);
  Uedge.display();
 
  candySpr = createSprite(candy.body.position.x, candy.body.position.y, 50, 50);
  candySpr.visible = false

  if (candySpr.isTouching(player)) {
    console.log("yumm")
  }

  //displaying stages
  st1.display();
  st2.display();
  st3.display();
  st4.display();
  st5.display();
  st6.display();
  st7.display();
  st8.display();

  
 
  //creating a loop for spikes
  for (var i = 10; i < 2000; i = i + 25) {
    tri = createSprite(i, 14, 30, 30)
    tri.addImage(triImg)
    tri.scale = 0.05
  }

  //displaying visible bodies
  drawSprites();
  candy.display();
}

//function for giving movement to the candy
function keyPressed() {

  if (keyCode === UP_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: null, y: -400 })
  }

  if(keyCode === 32 ){
    Matter.Body.setStatic(candy.body,true) 
  }

  if (keyCode === DOWN_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: null, y: 400 })
  }
  if (keyCode === LEFT_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: -400, y: null })
  }
  if (keyCode === RIGHT_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: 400, y: null })
  }
  //NOTES: to remember about kecodes
  //32=space;  13=enter;    16=shift;     18=alt;
}
function keyReleased() {
  if (keyCode === UP_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: null, y: 100 })
  }
  if(keyCode === 32 ){
    Matter.Body.setStatic(candy.body,false) 
  }
  if (keyCode === DOWN_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: null, y: -100 })
  }
  if (keyCode === LEFT_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: 100, y: null })
  }
  if (keyCode === RIGHT_ARROW) {
    Matter.Body.applyForce(candy.body, candy.body.position, { x: -100, y: null })
  }
}
