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

function preload() {
  bg=loadImage("assets/background.png");
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
}
