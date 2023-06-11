class Title extends Phaser.Scene {
    constructor() {
        super('title')
    }

    create() {
        this.cameras.main.setBackgroundColor(0x034356)
        this.add.text(400, 300, 'This is the title\nthe menu is loading')
            .setFontSize(30)
            .setOrigin(0.5)
        
        this.time.addEvent({
            delay: 2000,
            loop: false,
            callback: () => {
                this.scene.start('menu')
            }
        })
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }

    create() {
        this.cameras.main.setBackgroundColor(0x034356)
        this.add.text(400, 150, 'This is the Menu')
            .setFontSize(30)
            .setOrigin(0.5)
        
        let button = this.add.text(400, 300, 'click here to progress to gameplay scene')
            .setFontSize(20)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => button.setFontSize(30))
            .on('pointerout', () => button.setFontSize(20))
            .on('pointerdown', () => {
                this.cameras.main.fadeOut(1000)
                this.time.addEvent({
                    delay: 2000,
                    loop: false,
                    callback: () => {
                        this.scene.start('gameplay')
                    }
                })
            })
    }
}

class Gameplay extends Phaser.Scene {
    constructor() {
        super('gameplay')
    }

    create() {
        this.cameras.main.setBackgroundColor(0x034356)
        this.cameras.main.fadeIn(1000);

        this.score = 0
        this.scorecount = this.add.text(800, 100, 'Score: ' + this.score).setFontSize(20)
        this.scorecount.setScrollFactor(0)

        let increase = this.add.text(250, 200, 'Click here to increase score')
            .setFontSize(25)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.score += 1
                this.scorecount.setText('Score : ' + this.score)
            })

        this.add.text(400, 100, 'This is the living room scene')
            .setFontSize(30)
            .setOrigin(0.5)
        
        let master = this.add.text(600, 300, 'click here to progress to master bedroom')
            .setFontSize(20)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => master.setFontSize(30))
            .on('pointerout', () => master.setFontSize(20))
            .on('pointerdown', () => {
                this.cameras.main.fadeOut(1000)
                this.time.addEvent({
                    delay: 2000,
                    loop: false,
                    callback: () => {
                        this.scene.start('master', {score: this.score})
                    }
                })
            })
    }
}

class Master extends Phaser.Scene {
    constructor() {
        super('master')
    }

    init(data) {
        this.score = data.score
    }

    create() {
        this.cameras.main.setBackgroundColor(0x034356)
        this.cameras.main.fadeIn(1000);
        let master = this.add.text(400, 300, 'click here to go back')
            .setFontSize(20)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => master.setFontSize(30))
            .on('pointerout', () => master.setFontSize(20))
            .on('pointerdown', () => this.scene.start('gameplay'))

        let end = this.add.text(400, 500, 'click here to go to credits ')
            .setFontSize(20)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => end.setFontSize(30))
            .on('pointerout', () => end.setFontSize(20))
            .on('pointerdown', () => {
                this.cameras.main.fadeOut(1000)
                this.time.addEvent({
                    delay: 2000,
                    loop: false,
                    callback: () => {
                        this.scene.start('credits')
                    }
                })
            })

        let lastscene = this.add.text(100, 600, 'In the last scene your total score was: ' + this.score)
            .setFontSize(20)
    }
}

class Credits extends Phaser.Scene {
    constructor() {
        super('credits')
    }

    create() {
        this.cameras.main.setBackgroundColor(0x034356)
        this.cameras.main.fadeIn(1000);
        this.add.text(game.config.width/2, game.config.height/2, 'Thank You For Playing!\n\n       Credits:\n     Julian Lara\n Elyzza Joyce Marquez\n      Xing Zhong\n Eduardo Torres Cruz')
            .setFontSize(30)
            .setOrigin(0.5)
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    backgroundColor: '#000000',
    scene: [Title, Menu, Gameplay, Master, Credits],
};

let game = new Phaser.Game(config);
