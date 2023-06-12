
class Test1 extends Phaser.Scene {
    constructor() {
        super('Test1')
    }

    preload() {
        
        // this.load.path = '../../assets/'
        this.load.path = '/Memoria/assets/' // <- for github
        this.load.image('player', 'Delilah.png')
        this.load.image('doorVert', 'Bathroom/Bathroom door.png')
        this.load.audio('bgm', 'sounds/ambience.wav')
        this.load.audio('creak', 'sounds/creak.mp3')
        
    }

    create() {
        this.bgm = this.sound.add('bgm').setVolume(0.25)
        this.bgm.play({loop: true });
        this.creak = this.sound.add('creak').setVolume(0.25)
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 300, 500);
        this.input.on('pointerdown', this.player.movePlayer, this.player);
        this.door = this.add.image(game.config.width/1.34, game.config.height/1.84, 'doorVert').setScale(0.5)
        this.touch = this.add.rectangle(game.config.width/1.46, game.config.height/2, 10, 100, 0xFFFFFF, 0.5).setVisible(false)
        this.subtext = this.add.text(game.config.width/1.475, game.config.height/2.4, 'Click me!!\n    ⬇️')
            .setFontSize(20)
            .setOrigin(0.5)
        this.physics.add.existing(this.touch)
        this.doorinter = this.add.text(game.config.width/1.465, game.config.height/2, ' \n \n ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})

        this.interact = function(player, door){
            this.sound.play('creak');
            this.scene.start('Test2'); 
        }
        this.physics.add.overlap(this.player, this.touch, this.interact, null, this)
        
    }

    update() {
        this.player.update(this.cursors);
    }
}

class Test2 extends Phaser.Scene {
    constructor() {
        super('Test2')
    }

    preload() {
        this.load.video('video', 'myVideo.mp4', 'loadeddata', false, true);
    }

    create() {
        this.video = this.add.video(400, 300, 'video');
        this.video.play(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 100, 100);
        this.input.on('pointerdown', this.player.movePlayer, this.player);
    }
    
    update() {
        this.player.update(this.cursors);
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1900,
        height: 1000
    },
    physics: {
        default: 'arcade',
        arcade: {debug: true}
    },
    type: Phaser.AUTO,
    scene: [Test1,Test2],
    title: "Final Project",
});