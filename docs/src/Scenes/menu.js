export class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        // Precarga de imágenes y audio para el menú
        this.load.image('background', './assets/images/background/MenuBackground.png');
        this.load.audio('menuMusic', './assets/audio/MenuMusic.mp3');
    }

    create() {
        // Imagen de fondo con 50% de transparencia
        this.bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(0.5);

        // Música de fondo
        this.backgroundMusic = this.sound.add('menuMusic');
        this.backgroundMusic.play({ loop: true });

        let centerY = this.game.config.height * 0.5;

        let title = this.add.text(this.game.config.width * 0.5, centerY - 100, 'RUEDAS DE CAMBIO', { font: '64px Arial', fill: '#000000' }).setOrigin(0.5);
        let startText = this.add.text(this.game.config.width * 0.5, centerY, 'Empezar', { font: '48px Arial', fill: '#000000' }).setOrigin(0.5).setInteractive();
        let settingsText = this.add.text(this.game.config.width * 0.5, centerY + 50, 'Configuraciones', { font: '48px Arial', fill: '#000000' }).setOrigin(0.5).setInteractive();
        let creditsText = this.add.text(this.game.config.width * 0.5, centerY + 100, 'Créditos', { font: '48px Arial', fill: '#000000' }).setOrigin(0.5).setInteractive();

        // Al iniciar, que todo esté transparente y luego se desvanezca.
        this.cameras.main.setAlpha(0);
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,
            duration: 1500
        });

        settingsText.on('pointerup', () => {
            this.backgroundMusic.stop();
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    this.scene.start('Settings'); // Lleva al usuario a la escena de Configuraciones
                }
            });
        });

        startText.on('pointerup', () => {
            this.backgroundMusic.stop();
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,
                duration: 1500,
                onComplete: () => {
                    this.scene.start('GameScene');
                }
            });
        });
    }
}
