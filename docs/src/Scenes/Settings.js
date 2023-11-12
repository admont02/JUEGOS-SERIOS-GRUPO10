import { gameSettings } from './menu.js';

export class Settings extends Phaser.Scene {
    constructor() {
        super({ key: 'Settings' });
    }

    preload() {
        this.load.audio('menuMusic', './assets/audio/MenuMusic.mp3');
        this.load.image('background', './assets/images/background/MenuBackground.png');
        // Asegúrate de tener imágenes para los botones de subir/bajar volumen y brillo
        this.load.image('buttonUp', './assets/images/buttons/buttonUp.png');
        this.load.image('buttonDown', './assets/images/buttons/buttonDown.png');
        this.load.image('muteButton', './assets/images/buttons/muteButton.png'); // Botón de silencio
    }

    create() {
        this.createBackground();
        this.createMusic();
        this.createTitle();
        this.createVolumeControls();
        this.createBrightnessControls();
        this.createBackButton();
        this.createFadeIn();
    }

    createBackground() {
        this.bg = this.add.image(0, 0, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(this.game.config.width, this.game.config.height)
            .setAlpha(gameSettings.brightness);
    }

    createMusic() {
        this.backgroundMusic = this.sound.add('menuMusic', { volume: gameSettings.musicVolume, loop: true });
        if (!this.backgroundMusic.isPlaying) {
            this.backgroundMusic.play();
        }
    }

    createTitle() {
        let centerY = this.game.config.height * 0.5;
        this.add.text(this.game.config.width * 0.5, centerY - 200, 'CONFIGURACIONES', { font: '64px Arial', fill: '#ffffff' }).setOrigin(0.5);
    }

    createVolumeControls() {
        let centerY = this.game.config.height * 0.5;

        // Texto del volumen
        this.add.text(this.game.config.width * 0.3, centerY - 50, 'Volumen:', { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.volumeText = this.add.text(this.game.config.width * 0.7, centerY - 50, `${Math.round(this.sound.volume * 100)}%`, { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5);

        // Botones de subir/bajar volumen
        let volumeUpButton = this.add.image(this.game.config.width * 0.8, centerY - 50, 'buttonUp').setInteractive();
        let volumeDownButton = this.add.image(this.game.config.width * 0.6, centerY - 50, 'buttonDown').setInteractive();

        volumeUpButton.on('pointerup', () => {
            this.adjustVolume(0.1);
        });

        volumeDownButton.on('pointerup', () => {
            this.adjustVolume(-0.1);
        });

        // Botón de silencio
        let muteButton = this.add.image(this.game.config.width * 0.9, centerY - 50, 'muteButton').setInteractive();
        muteButton.on('pointerup', () => {
            this.toggleMute();
        });
    }

    createBrightnessControls() {
        let centerY = this.game.config.height * 0.5;

        // Texto del brillo
        this.add.text(this.game.config.width * 0.3, centerY, 'Brillo:', { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5);
        this.brightnessText = this.add.text(this.game.config.width * 0.7, centerY, `${Math.round(gameSettings.brightness * 100)}%`, { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5);

        // Botones de subir/bajar brillo
        let brightnessUpButton = this.add.image(this.game.config.width * 0.8, centerY, 'buttonUp').setInteractive();
        let brightnessDownButton = this.add.image(this.game.config.width * 0.6, centerY, 'buttonDown').setInteractive();

        brightnessUpButton.on('pointerup', () => {
            this.adjustBrightness(0.1);
        });

        brightnessDownButton.on('pointerup', () => {
            this.adjustBrightness(-0.1);
        });
    }

    createBackButton() {
        let centerY = this.game.config.height * 0.5;
        let backButton = this.add.text(this.game.config.width * 0.5, centerY + 150, 'Volver', { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5).setInteractive();

        backButton.on('pointerup', () => {
            this.backgroundMusic.stop();
            this.scene.start('Menu');
        });
    }

    createFadeIn() {
        this.cameras.main.fadeIn(1500, 0, 0, 0);
    }

    adjustVolume(change) {
        let newVolume = Phaser.Math.Clamp(this.sound.volume + change, 0, 1);
        this.sound.setVolume(newVolume);
        this.volumeText.setText(`${Math.round(newVolume * 100)}%`);
        gameSettings.musicVolume = newVolume;
    }

    adjustBrightness(change) {
        let newBrightness = Phaser.Math.Clamp(gameSettings.brightness + change, 0, 1);
        this.bg.setAlpha(newBrightness);
        this.brightnessText.setText(`${Math.round(newBrightness * 100)}%`);
        gameSettings.brightness = newBrightness;
    }

    toggleMute() {
        this.backgroundMusic.mute = !this.backgroundMusic.mute;
        this.volumeText.setText(this.backgroundMusic.mute ? 'Mute' : `${Math.round(this.sound.volume * 100)}%`);
    }
}
