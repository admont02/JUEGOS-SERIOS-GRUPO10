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
    }
    createButtons(){
        const repeatButton = this.add.text(200, 200, 'Repetir Conversación', { fill: '#0f0' })
        .setInteractive()
        .on('pointerup', () => this.reopenDialog());

    const closeButton = this.add.text(200, 250, 'Cerrar Diálogo', { fill: '#f00' })
        .setInteractive()
        .on('pointerup', () => this.showOptions());
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
        this.willy = new Willy(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'willy');
        this.willy.setMovable(false); 
     
        this.car = this.physics.add.sprite((0, 400), 0, 'car');
        this.car.y = 1350;
        this.car.setScale(0.5);
        this.car.setVelocity(100,0);
        this.car.body.allowGravity = false;

        this.mujer = this.physics.add.sprite(400, 300, 'mujer');
        this.mujer.setInteractive();
        this.mujer.body.allowGravity = false;
        this.mujer.x = 1500;
        this.mujer.y = 1300;
        this.mujer.setVelocity(-80,0);
        this.mujer.setScale(-2, 2);
        this.mujer.on('pointerup', () => this.showMujerDialog());
    
        this.input.on('pointerdown', this.changeDialog, this);
    }

    changeDialog() {
        if (this.dialogIndex < this.dialogs.length) {
            this.dialogModal.setText(this.dialogs[this.dialogIndex], 0, this.dialogModal._getGameHeight()-250, true);
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
