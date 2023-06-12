class Title extends Phaser.Scene {
    constructor() {
        super('title')
    }
    
    preload() {
        // this.load.path = '/assets/' // local
        this.load.path = '/Memoria/assets/' // github
        this.load.image('title', 'Names/Title.png')
        this.load.image('start', 'Buttons/Start button.png')
        this.load.image('options', 'Buttons/Options button.png')
        this.load.audio('page', 'sounds/page.mp3')
    }
    
    create() {
        this.cameras.main.setBackgroundColor('#444')
        
        this.page = this.sound.add('page').setVolume(0.25)

        this.title = this.add.image(game.config.width/2, game.config.height/3, 'title')
        .setScale(0.5)
        .setOrigin(0.5)
        
        this.start = this.add.image(game.config.width/2, game.config.height/2.75, 'start')
        .setScale(0.5)
        .setOrigin(0.5)

        this.subrect = this.add.rectangle(game.config.width/2, 900, 130, 20, 0x000000, 0.5).setVisible(false)
        this.subtext = this.add.text(game.config.width/2, 902, 'Hello')
            .setFontSize(20)
            .setOrigin(0.5)
            .setVisible(false)
        
        this.startinter = this.add.text(game.config.width/2, game.config.height/2.3, '       ')
        .setOrigin(0.5)
        .setFontSize(50)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => this.start.setScale(0.6))
        .on('pointerout', () => this.start.setScale(0.5))
        .on('pointerdown', () => {
            this.page.play()
            this.subrect.setVisible(true)
            this.subtext.setText('(Page flip)')
            this.subtext.setVisible(true)
            this.time.delayedCall(1000, () => this.scene.start('warning'))
        })
        
        this.options = this.add.image(game.config.width/2, game.config.height/2.5, 'options')
        .setScale(0.5)
        .setOrigin(0.5)
        
        this.optionsinter = this.add.text(game.config.width/2, game.config.height/1.8, '       ')
        .setOrigin(0.5)
        .setFontSize(50)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => this.options.setScale(0.55))
        .on('pointerout', () => this.options.setScale(0.5))
        .on('pointerdown', () => {
            this.page.play()
            this.subrect.setVisible(true)
            this.subtext.setText('(Page flip)')
            this.subtext.setVisible(true)
            this.time.delayedCall(100, () => this.scene.start('settings'))
        })
    }
}

class Settings extends Phaser.Scene {
    constructor() {
        super('settings')
    }
    
    preload() {
        // this.load.path = '/assets/' // local
        this.load.path = '/Memoria/assets/' // github
        this.load.image('exit', 'Buttons/Exit button.png')
        this.load.audio('page', 'sounds/page.mp3')
    }
    
    create() {
        this.cameras.main.setBackgroundColor('#444')
        
        this.page = this.sound.add('page').setVolume(0.25)
        
        this.musicToggle = this.add.text(game.config.width/2, game.config.height/2.1, "Toggle sound 🔈")
        .setColor(0xFFFFFF)
        .setOrigin(0.5)
        .setStyle({ fontSize: 50 })
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => this.musicToggle.setFontSize(55))
            .on('pointerout', () => this.musicToggle.setFontSize(50))
            .on('pointerdown', () => {
                if (game.sound.mute) {
                    game.sound.mute = false
                    this.musicToggle.setText("Toggle sound 🔈")
                } else {
                    game.sound.mute = true
                    this.musicToggle.setText("Toggle sound 🔇")
                }
            });
            
            if (game.sound.mute) {
                this.musicToggle.setText("Toggle sound 🔇")
            }

        this.subrect = this.add.rectangle(game.config.width/2, 900, 130, 20, 0x000000, 0.5).setVisible(false)
        this.subtext = this.add.text(game.config.width/2, 902, 'Hello')
            .setFontSize(20)
            .setOrigin(0.5)
            .setVisible(false)
            
            this.exit = this.add.image(game.config.width/2, game.config.height/3.5, 'exit')
            .setOrigin(0.5)
            .setScale(0.5)
            
            this.exitinter = this.add.text(game.config.width/2, game.config.height/1.75, '     ')
            .setOrigin(0.5)
            .setFontSize(50)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.exit.setScale(0.55))
            .on('pointerout', () => this.exit.setScale(0.5))
            .on('pointerdown', () => {
                this.page.play()
                this.subrect.setVisible(true)
                this.subtext.setText('(Page flip)')
                this.subtext.setVisible(true)
                this.time.delayedCall(75, () => this.scene.start('title'))
            })
    }
}

