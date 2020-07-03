// Liberapp 2019 Tahiti Katagai
// ゲームオーバー表示

class GameOver extends GameObject{

    texts:egret.TextField[] = [];
    retryButton:Button = null;
    step:number = 0;
    readonly fadeInFrame:number = 60;

    constructor() {
        super();

        this.texts[0] = Util.newTextField("SCORE : " + Score.I.point.toFixed(), Util.width / 12, FONT_COLOR, 0.5, 0.30, true, false);
        this.texts[0].alpha = 0;

        if( SDK ){
            if( Score.bestScore < Score.I.point ){
                Score.bestScore = Score.I.point;
                Social.setScore( Score.I.point );
                this.texts[1] = Util.newTextField("NEW RECORD!", Util.width / 13, FONT_COLOR, 0.5, 0.4, true, false);
                egret.Tween.get(this.texts[1],{loop:true})
                    .to({alpha:0}, 500)
                    .to({alpha:1}, 500)
            }
        }

        this.texts.forEach( text =>{ GameObject.display.addChild( text ); });
    }

    onDestroy() {
        this.texts.forEach( text =>{ GameObject.display.removeChild( text ); });
        this.texts = null;
    }
    
    update() {
        if( this.step < this.fadeInFrame ){
            this.step++;
            const a = this.step / this.fadeInFrame;
            this.texts[0].alpha = a;
            
            if( this.step == this.fadeInFrame ){
                this.retryButton = new Button("リトライ", Util.width/16, BACK_COLOR, 0.50, 0.70, 0.4, 0.1, FONT_COLOR, 1.0, this.onTapRetry );
            }
        }
    }

    onTapRetry(){
        GameObject.transit = Game.loadSceneGamePlay;
        this.destroy();
    }
}
