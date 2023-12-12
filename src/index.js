import { Menu } from './Scenes/menu.js';
import { Settings } from './Scenes/Settings.js';
import { GameScene } from './Scenes/GameScene.js';
import { CasaScene } from './Scenes/casa.js';
import { EscenaInicial } from './Scenes/EscenaInicial.js';
import { CentroScene } from './Scenes/centro.js';

import Boot from './Scenes/boot.js';
import { ShopScene } from './Scenes/tienda.js';


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

    scene: [Boot, Menu, Settings,EscenaInicial, GameScene, CasaScene, CentroScene,ShopScene],

    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 1000 }, 
            debug: true
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