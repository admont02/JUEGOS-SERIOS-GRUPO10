import { gameSettings } from './menu.js';
import Willy from '../Characters/Willy.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';

export class CentroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CentroScene' });
        this.dialogModal = null;
        this.currentDialogIndex = 0;
        this.optionTexts = [];
        this.willy = null;
        this.paco = null;
        this.entrenador = null;
        this.pacoDialogs = dialogos.pacoDialogs;
        this.entrenadorDialogs = dialogos.entrenadorDialogs;
        this.currentDialogs = null;
        this.atletaMujer = null;
        this.atletaDialogs = dialogos.atletaDialogs;
    }


    create() {
        this.bg = this.add.image(0, 0, 'centro').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 250);
        this.centroMusic = this.sound.add('centroM');
        this.centroMusic.play({ loop: true });
        this.centroMusic.setVolume(0.05);
        this.willy = new Willy(this, this.sys.game.config.width / 3 -100, this.sys.game.config.height - 200, 'jugador');

        // Crear sprite del entrenador y comenzar su diálogo
        this.entrenador = this.physics.add.sprite(this.game.config.width - 100, this.game.config.height - 200, 'mujerCoche');
        this.entrenador.setFlipX(true); 
        this.entrenador.body.setAllowGravity(false);
        this.startTrainerDialog();

        // Crear Paco pero no hacerlo interactivo todavía
        this.paco = this.physics.add.sprite(this.game.config.width -600, this.game.config.height - 400, 'paco');
        this.paco.body.setAllowGravity(false);
        this.paco.setFlipX(true); 
        this.paco.setVisible(false); // Paco inicialmente no es visible

        this.atletaMujer = this.physics.add.sprite(this.game.config.width - 300, this.game.config.height - 200, 'atleta'); 
        this.atletaMujer.body.setAllowGravity(false);
        this.atletaMujer.setVisible(false);
        this.atletaMujer.setFlipX(true);
    }

    startTrainerDialog() {
        this.currentDialogs = this.entrenadorDialogs;
        this.currentDialogIndex = 0;
        this.showDialog();
    }

    showDialog() {
        if (this.currentDialogIndex < 0 || this.currentDialogIndex >= this.currentDialogs.length) {
            this.endDialog();
            return;
        }

        let dialogData = this.currentDialogs[this.currentDialogIndex];
        this.isDialogTyping = true;  // Establecer la bandera de que el diálogo se está escribiendo
        this.dialogModal.typeWriterEffect(dialogData.dialog, () => {
            this.isDialogTyping = false;  // Cambiar la bandera cuando el diálogo haya terminado de escribirse
            this.showOptions(dialogData.options);
        });
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
    movePacoOffScreen() {
        this.tweens.add({
            targets: this.paco,
            x: this.game.config.width + 100, // Mueve a Paco fuera de la pantalla a la derecha
            ease: 'Power1',
            duration: 3000,
            onComplete: () => {
                this.paco.visible = false;
                this.paco.destroy(); // Destruye el sprite de Paco después de moverlo
            }
        });
    }
    
    startGameSequence() {
        // Muestra el modal de diálogo
        this.dialogModal.toggleWindow(true);

        // Inicia la primera interacción (puede ser el diálogo del entrenador)
        this.startTrainerDialog();
    }

    handleOptionSelect(nextDialogIndex) {
        if (this.isDialogTyping) {
            console.log("Espera a que termine el diálogo.");
            return;  // No hacer nada si el diálogo todavía se está escribiendo
        }

        if (nextDialogIndex === -1) {
            this.endDialog();
            return;
        }
        this.currentDialogIndex = nextDialogIndex;
        this.showDialog();
    }


    endDialog() {
        if (this.currentDialogs === this.entrenadorDialogs) {
            this.moveTrainerOffScreen();
        } else if (this.currentDialogs === this.pacoDialogs) {
            this.removeOptions();
            this.movePacoOffScreen();

            // Iniciar el diálogo de la atleta después de Paco
            this.time.delayedCall(1000, () => {
                this.atletaMujer.setVisible(true);
                this.startAtletaDialog();
            });
        } else if (this.currentDialogs === this.atletaDialogs) {
            // Espera 2 segundos después del diálogo de la atleta y luego inicia la animación de fade out
            this.time.delayedCall(2000, () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
                    if (progress === 1) {
                        this.centroMusic.stop();
                        this.scene.start('ShopScene'); // Cambia por el nombre real de la siguiente escena
                    }
                });
            });
        }
    }
    
    startAtletaDialog() {
        this.currentDialogs = this.atletaDialogs;
        this.currentDialogIndex = 0;
        this.showDialog();
    }
    

    moveTrainerOffScreen() {
        // Calculate the distance to move off-screen and the time required at a constant speed
        const distanceToEdge = this.game.config.width - this.entrenador.x + this.entrenador.width;
        const speed = 200; // pixels per second, adjust this to your desired speed
        const timeToMove = distanceToEdge / speed * 1000; // time in milliseconds
    
        this.time.delayedCall(timeToMove, () => {
            this.entrenador.visible = false;
            this.paco.setVisible(true); // Hacer visible a Paco
            this.startPacoDialog();
            this.entrenador.destroy();
        });
    
        // Set the velocity to move the sprite
        this.entrenador.body.setVelocityX(speed);
    }
    

    startPacoDialog() {
        this.currentDialogs = this.pacoDialogs;
        this.currentDialogIndex = 0;
        this.showDialog();

        // Hacer a Paco interactivo
        this.paco.setInteractive();
    }


    update(time, delta) {
       // Lógica de movimiento de Willy
        if (this.willy && this.willy.update) {
            this.willy.update(time, delta);

            let pointer = this.input.activePointer;
            if (pointer.isDown) {
                this.willy.flipX = pointer.worldX < this.willy.x;
            }

            if (this.willy.velocity !== 0) {
                this.willy.anims.play('walk', true);
            } else {
                this.willy.anims.stop();

            }
        }
    }
}

export default CentroScene;
