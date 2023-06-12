class Intro extends Phaser.Scene{
    constructor() {
        super("intro");
    }

    preload() {
        this.load.path = './'
        this.load.image('player', 'Delilah.png');
    }

    create() {
        this.graphics = this.add.graphics();

        // create background
        this.graphics.fillStyle(0x000000, 1);
        let bg = this.graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

        this.graphics.fillStyle(0xFFFFFF, 1);
        let white_rect = this.graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);
        white_rect.alpha = 0;
        white_rect.depth = 10;

        let player_img = this.add.image(this.game.config.width * 0.1, this.game.config.height * 0.5, 'player');

        const timeline = this.add.timeline([
            {
                at: 0,
                tween: {
                    targets: player_img,
                    x: this.game.config.width * 0.5,
                    ease: 'linear',
                    duration: 5000
                }
            },
            {
                at: 5000,
                tween: {
                    targets: player_img,
                    scaleX: -.1,
                    scaleY: -.1,
                    ease: 'linear',
                    duration: 5000
                }
            },
            {
                at: 10000,
                tween: {
                    targets: white_rect,
                    alpha: 1,
                    ease: 'linear',
                    duration: 5000
                }
            },
            {
                at: 15000,
                stop: true
            }
        ]);

        this.time.delayedCall(15000, () => {
            this.scene.start('outro');
        })

        timeline.play();
        this.timeline = timeline;
    }
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
        this.typewriteText("Hello this is placeholder text that should be typing");

        // Create text link which flashes
        let end_text = this.add.text(this.game.config.width * 0.48, this.game.config.height * 0.7, "I'm interactive", {fontSize: 30, color: '#FFFFFF'})
            .setInteractive({useHandCursor: true})
            .setFontSize(25)
            .on('pointerover', () => {
                end_text.alpha = 1
                flash_text_tween.pause();
            })
            .on('pointerout', () => {
                flash_text_tween.resume();
            });

        // Tween for text to flash
        let flash_text_tween = this.tweens.add({
            targets: end_text,
            alpha: 1,
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });

        // Initially have interactive text invisible and tween paused
        flash_text_tween.pause()
        end_text.alpha = 0;

        this.time.delayedCall(5000, () => {
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
    scene: [Intro, Outro],
    title: "Memoria",
});