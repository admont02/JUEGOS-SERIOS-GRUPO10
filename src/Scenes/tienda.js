import { gameSettings } from './menu.js';
import Willy from '../Characters/Willy.js'; 
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';

export class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ShopScene' });
        this.dialogModal = null;
        this.currentDialogIndex = 0;
        this.optionTexts = []; 
        this.willy = null;
        this.dialogs = dialogos.shopDialogs;
        this.mujerDialogs = dialogos.shopWorkerDialogs; // Add this line
    }

    create() {
        // Creación de objetos y configuraciones iniciales para la escena
        this.bg = this.add.image(0, 0, 'fondoCalle').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 150);

        this.car = this.physics.add.sprite((0, 400), 0, 'car');
        this.car.y = 1350;
        this.car.setScale(0.5);
        this.car.setVelocity(100,0);
        this.car.body.allowGravity = false;

        this.willy = new Willy(this, this.sys.game.config.width / 3, this.sys.game.config.height - 400, 'jugador');
        this.physics.world.enable(this.willy);
        //this.willy.setMovable(false); 
        this.willy.body.setCollideWorldBounds(false)
        this.willy.body.setAllowGravity(false)
        
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('jugador', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        // Coloca a la mujer fuera de la pantalla en el lado derecho y muévela hacia la izquierda
        this.shopWorker = this.physics.add.sprite(this.game.config.width - 100, this.game.config.height - 400, 'mujerCoche');
        this.shopWorker.body.allowGravity = false;
      //  this.stupidwomen.setVelocity(-100,0); // Movimiento hacia la izquierda

        // Flip horizontal si es necesario
        this.shopWorker.flipX = true;

        this.shopWorker.setInteractive();
        this.shopWorker.on('pointerup', () => {
            // Inicia el diálogo cuando se hace clic en la mujer
            this.dialogStarted = true;
            this.showMujerDialog();
        });

        const tuNuevaImagen = this.physics.add.sprite(this.sys.game.config.width / 5, this.sys.game.config.height - 400, 'caja'); // Cambia x, y y 'nombreDeLaImagen'

        // Habilitas la física para el nuevo sprite
        this.physics.world.enable(tuNuevaImagen);
        tuNuevaImagen.body.setAllowGravity(false)
        // Estableces un collider entre tuNuevaImagen y willy
        this.physics.add.overlap(tuNuevaImagen, this.willy.body, this.colisionHandler, null, this);
    }
    
    // Función que maneja la colisión entre tuNuevaImagen y willy
    colisionHandler(tuNuevaImagen, willy) {
        // Esto se ejecuta cuando hay una colisión entre tuNuevaImagen y willy
        // Puedes agregar aquí el comportamiento que deseas cuando colisionan
        console.log("choco")
        this.willy.velocity=0;
    }
    

    showMujerDialog() {
        this.removeOptions(); 
        this.dialogModal.removeCharacterImage();
        this.dialogModal.createCharacterImage('caraMujer', 0.7);
        
        if (this.currentDialogIndex >= this.mujerDialogs.length || this.currentDialogIndex === -1) {
            // Manejo del final del diálogo
            this.endDialogAndExitWoman();
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
            if (option.text) option.text.destroy();
            if (option.box) option.box.destroy();
        });
        this.optionTexts = [];
    
        options.forEach((option, index) => {
            let textHeight = 0;
            let textWidth = 0;
    
           
            let dialogBox = this.add.graphics();
            dialogBox.fillStyle(0x000000, 0.5);  // Color y transparencia de la caja
    
            //  texto con un tamaño más grande y calcular dimensiones
            let optionText = this.add.text(0, 0, option.text, { fill: '#fff', fontSize: '32px' });
            textWidth = optionText.width + 40;  // Margen aumentado
            textHeight = optionText.height + 20; // Altura ajustada para el nuevo tamaño del texto
    
            // dibuja la caja de diálogo con las dimensiones adecuadas
            dialogBox.fillRect(100, 100 + (index * (textHeight + 10)), textWidth, textHeight); 
    
            // Actualiza la posición del texto y lo hace interactivo, colocándolo encima de la caja
            optionText.setPosition(110, 110 + (index * (textHeight + 10)));
            optionText.setInteractive()
                .on('pointerup', () => this.handleOptionSelect(option.nextDialogIndex, index));
    
            // Almacenar tanto la caja como el texto en optionTexts
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

        if(nextDialogIndex === 7 || nextDialogIndex === 8 || nextDialogIndex === 9 || nextDialogIndex === 10){
            gameSettings.lateBecauseOfWoman = true; // la mujer insulta al jugador
        }
        
        this.currentDialogIndex = nextDialogIndex; // Actualiza el índice del diálogo
        this.showMujerDialog(); // Muestra el siguiente diálogo
    }
    
    
    endDialogAndExitWoman() {
        // Mueve a la mujer hacia la derecha para salir de la escena
        this.shopWorker.setVelocity(100, 0);
      
        // Espera un tiempo antes de destruir el sprite
        this.time.delayedCall(3000, () => {
            this.removeOptions();
            this.dialogModal.removeCharacterImage();
            this.dialogModal.toggleWindow();
            this.shopWorker.destroy();
        });
        this.willy.setMovable(true); 
        this.canMove = true;
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
        this.dialogModal.setText(dialogData.dialog, 0, this.dialogModal._getGameHeight() - 150, true, { fill: '#fff' });

    }

    update(time, delta) {
        // Comprueba si el diálogo con la mujer ha terminado
        if (this.shopWorker.x <= 1200 && !this.dialogStarted) {
            this.shopWorker.setVelocity(0, 0); // Detiene a la mujer
            this.showMujerDialog();
            this.dialogStarted = true; // Indica que el diálogo ha comenzado
        }

       
    
        // Lógica de movimiento de Willy
        if (this.willy && this.willy.update && this.canMove) {
            this.willy.update(time, delta);
        
            let pointer = this.input.activePointer;
            if (pointer.isDown) {
                this.willy.flipX = pointer.worldX < this.willy.x;
            }
    
            // Restringe a Willy a no moverse más allá del borde izquierdo de la pantalla
            if (this.willy.x < 200) {
                this.willy.x = 200;
            }
    
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
