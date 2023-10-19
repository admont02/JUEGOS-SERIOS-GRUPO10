import { Menu } from './Scenes/menu.js';
import { Settings } from './Scenes/Settings.js';
import { GameScene } from './Scenes/GameScene.js';

let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("juego"),
    width:  1440,
    height: 1800,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 500,
            height: 188
        },
		max: {
            width: 1000,
            height: 750
        },
		zoom: 1
    },

    scene: [ Menu, Settings, GameScene],

    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 1000 }, 
            debug: false
        },
        fps: { forceSetTimeOut: true, target: 60 },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
   transparent: true
};

new Phaser.Game(config);