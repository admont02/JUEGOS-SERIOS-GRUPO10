import { gameSettings } from './menu.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';

export class CasaScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CasaScene' });
        this.dialogModal = null;
        this.currentDialogIndex = 0;
        this.dialogs = dialogos.npcDialogs;
        this.mujerDialogs = dialogos.mujerDialogs; // Add this line
    }
    

    preload() {
        // Carga de recursos gráficos y de audio para la escena de la casa
        this.load.image('casaBackground', 'assets/images/background/fondoCasa.png');
        this.load.image('accidenteFondo', 'assets/images/background/atropello.png');

        this.load.image('mujerCoche', 'assets/images/characters/mujerCoche.png');
        this.load.image('caraMujer', 'assets/images/characters/caraMujer.png');

    }

    create() {
        // Creación de objetos y configuraciones iniciales para la escena
        this.bg = this.add.image(0, 0, 'casaBackground').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 150);
        this.stupidwomen = this.physics.add.sprite((50, 400), 0, 'mujerCoche');
        this.stupidwomen.body.allowGravity = false;
        this.stupidwomen.y = 1350;
        this.stupidwomen.setVelocity(100,0);

        this.stupidwomen.setInteractive();
        this.stupidwomen.on('pointerup', () => {
            this.showMujerDialog();
        });

        // Cargar la imagen de Willy con un tamaño específico
        this.dialogModal.createCharacterImage('caraMujer', 0.7); // Ajusta el 0.5 según sea necesario
        this.showDialog(this.currentDialogIndex);
    }

    showMujerDialog() {
        // Asegúrate de que haya diálogos disponibles
        if (this.currentDialogIndex >= this.mujerDialogs.length) {
            return; // No hay más diálogos
        }

        let dialogData = this.mujerDialogs[this.currentDialogIndex];
        this.dialogModal.setText(dialogData.dialog, 0, this.dialogModal._getGameHeight() - 150, true);

        if (dialogData.options && dialogData.options.length > 0) {
            this.showOptions(dialogData.options);
        } else {
            console.log("No hay opciones disponibles para este diálogo.");
        }
    }

    showOptions(options) {
        options.forEach((option, index) => {
            let optionText = this.add.text(100, 100 + (index * 50), option.text, { fill: '#0f0', fontSize: '16px' })
                .setInteractive()
                .on('pointerup', () => this.handleOptionSelect(option.nextDialogIndex, index));
        });
    }
    

    handleOptionSelect(nextDialogIndex, index) {
        console.log("Seleccionaste la opción:", index);
        // Pasa al siguiente diálogo basado en la selección
        this.currentDialogIndex = nextDialogIndex;
        this.showMujerDialog();
    }

    showDialog(index) {
        if (index >= this.dialogs.length) {
            return; // No hay más diálogos
        }

        let dialog = this.dialogs[index].dialog;
        this.dialogModal.setText(dialog, 0, this.dialogModal._getGameHeight() - 150, true);
    }

    update(time, delta) {
        
        if(this.stupidwomen.x > 1000){
            this.stupidwomen.setVelocity(0,0);
        }
    }

}

export default CasaScene;
