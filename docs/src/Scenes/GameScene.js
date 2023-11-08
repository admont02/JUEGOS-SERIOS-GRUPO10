import { gameSettings } from './menu.js';
import Willy from '../Characters/Willy.js';
import DialogModal from '../Text/plugText.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.dialogIndex = 0;
        this.dialogs = [
            "Balta nos aprueba por pena.",
            "asfasf",
            "asf",
            "a"
        ];
        this.dialogPrinted = false;
    }
    
    preload() {
        this.load.image('willy', 'assets/images/characters/balta.jpg');   
    }
    
    create() {
        this.willy = new Willy(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'willy');
        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        
        this.printDialog();
        this.dialogTimer = this.time.addEvent({
            delay: 3000,
            callback: this.printDialog,
            callbackScope: this,
            loop: true
        });
    }
    
    printDialog() {
        if (this.dialogIndex < this.dialogs.length) {
            this.dialogModal.setText(this.dialogs[this.dialogIndex], true);
            this.dialogPrinted = true;
            this.dialogIndex++;
        } else {
            this.dialogModal.toggleWindow();
            this.dialogTimer.remove(false);
            this.createReopenDialogButton();
        }
    }

    createReopenDialogButton() {
        const button = this.add.text(100, 100, 'Reopen Dialog', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.reopenDialog());
    }

    reopenDialog() {
        this.dialogIndex = 0;
        this.dialogPrinted = false;
        this.dialogModal.toggleWindow();
        this.printDialog();
        this.dialogTimer = this.time.addEvent({
            delay: 3000,
            callback: this.printDialog,
            callbackScope: this,
            loop: true
        });
    }

    update(time, delta) {
        if (this.willy.update) {
            this.willy.update(time, delta);
        }
    }
}

export default GameScene;
