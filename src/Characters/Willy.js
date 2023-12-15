export default class Willy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey);
        this.scene.add.existing(this);
        this.setScale(2);

        // Asegurarse de que Willy tiene un cuerpo físico para usar setVelocity
        this.scene.physics.world.enable(this);
        // this.body.setCollideWorldBounds(true); // Para evitar que salga del mundo
        this.body.allowGravity = false;
        this.canMove = false; // Flag para controlar el movimiento
        this.destinationX = null; // Nueva variable para almacenar el destino

        this.scene.input.on('pointerdown', this.onPointerDown, this);
    }

    setMovable(isMovable) {
        this.canMove = isMovable;
    }

    onPointerDown(pointer) {
        if (!this.canMove) return; // Verificar si el movimiento está permitido
        this.destinationX = pointer.x; // Establecer el destino donde el jugador hizo clic
    }

    update() {
        if (!this.canMove) {
            this.body.setVelocityX(0);
            this.anims.stop();
            return;
        }
        
        // Añadir una tolerancia para determinar si Willy está cerca de su destino
        const destinationTolerance = 4;
    
        if (this.destinationX !== null) {
            const distanceToDestination = Math.abs(this.x - this.destinationX);
            if (distanceToDestination <= destinationTolerance) {
                // Willy ha alcanzado su destino
                this.body.setVelocityX(0);
                this.anims.stop();
                this.destinationX = null;
            } else {
                // Mover a Willy hacia el destino
                const speed = 200;
                const direction = this.destinationX > this.x ? 1 : -1;
                this.body.setVelocityX(speed * direction);
                this.anims.play('walk', true);
            }
        } else {
            // No hay destino, detener a Willy
            this.body.setVelocityX(0);
            this.anims.stop();
        }
    }
    
}    
