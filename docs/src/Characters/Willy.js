export default class Willy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey);
        
        this.scene.add.existing(this);
        this.setScale(2);

        // Definimos una referencia al tween para poder detenerlo si es necesario
        this.moveTween = null;
        this.jumpTween = null;

        this.scene.input.on('pointerdown', this.onPointerDown, this);

        // Programamos el salto de forma periódica
        this.scheduleJump();
    }

    onPointerDown(pointer) {
        // Si hay un tween activo, lo detenemos
        if (this.moveTween) {
            this.moveTween.stop();
        }
    
        // Aseguramos que Willy no tenga movimiento en el eje Y
        this.y = this.y; // Mantenemos la posición Y actual
    
        const speedFactor = 5;  // Aumenta este valor para que Willy vaya más lento
    
        // Creamos un nuevo tween para mover a Willy sólo en el eje X hacia la posición del puntero
        this.moveTween = this.scene.tweens.add({
            targets: this,
            x: pointer.x,  // Solo movemos en el eje X
            duration: Math.abs(this.x - pointer.x) * speedFactor,  // Multiplicamos la duración por el factor de velocidad
            ease: 'Linear'
        });
    }

    jump() {
        // Si hay un tween de salto activo, lo detenemos
        if (this.jumpTween) {
            this.jumpTween.stop();
        }

        const jumpHeight = 250;  // Altura del salto
        const jumpDuration = 500;  // Duración del salto

        this.jumpTween = this.scene.tweens.add({
            targets: this,
            y: this.y - jumpHeight,
            duration: jumpDuration,
            yoyo: true,  // Vuelve a la posición original
            ease: 'Power2'
        });
    }

    scheduleJump() {
        // Programamos el salto cada X milisegundos
        const jumpInterval = Phaser.Math.Between(1000, 2000);  // Saltará entre 2 y 5 segundos

        this.scene.time.addEvent({
            delay: jumpInterval,
            callback: () => {
                this.jump();
                this.scheduleJump();  // Programamos el siguiente salto
            },
            callbackScope: this
        });
    }
}