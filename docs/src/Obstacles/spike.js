export default class Spike extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'spike');
        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;

        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
    }
}