// Liberapp 2019 - Tahiti Katagai
// 障害物ブロック

class Block extends PhysicsObject{

    static blocks:Block[] = [];
    sizeW:number;
    sizeH:number;
    color:number;

    static newBlock( px:number, py:number ){
        const s = BLOCK_SIZE_PER_W * Util.width;
        new Block( px, py, s, s, Math.PI*0.25 );
    }
    static newFloor( px:number, py:number ){
        const w = FLOOR_SIZE_PER_W * Util.width;
        const h = Util.height - py;
        new Block( px, py+h*0.5, w * 0.7, h, 0 );
    }
    constructor( px:number, py:number, w:number, h:number, r:number ) {
        super();

        Block.blocks.push(this);
        this.sizeW = w;
        this.sizeH = h;
        this.color = BLOCK_COLOR;
        this.setDisplay( px, py );
        this.setBody( px, py );
        this.body.angle = r;
        this.display.rotation = this.body.angle * 180 / Math.PI;
        Camera2D.transform( this.display );
    }

    onDestroy(){
        super.onDestroy();
        Block.blocks = Block.blocks.filter( obj => obj != this );
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
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:1, position:[this.p2m(px), this.p2m(py)], type:p2.Body.STATIC } );
        this.body.addShape(new p2.Box( { width:this.p2m(this.sizeW), height:this.p2m(this.sizeH) } ), [0, 0], 0);
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    fixedUpdate() {
        Camera2D.transform( this.display );

        if( this.display.x <= -2 * Util.width ){
            this.destroy();
        }
    }
}
