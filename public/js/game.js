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
var hasLogged = false

function preload() {
  this.load.image('player', 'assets/sp_player_0.png');
  this.load.image('whiteSpiral', 'assets/whiteSpiral8.png');
  this.load.image('center', 'assets/center.png');
  this.load.image('background', 'assets/background.png');
  this.load.audio('music', "assets/I ain't even mad.wav");
}

function create() {
    this.score = 0
    this.particles = this.physics.add.group()
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


    var darkPinkSpiralOptions = {
        name: 'darkPinkSpiral',
        color: 0xd35f5f,
        angle: 0,
        alpha: 1,
        image: 'whiteSpiral'
    }
    var lightPinkSpiralOptions = {
        name: 'lightPinkSpiral',
        color: 0xffaaaa,
        angle: 10,
        alpha: 0.9,
        image: 'whiteSpiral'
    }

    var centerOptions = {
        name: 'center',
        angle: 0,
        alpha: 0.8,
        image: 'center'
    }

    this.background = this.add.image(window.innerWidth/2, window.innerHeight/2, 'background');
    this.background.setDisplaySize(window.innerWidth, window.innerHeight)



    addPlayer(this, darkPinkSpiralOptions)
    addPlayer(this, lightPinkSpiralOptions)
    addPlayer(this, centerOptions)
    this.center.setDisplaySize(130,130)
    this.centerPoint = new Phaser.Geom.Point(window.innerWidth/2, window.innerHeight/2);

    this.circle = new Phaser.Geom.Circle(window.innerWidth/2, window.innerWidth/2, 150);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.period = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
    this.forwardSlash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH);

    this.backTick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKTICK);
    this.oneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.physics.world.setBounds(50, 50, (window.innerWidth - 100), (window.innerHeight - 100), true, true, true, true);

    this.text = this.add.text(16, 16, 'Collapsing Creation', { fontSize: '50px', fill: '#ffffff', alpha: 0.5 });
    this.text.setAlpha(0.0)
    this.textFadingIn = true
}


function update() {

    if(this.time.now > this.nextParticles) {
        addParticles(this)
        this.nextParticles += (Math.random() * 500 ) + 300
    }

    var darkPinkSpiralOptions = { name: 'darkPinkSpiral',
        up: this.cursors.up,
        down: this.cursors.down,
        left: this.cursors.left,
        right: this.cursors.right,
        button1: this.period
    }

    var lightPinkSpiralOptions = { name: 'lightPinkSpiral',
        up: this.cursors.up,
        down: this.cursors.down,
        left: this.cursors.left,
        right: this.cursors.right,
        button2: this.forwardSlash
    }

    movePlayer(this, darkPinkSpiralOptions, Phaser)
    movePlayer(this, lightPinkSpiralOptions, Phaser)
    this.centerPoint.setTo(this.darkPinkSpiral.body.center.x, this.darkPinkSpiral.body.center.y)
    this.physics.moveTo(this.center, this.darkPinkSpiral.body.center.x, this.darkPinkSpiral.body.center.y, null, 1);

    handleEscapePress(Phaser, this.esc)

    moveParticles(this)
    console.log(`is fading in: ${this.textFadingIn}`);
    console.log(`alpha does not equal one: ${this.text.alpha != 1.0}`);


    if(this.textFadingIn  && this.text.alpha != 1.0) {
        console.log(this.text.alpha);
        this.text.setAlpha(this.text.alpha + 0.001)
    } else if (!this.textFadingIn && this.text.alpha !=0 ) {
        this.text.setAlpha(this.text.alpha - 0.001)
    }

    if(this.text.alpha == 1) {
        this.textFadingIn = false
    }

    if(this.text.alpha == 0) {
        this.textFadingIn = true
    }
}

