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

     update(scene, player) {
         Phaser.Actions.Call(this.particles.getChildren(), function(particle) {
             const particleX = particle.body.center.x
             const particleY = particle.body.center.y
             if(particle.isInStar) {
                 Phaser.Actions.RotateAroundDistance([particle], {x: player.x, y: player.y}, player.angularVelocity / 10000 , particle.distance)
             } else if(particleX < player.x + (player.dimension/2)  &&
                 particleX > player.x - (player.dimension/2)  &&
                 particleY < player.y + (player.dimension/2)  &&
                 particleY > player.y - (player.dimension/2) ){
                 particle.isInStar = true
                 particle.distance = Phaser.Math.RND.between(5, player.dimension/2)
                 scene.score++
                 if(scene.score > 0 && scene.score % 100 == 0) {
                     player.shrink()
                 }
                 if(!scene.won && player.dimension < 130) {
                     scene.won = true
                     scene.winText.setText(`You have won, a star is born!\nIt took ${(scene.timePassed * 2 / 1000).toFixed(2)} million years!`)
                     scene.winText.startFadeIn()
                 }
             } else {
                 const distance = Math.sqrt(Math.pow((particleY - player.x), 2) + Math.pow((particleY - player.y), 2))
                 scene.physics.moveTo(particle, player.x, player.y, null,  distance * 20000  / player.angularVelocity);
             }
         })
     }
}
