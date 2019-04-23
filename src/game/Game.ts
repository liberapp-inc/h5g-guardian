// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PIXEL_PER_METER = 10;
const PLAYER_RADIUS_PER_W = 1/40;
const HOOK_RADIUS_PER_W = 1/60;
const BLOCK_SIZE_PER_W = 1/20;
const FLOOR_SIZE_PER_W = 1/3;
const GRAVITY_PER_H = (1/300);

const SAVE_KEY_BESTSCORE = "hook-bestScore";

const BACK_COLOR = 0xF0F0F2;    // index.htmlで設定
const FONT_COLOR = 0xE0B060;
const PLAYER_COLOR = 0x0D697E;
const COIN_COLOR = 0xC09030;
const BLOCK_COLOR = 0xC0001B;
const FLOOR_COLOR = 0x608090;

class Game {

    static loadSceneGamePlay() {
        PhysicsObject.deltaScale = 1;
        // new Background();
        new Wave();
        new StartMessage();
        new Score();
        new Player( Util.width * 0.2, Util.height * 0.2 );
    }
}
