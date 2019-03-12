class Player {
    constructor(scene){
        this.scene = scene
        this.darkSpiral = new Spiral(scene, 'darkSpiral', 'combinedSpiral', 1, 0, 0xd35f5f, scene.space),
        this.lightSpiral = new Spiral(scene, 'lightSpiral', 'combinedSpiral', 1.0, 10, 0xffaaaa, scene.space),
        this.center = new Center(scene, 'center', 'center', 0.8, 130, 130)
        this.x = window.innerWidth/2
        this.y = window.innerHeight/2
        this.dimension = this.darkSpiral.sceneComponent.body.width
        this.centerPoint = new Phaser.Geom.Point(this.x, this.y);
        this.angularVelocity = this.darkSpiral.sceneComponent.body.angularVelocity
    }

    update() {
        this.centerPoint.setTo(this.x, this.y)
        this.scene.physics.moveTo(this.center.sceneComponent, this.x, this.y, null, 1)
        this.darkSpiral.update()
        this.lightSpiral.update()
        this.x = this.darkSpiral.sceneComponent.body.center.x
        this.y = this.darkSpiral.sceneComponent.body.center.y
        this.dimension = this.darkSpiral.sceneComponent.body.width
        this.angularVelocity = this.darkSpiral.sceneComponent.body.angularVelocity
    }

    shrink() {
        this.scene.particles.particles.getChildren().forEach(particle => {
            if(particle.distance >= 10)  {
                particle.distance -= 10
                particle.circle = new Phaser.Geom.Circle(this.x, this.y, particle.distance)
            }
        })
        this.darkSpiral.sceneComponent.setDisplaySize( this.darkSpiral.sceneComponent.body.width - 10,  this.darkSpiral.sceneComponent.body.height - 10)
        this.lightSpiral.sceneComponent.setDisplaySize( this.darkSpiral.sceneComponent.body.width - 10, this.darkSpiral.sceneComponent.body.height - 10)
    }
}
