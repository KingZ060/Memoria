
class Test1 extends Phaser.Scene {
    constructor() {
        super('Test1')
    }

    preload() {
        
        // this.load.path = '../../assets/'
        this.load.path = '/Memoria/assets/' // <- for github
        this.load.image('player', 'Delilah.png')
        this.load.image('mother', 'Mother.png')
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

class Test2 extends GameScene {
    constructor() {
        super('Test2', 'Test2')
    }

    preload() {
        this.load.video('video', 'myVideo.mp4', 'loadeddata', false, true);
    }

    onEnter() {
        let inventory=0;
        this.cameras.main.setBackgroundColor('#ffffff');

        this.video = this.add.video(400, 400, 'video');
        this.video.play(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 100, 100);
        this.input.on('pointerdown', this.player.movePlayer, this.player);

        this.momGroup = this.physics.add.group();
        let path1 = [
            { x: 900, y: 800 },
            { x: 1400, y: 800 },
            { x: 1400, y: 100 },
        ];
        this.mother1 = new Mom(this, 900, 800, path1);
        this.mother1.setScale(0.15);
        this.mother1.speed=0;

        let speedText = this.add.text(550, 50, 'Speed: 0', { fontSize: '32px', fill: '#000' });

        let plusButton = this.add.text(500, 100, '+', { fontSize: '32px', fill: '#000' }).setInteractive().setScale(1.5);
        let minusButton = this.add.text(700, 100, '-', { fontSize: '32px', fill: '#000' }).setInteractive().setScale(1.5);

        plusButton.on('pointerover', () => this.showMessage('Increase speed'))
        minusButton.on('pointerover', () => this.showMessage('Decrease speed'))
        plusButton.on('pointerdown', () => {
            inventory++;
            this.mother1.speed = inventory * 100;
            speedText.setText('Speed: ' + this.mother1.speed);
        });

        minusButton.on('pointerdown', () => {
            if (inventory > 0) {
                inventory--; 
            }
            this.mother1.speed = inventory * 100;
            speedText.setText('Speed: ' + this.mother1.speed);
        });
        
    }
    
    update() {
        this.player.update(this.cursors);
        this.mother1.update();
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
});
