// Liberapp 2019 - Tahiti Katagai
// プレイヤー　押しのけ守護神 Guardian

class Player extends PhysicsObject{

    static I:Player = null;

    radius:number;
    button:Button;
    hookR:number = 0;
    state:()=>void = this.stateNone;
    step:number = 0;

    constructor( px:number, py:number ) {
        super();

        Player.I = this;
        this.radius = PLAYER_RADIUS_PER_W * Util.width;
        this.setDisplay( px, py );
        this.setBody( px, py );
        Camera2D.transform( this.display );
        
        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null );
    }

    onDestroy(){
        super.onDestroy();
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
        this.body = new p2.Body( {gravityScale:0, mass:1, position:[this.p2m(px), this.p2m(py)] } );
        this.body.addShape(new p2.Circle({ radius:this.p2m(this.radius) }));
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
        PhysicsObject.world.on("impact",  this.conflict, this);
    }

    conflict(e){
        if( this.state != this.stateNone ){
            this.gameOver();
            this.setStateNone();
        }
    }

    fixedUpdate() {
        this.state();
        Camera2D.x = this.px - Util.width*0.25;
        Camera2D.transform( this.display );
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
    }

    gameOver(){
        new GameOver();
        PhysicsObject.deltaScale = 0.1;
        const r = this.radius * 2 * Camera2D.scale;
        for( let i=0 ; i<5 ; i++ ) {
            let a = rand() * Math.PI * 2;
            let vx =  Math.cos( a );
            let vy = -Math.sin( a );
            let rv = r * ( 2 + i );
            new EffectLine(
                this.display.x + vx * r,
                this.display.y + vy * r,
                vx * rv,
                vy * rv,
                PLAYER_COLOR );
        }
        new EffectCircle( this.display.x, this.display.y, r, PLAYER_COLOR );
    }
}
