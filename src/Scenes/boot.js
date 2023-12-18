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
        this.load.audio('superMusic', './assets/audio/super.mp3');
        this.load.image('background', './assets/images/background/fondoSettings.png');
        // Asegúrate de tener imágenes para los botones de subir/bajar volumen y brillo
        this.load.image('caja', './assets/images/obstacles/caja.png');
        this.load.image('muteButton', './assets/images/buttons/muteButton.png'); // Botón de silencio

    

        this.load.image('fondo', 'assets/images/background/atropello.png');
        this.load.image('interactAux', 'assets/images/toni.jpeg');
        this.load.image('casa', 'assets/images/background/fondoCasa.png');
        this.load.image('casa', 'assets/images/background/fondoCasa.png');
        this.load.image('tienda1', 'assets/images/background/tienda1.jpg');
        this.load.image('tienda2', 'assets/images/background/tienda2.jpg');
        this.load.image('tienda3', 'assets/images/background/tienda3.jpg');

        this.load.image('hospital', 'assets/images/background/hospital.png');
        this.load.image('centro', 'assets/images/background/centro.png');
        this.load.image('fondoCalle', 'assets/images/background/fondoCallePixel.png');
        this.load.image('car', 'assets/images/characters/carPumPum.png'); 
        this.load.image('interactAux', 'assets/images/toni.jpeg');
        this.load.image('mujer', 'assets/images/characters/mujerCoche.png'); 
        this.load.spritesheet('jugador', 'assets/images/characters/willymove.png', { frameWidth: 828, frameHeight: 941 }, { start: 0, end: 2 });

        this.load.image('casaBackground', 'assets/images/background/fondoCasa.png');
        this.load.image('accidenteFondo', 'assets/images/background/atropello.png');
        this.load.audio('dialogSound', './assets/audio/MenuMusic.mp3');
        this.load.image('mujerCoche', 'assets/images/characters/mujerCoche.png');
        this.load.image('caraMujer', 'assets/images/characters/caraMujer.png');
        this.load.image('viejo', 'assets/images/characters/viejo.png');



    }
    create(){
        this.scene.start('Menu');
    }
}