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
        this.isDialogComplete = false; // Nueva propiedad para controlar si el diálogo ha terminado
        this.input.on('pointerdown', () => {
            if (this.isDialogComplete) {
                this.changeDialog();
            }
        }, this);
    }

    changeDialog() {
        if (!this.isDialogComplete) return; // Evitar cambiar el diálogo si aún no ha terminado

        if (this.dialogIndex < this.dialogs.length) {
            this.isDialogComplete = false; // Restablecer la bandera para el nuevo diálogo
            this.dialogModal.typeWriterEffect(this.dialogs[this.dialogIndex], () => {
                this.isDialogComplete = true; // Marcar el diálogo como completo
            });
            this.dialogPrinted = true;
            this.dialogIndex++;
            // Check if it's time to change the background after "El rugido..." dialogue
            if (this.dialogIndex == 5) {
                this.changeBackgroundWithTween('hospital');
            } else if (this.dialogIndex == 8) {
                this.changeBackgroundWithTween('pista');
            }
        }
        else {
            this.createButtons();
            this.changeBackgroundWithTween('casa');
            this.scheduleSceneChange();
        }
    }

    scheduleSceneChange() {
        this.time.addEvent({
            delay: 5000, // Delay in milliseconds (2000ms = 2s)
            callback: () => {
                this.bg.destroy();
                this.scene.start('CasaScene'); // Change to the GameScene
            },
            callbackScope: this
        });
    }



    sumarDialogo() {
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
            this.isDialogComplete = false; // Asegurarse de que el flag está en false al empezar
            this.dialogModal.typeWriterEffect(this.dialogs[this.dialogIndex], () => {
                this.isDialogComplete = true; // Marcar el diálogo como completo
            });
            this.dialogPrinted = true;
            this.dialogIndex++;
        } else {
            this.showOptions();
            this.input.off('pointerdown', this.changeDialog, this);
        }
    }

    changeBackgroundWithTween(id) {
        this.tweens.add({
            targets: this.bg, // El fondo actual
            alpha: 0, // Animación de desvanecimiento
            duration: 500, // Duración de la transición en milisegundos
            onComplete: () => {
                this.bg.setTexture(id); // Cambiar el fondo
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
