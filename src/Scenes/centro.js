import { gameSettings } from './menu.js';
import Willy from '../Characters/Willy.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';

export class CentroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CentroScene' });
        this.dialogModal = null;
        this.currentDialogIndex = 0;
        this.optionTexts = [];
        this.willy = null;
        this.paco = null;
        this.entrenador = null;
        this.pacoDialogs = dialogos.pacoDialogs;
        this.entrenadorDialogs = dialogos.entrenadorDialogs;
        this.currentDialogs = null;
    }

    create() {
        this.bg = this.add.image(0, 0, 'fondoCalle').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 150);

        this.willy = new Willy(this, this.sys.game.config.width / 3, this.sys.game.config.height - 400, 'jugador');

        // Crear sprite del entrenador y comenzar su diálogo
        this.entrenador = this.physics.add.sprite(this.game.config.width -100, this.game.config.height - 400, 'mujerCoche');
        this.entrenador.body.setAllowGravity(false);
        this.startTrainerDialog();

        // Crear Paco pero no hacerlo interactivo todavía
        this.paco = this.physics.add.sprite(this.game.config.width -100, this.game.config.height - 400, 'mujerCoche');
        this.paco.body.setAllowGravity(false);
        this.paco.setVisible(false); // Paco inicialmente no es visible
    }

    startTrainerDialog() {
        this.currentDialogs = this.entrenadorDialogs;
        this.currentDialogIndex = 0;
        this.showDialog();
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
    movePacoOffScreen() {
        this.tweens.add({
            targets: this.paco,
            x: this.game.config.width + 100, // Mueve a Paco fuera de la pantalla a la derecha
            ease: 'Power1',
            duration: 3000,
            onComplete: () => {
                this.paco.visible = false;
                this.paco.destroy(); // Destruye el sprite de Paco después de moverlo
            }
        });
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
            // Elimina las opciones cuando se acaben los diálogos con Paco
            this.removeOptions();
            this.movePacoOffScreen(); // Mueve a Paco fuera de la pantalla
            this.dialogModal.toggleWindow();
        }
        this.willy.setMovable(true); // Permite que Willy se mueva después de cualquier diálogo
    }
    
    

    moveTrainerOffScreen() {
        this.tweens.add({
            targets: this.entrenador,
            x: this.game.config.width - 100,
            ease: 'Power1',
            duration: 3000,
            onComplete: () => {
                this.entrenador.visible = false;
                this.paco.setVisible(true); // Hacer visible a Paco
                this.startPacoDialog();
                this.entrenador.destroy();
            }
        });
  
    }

    startPacoDialog() {
        this.currentDialogs = this.pacoDialogs;
        this.currentDialogIndex = 0;
        this.showDialog();

        // Hacer a Paco interactivo
        this.paco.setInteractive();
    }


    update(time, delta) {
        // Aquí puedes añadir lógica adicional de actualización de la escena si es necesario
    }
}

export default CentroScene;
