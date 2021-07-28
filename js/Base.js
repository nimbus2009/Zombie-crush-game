class base {
    constructor(x,y,w,h) {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;

        this.body=Bodies.rectangle(this.x,this.y,this.w,this.h,{
            isStatic:true
        });
        World.add(world,this.body);
    }
    display() {
        var pos=this.body.position;

        rectMode(CENTER);

        noStroke();
        fill("#deb887");

        rect(pos.x,pos.y,this.w,this.h);

    }
}