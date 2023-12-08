import { gameSettings } from './menu.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';

export class CentroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CentroScene' });
        this.dialogModal = null;
        this.currentDialogIndex = 0;
        this.optionTexts = []; 
        this.dialogs = dialogos.npcDialogs;
        this.friendDialogs = dialogos.friendDialogs; // Dialogues for another character
    }

    create() {
        this.bg = this.add.image(0, 0, 'fondoCalle').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);

        // Dialog modal setup
        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 150);
        if (gameSettings.lateBecauseOfWoman) {
            // Inicia con el diálogo específico
            this.dialogModal.setText("Por culpa de esa mujer he llegado tarde", 0, this.dialogModal._getGameHeight() - 150, true);
            // Restablecer el estado para futuras interacciones
            gameSettings.lateBecauseOfWoman = false;
        }

    }

   

    update(time, delta) {
       
    }
}

export default CentroScene;
