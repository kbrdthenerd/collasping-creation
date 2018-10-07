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
  this.load.image('combinedSpiral', 'assets/combinedSpiral6.png');

}

function create() {
    this.physics.world.setBounds(50, 50, (window.innerWidth - 100), (window.innerHeight - 100), true, true, true, true);

    this.timePassed = 0
    this.score = 0
    this.nextParticles = 0
    this.won = false

    startMusic(this)
    setUpInputs(this)

    this.background = this.add.image(window.innerWidth/2, window.innerHeight/2, 'background');
    this.background.setDisplaySize(window.innerWidth, window.innerHeight)

    this.player = new Player(this)
    this.particles = new Particles(this)

    this.openingTexts = [new Text(this, 'Collapsing Creation', 75, 75, '100px', true, 0.002),
    new Text(this, 'Collect space dust to become a star', 415, 150, '40px', true, 0.002),
    new Text(this, 'Programming and art by Katherine Brennan, background by Lisa Bradley, and music by Sarah Wahoff', 75, window.innerHeight - 100, '32px', true, 0.002)]

    this.currentText = 0
    this.openingTexts.forEach(text => text.startFadeIn())
    this.winText = new Text(this, 'You have won, a star is born!', 75, 75, '75px', false, 0.002)
}


function update() {
    this.timePassed++

    if(this.time.now > this.nextParticles) {
        this.particles.add()
        this.nextParticles += (Math.random() * 500 ) + 300
    }

    this.player.update()
    this.particles.update(this, this.player)

    handleEscapePress(Phaser, this.esc)

    this.winText.update()
    this.openingTexts.forEach(text => text.update())

}

function handleEscapePress(Phaser, esc) {
    if (Phaser.Input.Keyboard.JustDown(esc))
     {
         var remote = require('electron').remote;
         var window = remote.getCurrentWindow();
         window.close();
     }
}

function startMusic(scene) {
    var music = scene.sound.add('music', {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    });
    music.play()
}

function setUpInputs(scene) {
    scene.cursors = scene.input.keyboard.createCursorKeys();
    scene.esc = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    scene.period = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
    scene.forwardSlash = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH);
}
