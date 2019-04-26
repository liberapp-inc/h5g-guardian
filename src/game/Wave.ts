// Liberapp 2019 - Tahiti Katagai
// 配置　障害物生成

class Wave extends GameObject{

    static I:Wave = null;
    static readonly speedMin = 1/(60*6);
    static readonly speedMax = 1/(60*3);
    random:Random;
    scroll:number = 0;
    period:number = 0;
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
        this.speedY = Util.height * Wave.speedMin;

        this.map = this.maps[ this.random.i( 0, this.maps.length ) ];
        this.mapIndex = this.map.length / BLOCK_IN_W - 1;
        this.scroll -= Util.height * BLOCK_SIZE_PER_H * 4;
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        const hardRate = Util.clamp( this.scroll / (5 * Util.height), 0, 1 );
        this.speedY = Util.height * Util.lerp( Wave.speedMin,  Wave.speedMax, hardRate );
        this.scroll += this.speedY;
        this.period += this.speedY;

        const length = Util.height * BLOCK_SIZE_PER_H;
        if( this.period >= length ){
            this.period -= length;
            this.wave++;

            const bw = BLOCK_SIZE_PER_W  * Util.width;
            const bh = BLOCK_SIZE_PER_H * Util.height;
            for( let i=0 ; i<BLOCK_IN_W ; i++ ){
                const type = this.map[this.mapIndex * BLOCK_IN_W + i];
                switch( type ){
                    case 0: break;
                    case 1: Obstacle.newBox( (0.5 + i) * bw, 0.5 * bh );    break;
                    case 2: Obstacle.newBar( (0.5 + i) * bw, 0.5 * bh );    break;
                    case 3: Obstacle.newLong( (0.5 + i) * bw, 0.5 * bh );    break;
                    case 4: Obstacle.newBall( (0.5 + i) * bw, 0.5 * bh );    break;
                    case 5: Obstacle.newCross( (0.5 + i) * bw, 0.5 * bh );    break;
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
        5,0,5,0,5,0,
        0,5,0,5,0,5,
        0,0,0,0,0,0,
        4,4,4,4,4,4,
        0,4,0,0,4,0,
        3,0,1,1,0,3,
        0,3,0,0,3,0,
        2,0,2,0,2,0,
        0,2,0,2,0,2,
        1,1,1,1,1,1,
        0,1,0,0,1,0,
    ];
    map1:number[] = [
        0,0,0,0,0,0,
        0,0,1,0,0,0,
        0,1,1,1,0,0,
        0,1,1,1,0,0,
        0,1,0,1,0,0,
        0,1,1,1,0,0,
        0,0,0,0,0,0,
        0,1,1,1,0,0,
        0,0,1,0,0,0,
        0,1,1,1,0,0,
        0,0,1,0,0,0,
    ];
    map2:number[] = [
        1,0,0,0,1,0,
        1,0,0,0,1,0,
        0,1,0,1,0,0,
        0,1,0,1,0,0,
        0,0,1,0,0,0,
        0,0,1,0,0,0,
    ];
    map3:number[] = [
        1,0,0,0,1,0,
        0,1,0,1,0,0,
        0,0,1,0,0,0,
        0,0,1,0,0,0,
        0,0,1,0,0,0,
    ];
    maps:number[][] = [this.map0];//, this.map1, this.map2, this.map3];
}

