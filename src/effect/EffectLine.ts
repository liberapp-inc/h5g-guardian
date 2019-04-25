// Liberapp 2019 - Tahiti Katagai
// エフェクト　- 効果線（重い）

class EffectLine extends GameObject{

    x:number;
    y:number; 
    vx:number;
    vy:number; 
    color:number;
    static readonly maxFrame:number = 30;
    frame:number = 0;

    static create( x:number, y:number, r:number, color:number, count:number=4 ){
        for( let i=0 ; i<count ; i++ ) {
            let a = rand() * Math.PI * 2;
            let vx =  Math.cos( a );
            let vy = -Math.sin( a );
            let vr = r * ( 2 + i );
            new EffectLine(
                x + vx * r,
                y + vy * r,
                vx * vr,
                vy * vr,
                color );
        }
    }

    constructor( x:number, y:number, vx:number, vy:number, color:number=0xffc000 ) {
        super();

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.setShape( 0.01 );
    }

    setShape( rate:number ){
        let shape = new egret.Shape();
        if( this.display ) GameObject.display.removeChild(this.display);
        this.display = shape;
        GameObject.display.addChild(this.display);

        rate = rate * Math.PI * 0.5;
        let rateS = Math.sin(rate);
        let rateD = 1 - Math.cos(rate);
        shape.graphics.lineStyle(6, this.color);
        shape.graphics.moveTo(this.x+this.vx*rateS, this.y+this.vy*rateS);
        shape.graphics.lineTo(this.x+this.vx*rateD, this.y+this.vy*rateD);
    }

    update() {
        if( (++this.frame) >= EffectLine.maxFrame ){
            this.destroy();
            return;
        }

        let rate = this.frame / EffectLine.maxFrame;    // 0.0~1.0
        this.setShape( rate );
    }
}
