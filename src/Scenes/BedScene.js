import { gameSettings } from './menu.js';
import Willy from '../Characters/Willy.js'; 
import DialogModal from '../Text/plugText.js';
import dialogos from '../dialogs.js';

export class BedScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BedScene' });
        // ... tus otras inicializaciones
    }

    create() {
        this.bgFinal = this.add.image(0, 0, 'final').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        // Cargar las imágenes de los personajes en las esquinas
        let width = this.sys.game.config.width;
        let height = this.sys.game.config.height;

        // Crear e interactuar con imágenes de personajes
        const atleta = this.add.image(0, 0, 'atletaCara').setOrigin(0, 0).setInteractive();
        const mujer = this.add.image(width, 0, 'caraMujer').setOrigin(1, 0).setInteractive();
        const viejo = this.add.image(0, height, 'viejoCara').setOrigin(0, 1).setInteractive();
        const trabajador = this.add.image(width, height, 'trabajadorCara').setOrigin(1, 1).setInteractive();

        // Eventos de clic para cargar diálogos
        atleta.on('pointerdown', () => this.showDialog('atleta'));
        mujer.on('pointerdown', () => this.showDialog('mujer'));
        viejo.on('pointerdown', () => this.showDialog('viejo'));
        trabajador.on('pointerdown', () => this.showDialog('trabajador'));
    }

    showDialog(character) {
        const dialogText = dialogos[character]; // Obtiene el texto del diálogo correspondiente al personaje
        this.dialogModal.showDialog(dialogText); // Muestra el diálogo
    }
    // ... tus otros métodos
}

export default BedScene;
