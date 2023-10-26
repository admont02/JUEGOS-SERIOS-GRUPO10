
import Willy from '../Characters/Willy.js';
import DialogModal from '../Text/plugText.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('willy', 'assets/images/balta.jpg');
       
    }

    create() {
        this.dialogModal = new DialogModal(this);
        this.willy = new Willy(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'willy');
        console.log(this.sys.dialogModal);
        this.dialogModal.init();
        this.dialogModal.setText('Balta nos aprueba por pena.', true);
    }

    update(t, dt) {
        this.willy.update();
    }
}
