import { gameSettings } from './menu.js';
import Willy from '../Characters/Willy.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';

export class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ShopScene' });
        this.dialogModal = null;
        this.currentDialogIndex = 0;
        this.currentDialogClientIndex = 0;
        this.optionTexts = [];
        this.willy = null;
        this.dialogs = dialogos.shopDialogs;
        this.workerDialogs = dialogos.shopWorkerDialogs;
        this.clientDialogs = dialogos.clientDialogs;
        this.dialogWorkerAngry = dialogos.angryWorker;
        this.dialogClientAngry = dialogos.angryClient;

        this.workerAngry = false;
        this.clientAngry = false;
        this.talkedWithWorker = false;
        this.talkedWithClient = false;

    }

    create() {
        this.bg = this.add.image(0, 0, 'tienda2').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        this.bg2 = this.add.image(this.game.config.width - 550, 0, 'tienda1').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        this.bg2 = this.add.image(this.game.config.width, 0, 'tienda3').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        this.caja = this.physics.add.sprite(this.sys.game.config.width, this.sys.game.config.height - 250, 'caja').setScale(0.3);
        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 250);
        this.dialogModal.toggleWindow();
        this.physics.world.setBounds(0, 0, this.game.config.width * 2, this.game.config.height);
        this.willy = new Willy(this, this.sys.game.config.width * 1.5, this.sys.game.config.height - 400, 'jugador');

        this.willy.body.setAllowGravity(false);

       
        this.caja.body.setAllowGravity(false);
        this.caja.body.setImmovable(true);
        this.physics.add.collider(this.willy, this.caja, this.colisionHandler);

        this.carro = this.physics.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height - 300, 'carro').setScale(0.3);
        this.carro.body.setAllowGravity(false);
        this.carro.body.setImmovable(true);
        this.physics.add.collider(this.willy, this.carro, this.colisionHandler);

        this.botella = this.physics.add.sprite(this.sys.game.config.width / 3, this.sys.game.config.height - 1300, 'botella');
        this.botella.body.setAllowGravity(false);
        this.botella.body.setImmovable(true);


        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('jugador', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.shopWorker = this.physics.add.sprite(this.game.config.width + 1100, this.game.config.height - 250, 'shopWorker').setScale(1.25);
        this.shopWorker.body.allowGravity = false;
       
        this.shopWorker.setInteractive();
        this.shopWorker.on('pointerup', () => {
            this.dialogStarted = true;
            this.startWorkerDialog();
        });

        this.client = this.physics.add.sprite(this.game.config.width - 1100, this.game.config.height - 400, 'viejo').setScale(1.25);
        this.client.body.allowGravity = false;
        this.client.flipX = true;
        this.client.setInteractive();
        this.client.on('pointerup', () => {
            this.startClientDialog();
        });

        this.physics.add.collider(this.shopWorker, this.caja, this.collisionCallback, null, this);
        this.willy.setMovable(true);


        this.cameras.main.setBounds(0, 0, this.game.config.width * 4, this.game.config.height);
        this.cameras.main.startFollow(this.willy);
        this.sound.add('superMusic');

        // Reproduce el audio en bucle
        this.sound.play('superMusic', {
            loop: true,
            volume: 0.02
        });
    }

    collisionCallback() {
        this.caja.destroy();
    }

    colisionHandler(willy, caja) {
        console.log("Colisión detectada entre Willy y la caja");
    }

    showDialog() {
        if (this.currentDialogIndex < 0 || this.currentDialogIndex >= this.currentDialogs.length || this.currentDialogs === this.workerDialogs && this.workerDialogs[this.currentDialogIndex].undesirableOption
        ) {
            this.endDialog();
            return;
        }

        let dialogData = this.currentDialogs[this.currentDialogIndex];
        this.isDialogTyping = true;  // Establecer la bandera de que el diálogo se está escribiendo
        this.dialogModal.typeWriterEffect(dialogData.dialog, () => {
            this.isDialogTyping = false;  // Cambiar la bandera cuando el diálogo haya terminado de escribirse
            this.showOptions(dialogData.options);
        });
        if (dialogData.options)
            this.showOptions(dialogData.options);

    }

    showOptions(options) {
        this.removeOptions();

        options.forEach((option, index) => {
            let dialogBox = this.add.graphics();
            dialogBox.fillStyle(0x000000, 0.5);

            let optionText = this.add.text(0, 0, option.text, {
                fill: '#fff',
                fontSize: '48px',
                wordWrap: { width: this.game.config.width - 200 }
            });

            let textWidth = optionText.width + 40;
            let textHeight = optionText.height + 20;


            let yPosition = 150 + (index * (textHeight + 150));
            dialogBox.fillRect(this.willy.x - 700, yPosition, textWidth, textHeight);

            optionText.setPosition(this.willy.x - 600, yPosition + 10);
            optionText.setInteractive().on('pointerup', () => {
                this.handleOptionSelect(option.nextDialogIndex);
            });

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
    endDialog() {
        this.willy.setMovable(true)
        if (this.currentDialogs === this.workerDialogs) {
            // Elimina las opciones cuando se acaben los diálogos con Paco
            this.talkedWithWorker = true;
            this.removeOptions();
            if (!this.workerDialogs[this.currentDialogIndex].undesirableOption)
                this.physics.moveToObject(this.shopWorker, this.caja, 150);
            else
                this.workerAngry = true;
        }
        this.time.delayedCall(3000, () => {
            
            this.dialogModal.toggleWindow();

        });
    }
    handleOptionSelect(nextDialogIndex) {
        if (nextDialogIndex === -1) {
            this.endDialog();
            return;
        }
        this.currentDialogIndex = nextDialogIndex;
        this.showDialog();
    }

    

    update(time, delta) {


        // Lógica de movimiento de Willy
        if (this.willy && this.willy.update) {
            this.willy.update(time, delta);

            let pointer = this.input.activePointer;
            if (pointer.isDown) {
                this.willy.flipX = pointer.worldX < this.willy.x;
            }

            // Restringe a Willy a no moverse más allá del borde izquierdo de la pantalla

            // Reproduce la animación de caminar si Willy se está moviendo
            if (this.willy.velocity !== 0) {
                this.willy.anims.play('walk', true);
            } else {
                this.willy.anims.stop();

            }
        }
        if(!this.client.active && !this.shopWorker.active){
            gameSettings.lateTienda=true;
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,
                duration: 1500,
                onComplete: () => {
                    this.scene.start('ShopScene');
                    //this.scene.start('CasaScene');
                    //this.scene.start('EscenaInicial');

                }
            });
        }
        else if(!this.botella.active){
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,
                duration: 1500,
                onComplete: () => {
                    this.scene.start('ShopScene');
                    //this.scene.start('CasaScene');
                    //this.scene.start('EscenaInicial');

                }
            });
        }
    }
    startClientDialog() {
        this.dialogModal.toggleWindow();
        this.currentDialogs = this.clientDialogs;
        this.currentDialogIndex = 0;
        this.showDialog();
        this.willy.setMovable(false)
        if (!this.talkedWithClient) {
            this.talkedWithClient = true;

            const tiempoLimite = 5000; // 5 segundos
            this.timer = this.time.delayedCall(tiempoLimite, () => {
                this.carro.destroy();
                this.clientHelp = true;
                this.dialogModal.toggleWindow()
                this.willy.setMovable(true)
            });
        }

        // Agrega un evento para interacción durante el tiempo límite
        else if (this.talkedWithClient && !this.clientAngry && !this.clientHelp) {
            // Cancela el temporizador si hay interacción antes del tiempo límite
            if (this.timer && !this.timer.hasDispatched) {
                this.timer.remove();
                
                this.clientAngry = true;
                this.time.delayedCall(1000, () => {
                    
                    this.carro.destroy();
                });
                this.dialogModal.toggleWindow();
                this.currentDialogs = dialogos.clientTouchedBefore
                this.currentDialogIndex = 0;
                this.showDialog();
                this.time.delayedCall(2000, () => {
                    this.dialogModal.toggleWindow()
                    this.willy.setMovable(true)
                });
            }
        }
        else if (this.talkedWithClient && this.clientAngry) {
            
            this.currentDialogs = dialogos.angryClient;
            this.currentDialogIndex = 0;
            this.showDialog();
            this.willy.setMovable(false)
            this.time.delayedCall(3000, () => {
                this.client.setActive(false)
                this.client.destroy();
                this.dialogModal.toggleWindow()
                this.willy.setMovable(true)
            });
        }
        else if (this.clientHelp) {
            this.currentDialogs = dialogos.happy;
            this.currentDialogIndex = 0;
            this.showDialog();
            this.willy.setMovable(false)
            this.time.delayedCall(3000, () => {
                
                this.dialogModal.toggleWindow()
                this.willy.setMovable(true)
                this.botella.setActive(false)
                this.botella.destroy()
                
            });
        }
    }
    startWorkerDialog() {
        this.dialogModal.toggleWindow();
        this.willy.setMovable(false)
        if (!this.talkedWithWorker){
            this.currentDialogs = this.workerDialogs;
            this.talkedWithWorker = true;
        }
        else if (this.workerAngry){
            this.currentDialogs = this.dialogWorkerAngry;
            this.time.delayedCall(3000, () => {
                this.shopWorker.setActive(false)
                this.shopWorker.destroy();
                this.dialogModal.toggleWindow()
                this.willy.setMovable(true)
            });
        }
        else {
            if(this.talkedWithClient){
            this.currentDialogs=dialogos.happy;
            this.time.delayedCall(3000, () => {
                
                this.dialogModal.toggleWindow()
                this.willy.setMovable(true)
                this.botella.setActive(false)

                this.botella.destroy()
            });
        }
        }
        this.currentDialogIndex = 0;
        this.showDialog();
    }

}

export default ShopScene;
