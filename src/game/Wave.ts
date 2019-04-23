// Liberapp 2019 - Tahiti Katagai
// 配置　障害物生成

class Wave extends GameObject{

    hardRate:number = 0;
    y:number;

    constructor() {
        super();
    }

    update() {
        this.hardRate = Util.clamp( this.y / (Util.height * 20), 0, 1 );

        // Create Blocks

    }
}