class Warning extends Phaser.Scene {
    constructor() {
        super('warning')
    }

    create() {
        this.cameras.main.fadeIn(1000);
        this.add.text(game.config.width/2, game.config.height/2, "Trigger Warning:\n\nFor those of you who are sensitive to topics such as \nabuse, or domestic violence, this game's story may\ncontain some disturbing images for you. The game is\ndark, but we hope you enjoy!")
            .setFontSize(50)
            .setOrigin(0.5)
        this.input.on('pointerdown', () => {
            this.scene.start('intro');
        });
        // this.time.addEvent({
        //     delay: 10000,
        //     loop: false,
        //     callback: () => {
        //         this.scene.start('intro');
        //     }
        // });
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    create() {
        this.cameras.main.fadeIn(1000);
        this.add.text(game.config.width/2, game.config.height/2, "The Story Begins:\n\nIt's been about twenty years since\nyou've stepped foot in your old house.\nAs per the advice of your therapist, you\ndecide to go back and face some demons\nfrom your past. You feel like you could\ndiscover something here.")
            .setFontSize(50)
            .setOrigin(0.5)
        this.input.on('pointerdown', () => {
            this.scene.start('livingroom');
        });
        // this.time.addEvent({
        //     delay: 10000,
        //     loop: false,
        //     callback: () => {
        //         this.scene.start('livingroom');
        //     }
        // });
    }
}

class Intro_Cinematic extends Phaser.Scene{
    
}

class Outro extends Phaser.Scene {
    constructor() {
        super("outro");
    }

    create() {
        this.graphics = this.add.graphics();

        // create background
        this.graphics.fillStyle(0x000000, 1);
        let bg = this.graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

        // Create main text
        this.label = this.add.text(50, 100, '', {fontSize: 50, color: '#FFFFFF'}).setWordWrapWidth(this.game.config.width);
        this.typewriteText("After collecting a handful of memorabilia, the past that you\nhad been shutting out begins to come back to you. You remember\nhow awful your father was over the fact that he didn't have a\nson. How your mother went crazy after the loss of your\nbrother. You're not quite sure what happened in there, or how\neverything looked the way it did twenty years ago, but you\nwere sure of one thing. It wasn't your fault.");

        // Create text link which flashes
        let end_text = this.add.text(this.game.config.width * 0.48, this.game.config.height * 0.7, 'Find Peace', {fontSize: 30, color: '#FFFFFF'})
            .setInteractive({useHandCursor: true})
            .setFontSize(25)
            .on('pointerover', () => {
                end_text.alpha = 1
                flash_text_tween.pause();
            })
            .on('pointerout', () => {
                flash_text_tween.resume();
            })
            .on('pointerdown', () => {
                this.scene.start('credits');
        });

        // Tween for text to flash
        let flash_text_tween = this.tweens.add({
            targets: end_text,
            alpha: 1,
            duration: 2000,
            yoyo: true,
            repeat: -1,
        });

        // Initially have interactive text invisible and tween paused
        flash_text_tween.pause()
        end_text.alpha = 0;

        this.time.delayedCall(35000, () => {
            flash_text_tween.resume();
        })

        // Create stars when cursor moves
        this.input.on('pointermove' , () => {
            const x = Phaser.Math.Between(0, this.game.config.width);
            const y = Phaser.Math.Between(0, this.game.config.height);

            // create star
            this.graphics.fillStyle(0xFFFFFF, 1);
            let star = this.graphics.fillCircle(x, y, 2);
        })
    }

    // Tween animation for typing effect
    // code from "https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/"
    typewriteText(text){
	    const length = text.length
	    let i = 0
	    this.time.addEvent({
		    callback: () => {
			    this.label.text += text[i]
			    ++i
		    },
		    repeat: length - 1,
		    delay: 80
	    })
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
        // arcade:{
        //     debug:true
        // }
    },
    type: Phaser.AUTO,
    scene: [Title, Settings, Warning, Intro, LivingRoom, BathRoom, BabyRoom, Master, Outro, Credits],
    title: "Memoria",
});
