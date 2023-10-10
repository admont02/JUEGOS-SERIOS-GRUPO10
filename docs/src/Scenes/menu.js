// Escena de menú
export class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        // Precarga de imágenes para el menú aquí
    }

    create() {
        this.cameras.main.setBackgroundColor('#24252A');
        let title = this.add.text(this.game.config.width * 0.5, 250, 'El Eterno Campeón', { font: '48px Arial', fill: '#ffffff' }).setOrigin(0.5);
        
        let startText = this.add.text(this.game.config.width * 0.5, 350, 'Empezar', { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        
        startText.on('pointerup', () => {
            this.scene.start('GameScene');
        });
    }
}

