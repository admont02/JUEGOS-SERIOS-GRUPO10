import { gameSettings } from './menu.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';
import Willy from '../Characters/Willy.js';

export class CentroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CentroScene' });
        this.dialogModal = null;
        this.currentDialogIndex = 0;
        this.optionTexts = [];
        this.willy = null;
        this.entrenadorDialogs = dialogos.entrenadorDialogs; // Diálogos del entrenador
        this.pacoDialogs = dialogos.pacoDialogs; // Diálogos de Paco
        this.currentDialogs = null; // Almacena los diálogos actuales
    }

    create() {
        this.bg = this.add.image(0, 0, 'fondoCalle').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);

        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 150);
        this.willy = new Willy(this, this.sys.game.config.width / 3, this.sys.game.config.height - 400, 'jugador');

        this.createWomenSprites();
        this.startEntrenadorDialog();
    }

    createWomenSprites() {
        this.firstWoman = this.createWomanSprite();
        this.secondWoman = this.createWomanSprite();

        this.secondWoman.visible = false; // Ocultar la segunda mujer inicialmente
    }

    createWomanSprite() {
        // Posición de Willy (ajustar según sea necesario)
        let willyX = this.game.config.width / 3;
        let willyY = this.game.config.height - 400;
    
        // Coloca a la mujer un poco a la derecha de Willy
        let womanX = willyX + 100; // 100 píxeles a la derecha de Willy
        let womanY = willyY;
    
        let woman = this.physics.add.sprite(womanX, womanY, 'mujerCoche');
        woman.body.allowGravity = false;
        woman.setScale(0.5);
        woman.setInteractive();
        return woman;
    }
    

    startEntrenadorDialog() {
        this.currentDialogs = this.entrenadorDialogs;
        this.currentDialogIndex = 0;
        this.showDialog();
    }

    startPacoDialog() {
        this.currentDialogs = this.pacoDialogs;
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
        // Primero, elimina las opciones existentes
        this.removeOptions(); 
    
        options.forEach((option, index) => {
            // Crear un cuadro de diálogo gráfico para cada opción
            let dialogBox = this.add.graphics();
            dialogBox.fillStyle(0x000000, 0.5);  // Color y transparencia del cuadro
    
            // Crear el texto de la opción
            let optionText = this.add.text(0, 0, option.text, { 
                fill: '#fff', 
                fontSize: '32px',
                wordWrap: { width: this.game.config.width - 200 } // Asegúrate de que el texto se ajuste dentro del cuadro
            });
    
            // Calcular el ancho y alto necesarios para el cuadro de diálogo
            let textWidth = optionText.width + 40;
            let textHeight = optionText.height + 20;
    
            // Posicionar y dibujar el cuadro de diálogo
            let xPosition = (this.game.config.width - textWidth) / 2; // Centrar horizontalmente
            let yPosition = 150 + (index * (textHeight + 10)); // Posicionar verticalmente
            dialogBox.fillRect(xPosition, yPosition, textWidth, textHeight);
    
            // Posicionar el texto encima del cuadro
            optionText.setPosition(xPosition + 20, yPosition + 10);
    
            // Hacer el texto interactivo y manejar el evento de clic
            optionText.setInteractive().on('pointerup', () => {
                this.handleOptionSelect(option.nextDialogIndex);
            });
    
            // Guardar las referencias a los gráficos y al texto
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
        // Implementa lo que sucede al terminar un diálogo aquí
        // Por ejemplo, cambiar de personaje o finalizar la escena
        if (this.currentDialogs === this.entrenadorDialogs) {
            this.firstWoman.visible = false;
            this.secondWoman.visible = true;
            this.startPacoDialog();
        } else {
            // Terminar la escena o iniciar otra acción
        }
    }

    update(time, delta) {
        // Lógica de actualización aquí
    }
}

export default CentroScene;
