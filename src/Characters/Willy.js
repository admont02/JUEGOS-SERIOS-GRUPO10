export default class Willy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey);
        
        this.scene.add.existing(this);
        this.setScale(2);

        this.moveTween = null;
        this.jumpTween = null;
        this.canMove = false; // Flag to control movement

        this.scene.input.on('pointerdown', this.onPointerDown, this);
    }

    setMovable(isMovable) {
        this.canMove = isMovable;
    }

    onPointerDown(pointer) {
        if (!this.canMove) return; // Check if movement is allowed

        if (this.moveTween) {
            this.moveTween.stop();
        }
    
        this.y = this.y; // Maintain current Y position
    
        const speedFactor = 5; // Speed factor for movement
    
        this.moveTween = this.scene.tweens.add({
            targets: this,
            x: pointer.x,
            duration: Math.abs(this.x - pointer.x) * speedFactor,
            ease: 'Linear'
        });
    }
}
