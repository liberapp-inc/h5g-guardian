// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PIXEL_PER_METER = 1;
const PLAYER_RADIUS_PER_W = 1/18;
const DIA_RADIUS_PER_W = 1/28;

const BLOCK_IN_W = 6;
const BLOCK_IN_H = 10;
const BLOCK_SIZE_PER_W = 1 / BLOCK_IN_W;
//const BLOCK_SIZE_PER_H = 1 / BLOCK_IN_H;

const PHYSICS_GRAVITY_PER_H = 0.015;
const PHYSICS_GROUP_PLAYER = 2;
const PHYSICS_GROUP_OBSTACLE = 4;

const SAVE_KEY_BESTSCORE = "guardian-bestScore";

const BACK_COLOR = 0x00f090;    // index.htmlで設定
const FONT_COLOR = 0xffffff;
const PLAYER_COLOR = 0xffffff;
const DIA_COLOR = 0xffffff;
const BLOCK_COLOR = 0x004060;

class Game {

    static loadSceneGamePlay() {
        PhysicsObject.deltaScale = 1;
        new Score();
        new Player( Util.width * 0.5, Util.height * 0.55 );
        new Dia( Util.width * 0.5, Util.height * 0.85 );
        new Wave();
        new StartMessage();
    }
}