function moveParticles(self) {
    const spiralX = self.darkPinkSpiral.body.center.x
    const spiralY = self.darkPinkSpiral.body.center.y
    Phaser.Actions.SetXY([self.circle], spiralX, spiralY);
    Phaser.Actions.Call(self.particles.getChildren(), function(particle) {
        const particleX = particle.body.center.x
        const particleY = particle.body.center.y
        if(particle.isInStar) {
            Phaser.Actions.RotateAroundDistance([particle], self.centerPoint, self.darkPinkSpiral.body.angularVelocity / 2000 , Phaser.Math.RND.between(5, self.darkPinkSpiral.body.width/2))
        } else if(particleX < spiralX + (self.darkPinkSpiral.body.width/2)  &&
            particleX > spiralX - (self.darkPinkSpiral.body.width/2)  &&
            particleY < spiralY + (self.darkPinkSpiral.body.height/2)  &&
            particleY > spiralY - (self.darkPinkSpiral.body.height/2) )
        {
            particle.isInStar = true
            self.score++
            if(self.score > 0 && self.score % 100 == 0) {
                self.darkPinkSpiral.setDisplaySize(self.darkPinkSpiral.body.width - 10, self.darkPinkSpiral.body.height - 10)
                self.lightPinkSpiral.setDisplaySize(self.darkPinkSpiral.body.width - 10, self.darkPinkSpiral.body.height - 10)
            }
        } else {
            const distance = Math.sqrt(Math.pow((particleX - spiralX), 2) + Math.pow((particleY - spiralY), 2))
            self.physics.moveTo(particle, spiralX, spiralY, null,  distance * 100000  / self.darkPinkSpiral.body.angularVelocity);
        }
    })
}

function addPlayer(self, playerInfo) {
    var name = playerInfo.name

    self[name] = self.physics.add.image(window.innerWidth/2, window.innerHeight/2, playerInfo.image);
    self[name].setDrag(100)
    self[name].setAngularDrag(100)
    self[name].setMaxVelocity(200)
    if(playerInfo.color) {
      self[name].setTint(playerInfo.color)
    }
    self[name].setAlpha(playerInfo.alpha)
    self[name].angle = playerInfo.angle
    self[name].body.setCollideWorldBounds(true)
    self[name].body.onWorldBounds = true
    self[name].depth = 10
}

function addParticles(self) {
    var startX = Phaser.Math.RND.between(0, window.innerWidth)
    var startY = Phaser.Math.RND.between(0, window.innerHeight)
    var endX = Phaser.Math.RND.between(startX, Math.min(startX + 400,  window.innerWidth))
    var endY = Phaser.Math.RND.between(startY, Math.min(startX + 400,  window.innerHeight))

    var newObjects = Array.apply(null, Array(Phaser.Math.RND.between(10, 20))).map(obj => {
        var x = Phaser.Math.RND.between(startX, endX)
		var y = Phaser.Math.RND.between(startY, endY)
        var tint = Phaser.Math.RND.between(0, 2) == 1 ? 0xd35f5f : 0xffaaaa
        var particle = self.particles.create(x, y, 'center', 'default')
        particle.depth = 1
        particle.setTint(tint)

        var dimension = Phaser.Math.RND.between(0, 20)
        particle.setDisplaySize(dimension, dimension)

        return particle
    })
    //self.particles.addMultiple(newObjects, true)
}

function movePlayer(self, options, Phaser) {
    var player = self[options.name]
    if (player) {
        if(player.body.angularVelocity < 100) {
            player.body.angularVelocity = 100
        }

        if (options.left.isDown) {
            player.setVelocityX(-200)
        }
         if (options.right.isDown) {
             player.setVelocityX(200)
        }
         if (options.up.isDown) {
             player.setVelocityY(-200)
        }
         if (options.down.isDown) {
             player.setVelocityY(200)
        }
        if(options.button1 && Phaser.Input.Keyboard.JustDown(options.button1)) {
            player.body.angularVelocity+= 100
        }
        if(options.button2 && Phaser.Input.Keyboard.JustDown(options.button2)) {
            player.body.angularVelocity+= 100
        }
    }
}

function handleEscapePress(Phaser, esc) {
    if (Phaser.Input.Keyboard.JustDown(esc))
     {
         var remote = require('electron').remote;
         var window = remote.getCurrentWindow();
         window.close();
     }
}