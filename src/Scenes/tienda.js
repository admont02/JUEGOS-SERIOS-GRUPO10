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
        this.workerAngry = false;
        this.clientAngry = false;
        this.talkedWithWorker = false;
        this.talkedWithClient = false;
    }

    create() {
        this.bg = this.add.image(0, 0, 'fondoCalle').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        this.bg2 = this.add.image(this.game.config.width, 0, 'fondoCalle').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        
        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 150);

        this.willy = new Willy(this, this.sys.game.config.width / 2, this.sys.game.config.height - 400, 'jugador');
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
            this.showMujerDialog();
        });

        this.client = this.physics.add.sprite(this.game.config.width - 1100, this.game.config.height - 400, 'mujerCoche');
        this.client.body.allowGravity = false;
        this.client.flipX = true;
        this.client.setInteractive();
        this.client.on('pointerup', () => {
            this.dialogClientStarted = true;
            this.showClientDialog();
        });

        this.physics.add.collider(this.shopWorker, this.caja, this.collisionCallback, null, this);
    }

    collisionCallback() {
        this.caja.destroy();
    }

    colisionHandler(willy, caja) {
        console.log("Colisión detectada entre Willy y la caja");
    }

    showMujerDialog() {
        this.removeOptions();
        this.dialogModal.removeCharacterImage();
        this.dialogModal.createCharacterImage('caraMujer', 0.7);

        let dialogData = this.workerDialogs[this.currentDialogIndex];
        if (this.currentDialogIndex >= this.workerDialogs.length || this.currentDialogIndex === -1) {
            this.endDialogAndExitWoman();
            return;
        }

        this.dialogModal.setText(dialogData.dialog, 0, this.dialogModal._getGameHeight() - 150, true);

        if (dialogData.options) {
            this.showOptions(dialogData.options, false);
        }
    }

    showClientDialog() {
        this.removeOptions();
        this.dialogModal.removeCharacterImage();
        this.dialogModal.createCharacterImage('imagenCliente', 0.7);

        let dialogData = this.clientDialogs[this.currentDialogClientIndex];
        if (this.currentDialogClientIndex >= this.clientDialogs.length || this.currentDialogClientIndex === -1) {
            this.endDialogAndExitClient();
            return;
        }

        this.dialogModal.setText(dialogData.dialog, 0, this.dialogModal._getGameHeight() - 150, true);

        if (dialogData.options) {
            this.showOptions(dialogData.options, true);
        }
    }

    showOptions(options, isClient) {
        this.optionTexts.forEach(option => {
            option.text.destroy();
            option.box.destroy();
        });
        this.optionTexts = [];

        options.forEach((option, index) => {
            let textHeight = 0;
            let textWidth = 0;

            let dialogBox = this.add.graphics();
            dialogBox.fillStyle(0x000000, 0.5);

            let optionText = this.add.text(0, 0, option.text, { fill: '#fff', fontSize: '42px' });
            optionText.setResolution(1.1);
            textWidth = optionText.width + 40;
            textHeight = optionText.height + 20;

            const spacing = 100;
            let boxY = 100 + (index * (textHeight + spacing));

            dialogBox.fillRect(100, boxY, textWidth, textHeight);

            optionText.setPosition(110, boxY + 10);
            optionText.setInteractive()
                .on('pointerup', () => this.handleOptionSelect(option.nextDialogIndex, index, isClient));

            this.optionTexts.push({ box: dialogBox, text: optionText });
        });
    }

    handleOptionSelect(nextDialogIndex, index, isClient) {
        if (isClient) {
            this.currentDialogClientIndex = nextDialogIndex;
            this.showClientDialog();
        } else {
            this.currentDialogIndex = nextDialogIndex;
            this.showMujerDialog();
        }
    }

    removeOptions() {
        this.optionTexts.forEach(option => {
            option.text.destroy();
            option.box.destroy();
        });
        this.optionTexts = [];
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
        if (this.shopWorker.x <= 1200 && !this.dialogStarted) {
            this.shopWorker.setVelocity(0, 0); // Detiene a la mujer
            this.showMujerDialog();
            this.dialogStarted = true; // Indica que el diálogo ha comenzado
        }

        if (this.willy.x > this.sys.game.config.width - 200) {
            // mover el background papu
            this.bg.x -= 5;
            this.bg2.x -= 5;
            this.shopWorker.x -= 5;
            this.caja.x -= 5;
            this.willy.x -= 5;
        }

        // Lógica de movimiento de Willy
        if (this.willy && this.willy.update && this.canMove) {
            this.willy.update(time, delta);

            let pointer = this.input.activePointer;
            if (pointer.isDown) {
                this.willy.flipX = pointer.worldX < this.willy.x;
            }

            // Restringe a Willy a no moverse más allá del borde izquierdo de la pantalla
            // if (this.willy.x < 200) {
            //     this.willy.x = 200;
            // }

            // Reproduce la animación de caminar si Willy se está moviendo
            if (this.willy.velocity !== 0) {
                this.willy.anims.play('walk', true);
            } else {
                this.willy.anims.stop();

            }
        }
    }
}

export default ShopScene;
