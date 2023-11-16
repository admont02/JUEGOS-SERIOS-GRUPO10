import { gameSettings } from './menu.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';

export class CasaScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CasaScene' });
        this.dialogModal = null;
        this.currentDialogIndex = 0;
        this.dialogs = dialogos.npcDialogs;
    }

    preload() {
        // Carga de recursos gráficos y de audio para la escena de la casa
        this.load.image('casaBackground', 'assets/images/background/fondoCasa.png');

    }

    create() {
        // Creación de objetos y configuraciones iniciales para la escena
        this.bg = this.add.image(0, 0, 'casaBackground').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 150);

        this.showDialog(this.currentDialogIndex);
       
    }

    // Método para mostrar opciones de respuesta
    showOptions(options) {
        // Asumimos que 'options' es un array de opciones de respuesta
        options.forEach((option, index) => {
        // Crear botones o texto interactivo para cada opción
        let optionText = this.add.text(100, 100 + (index * 50), option.text, { fill: '#0f0' })
            .setInteractive()
            .on('pointerup', () => this.handleOptionSelect(option, index));
        });
    }

    // Manejo de la selección de una opción
    handleOptionSelect(option, index) {
        console.log("Seleccionaste la opción:", option.text);
        this.showDialog(option.nextDialog);
    }


    showDialog(index) {
        if (index >= this.dialogs.length) {
            return; // No hay más diálogos
        }

        let dialog = this.dialogs[index].dialog;
        this.dialogModal.setText(dialog, 0, this.dialogModal._getGameHeight() - 150, true);
    }

    update(time, delta) {
        
    }

}

export default CasaScene;
