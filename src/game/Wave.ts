// Liberapp 2019 - Tahiti Katagai
// 配置　障害物生成

class Wave extends GameObject{

    hardRate:number = 0;
    fx:number = 0;
    hx:number;

    constructor() {
        super();

        this.hx = Util.width * 0.6;
        new Hook( this.hx, Util.height * 0.2 );
    }

    update() {
        this.hardRate = Util.clamp( this.fx / (Util.width * 20), 0, 1 );

        // Floor
        if( this.fx < Camera2D.x + Util.width * 1 ){
            const w = FLOOR_SIZE_PER_W * Util.width;
            this.fx += w;
            let x = this.fx;
            let y = Util.height * randF(0.70, 0.95);
            Block.newFloor( x, y );

            // Block
            if( rand() < this.hardRate * 0.5 ){
                Block.newBlock( x + randF(w*-0.4, w*0.4), randF( Util.height*0.1, y ) );
            }
        }

        // Hook
        if( this.hx < Camera2D.x + Util.width * 1 ){
            this.hx += randF( 0.2, 0.5+0.5*this.hardRate ) * Util.width;
            new Hook( this.hx, Util.height * randF(0.05, 0.2+0.3*this.hardRate) );
        }
    }
}
