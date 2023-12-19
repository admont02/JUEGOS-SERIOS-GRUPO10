import { gameSettings } from './menu.js';
import Willy from '../Characters/Willy.js'; 
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';

export class BedScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BedScene' });

    }

    create() {
        this.bgFinal = this.add.image(0, 0, 'final').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
       
        let width = this.sys.game.config.width;
        let height = this.sys.game.config.height;

        if (gameSettings.willyResponseCheck) {
            const atleta = this.add.image(0, 0, 'atletaCara').setOrigin(0, 0).setInteractive();
            atleta.on('pointerdown', () => this.showDialog('atleta'));
        }
        if (gameSettings.lateBecauseOfWoman) {
            const mujer = this.add.image(width, 0, 'caraMujer').setOrigin(1, 0).setInteractive();
            mujer.on('pointerdown', () => this.showDialog('mujer'));
        }
        if (gameSettings.viejoImpaciente) {
            const viejo = this.add.image(0, height, 'viejoCara').setOrigin(0, 1).setInteractive();
            viejo.on('pointerdown', () => this.showDialog('viejo'));
        }
        if (gameSettings.lateTienda) {
            const trabajador = this.add.image(width, height, 'trabajadorCara').setOrigin(1, 1).setInteractive();
            trabajador.on('pointerdown', () => this.showDialog('trabajador'));
        }
    }

    showDialog(character) {
        const dialogText = dialogos[character]; // Obtiene el texto del diálogo correspondiente al personaje
        this.dialogModal.showDialog(dialogText); // Muestra el diálogo
    }

}

export default BedScene;
