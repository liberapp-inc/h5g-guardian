// Liberapp 2019 Tahiti Katagai
// ゲームオーバー表示

class GameOver extends GameObject{

    textGameOver:egret.TextField = null;
    textScore:egret.TextField = null;
    retryButton:Button = null;
    step:number = 0;
    readonly fadeInFrame:number = 60;

    constructor() {
        super();

        this.textGameOver = Util.newTextField("GAME OVER", Util.width / 10, FONT_COLOR, 0.5, 0.40, true, false);
        GameObject.display.addChild( this.textGameOver );
        
        if( Score.I ){
            if( Score.I.point >= Score.I.bestScore ){
                egret.localStorage.setItem(SAVE_KEY_BESTSCORE, Score.I.point.toFixed() ); // string
            }
            this.textScore = Util.newTextField("SCORE : " + Score.I.point.toFixed(), Util.width / 14, FONT_COLOR, 0.5, 0.50, true, false);
            GameObject.display.addChild( this.textScore );
        }
    }

    onDestroy() {
        GameObject.display.removeChild( this.textGameOver );
        this.textGameOver = null;
        if( this.textScore ){
            GameObject.display.removeChild( this.textScore );
            this.textScore = null;
        }
    }
    
    update() {
        if( this.step < this.fadeInFrame ){
            this.step++;
            const a = this.step / this.fadeInFrame;
            this.textGameOver.alpha = a;
            this.textScore.alpha = a;
            
            if( this.step == this.fadeInFrame ){
                this.retryButton = new Button("リトライ", Util.width/16, BACK_COLOR, 0.50, 0.65, 0.4, 0.1, FONT_COLOR, 1.0, this.onTapRetry );
            }
        }
     }

    onTapRetry(){
        GameObject.transit = Game.loadSceneGamePlay;
        this.destroy();
    }
}
