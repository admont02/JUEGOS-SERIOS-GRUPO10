import { gameSettings } from './menu.js';
import Willy from '../Characters/Willy.js';
import DialogModal from '../Text/plugText.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.dialogIndex = 0;
        this.dialogAuxIndex = 0;

        this.dialogs = [
            "Balta nos aprueba por pena.",
            "miau",
            "miau",
            "tony"
        ];
        this.dialogsAux = [
            "Funciona",
            "miau",
            "miau",
            "tony"
        ];
        this.dialogPrinted = false;
    }

    preload() {
<<<<<<< Updated upstream
        this.load.image('willy', 'assets/images/characters/balta.jpg');
=======
        this.load.image('fondo', 'assets/images/background/fondoCalle.webp');
        this.load.image('willy', 'assets/images/characters/balta.jpg');   
        this.load.image('car', 'assets/images/characters/carPumPum.png'); 
>>>>>>> Stashed changes
    }

    showOptions() {
        this.dialogModal.toggleWindow();
        this.dialogModalAux = new DialogModal(this);
        this.dialogModalAux.init();
        this.dialogModalAux.doubleFontSize();
        if (this.dialogAuxIndex < this.dialogsAux.length) {
            this.dialogModalAux.setText(this.dialogsAux[this.dialogAuxIndex], true);
            this.dialogPrinted = true;
            this.dialogAuxIndex++;
        }


        const repeatButton = this.add.text(100, 100, 'Repetir Conversación', { fill: '#0f0' })
            .setInteractive()
            .on('pointerup', () => this.reopenDialog());

        const closeButton = this.add.text(100, 150, 'Cerrar Diálogo', { fill: '#f00' })
            .setInteractive()
            .on('pointerup', () => this.closeDialog());
    }

    create() {
        this.willy = new Willy(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'willy');
        this.car = this.physics.add.sprite(Phaser.Math.Between(50, this.sys.game.config.width - 50), 0, 'car');
        this.car.setVelocity(100,0);
        this.car.body.allowGravity = false;
        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();

        this.printDialog();
        this.input.on('pointerdown', this.changeDialog, this);
    }

    changeDialog() {
        if (this.dialogIndex < this.dialogs.length) {
            this.dialogModal.setText(this.dialogs[this.dialogIndex], true);
            this.dialogPrinted = true;
            this.dialogIndex++;
        } else {
            this.showOptions();
            this.input.off('pointerdown', this.changeDialog, this);
        }
    }

    reopenDialog() {
        this.dialogIndex = 0;
        this.dialogPrinted = false;
        this.dialogModal.toggleWindow();
        this.printDialog();
        this.input.on('pointerdown', this.changeDialog, this);
    }

    closeDialog() {
        this.dialogModal.toggleWindow();
    }

    update(time, delta) {
        if (this.willy.update) {
            this.willy.update(time, delta);
        }
    }

    printDialog() {
        if (this.dialogIndex < this.dialogs.length) {
            this.dialogModal.setText(this.dialogs[this.dialogIndex], true);
            this.dialogPrinted = true;
            this.dialogIndex++;
        } else {
            this.showOptions();
            this.input.off('pointerdown', this.changeDialog, this);
        }
    }
}

export default GameScene;
