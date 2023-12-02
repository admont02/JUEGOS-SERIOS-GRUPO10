import { gameSettings } from './menu.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';

export class CasaScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CasaScene' });
        this.dialogModal = null;
        this.currentDialogIndex = 0;
        this.optionTexts = []; 
        this.dialogs = dialogos.npcDialogs;
        this.mujerDialogs = dialogos.mujerDialogs; // Add this line
    }

    preload() {
        // Carga de recursos gráficos y de audio para la escena de la casa
        this.load.image('casaBackground', 'assets/images/background/fondoCasa.png');
        this.load.image('accidenteFondo', 'assets/images/background/atropello.png');
        this.load.audio('dialogSound', './assets/audio/MenuMusic.mp3');
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
      // Coloca a la mujer fuera de la pantalla en el lado derecho y muévela hacia la izquierda
      this.stupidwomen = this.physics.add.sprite(this.game.config.width + 100, this.game.config.height - 400, 'mujerCoche');
      this.stupidwomen.body.allowGravity = false;
      this.stupidwomen.setVelocity(-100,0); // Movimiento hacia la izquierda

      // Flip horizontal si es necesario
      this.stupidwomen.flipX = true;

      this.stupidwomen.setInteractive();
    }

    showMujerDialog() {
        this.removeOptions(); // Agregar esta línea
        this.dialogModal.removeCharacterImage();
        this.dialogModal.createCharacterImage('caraMujer', 0.7);
        if (this.currentDialogIndex >= this.mujerDialogs.length) {
        this.dialogStarted = false; // Reinicia el indicador de diálogo iniciado
        return;
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
    this.optionTexts.forEach(option => {
        option.text.destroy();
        option.box.destroy();
    });
    this.optionTexts = [];

    options.forEach((option, index) => {
        // Configurar el texto con un tamaño más grande
        let optionText = this.add.text(0, 0, option.text, { fill: '#fff', fontSize: '32px' }); // Tamaño del texto aumentado
        let textWidth = optionText.width + 40; // Margen aumentado
        let textHeight = optionText.height + 20; // Altura ajustada para el nuevo tamaño del texto

        // Crear un gráfico para la caja de diálogo, ajustando el tamaño
        let dialogBox = this.add.graphics();
        dialogBox.fillStyle(0x000000, 0.5);
        dialogBox.fillRect(100, 100 + (index * (textHeight + 10)), textWidth, textHeight); // Ajusta el ancho y alto

        // Actualiza la posición del texto y lo hace interactivo
        optionText.setPosition(110, 110 + (index * (textHeight + 10)));
        optionText.setInteractive()
            .on('pointerup', () => this.handleOptionSelect(option.nextDialogIndex, index));

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
    
    
    
    handleOptionSelect(nextDialogIndex, index) {
        console.log("Seleccionaste la opción:", index);
    
        if (nextDialogIndex === -1) {
            this.endDialogAndExitWoman();
            return;
        }
    
        this.currentDialogIndex = nextDialogIndex; // Actualiza el índice del diálogo
        this.showMujerDialog(); // Muestra el siguiente diálogo
    }
    
    endDialogAndExitWoman() {
        // Mueve a la mujer hacia la derecha para salir de la escena
        this.stupidwomen.setVelocity(100, 0);
        // Espera un tiempo antes de destruir el sprite
        this.time.delayedCall(3000, () => {
            this.removeOptions();
            this.dialogModal.removeCharacterImage();
            this.dialogModal.toggleWindow();
            this.stupidwomen.destroy();
        });
    }
    
    removeCharacterImage() {
        if (this.characterImage) {
            this.characterImage.destroy();
            this.characterImage = null;
        }
    }

    showDialog(index) {
        if (index >= this.dialogs.length) {
            return; // No hay más diálogos
        }

        let dialog = this.dialogs[index].dialog;
        this.dialogModal.setText(dialog, 0, this.dialogModal._getGameHeight() - 150, true);
    }

    update(time, delta) {
        if (this.stupidwomen.x <= 1200 && !this.dialogStarted) {
            this.stupidwomen.setVelocity(0, 0); // Detiene a la mujer
            this.showMujerDialog();
            this.dialogStarted = true; // Indica que el diálogo ha comenzado
        }
    }
    

}

export default CasaScene;
