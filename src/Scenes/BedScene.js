import { gameSettings } from './menu.js';
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';

export class BedScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BedScene' });
        this.dialogModal = null;
        this.currentDialogIndex = 0;
        this.optionTexts = [];
        this.isDialogTyping = false;
        this.mujerCaraDialogs = dialogos.mujerCaraDialogs;
        this.atletaCaraDialogs = dialogos.atletaCaraDialogs;
        this.mujerImage = null; // Reference to the woman's image
        this.atletaImage = null; // Reference to the athlete's image
        this.viejoCaraDialogs = dialogos.viejoCaraDialogs;
        this.viejoImage = null; // Reference to the old man's image
        this.trabajadorCaraDialogs = dialogos.trabajadorCaraDialogs;
        this.trabajadorImage = null; // Reference to the 'getProducts' character's image
        this.dialogCompleted = {
            mujer: false,
            atleta: false,
            viejo: false,
            trabajador: false
        };
        this.charactersPresent = {};
    }

    create() {

        this.bgFinal = this.add.image(0, 0, 'final').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        let width = this.sys.game.config.width;
        let height = this.sys.game.config.height;

        // Position the woman's image in the left corner
        if (gameSettings.lateBecauseOfWoman) {
            this.mujerImage = this.add.image(0, 0, 'caraMujer').setOrigin(0, 0).setInteractive();
            this.mujerImage.on('pointerdown', () => this.showMujerDialog());
        }

        // Position the athlete's image in the right corner
        if (gameSettings.willyResponseCheck) {
            this.atletaImage = this.add.image(width, 0, 'atletaCara').setOrigin(1, 0).setInteractive();
            this.atletaImage.on('pointerdown', () => this.showAtletaDialog());
        }

        if (gameSettings.viejoImpaciente) {
            this.viejoImage = this.add.image(0, height-400, 'viejoCara').setOrigin(0, 1).setInteractive();
            this.viejoImage.on('pointerdown', () => this.showViejoDialog());
        }

        if (gameSettings.getProducts) {
            this.trabajadorImage = this.add.image(width, height -400, 'trabajadorCara').setOrigin(1, 1).setInteractive();
            this.trabajadorImage.on('pointerdown', () => this.showTrabajadorDialog());
        }

        this.charactersPresent = {
            mujer: gameSettings.lateBecauseOfWoman,
            atleta: gameSettings.willyResponseCheck,
            viejo: gameSettings.viejoImpaciente,
            trabajador: gameSettings.getProducts
        };

        this.dialogModal = new DialogModal(this);
        this.dialogModal.init();
        this.dialogModal.doubleFontSize();
        this.dialogModal._createWindow(0, this.dialogModal._getGameHeight() - 300);
    }

    showViejoDialog() {
        this.currentDialogs = this.viejoCaraDialogs;
        this.makeImagesInvisible(); 
            this.removeOptions();
            this.dialogModal.removeCharacterImage();
            this.dialogModal.createCharacterImage('viejoCara', 0.7);
    
            if (this.currentDialogIndex >= this.viejoCaraDialogs.length || this.currentDialogIndex === -1) {
                this.dialogModal.toggleWindow(); // Hide the dialog window
                return;
            }
    
            let dialogData = this.viejoCaraDialogs[this.currentDialogIndex];
            this.isDialogTyping = true;
            this.dialogModal.typeWriterEffect(dialogData.dialog, () => {
                this.isDialogTyping = false;
            });
    
            if (dialogData.options && dialogData.options.length > 0) {
                this.showOptions(dialogData.options);
            } else {
                console.log("No options available for this dialog.");
            }
    }


    showTrabajadorDialog() {
        this.currentDialogs = this.trabajadorCaraDialogs;
    this.makeImagesInvisible(); 
        this.removeOptions();
        this.dialogModal.removeCharacterImage();
        this.dialogModal.createCharacterImage('trabajadorCara', 0.7);

        if (this.currentDialogIndex >= this.trabajadorCaraDialogs.length || this.currentDialogIndex === -1) {
            this.dialogModal.toggleWindow(); // Hide the dialog window
            return;
        }

        let dialogData = this.trabajadorCaraDialogs[this.currentDialogIndex];
        this.isDialogTyping = true;
        this.dialogModal.typeWriterEffect(dialogData.dialog, () => {
            this.isDialogTyping = false;
        });

        if (dialogData.options && dialogData.options.length > 0) {
            this.showOptions(dialogData.options);
        } else {
            console.log("No options available for this dialog.");
        }
    }

    showMujerDialog() {
        this.currentDialogs = this.mujerCaraDialogs;
    this.makeImagesInvisible(); 
        this.removeOptions();
        this.dialogModal.removeCharacterImage();
        this.dialogModal.createCharacterImage('caraMujer', 0.7);

        if (this.currentDialogIndex >= this.mujerCaraDialogs.length || this.currentDialogIndex === -1) {
            this.dialogModal.toggleWindow(); // Hide the dialog window
            return;
        }

        let dialogData = this.mujerCaraDialogs[this.currentDialogIndex];
        this.isDialogTyping = true;
        this.dialogModal.typeWriterEffect(dialogData.dialog, () => {
            this.isDialogTyping = false;
        });

        if (dialogData.options && dialogData.options.length > 0) {
            this.showOptions(dialogData.options);
        } else {
            console.log("No options available for this dialog.");
        }
    }

    showOptions(options) {
        this.optionTexts.forEach(option => {
            if (option.text) option.text.destroy();
            if (option.box) option.box.destroy();
        });
        this.optionTexts = [];
    
        let verticalSpacing = 50;
    
        options.forEach((option, index) => {
            let dialogBox = this.add.graphics();
            dialogBox.fillStyle(0x000000, 0.5);
            let optionText = this.add.text(0, 0, option.text, { fill: '#fff', fontSize: '32px' });
            let textWidth = optionText.width + 60;
            let textHeight = optionText.height + 20;
            dialogBox.fillRect(100, 100 + (index * (textHeight + verticalSpacing)), textWidth, textHeight);
            optionText.setPosition(110, 110 + (index * (textHeight + verticalSpacing)));
            optionText.setInteractive()
                .on('pointerup', () => this.handleOptionSelect(option.nextDialogIndex, index));
            this.optionTexts.push({ box: dialogBox, text: optionText });
        });
    }

    makeImagesInvisible() {
        if (this.mujerImage) this.mujerImage.setVisible(false);
        if (this.atletaImage) this.atletaImage.setVisible(false);
        if (this.viejoImage) this.viejoImage.setVisible(false);
        if (this.trabajadorImage) this.trabajadorImage.setVisible(false);
    }
    
    
    makeImagesVisible() {
        if (this.mujerImage) this.mujerImage.setVisible(true);
        if (this.atletaImage) this.atletaImage.setVisible(true);
        if (this.viejoImage) this.viejoImage.setVisible(true);
        if (this.trabajadorImage) this.trabajadorImage.setVisible(true);
    }
    

    removeViejoImage() {
        if (this.viejoImage) {
            this.viejoImage.destroy();
            this.viejoImage = null;
        }
    }

    removeTrabajadorImage() {
        if (this.trabajadorImage) {
            this.trabajadorImage.destroy();
            this.trabajadorImage = null;
        }
    }

    // Atleta dialog methods
    showAtletaDialog() {
        this.currentDialogs = this.atletaCaraDialogs;
        this.makeImagesInvisible();
        this.removeOptions();
        this.dialogModal.removeCharacterImage();
        this.dialogModal.createCharacterImage('atletaCara', 0.7);

        if (this.currentDialogIndex >= this.atletaCaraDialogs.length || this.currentDialogIndex === -1) {
            this.dialogModal.toggleWindow();
            return;
        }

        let dialogData = this.atletaCaraDialogs[this.currentDialogIndex];
        this.isDialogTyping = true;
        this.dialogModal.typeWriterEffect(dialogData.dialog, () => {
            this.isDialogTyping = false;
            this.showOptions(dialogData.options);
        });
    }

    handleOptionSelect(nextDialogIndex, index) {
        if (this.isDialogTyping) {
            console.log("Wait for the dialog to finish typing.");
            return;
        }
    
        if (nextDialogIndex === -1) {
            // Update the completion status for the current dialogue
            if (this.currentDialogs === this.mujerCaraDialogs) {
                this.removeWomanImage();
                this.dialogCompleted.mujer = true;
            } else if (this.currentDialogs === this.atletaCaraDialogs) {
                this.removeAtletaImage();
                this.dialogCompleted.atleta = true;
            } else if (this.currentDialogs === this.viejoCaraDialogs) {
                this.removeViejoImage();
                this.dialogCompleted.viejo = true;
            } else if (this.currentDialogs === this.trabajadorCaraDialogs) {
                this.removeTrabajadorImage();
                this.dialogCompleted.trabajador = true;
            }
    
            // Check if all dialogues are complete for the present characters
            const allDialogsCompleted = Object.entries(this.charactersPresent).every(([character, isPresent]) => {
                return !isPresent || this.dialogCompleted[character];
            });
    
            if (allDialogsCompleted) {
                // If all present dialogues are completed, transition to the menu after a delay
                this.time.delayedCall(3000, () => {
                    this.scene.start('Menu');
                });
            } else {
                this.makeImagesVisible(); // Make the remaining images visible again
            }
    
            this.dialogModal.toggleWindow();
            this.removeOptions();
            return;
        }
    
        this.currentDialogIndex = nextDialogIndex;
        this.showDialog();
    }
    
    


    removeAtletaImage() {
        if (this.atletaImage) {
            this.atletaImage.destroy();
            this.atletaImage = null;
        }
    }

    removeWomanImage() {
        if (this.mujerImage) {
            this.mujerImage.destroy();
            this.mujerImage = null;
        }
    }
    removeOptions() {
        this.optionTexts.forEach(option => {
            option.text.destroy();
            option.box.destroy();
        });
        this.optionTexts = [];
    }

    // Other methods as needed for BedScene functionality
}

export default BedScene;
