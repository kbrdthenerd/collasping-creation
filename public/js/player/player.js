class Player {
    constructor(scene){
        this.scene = scene
        this.darkSpiral = new Spiral(scene, 'darkSpiral', 'whiteSpiral', 1, 0, 0xd35f5f, scene.period),
        this.lightSpiral = new Spiral(scene, 'lightSpiral', 'whiteSpiral', 0.9, 10, 0xffaaaa, scene.forwardSlash),
        this.center = new Center(scene, 'center', 'center', 0.8, 130, 130)
        this.x = window.innerWidth/2
        this.y = window.innerHeight/2
        this.width = this.darkSpiral.sceneComponent.body.width
        this.height = this.darkSpiral.sceneComponent.body.height
        this.centerPoint = new Phaser.Geom.Point(this.x, this.y);
    }

    update() {
        this.centerPoint.setTo(this.x, this.y)
        this.scene.physics.moveTo(this.center.sceneComponent, this.x, this.y, null, 1)
        this.darkSpiral.update()
        this.lightSpiral.update()
        this.x = this.darkSpiral.sceneComponent.body.center.x
        this.y = this.darkSpiral.sceneComponent.body.center.y
        this.width = this.darkSpiral.sceneComponent.body.width
        this.height = this.darkSpiral.sceneComponent.body.height
    }

    shrink() {
        this.darkSpiral.sceneComponent.setDisplaySize( this.darkSpiral.sceneComponent.body.width - 10,  this.darkSpiral.sceneComponent.body.height - 10)
        this.lightSpiral.sceneComponent.setDisplaySize( this.darkSpiral.sceneComponent.body.width - 10, this.darkSpiral.sceneComponent.body.height - 10)
    }
}
