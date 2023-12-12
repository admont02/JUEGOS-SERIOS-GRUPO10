import DialogModal from '../Text/plugText.js';
import { gameSettings } from './menu.js';
import dialogos from '../dialogs.js';
import Willy from '../Characters/Willy.js';

export class CentroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CentroScene' });
        this.dialogModal = null;
        this.currentDialogIndex = 0;
        this.optionTexts = [];
        this.willy = null;
        this.entrenador = null;
        this.entrenadorDialogs = dialogos.entrenadorDialogs;
        this.pacoDialogs = dialogos.pacoDialogs;
        this.currentDialogs = null;
    }

    create() {
        this.bg = this.add.image(0, 0, 'fondoCalle').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 150);
    
        this.willy = new Willy(this, this.sys.game.config.width / 3, this.sys.game.config.height - 400, 'jugador');
    
        if (gameSettings.lateBecauseOfWoman) {
            this.startLateWomanDialog();
        } else {
            this.startTrainerDialog();
        }
    }

    startLateWomanDialog() {
        this.dialogModal.setText("Por culpa de esa mujer he llegado tarde", 0, this.dialogModal._getGameHeight() - 150, true);
        gameSettings.lateBecauseOfWoman = false;

        this.time.delayedCall(3000, () => {
            this.dialogModal.toggleWindow(); 
            this.startTrainerDialog();
        });
    }

    startTrainerDialog() {
        this.createTrainerSprite();
        this.currentDialogs = this.entrenadorDialogs;
        this.currentDialogIndex = 0;
        this.showDialog();
    }

    createTrainerSprite() {
        this.entrenador = this.physics.add.sprite(100, 200, 'entrenadorSprite');
        this.entrenador.body.allowGravity = false;
    }

    showDialog() {
        if (this.currentDialogIndex < 0 || this.currentDialogIndex >= this.currentDialogs.length) {
            this.endDialog();
            return;
        }

        let dialogData = this.currentDialogs[this.currentDialogIndex];
        this.dialogModal.setText(dialogData.dialog, 0, this.dialogModal._getGameHeight() - 150, true);
        this.showOptions(dialogData.options);
    }

    showOptions(options) {
        this.removeOptions();

        options.forEach((option, index) => {
            let dialogBox = this.add.graphics();
            dialogBox.fillStyle(0x000000, 0.5);

            let optionText = this.add.text(0, 0, option.text, { 
                fill: '#fff', 
                fontSize: '32px',
                wordWrap: { width: this.game.config.width - 200 }
            });

            let textWidth = optionText.width + 40;
            let textHeight = optionText.height + 20;

            let xPosition = (this.game.config.width - textWidth) / 2;
            let yPosition = 150 + (index * (textHeight + 10));
            dialogBox.fillRect(xPosition, yPosition, textWidth, textHeight);

            optionText.setPosition(xPosition + 20, yPosition + 10);
            optionText.setInteractive().on('pointerup', () => {
                this.handleOptionSelect(option.nextDialogIndex);
            });

            this.optionTexts.push({ box: dialogBox, text: optionText });
        });
    }

    removeOptions() {
        this.optionTexts.forEach(option => {
            option.text.destroy();
            option.box.destroy();
        });
        this.optionTexts = [];
    }

    handleOptionSelect(nextDialogIndex) {
        if (nextDialogIndex === -1) {
            this.endDialog();
            return;
        }
        this.currentDialogIndex = nextDialogIndex;
        this.showDialog();
    }

    endDialog() {
        if (this.currentDialogs === this.entrenadorDialogs) {
            this.moveTrainerOffScreen();
        } else if (this.currentDialogs === this.pacoDialogs) {
            // Additional actions for the end of Paco's dialog
        }
    }

    moveTrainerOffScreen() {
        this.tweens.add({
            targets: this.entrenador,
            y: this.game.config.height + 100,
            ease: 'Power1',
            duration: 1000,
            onComplete: () => {
                this.entrenador.visible = false;
                this.startPacoDialog();
            }
        });
    }

    startPacoDialog() {
        this.currentDialogs = this.pacoDialogs;
        this.currentDialogIndex = 0;
        this.showDialog();
    }

    update(time, delta) {
        // Game update logic here
    }
}

export default CentroScene;
