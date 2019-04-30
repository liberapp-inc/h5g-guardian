// Liberapp 2019 - Tahiti Katagai
// 配置　障害物生成

class Wave extends GameObject{

    static I:Wave = null;
    static readonly speedMin = 1/(60*10);
    static readonly speedMax = 1/(60*3);
    random:Random;
    scroll:number = 0;
    period:number = 0;
    speedY:number;
    wave:number = 0;
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

            const bw = BLOCK_SIZE_PER_W * Util.width;
            const bh = BLOCK_SIZE_PER_H * Util.height;
            for( let i=0 ; i<BLOCK_IN_W ; i++ ){
                const data = this.map[this.mapIndex * BLOCK_IN_W + i];
                const type = data & 0xf;
                if( type != 0 ){
                    const x = (0.5 + i) * bw;
                    const y = -2.0 * bh;
                    const scale = ((data >>  4) & 0xf) * 0.5 + 1;
                    const angle = ((data >>  8) & 0xf) * (Math.PI*2/16);
                    const move  = ((data >> 12) & 0xf) * (Math.PI*2/16);   // 真下０度、時計回り0~15
                    const speed = ((data >> 16) & 0xf) * (bw*4/15);
                    const vx = Math.sin(move) * -speed;
                    const vy = Math.cos(move) *  speed;
                    switch( type ){
                        case 1: Obstacle.newBox( x, y, scale, angle, vx, vy );      break;
                        case 2: Obstacle.newBox( x, y, scale, angle, vx, vy );      break;
                        case 3: Obstacle.newLong( x, y, scale, angle, vx, vy );     break;
                        case 4: Obstacle.newBall( x, y, scale,        vx, vy );     break;
                        case 5: Obstacle.newCross( x, y, scale, angle, vx, vy );    break;
                    }

                }
            }

            if( (--this.mapIndex) < 0 ){
                this.map = this.maps[ this.random.i( 0, this.maps.length ) ];
                this.mapIndex = this.map.length / BLOCK_IN_W - 1;
                this.scroll -= Util.height * BLOCK_SIZE_PER_H * 4;
            }
        }
    }

    // 0x Speed,Move,Angle,Scale,Type

    map0:number[] = [
        0xf0004, 0x00000, 0x00000, 0x00000, 0x00000, 0xf0004,
        0x00000, 0x00000, 0x00000, 0x00f41, 0x00000, 0x00000,
        0x00000, 0x00000, 0x4c003, 0x00000, 0x00000, 0x00000,
        0x4c002, 0x00000, 0x00000, 0x00000, 0x00000, 0x44002,
    ];
    // map0:number[] = [
    //     5,0,5,0,5,0,
    //     0,5,0,5,0,5,
    //     0,0,0,0,0,0,
    //     4,4,4,4,4,4,
    //     0,4,0,0,4,0,
    //     3,0,1,1,0,3,
    //     0,3,0,0,3,0,
    //     2,0,2,0,2,0,
    //     0,2,0,2,0,2,
    //     1,1,1,1,1,1,
    //     0,1,0,0,1,0,
    // ];
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

