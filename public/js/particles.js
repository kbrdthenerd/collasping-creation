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
             var tint = Phaser.Math.RND.between(0, 2) == 1 ? 0xb94680 : 0xe2587c
             var particle = this.particles.create(x, y, 'center', 'default')
             particle.depth = 1
             particle.setTint(tint)

             var dimension = Phaser.Math.RND.between(0, 10)
             particle.setDisplaySize(dimension, dimension)
         })

     }

     update(scene, player) {
         const left = scene.cursors.left
         const right = scene.cursors.right
         const up = scene.cursors.up
         const down = scene.cursors.down

         Phaser.Actions.Call(this.particles.getChildren(), function(particle) {
             const particleX = particle.body.center.x
             const particleY = particle.body.center.y
             if(particle.isInStar) {
                 Phaser.Actions.SetXY([particle.circle], player.x, player.y);
                 Phaser.Actions.PlaceOnCircle(
                  [particle],
                  particle.circle,
                  particle.startAngle.getValue(),
                  particle.endAngle.getValue()
                );
             } else if(particleX < player.x + (player.dimension/2)  &&
                 particleX > player.x - (player.dimension/2)  &&
                 particleY < player.y + (player.dimension/2)  &&
                 particleY > player.y - (player.dimension/2) ){
                 particle.isInStar = true
                 particle.distance = Phaser.Math.RND.between(5, player.dimension/2)

                 particle.circle = new Phaser.Geom.Circle(player.x, player.y, particle.distance);

                 particle.startAngle = scene.tweens.addCounter({
                   from: 0,
                   to: 6.28,
                   duration: 6000,
                   repeat: -1
                 })

                 particle.endAngle = scene.tweens.addCounter({
                   from: 6.28,
                   to: 12.56,
                   duration: 6000,
                   repeat: -1
                 })

                 scene.score++
                 if(scene.score > 0 && scene.score % 100 == 0 && !scene.won) {
                     player.shrink()
                 }
                 if(!scene.won && player.dimension < 130) {
                     scene.won = true
                     scene.winText.setText(`You have won, a star is born!\nIt took ${(scene.timePassed * 2 / 1200).toFixed(2)} million years`)
                     scene.winText.startFadeIn()
                 }
             } else {
                 const distance = Math.sqrt(Math.pow((particleX - player.x), 2) + Math.pow((particleY - player.y), 2))
                 scene.physics.moveTo(particle, player.x, player.y, null,  distance * 20000  / player.angularVelocity);
             }
         })
     }
}
