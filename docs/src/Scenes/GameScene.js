import { gameSettings } from './menu.js';
import Willy from '../Characters/Willy.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js'

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.dialogIndex = 0;
        this.mujerDialogIndex = 0; //index dialogos mujer
        this.dialogAuxIndex = 0;
        this.canMove = false; // Flag to control Willy's movement
        this.mujerDialogs = dialogos.mujerDialogs; // Add this line
        this.dialogs = dialogos.npcDialogs.map(dialogo => dialogo.dialog);
        this.dialogsAux = ["Funciona", "miau", "miau", "tony"];
        this.dialogPrinted = false;
        this.dialogModalAuxVisible = false;
    }

    preload() {
        this.load.image('fondo', 'assets/images/background/fondoCalle.webp');
        this.load.image('car', 'assets/images/characters/carPumPum.png'); 
        this.load.image('interactAux', 'assets/images/toni.jpeg');
        this.load.image('mujer', 'assets/images/characters/mujerCoche.png'); 
        this.load.spritesheet('jugador', 'assets/images/characters/willymove.png', { frameWidth: 175, frameHeight: 195 }, { start: 0, end: 3 });
    }

    createButtons(){
        const repeatButton = this.add.text(200, 200, 'Repetir Conversación', { fill: '#0f0' })
        .setInteractive()
        .on('pointerup', () => this.reopenDialog());

    const closeButton = this.add.text(200, 250, 'Cerrar Diálogo', { fill: '#f00' })
        .setInteractive()
        .on('pointerup', () => this.showOptions());
    }

    createOptions(options) {
        options.forEach((option, index) => {
            // Crea botones u opciones interactivas en tu modal de diálogo
            let optionButton = this.add.text(500,300, option.text)
                .setInteractive()
                .on('pointerup', () => this.handleOptionSelect(option.nextDialog));
        });
    }

    handleOptionSelect(nextDialog) {
        // Muestra el siguiente diálogo basado en la opción seleccionada
        this.dialogModal.setText(nextDialog, /* coordenadas x y y */);
        // Aquí puedes manejar otros aspectos del juego según la opción seleccionada
    }

    showOptions() {
       // this.dialogModal.toggleWindow();
        this.dialogModalAux = new DialogModal(this);
        this.dialogModalAux.init();
        this.dialogModalAux.doubleFontSize();
        this.dialogModalAux._createWindow(100, this.dialogModal._getGameHeight()-450);
        if (this.dialogAuxIndex < this.dialogsAux.length) {
            this.dialogModalAux.setText(this.dialogsAux[this.dialogAuxIndex],100, this.dialogModal._getGameHeight()-450, true);
            this.dialogPrinted = true;
            this.dialogAuxIndex++;
        }
    }

    create() {
        this.input.setDefaultCursor('url(assets/images/hnd.cur), pointer');
        this.bg = this.add.image(0, 0, 'fondo').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        this.willy = new Willy(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'jugador');

        this.willy.setMovable(false); 
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('jugador', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.car = this.physics.add.sprite((0, 400), 0, 'car');
        this.car.y = 1350;
        this.car.setScale(0.5);
        this.car.setVelocity(100,0);
        this.car.body.allowGravity = false;

        this.mujer = this.physics.add.sprite(400, 300, 'mujer');
        this.mujer.setInteractive();
        this.mujer.body.allowGravity = false;
        this.mujer.body.setSize(this.mujer.width/2, this.mujer.height/2);
        this.mujer.x = 1500;
        this.mujer.y = 1300;
        this.mujer.setVelocity(-80,0);
        this.mujer.setScale(-2, 2);
        this.mujer.on('pointerup', () => this.showMujerDialog());
    
        this.input.on('pointerdown', this.changeDialog, this);
    }

    showToniDialog() {
        // Suponiendo que dialogModal es tu modal de diálogo
        if (!this.dialogModal) {
            this.dialogModal = new DialogModal(this);
            // Configura tu dialogModal como sea necesario
        }
    
        // Obtén el diálogo actual y sus opciones
        let currentDialog = this.dialogs[this.dialogIndex];
        if (currentDialog.dialog === "Hola, soy Toni. ¿Cómo estás?") {
            this.dialogModal.setText(currentDialog.dialog,500,500);
            this.createOptions(currentDialog.options);
        }
        // Incrementa el índice del diálogo para el próximo diálogo
        this.dialogIndex++;
    }

    changeDialog() {
        if (this.dialogIndex < this.dialogs.length) {
           // this.dialogModal.setText(this.dialogs[this.dialogIndex], 0, this.dialogModal._getGameHeight()-250, true);
            this.dialogPrinted = true;
            this.dialogIndex++;
        } else {
            this.createButtons();
            this.canMove = true;
            this.willy.setMovable(true); 
        }
    }

    reopenDialog() { 
        this.dialogIndex = 0;
        this.dialogPrinted = false;
        this.printDialog();
        this.input.on('pointerdown', this.changeDialog, this);
    }

    showMujerDialog() {
        // Create the dialogue box if it doesn't exist
        if (!this.dialogModal) {
            this.dialogModal = new DialogModal(this);
            this.dialogModal.doubleFontSize();
            this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 150);
        }
    
        // Check if the current dialogue index is within the range
        if (this.mujerDialogIndex < this.mujerDialogs.length) {
            let dialog = this.mujerDialogs[this.mujerDialogIndex].dialog;
            this.dialogModal.setText(dialog, 0, this.dialogModal._getGameHeight() - 150, true);
            this.mujerDialogIndex++;
        } else {
            // If all dialogues are completed, destroy the dialogue box
            if (this.dialogModal) {
                this.dialogModal.destroy();
                this.dialogModal = null; // Ensure to clear the dialogModal object
            }
            this.mujerDialogIndex = 0; // Reset the dialogue index
        }
    }
    
    closeDialog() {
        if (this.dialogModal) {
            this.dialogModal.close(); 
        }
    }
    

    update(time, delta) {
        if (this.willy.update && this.canMove) {
            this.willy.update(time, delta);
            this.willy.anims.play('walk', true); 
        }

        if (this.willy.update && this.canMove) {
            this.willy.update(time, delta);
            this.willy.anims.play('walk', true); 
    
            // Get the pointer (mouse/touch) position
            let pointer = this.input.activePointer;
    
            // Check if the pointer is down (clicked or touched)
            if (pointer.isDown) {
                // Flip Willy based on pointer position relative to Willy
                this.willy.flipX = pointer.worldX < this.willy.x;
            }
           
        }

        if (this.mujer.x < 1000) {
            this.mujer.setVelocity(0,0);
        }

        if(this.car.x > this.sys.game.config.width + 300){
            this.car.x = -400;
        }
       if(this.willy.x > 1100){
            this.scene.start('CasaScene');
        }


        
    }

   
}

export default GameScene;
