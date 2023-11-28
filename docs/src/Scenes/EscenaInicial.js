import { gameSettings } from './menu.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogosCasa.js'

export class EscenaInicial extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaInicial' });
        this.dialogIndex = 0;
        this.dialogAuxIndex = 0;
        this.canMove = false; // Flag to control Willy's movement

        this.dialogs = dialogos.npcDialogs.map(dialogo => dialogo.dialog);
        this.dialogPrinted = false;
        this.dialogModalAuxVisible = false;
    }

    preload() {
        this.load.image('fondo', 'assets/images/background/atropello.png');
        this.load.image('interactAux', 'assets/images/toni.jpeg');
        this.load.image('casa', 'assets/images/background/fondoCasa.png');

    }
    createButtons() {
        const repeatButton = this.add.text(100, 100, 'Repetir Conversación', { fill: '#0f0' })
            .setInteractive()
            .on('pointerup', () => this.reopenDialog());

        const closeButton = this.add.text(100, 150, 'Cerrar Diálogo', { fill: '#f00' })
            .setInteractive()
            .on('pointerup', () => this.showOptions());
    }

    showOptions() {
        // this.dialogModal.toggleWindow();
        this.dialogModalAux = new DialogModal(this);
        this.dialogModalAux.init();
        this.dialogModalAux.doubleFontSize();
        this.dialogModalAux._createWindow(100, this.dialogModal._getGameHeight() - 450);
        if (this.dialogAuxIndex < this.dialogsAux.length) {
            this.dialogModalAux.setText(this.dialogsAux[this.dialogAuxIndex], 100, this.dialogModal._getGameHeight() - 450, true);
            this.dialogPrinted = true;
            this.dialogAuxIndex++;
        }
    }

    create() {
        this.input.setDefaultCursor('url(assets/images/hnd.cur), pointer');
        this.bg = this.add.image(0, 0, 'fondo').setOrigin(0, 0)
        .setDisplaySize(this.game.config.width, this.game.config.height)
        .setAlpha(gameSettings.brightness);
        this.dialogModal = new DialogModal(this);
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 250);

        this.printDialog();
        this.input.on('pointerdown', this.changeDialog, this);
    }
    
    changeDialog() {
        if (this.dialogIndex < this.dialogs.length) {
            this.dialogModal.setText(this.dialogs[this.dialogIndex], 0, this.dialogModal._getGameHeight() - 250, true);
            this.dialogPrinted = true;
            this.dialogIndex++;
            // Check if it's time to change the background after "El rugido..." dialogue
            if (this.dialogIndex === 2) { // Assuming this dialogue is at index 1
                this.changeBackgroundWithTween();
                this.scheduleSceneChange(); // Schedule the scene change after the tween
            }
        } else {
            this.createButtons();
        }
    }
    
    scheduleSceneChange() {
        this.time.addEvent({
            delay: 5000, // Delay in milliseconds (2000ms = 2s)
            callback: () => {
                this.bg.destroy();
                this.scene.start('GameScene'); // Change to the GameScene
            },
            callbackScope: this
        });
    }
    
    

    sumarDialogo(){
        this.dialogIndex++;
    }
    reopenDialog() {
        this.dialogIndex = 0;
        this.dialogPrinted = false;
        this.printDialog();
        this.input.on('pointerdown', this.changeDialog, this);
    }


    closeDialog() {
        this.dialogModal.toggleWindow();
        this.dialogModalAux.toggleWindow();
    }


    update(time, delta) {
      
    }

    printDialog() {
        if (this.dialogIndex < this.dialogs.length) {
            this.dialogModal.setText(this.dialogs[this.dialogIndex], 0, this.dialogModal._getGameHeight() - 250, true);
            this.dialogPrinted = true;
            this.dialogIndex++;
        } else {
            this.showOptions();
            this.input.off('pointerdown', this.changeDialog, this);
        }

    }
    changeBackgroundWithTween() {
        this.tweens.add({
            targets: this.bg, // El fondo actual
            alpha: 0, // Animación de desvanecimiento
            duration: 500, // Duración de la transición en milisegundos
            onComplete: () => {
                this.bg.setTexture('casa'); // Cambiar el fondo
                this.tweens.add({
                    targets: this.bg,
                    alpha: 1, // Animación de aparecer
                    duration: 500 // Duración de la transición en milisegundos
                });
            }
        });
    }
}

export default EscenaInicial;
