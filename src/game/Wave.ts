// Liberapp 2019 - Tahiti Katagai
// 配置　障害物生成

class Wave extends GameObject{

    static I:Wave = null;
    random:Random;
    scroll:number = 0;
    speedY:number;
    wave:number = 0;
    meteo:number = 60*6;
    step:number = 0;
    route:number=0;
    map:number[] = null;
    mapIndex:number = 0;

    constructor() {
        super();

        Wave.I = this;
        this.random = new Random();
        this.speedY = Util.height / (60 * 4);

        this.map = this.maps[ this.random.i( 0, this.maps.length ) ];
        this.mapIndex = this.map.length / BLOCK_IN_W - 1;
        this.scroll -= Util.height * BLOCK_SIZE_PER_H * 4;
    }

    update() {
        this.scroll += this.speedY;

        const length = Util.height * BLOCK_SIZE_PER_H;
        if( this.scroll >= length ){
            this.scroll -= length;
            this.wave++;

            const bw = BLOCK_SIZE_PER_W  * Util.width;
            const bh = BLOCK_SIZE_PER_H * Util.height;
            for( let i=0 ; i<BLOCK_IN_W ; i++ ){
                if( this.map[this.mapIndex * BLOCK_IN_W + i] != 0 ){
                    new Block( (0.5 + i) * bw, 0.5 * bh, bw, bh, 0 );
                }
            }

            if( (--this.mapIndex) < 0 ){
                this.map = this.maps[ this.random.i( 0, this.maps.length ) ];
                this.mapIndex = this.map.length / BLOCK_IN_W - 1;
                this.scroll -= Util.height * BLOCK_SIZE_PER_H * 4;
            }
        }
    }

    map0:number[] = [
        0,0,0,0,0,
        1,1,1,1,1,
        1,1,0,1,1,
        1,0,0,0,1,
        0,0,0,0,0,
        1,0,1,0,1,
        1,0,0,0,1,
        0,1,0,1,0,
        0,1,0,1,0,
        0,0,0,0,0,
        1,0,0,0,1,
        0,0,0,0,0,
    ];
    map1:number[] = [
        0,0,0,0,0,
        0,0,1,0,0,
        0,1,1,1,0,
        0,1,1,1,0,
        0,1,0,1,0,
        0,1,1,1,0,
        0,0,0,0,0,
        0,1,1,1,0,
        0,0,1,0,0,
        0,1,1,1,0,
        0,0,1,0,0,
    ];
    map2:number[] = [
        1,0,0,0,1,
        1,0,0,0,1,
        0,1,0,1,0,
        0,1,0,1,0,
        0,0,1,0,0,
        0,0,1,0,0,
    ];
    map3:number[] = [
        1,0,0,0,1,
        0,1,0,1,0,
        0,0,1,0,0,
        0,0,1,0,0,
        0,0,1,0,0,
    ];
    maps:number[][] = [this.map0, this.map1, this.map2, this.map3];
}

