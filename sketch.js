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

var zombie,z1,z2,z3;

var direction="right";

var cutbtn;

let defeated=false;

function preload() {
  bg=loadImage("assets/background.png");
  z1=loadAnimation("assets/zombie1.png","assets/zombie2.png");
  z2=loadAnimation("assets/zombie3.png","assets/zombie4.png");
  z3=loadImage("assets/zombie.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  b1=new base(70,height-330,200,50);
  b2=new base(width-70,height-330,200,50);
  b3=new base(width/2,height,width*2,20);

  bridge=new Bridge(25,{x:b1.x+75,y:b1.y+25});

  bridgelink=new link(bridge,b2);

  for(var i=0;i<9;i++) {
    var s=new stone(random(250,width-250),100,25);
    stones.push(s);
  }

  zombie=createSprite(width/2,height-75,20,20);
  zombie.scale=0.07;
  zombie.addAnimation('z2',z2);
  zombie.addAnimation('z1',z1);
  zombie.addAnimation('zs',z3);

  cutbtn=createImg("assets/axe.png");
  cutbtn.position(width/2-50,100);
  cutbtn.size(105,100);
  cutbtn.mouseClicked(detach);
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
      zombie.velocityX=random(1,2);
      zombie.changeAnimation('z1');
    }
    if(direction=="left") {
      zombie.velocityX=random(-2,-1);
      zombie.changeAnimation('z2');
    }

    if(zombie.position.x>=width-200) {
      direction="left";
    }
    if(zombie.position.x<=200) {
      direction="right";
    }

    for(var i=0;i<stones.length;i++) {
      if(collided(stones[i].body,zombie,50)) {
        console.log("Collided!");
        stones[i]=null;
        stones.splice(i,1);
        defeated=true;
      }
    }

    if(defeated) {
      defeat();
    }
}

function detach() {
  
  bridgelink.dettach();
  bridge.break();

}

function collided(body1,body2,threshold) {
  if(body1!==null&&body2!==null) {
    var distance=dist(body1.position.x,body1.position.y,body2.position.x,body2.position.y);
    if(distance<=threshold) {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    console.error("≡(▔﹏▔)≡\nThe DCF (Distance Collision Function) has gotten into a problem:\nOne of the bodies is 'null'");
  }
}

function defeat() {
  zombie.velocityX=0;
  zombie.changeAnimation("zs");
  zombie.scale=0.2
}
