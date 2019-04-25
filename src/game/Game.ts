// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PIXEL_PER_METER = 10;
const PLAYER_RADIUS_PER_W = 1/16;
const WARD_RADIUS_PER_W = 1/24;

const BLOCK_IN_W = 5;
const BLOCK_IN_H = 10;
const BLOCK_SIZE_PER_W = 1 / BLOCK_IN_W;
const BLOCK_SIZE_PER_H = 1 / BLOCK_IN_H;
const GRAVITY_PER_H = (1/300);

const SAVE_KEY_BESTSCORE = "guardian-bestScore";

const BACK_COLOR = 0xF0F0F2;    // index.htmlで設定
const FONT_COLOR = 0xE0B060;
const PLAYER_COLOR = 0x0D697E;
const WARD_COLOR = 0x0D697E;
const BLOCK_COLOR = 0xC0001B;

class Game {

    static loadSceneGamePlay() {
        PhysicsObject.deltaScale = 1;
        new Score();
        new Player( Util.width * 0.5, Util.height * 0.5 );
        new Ward( Util.width * 0.5, Util.height * 0.8 );
        new Wave();
        new StartMessage();
    }
}
