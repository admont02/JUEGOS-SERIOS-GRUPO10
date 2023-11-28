import { gameSettings } from './menu.js';
import Willy from '../Characters/Willy.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js'

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.dialogIndex = 0;
        this.dialogAuxIndex = 0;
        this.canMove = false; // Flag to control Willy's movement

        this.dialogs = dialogos.npcDialogs.map(dialogo => dialogo.dialog);
        this.dialogsAux = ["Funciona", "miau", "miau", "tony"];
        this.dialogPrinted = false;
        this.dialogModalAuxVisible = false;
    }

    preload() {
        this.load.spritesheet('jugador', 'assets/images/characters/willymove.png', { frameWidth: 175, frameHeight: 195 }, { start: 0, end: 3 });
        this.load.image('fondo', 'assets/images/background/fondoCalle.webp');
        this.load.image('willy', 'assets/images/characters/balta.jpg');   
        this.load.image('car', 'assets/images/characters/carPumPum.png'); 
        this.load.image('interactAux', 'assets/images/toni.jpeg');
        const anima = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('jugador'),
            frameRate: 10,
            repeat: -1
        });
    }
    createButtons(){
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
        this.willy.setMovable(false); // Disable Willy's movement initially

        this.car = this.physics.add.sprite((50, 400), 0, 'car');
        this.car.y = 1350;
        this.car.setScale(0.5);
        this.car.setVelocity(100,0);
        this.car.body.allowGravity = false;
        this.dialogModal = new DialogModal(this);
        // this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight()-250);

        this.printDialog();
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
            this.willy.setMovable(true); // Enable Willy to move after dialogues
        }
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
        if (this.willy.update && this.canMove) {
            this.willy.update(time, delta);
            this.willy.play('walk'); // Play the 'walk' animation on Willy
        }

        if(this.car.x > this.sys.game.config.width + 300){
            this.car.x = -400;
        }
       if(this.willy.x > 1000){
            this.scene.start('CasaScene');
        }
    }

    printDialog() {
        if (this.dialogIndex < this.dialogs.length) {
            this.dialogModal.setText(this.dialogs[this.dialogIndex],0,this.dialogModal._getGameHeight()-250, true);
            this.dialogPrinted = true;
            this.dialogIndex++;
        } else {
            this.showOptions();
            this.input.off('pointerdown', this.changeDialog, this);
        }

    }
}

export default GameScene;
