export let gameSettings = {
    brightness: 1.0,
    musicVolume: 1.0, // Asegúrate de que esta propiedad exista
    previousVolume: 1.0, // Nuevo, para almacenar el volumen antes del mute
    isMuted: false, // Nuevo, para almacenar el estado de silencio
    lateBecauseOfWoman: false,
    lateTienda: false,
    getProducts: false
};


export class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }


    create() {
        this.bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height).setAlpha(gameSettings.brightness);
        this.sound.setMute(gameSettings.isMuted);
        this.sound.setVolume(gameSettings.musicVolume);
        this.backgroundMusic = this.sound.add('menuMusic');
        this.backgroundMusic.play({ loop: true });

        let centerY = this.game.config.height * 0.5;

        let title = this.add.text(this.game.config.width * 0.5, centerY - 100, 'RUEDAS DE CAMBIO', { font: '64px Arial', fill: '#000000' }).setOrigin(0.5);
        let startText = this.add.text(this.game.config.width * 0.5, centerY, 'Empezar', { font: '48px Arial', fill: '#000000' }).setOrigin(0.5).setInteractive();
        let settingsText = this.add.text(this.game.config.width * 0.5, centerY + 50, 'Configuraciones', { font: '48px Arial', fill: '#000000' }).setOrigin(0.5).setInteractive();
        let creditsText = this.add.text(this.game.config.width * 0.5, centerY + 100, 'Créditos', { font: '48px Arial', fill: '#000000' }).setOrigin(0.5).setInteractive();

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
                    this.scene.start('Settings');
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
                    //this.scene.start('ShopScene');
                    this.scene.start('CasaScene');
                    //this.scene.start('EscenaInicial');

                }
            });
        });
    }
}
