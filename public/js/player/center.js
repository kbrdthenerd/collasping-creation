class Center extends PlayerComponent {
    constructor(scene, name, image, alpha, width, height) {
        super(scene, name, image, alpha)
        this.sceneComponent.setDisplaySize(width,height)
    }
}
