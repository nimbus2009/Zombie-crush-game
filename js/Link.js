class link {
    constructor(bodyA,bodyB) {
        var lastlink=bodyA.body.bodies.length-1;
        this.link=Constraint.create({
            bodyA:bodyA.body.bodies[lastlink],
            bodyB:bodyB.body,
            pointA:{x:0,y:0},
            pointB:{x:0,y:0},
            length:0,
            stiffness:0.1
        });
        World.add(world,this.link);
    }
}