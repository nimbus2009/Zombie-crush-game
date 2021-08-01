class stone {
    constructor(x,y,radius) {
        this.x=x;
        this.y=y;
        this.r=radius;

        this.animation=loadImage("assets/stone.png");

        this.body=Bodies.circle(this.x,this.y,this.r,{
            mass:2
        });
        World.add(world,this.body);
    }
    display() {
        var pos=this.body.position;

        fill("#2f4f4f");

        image(this.animation,pos.x-25,pos.y-25,50,50);

        
    }
}