var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: window.innerWidth,
  height:  window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('player', 'assets/sp_player_0.png');
  this.load.image('whiteSpiral', 'assets/whiteSpiral8.png');
  this.load.image('center', 'assets/center.png');
  this.load.image('background', 'assets/background.png');
  this.load.audio('music', "assets/I ain't even mad.wav");
}

function create() {
    this.physics.world.setBounds(50, 50, (window.innerWidth - 100), (window.innerHeight - 100), true, true, true, true);

    this.timePassed = 0
    this.score = 0
    this.nextParticles = 0

    var music = this.sound.add('music', {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    });
    music.play()

    this.background = this.add.image(window.innerWidth/2, window.innerHeight/2, 'background');
    this.background.setDisplaySize(window.innerWidth, window.innerHeight)

    this.won = false

    this.cursors = this.input.keyboard.createCursorKeys();
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.period = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
    this.forwardSlash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH);

    this.player = new Player(this)
    this.particles = new Particles(this)

    this.text = this.add.text(75, 75, 'Collapsing Creation', { fontSize: '100px', fill: '#ffffff' });
    this.text.setFontFamily('font1');
    this.text.depth = 15
    this.winText = this.add.text(75, 75, 'You have won, a star is born!', { fontSize: '75px', fill: '#ffffff' });
    this.winText.setFontFamily('font1');
    this.winText.setAlpha(0.0)
    this.winText.depth = 15
    this.text.setAlpha(0.1)
    this.text.fadingIn = true
}


function update() {
    this.timePassed++

    if(this.time.now > this.nextParticles) {
        this.particles.add()
        this.nextParticles += (Math.random() * 500 ) + 300
    }

    this.player.update()

    handleEscapePress(Phaser, this.esc)

    moveParticles(this)
    fadeInText(this, 'text', true)
    fadeInText(this, 'winText', false)
}

function fadeInText(self, textName, shouldFadeOut) {
    var text = self[textName]
    if(text.fadingIn  && text.alpha != 1.0) {
        text.setAlpha(text.alpha + 0.001)
    } else if (shouldFadeOut && !text.fadingIn && text.alpha !=0 ) {
        text.setAlpha(text.alpha - 0.001)
    }

    if(text.alpha == 1) {
        text.fadingIn = false
    }
}

function moveParticles(self) {
    const spiralX = self.player.x
    const spiralY = self.player.y
    Phaser.Actions.Call(self.particles.particles.getChildren(), function(particle) {
        const particleX = particle.body.center.x
        const particleY = particle.body.center.y
        if(particle.isInStar) {
            Phaser.Actions.RotateAroundDistance([particle], self.player.centerPoint, self.player.darkSpiral.sceneComponent.body.angularVelocity , Phaser.Math.RND.between(5, self.player.width/2))
        } else if(particleX < spiralX + (self.player.width/2)  &&
            particleX > spiralX - (self.player.width/2)  &&
            particleY < spiralY + (self.player.height/2)  &&
            particleY > spiralY - (self.player.height/2) ){
            particle.isInStar = true
            self.score++
            if(self.score > 0 && self.score % 100 == 0) {
                self.player.shrink()
            }
            if(!self.won && self.player.width < self.player.center.sceneComponent.body.width) {
                self.won = true
                self.winText.setText(`You have won, a star is born!\nIt took ${(self.timePassed * 2 / 1000).toFixed(2)} million years!`)
                self.winText.fadingIn = true
            }
        } else {
            const distance = Math.sqrt(Math.pow((particleX - spiralX), 2) + Math.pow((particleY - spiralY), 2))
            self.physics.moveTo(particle, spiralX, spiralY, null,  distance * 20000  / self.player.darkSpiral.sceneComponent.body.angularVelocity);
        }
    })
}

function handleEscapePress(Phaser, esc) {
    if (Phaser.Input.Keyboard.JustDown(esc))
     {
         var remote = require('electron').remote;
         var window = remote.getCurrentWindow();
         window.close();
     }
}
