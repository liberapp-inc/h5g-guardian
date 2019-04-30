// Liberapp 2019 - Tahiti Katagai
// プレイヤー　押しのけガードマン Guardian

class Player extends PhysicsObject{

    static I:Player = null;

    radius:number;
    scrollSpeed:number;
    button:Button;
    buttonOffsetX:number = 0;
    buttonOffsetY:number = 0;
    state:()=>void = this.stateNone;
    step:number = 0;
    scale:number = 1;

    constructor( px:number, py:number ) {
        super();

        Player.I = this;
        this.radius = PLAYER_RADIUS_PER_W * Util.width;
        this.scrollSpeed = Util.height / (60 * 2);
        this.setDisplay( px, py );
        this.setBody( px, py );
        Camera2D.transform( this.display );
        
        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null ); // 透明な全画面ボタン
    }

    onDestroy(){
        this.button.destroy();
        Player.I = null;
    }

    setDisplay( px:number, py:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.display.addChild(this.display);
        shape.x = px;
        shape.y = py;
        shape.graphics.beginFill( PLAYER_COLOR );
        shape.graphics.drawCircle( 0, 0, this.radius );
        shape.graphics.endFill();
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:1, position:[this.p2m(px), this.p2m(py)], type:p2.Body.STATIC } );
        this.body.addShape(new p2.Circle({ radius:this.p2m(this.radius), collisionGroup:PHYSICS_GROUP_PLAYER, collisionMask:PHYSICS_GROUP_OBSTACLE }));
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
        // PhysicsObject.world.on("impact",  this.conflict, this);
    }

    // conflict(e){
    //     this.scale = 1.2;
    // }

    fixedUpdate() {
        this.state();
        this.scale += (1 - this.scale) * 0.2;
        Camera2D.transform( this.display, this.scale );
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){}

    setStateMove(){
        this.state = this.stateMove;
        this.step = 0;
    }
    stateMove() {
        // Camera2D.y -= this.scrollSpeed;

        const mx = this.mx;
        const my = this.my;

        if( this.button.press ){
            this.buttonOffsetX = this.px - this.button.x;
            this.buttonOffsetY = this.py - this.button.y;
        }
        else{
            this.px = Util.clamp( this.button.x + this.buttonOffsetX, this.radius, Util.width  - this.radius );
            this.py = Util.clamp( this.button.y + this.buttonOffsetY, this.radius, Util.height - this.radius );
            this.buttonOffsetX = this.px - this.button.x;
            this.buttonOffsetY = this.py - this.button.y;
        }

        this.body.velocity[0] = this.mx - mx;
        this.body.velocity[1] = this.my - my;
    }
}
