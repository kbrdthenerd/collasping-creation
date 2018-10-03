class Particles {
     constructor(scene) {
         this.scene = scene
         this.particles = scene.physics.add.group()
     }

     add() {
         var startX = Phaser.Math.RND.between(0, window.innerWidth)
         var startY = Phaser.Math.RND.between(0, window.innerHeight)
         var endX = Phaser.Math.RND.between(startX, Math.min(startX + 400,  window.innerWidth))
         var endY = Phaser.Math.RND.between(startY, Math.min(startX + 400,  window.innerHeight))

         var newObjects = Array.apply(null, Array(Phaser.Math.RND.between(10, 20))).forEach(obj => {
             var x = Phaser.Math.RND.between(startX, endX)
            var y = Phaser.Math.RND.between(startY, endY)
             var tint = Phaser.Math.RND.between(0, 2) == 1 ? 0xd35f5f : 0xffaaaa
             var particle = this.particles.create(x, y, 'center', 'default')
             particle.depth = 1
             particle.setTint(tint)

             var dimension = Phaser.Math.RND.between(0, 20)
             particle.setDisplaySize(dimension, dimension)
         })

     }
}
