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
        this.bg2 = this.add.image(this.game.config.width, 0, 'tienda1').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);

        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 150);
        this.dialogModal.toggleWindow();
         this.physics.world.setBounds(0, 0, this.game.config.width * 2, this.game.config.height);
        this.willy = new Willy(this, this.sys.game.config.width*1.5, this.sys.game.config.height - 400, 'jugador');
       
        this.willy.body.setAllowGravity(false);

        this.caja = this.physics.add.sprite(this.sys.game.config.width / 5, this.sys.game.config.height - 400, 'caja');
        this.caja.body.setAllowGravity(false);
        this.caja.body.setImmovable(true);
        this.physics.add.collider(this.willy, this.caja, this.colisionHandler);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('jugador', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.shopWorker = this.physics.add.sprite(this.game.config.width - 100, this.game.config.height - 400, 'mujerCoche');
        this.shopWorker.body.allowGravity = false;
        this.shopWorker.flipX = true;

        this.shopWorker.setInteractive();
        this.shopWorker.on('pointerup', () => {
            this.dialogStarted = true;
            this.startWorkerDialog();
        });

        this.client = this.physics.add.sprite(this.game.config.width - 1100, this.game.config.height - 400, 'mujerCoche');
        this.client.body.allowGravity = false;
        this.client.flipX = true;
        this.client.setInteractive();
        this.client.on('pointerup', () => {
            this.startClientDialog();
        });

        this.physics.add.collider(this.shopWorker, this.caja, this.collisionCallback, null, this);
        this.willy.setMovable(true);
       
 
        this.cameras.main.setBounds(0, 0, this.game.config.width*4, this.game.config.height);
        this.cameras.main.startFollow(this.willy);
    }

    collisionCallback() {
        this.caja.destroy();
    }

    colisionHandler(willy, caja) {
        console.log("Colisión detectada entre Willy y la caja");
    }

    showDialog() {
        if (this.currentDialogIndex < 0 || this.currentDialogIndex >= this.currentDialogs.length || this.currentDialogs === this.workerDialogs && this.workerDialogs[this.currentDialogIndex].undesirableOption) {
            this.endDialog();
            return;
        }

        let dialogData = this.currentDialogs[this.currentDialogIndex];
        this.dialogModal.setText(dialogData.dialog, 0, this.dialogModal._getGameHeight() - 150, true);
        this.showOptions(dialogData.options);
        
    }

    showOptions(options) {
        this.removeOptions();

        options.forEach((option, index) => {
            let dialogBox = this.add.graphics();
            dialogBox.fillStyle(0x000000, 0.5);

            let optionText = this.add.text(0, 0, option.text, {
                fill: '#fff',
                fontSize: '32px',
                wordWrap: { width: this.game.config.width - 200 }
            });

            let textWidth = optionText.width + 40;
            let textHeight = optionText.height + 20;

            let xPosition = (this.game.config.width - textWidth) / 2;
            let yPosition = 150 + (index * (textHeight + 10));
            dialogBox.fillRect(xPosition, yPosition, textWidth, textHeight);

            optionText.setPosition(xPosition + 20, yPosition + 10);
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
        if (this.currentDialogs === this.clientDialogs) {
            this.talkedWithClient = true;
        } else if (this.currentDialogs === this.workerDialogs) {
            // Elimina las opciones cuando se acaben los diálogos con Paco
            this.talkedWithWorker = true;
            this.removeOptions();
            if (!this.workerDialogs[this.currentDialogIndex].undesirableOption)
                this.physics.moveToObject(this.shopWorker, this.caja, 70);
            else
                this.workerAngry = true;
        }
        this.time.delayedCall(3000, () => {
            //this.removeOptions();
            //this.dialogModal.removeCharacterImage();
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

    endDialogAndExitWoman() {
        this.shopWorker.setVelocityX(70);
        this.time.delayedCall(3000, () => {
            this.shopWorker.destroy();
            this.removeOptions();
            this.dialogModal.removeCharacterImage();
            this.dialogModal.toggleWindow();
        });
    }

    endDialogAndExitClient() {
        this.client.setVelocityX(70);
        this.time.delayedCall(3000, () => {
            this.client.destroy();
            this.removeOptions();
            this.dialogModal.removeCharacterImage();
            this.dialogModal.toggleWindow();
        });
    }

    update(time, delta) {
        // Comprueba si el diálogo con la mujer ha terminado
        // if (this.shopWorker.x <= 1200 && !this.dialogStarted) {
        //     this.shopWorker.setVelocity(0, 0); // Detiene a la mujer
        //     this.showMujerDialog();
        //     this.dialogStarted = true; // Indica que el diálogo ha comenzado
        // }

        

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
    }
    startClientDialog() {
        this.dialogModal.toggleWindow();
        this.willy.setMovable(false)
        if (!this.talkedWithClient) {
            this.currentDialogs = this.clientDialogs;
        }
        else if (this.clientAngry) {
            this.currentDialogs = this.dialogClientAngry;
        }
        else {

        }
        this.currentDialogIndex = 0;
        this.showDialog();
    }
    startWorkerDialog() {
        this.dialogModal.toggleWindow();
        this.willy.setMovable(false)
        if (!this.talkedWithWorker)
            this.currentDialogs = this.workerDialogs;
        else if (this.workerAngry)
            this.currentDialogs = this.dialogWorkerAngry;
        else {

        }
        this.currentDialogIndex = 0;
        this.showDialog();
    }
}

export default ShopScene;
