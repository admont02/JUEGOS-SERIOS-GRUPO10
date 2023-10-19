export default class Willy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey);
        
        this.scene.add.existing(this);
        this.setScale(2);

        // Definimos una referencia al tween para poder detenerlo si es necesario
        this.moveTween = null;

        this.scene.input.on('pointerdown', this.onPointerDown, this);
    }

    onPointerDown(pointer) {
        // Si hay un tween activo, lo detenemos
        if (this.moveTween) {
            this.moveTween.stop();
        }

        // Aseguramos que Willy no tenga movimiento en el eje Y
        this.y = this.y; // Mantenemos la posición Y actual

        // Creamos un nuevo tween para mover a Willy sólo en el eje X hacia la posición del puntero
        this.moveTween = this.scene.tweens.add({
            targets: this,
            x: pointer.x,  // Solo movemos en el eje X
            duration: Math.abs(this.x - pointer.x),  // La duración se basa en la distancia horizontal
            ease: 'Linear'
        });
    }
}
