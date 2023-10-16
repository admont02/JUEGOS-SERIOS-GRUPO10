import { gameSettings } from './menu.js';

export class Settings extends Phaser.Scene {
    constructor() {
        super({ key: 'Settings' });
    }

    preload() {
        this.load.audio('menuMusic', './assets/audio/MenuMusic.mp3');
        this.load.image('background', './assets/images/background/MenuBackground.png');
    }

    create() {
        // Música de fondo
        this.backgroundMusic = this.sound.add('menuMusic', { volume: gameSettings.musicVolume });
        if (!this.backgroundMusic.isPlaying) {
            this.backgroundMusic.play({ loop: true });
        }

        // Imagen de fondo con transparencia según el brillo establecido
        this.bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);

        let centerY = this.game.config.height * 0.5;

        // Título
        this.add.text(this.game.config.width * 0.5, centerY - 150, 'CONFIGURACIONES', { font: '64px Arial', fill: '#000000' }).setOrigin(0.5);

        // Opciones de volumen
        this.add.text(this.game.config.width * 0.3, centerY - 50, 'Volumen:', { font: '48px Arial', fill: '#000000' }).setOrigin(0.5);
        this.volumeText = this.add.text(this.game.config.width * 0.7, centerY - 50, `${Math.round(this.sound.volume * 100)}%`, { font: '48px Arial', fill: '#000000' }).setOrigin(0.5).setInteractive();

        this.volumeText.on('pointerup', () => {
            let currentVolume = this.sound.volume;
            if (currentVolume <= 0.1) {
                currentVolume = 1;
            } else {
                currentVolume -= 0.1;
            }
            this.sound.setVolume(currentVolume);
            this.volumeText.setText(`${Math.round(currentVolume * 100)}%`);
            gameSettings.musicVolume = currentVolume; // Almacenar el volumen actualizado
        });

        // Opciones de brillo
        this.add.text(this.game.config.width * 0.3, centerY, 'Brillo:', { font: '48px Arial', fill: '#000000' }).setOrigin(0.5);
        this.brightnessText = this.add.text(this.game.config.width * 0.7, centerY, `${Math.round(gameSettings.brightness * 100)}%`, { font: '48px Arial', fill: '#000000' }).setOrigin(0.5).setInteractive();

        this.brightnessText.on('pointerup', () => {
            let currentBrightness = this.bg.alpha;
            if (currentBrightness <= 0.1) {
                currentBrightness = 1;
            } else {
                currentBrightness -= 0.1;
            }
            this.bg.setAlpha(currentBrightness);
            this.brightnessText.setText(`${Math.round(currentBrightness * 100)}%`);
            gameSettings.brightness = currentBrightness; // Almacenar el brillo actualizado
        });

        // Botón de volver
        let backButton = this.add.text(this.game.config.width * 0.5, centerY + 100, 'Volver', { font: '48px Arial', fill: '#000000' }).setOrigin(0.5).setInteractive();

        // Animación inicial (fade-in)
        this.cameras.main.setAlpha(0);
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,
            duration: 1500
        });

        backButton.on('pointerup', () => {
            this.backgroundMusic.stop(); // Detener la música al salir de la escena de configuración
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,
                duration: 1500,
                onComplete: () => {
                    this.scene.start('Menu');
                }
            });
        });
    }
}

