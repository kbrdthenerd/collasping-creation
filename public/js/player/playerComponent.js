class PlayerComponent {
    constructor(scene, name, image, alpha) {
        this.sceneComponent = scene.physics.add.image(window.innerWidth/2, window.innerHeight/2, image)
        this.sceneComponent.setAlpha(alpha)

        this.sceneComponent.setDrag(100)
        this.sceneComponent.setAngularDrag(100)
        this.sceneComponent.setMaxVelocity(200)
        this.sceneComponent.body.setCollideWorldBounds(true)
        this.sceneComponent.body.onWorldBounds = true
        this.sceneComponent.depth = 10

        scene[name] = this.sceneComponent
        this.name = name
    }
}
