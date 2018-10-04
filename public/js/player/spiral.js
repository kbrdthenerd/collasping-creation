class Spiral extends PlayerComponent {
    constructor(scene, name, image, alpha, angle, color, button) {
        super(scene, name, image, alpha)
        this.sceneComponent.angle = angle
        this.sceneComponent.setTint(color)
        this.button = button
        this.left = scene.cursors.left
        this.right = scene.cursors.right
        this.up = scene.cursors.up
        this.down = scene.cursors.down
        this.sceneComponent.setDisplaySize(400,400)
    }

    update() {
        if(this.sceneComponent.body.angularVelocity < 50) {
            this.sceneComponent.body.angularVelocity = 50
        }

        //if(!scene.won) {
            if (this.left.isDown) {
                this.sceneComponent.setVelocityX(-200)
            }
             if (this.right.isDown) {
                 this.sceneComponent.setVelocityX(200)
            }
             if (this.up.isDown) {
                 this.sceneComponent.setVelocityY(-200)
            }
             if (this.down.isDown) {
                 this.sceneComponent.setVelocityY(200)
            }
        //}

        if(Phaser.Input.Keyboard.JustDown(this.button)) {
            this.sceneComponent.body.angularVelocity+= 50
        }
    }
}
