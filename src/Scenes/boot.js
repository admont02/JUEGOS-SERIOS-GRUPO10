/**
 * Escena para la precarga de los assets que se usarán en el juego.
 */
export default class Boot extends Phaser.Scene {

    constructor() {
        super({ key: 'boot' });
    }
    preload() {

        this.load.image('background', './assets/images/background/fondo1.png');
        this.load.audio('menuMusic', './assets/audio/MenuMusic.mp3');

        this.load.audio('menuMusic', './assets/audio/MenuMusic.mp3');
        this.load.image('background', './assets/images/background/fondoSettings.png');
        // Asegúrate de tener imágenes para los botones de subir/bajar volumen y brillo
       
        this.load.image('muteButton', './assets/images/buttons/muteButton.png'); // Botón de silencio

    

        this.load.image('fondo', 'assets/images/background/atropello.png');
        this.load.image('interactAux', 'assets/images/toni.jpeg');
        this.load.image('casa', 'assets/images/background/fondoCasa.png');

        this.load.image('fondoCalle', 'assets/images/background/fondoCalle.jpg');
        this.load.image('car', 'assets/images/characters/carPumPum.png'); 
        this.load.image('interactAux', 'assets/images/toni.jpeg');
        this.load.image('mujer', 'assets/images/characters/mujerCoche.png'); 
        this.load.spritesheet('jugador', 'assets/images/characters/willymove.png', { frameWidth: 175, frameHeight: 195 }, { start: 0, end: 3 });

        this.load.image('casaBackground', 'assets/images/background/fondoCasa.png');
        this.load.image('accidenteFondo', 'assets/images/background/atropello.png');
        this.load.audio('dialogSound', './assets/audio/MenuMusic.mp3');
        this.load.image('mujerCoche', 'assets/images/characters/mujerCoche.png');
        this.load.image('caraMujer', 'assets/images/characters/caraMujer.png');


    }
    create(){
        this.scene.start('Menu');
    }
}