// Liberapp 2019 - Tahiti Katagai
// 障害物ブロック

enum ObstacleType{
    Box,
    Ball,
    Cross,
};

class Obstacle extends PhysicsObject{

    static newBox( px:number, py:number, scale:number=1 ){
        new Obstacle( ObstacleType.Box, px, py, Util.w( BLOCK_SIZE_PER_W * scale ), Util.h( BLOCK_SIZE_PER_H * scale ) );
    }
    static newBar( px:number, py:number ){
        new Obstacle( ObstacleType.Box, px, py, Util.w( BLOCK_SIZE_PER_W * 2 ), Util.h( BLOCK_SIZE_PER_H ) );
    }
    static newLong( px:number, py:number ){
        new Obstacle( ObstacleType.Box, px, py, Util.w( BLOCK_SIZE_PER_W * 3 ), Util.h( BLOCK_SIZE_PER_H * 0.5 ) );
    }
    static newBall( px:number, py:number, scale:number=1 ){
        new Obstacle( ObstacleType.Ball, px, py, Util.w( BLOCK_SIZE_PER_W * 0.5 * scale ), 0 );
    }
    static newCross( px:number, py:number, scale:number=1 ){
        scale *= 2/3;
        new Obstacle( ObstacleType.Cross, px, py, Util.w( BLOCK_SIZE_PER_W * scale ), Util.h( BLOCK_SIZE_PER_H * scale ) );
    }
    
    static blocks:Obstacle[] = [];

    type:ObstacleType;
    sizeW:number;
    sizeH:number;
    color:number;

    constructor( type:ObstacleType, px:number, py:number, w:number, h:number, angle:number=0, vx:number=0, vy:number=0  ) {
        super();

        Obstacle.blocks.push(this);
        this.type = type;
        this.sizeW = Math.max( w - Util.w(BLOCK_SIZE_PER_W * 0.1), 0 );
        this.sizeH = Math.max( h - Util.h(BLOCK_SIZE_PER_H * 0.1), 0 );
        this.color = BLOCK_COLOR;
        this.setDisplay( px, py );
        this.setBody( px, py );
        this.body.angle = angle;
        this.display.rotation = this.body.angle * 180 / Math.PI;
        this.body.velocity[0] = vx;
        this.body.velocity[1] = vy + Wave.I.speedY * 20;
        Camera2D.transform( this.display );
    }

    onDestroy(){
        Obstacle.blocks = Obstacle.blocks.filter( obj => obj != this );
    }

    setDisplay( px:number, py:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.display.addChild(this.display);
        shape.x = px;
        shape.y = py;
        shape.graphics.beginFill( this.color );
        shape.graphics.drawRect( -0.5*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
        shape.graphics.endFill();

        shape.graphics.beginFill( this.color );
        switch( this.type ){
            case ObstacleType.Box:
            shape.graphics.drawRect( -0.5*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
            break;
            case ObstacleType.Ball:
            shape.graphics.drawCircle( 0, 0, this.sizeW );
            break;
            case ObstacleType.Cross:
            shape.graphics.drawRect( -1.5*this.sizeW, -0.5*this.sizeH, 3.0*this.sizeW,     this.sizeH );
            shape.graphics.drawRect( -0.5*this.sizeW, -1.5*this.sizeH,     this.sizeW, 3.0*this.sizeH );
            break;
        }
        shape.graphics.endFill();
    }

    setBody( px:number, py:number ){
        switch( this.type ){
            case ObstacleType.Box:
            this.body = new p2.Body( {gravityScale:1, mass:1, position:[this.p2m(px), this.p2m(py)]} );
            this.body.addShape(new p2.Box( { width:this.p2m(this.sizeW), height:this.p2m(this.sizeH) } ), [0, 0], 0);
            break;
            case ObstacleType.Ball:
            this.body = new p2.Body( {gravityScale:1, mass:1, position:[this.p2m(px), this.p2m(py)]} );
            this.body.addShape(new p2.Circle({ radius:this.p2m(this.sizeW) }));
            break;
            case ObstacleType.Cross:
            this.body = new p2.Body( {gravityScale:1, mass:3, position:[this.p2m(px), this.p2m(py)]} );
            this.body.addShape(new p2.Box( { width:this.p2m(this.sizeW*3), height:this.p2m(this.sizeH  ) } ), [0, 0], 0);
            this.body.addShape(new p2.Box( { width:this.p2m(this.sizeW  ), height:this.p2m(this.sizeH*3) } ), [0, 0], 0);
            break;
        }
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    fixedUpdate() {
        Camera2D.transform( this.display );

        if( (this.display.x - Util.width*0.5)**2 > (Util.width*0.7)**2 || this.display.y > Util.height * 1.2 ){
            this.destroy();
        }
    }
}
