const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var b1,b2,b3,b4;
var bridge;
var bridgelink;

var stones=[];

var bg;

var zombie,z1,z2;

var direction="right";

function preload() {
  bg=loadImage("assets/background.png");
  z1=loadAnimation("assets/zombie1.png","assets/zombie2.png");
  z2=loadAnimation("assets/zombie3.png","assets/zombie4.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  b1=new base(70,height-330,200,50);
  b2=new base(width-70,height-330,200,50);

  bridge=new Bridge(25,{x:b1.x+75,y:b1.y+25});

  bridgelink=new link(bridge,b2);

  for(var i=0;i<9;i++) {
    var s=new stone(random(250,width-250),100,25);
    stones.push(s);
  }

  zombie=createSprite(width/2,height-75,20,20);
  zombie.addAnimation("z1",z1);
  zombie.scale=0.07;
}

function draw() {
  background(100);
  Engine.update(engine);
  b1.display();
  b2.display();

  image(bg,0,0,width,height);

  bridge.show();

    for(var i=0;i<stones.length;i++) {
      stones[i].display();
    }

    drawSprites();

    if(direction=="right") {
      zombie.velocityX=random(1,4);
    }
    if(direction=="left") {
      zombie.velocityX=random(-4,-1);
    }

    if(zombie.position.x>=width-200) {
      direction="left";
    }
    if(zombie.position.x<=200) {
      direction="right";
    }
}
