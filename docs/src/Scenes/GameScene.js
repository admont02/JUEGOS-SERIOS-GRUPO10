
import Willy from '../Characters/Willy.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('willy', 'assets/images/balta.jpg');
    }

    create() {
        this.willy = new Willy(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'willy');
    }

    update(t, dt) {
        this.willy.update();
    }
}
