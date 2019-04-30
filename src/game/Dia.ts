// Liberapp 2019 - Tahiti Katagai
// 守られる人

class Dia extends PhysicsObject{

    radius:number;
    hit:boolean = false;

    constructor( px:number, py:number ) {
        super();

        this.radius = DIA_RADIUS_PER_W * Util.width;
        this.setDisplay( px, py );
        this.setBody( px, py );
        this.body.angle = Math.PI * 0.25;
        this.display.rotation = this.body.angle * 180 / Math.PI;
        Camera2D.transform( this.display );
    }

    setDisplay( px:number, py:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.display.addChild(this.display);
        shape.x = px;
        shape.y = py;
        shape.graphics.lineStyle( 5, DIA_COLOR );
        shape.graphics.drawRect( -this.radius, -this.radius, 2*this.radius, 2*this.radius );
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:1, position:[this.p2m(px), this.p2m(py)] } );
        const size = this.p2m(this.radius*2);
        this.body.addShape(new p2.Box( { width:size, height:size, collisionGroup:PHYSICS_GROUP_PLAYER, collisionMask:PHYSICS_GROUP_OBSTACLE } ), [0, 0], 0);
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
        // PhysicsObject.world.on("impact",  this.conflict, this);
    }

    conflict(e){
        /* ///
        if( this.hit == false ){
            this.hit = true;

            new GameOver();
            // PhysicsObject.deltaScale = 0.1;
            Player.I.setStateNone();
            
            const r = this.radius * 2 * Camera2D.scale;
            EffectLine.create( this.display.x, this.display.y, r, DIA_COLOR );
            new EffectCircle( this.display.x, this.display.y, r, DIA_COLOR );
        }
        */
    }

    fixedUpdate() {
        Camera2D.transform( this.display );

        if( this.body.velocity[0]**2 + this.body.velocity[1]**2 > 0 )
            this.conflict(null);
    }
}
