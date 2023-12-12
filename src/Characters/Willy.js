export default class Willy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey);
        
        this.scene.add.existing(this);
        this.setScale(2);

        // Asegurarse de que Willy tiene un cuerpo físico para usar setVelocity
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true); // Para evitar que salga del mundo

        this.canMove = false; // Flag para controlar el movimiento

        this.scene.input.on('pointerdown', this.onPointerDown, this);
    }

    setMovable(isMovable) {
        this.canMove = isMovable;
    }

    onPointerDown(pointer) {
        if (!this.canMove) return; // Verificar si el movimiento está permitido

        const speed = 200; // Velocidad de movimiento

        // Calcular la dirección del movimiento
        const direction = pointer.x >= this.x ? 1 : -1;
        
        // Establecer la velocidad de Willy
        this.body.setVelocityX(speed * direction);
    }

    update() {
        // Si Willy no se está moviendo hacia un destino, detener su movimiento
        if (!this.canMove) {
            this.body.setVelocityX(0);
        }
    }
}
