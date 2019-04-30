// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PIXEL_PER_METER = 1;
const PLAYER_RADIUS_PER_W = 1/20;
const DIA_RADIUS_PER_W = 1/32;

const BLOCK_IN_W = 6;
const BLOCK_IN_H = 10;
const BLOCK_SIZE_PER_W = 1 / BLOCK_IN_W;
const BLOCK_SIZE_PER_H = 1 / BLOCK_IN_H;

const PHYSICS_GRAVITY_PER_H = 0.015;
const PHYSICS_GROUP_PLAYER = 2;
const PHYSICS_GROUP_OBSTACLE = 4;

const SAVE_KEY_BESTSCORE = "guardian-bestScore";

const BACK_COLOR = 0xF0F0F2;    // index.htmlで設定
const FONT_COLOR = 0xE0B060;
const PLAYER_COLOR = 0x0D697E;
const DIA_COLOR = 0x0D697E;
const BLOCK_COLOR = 0xC0001B;

class Game {

    static loadSceneGamePlay() {
        PhysicsObject.deltaScale = 1;
        new Score();
        new Player( Util.width * 0.5, Util.height * 0.5 );
        new Dia( Util.width * 0.5, Util.height * 0.8 );
        new Wave();
        new StartMessage();
    }
}
