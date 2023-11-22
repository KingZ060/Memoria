class Master extends GameScene {
  constructor() {
    super("master", "Master");
  }

  preload() {
    this.load.path = "/assets/"; // <- for local
    // this.load.path = '/Memoria/assets/' // <- for github
    this.load.image("bed", "Master Bedroom/Bed.png");
    this.load.image("bedroomdoor", "Master Bedroom/Bedroom Door.png");
    this.load.image("closet", "Master Bedroom/Closet.png");
    this.load.image("jewerlybox", "Master Bedroom/JewerlyBox.png");
    this.load.image("masterbedroombg", "Master Bedroom/MasterBedroom.png");
    this.load.image("nightstand", "Master Bedroom/Nightstand.png");
    this.load.image("vanity", "Master Bedroom/Vanity.png");
    this.load.image("walls", "Master Bedroom/master-walls.png");
    this.load.audio("momcry", "sounds/mom crying.mp3");
    this.load.audio("creak", "sounds/creak.mp3");
  }

  interact = (player, object) => {
    if (object == this.door) {
      this.creak.play();
      this.subtext.setText("(Door creaks open)");
      this.bgm.stop();
      this.cry.stop();
      this.gotoLivingScene("livingroom", { x: 1200, y: 505 });
    }
    if (object == this.closet) {
      this.showMessage(
        "An empty closet. There doesn't seem to be anything inside."
      );
    }
    if (object == this.nightstand) {
      this.showMessage("A nightstand. It reminds you of peaceful times.");
    }
    if (object == this.vanity && this.vanitySearch == 0) {
      this.showMessage("You find a small jewelery box!");
      this.vanitySearch = 1;
      this.boximg.setVisible(true);
    }
    if (object == this.box && this.vanitySearch == 1) {
      this.showMessage("You find an old diary.");
      this.gainItem("Mother's Diary");
    }
    if (
      this.hasItem("Baby Crying Clue") &&
      this.hasItem("Broken Record") &&
      this.hasItem("Refurbished Record") &&
      this.hasItem("Mother's Diary")
    ) {
      this.bgm.stop();
      this.cry.stop();
      this.creak.play();
      this.subtext.setText("(Door creaks open)");
      this.gotoScene("outrocinematic");
    }
  };

  onEnter() {
    this.room = this.add
      .image(
        game.config.width / 2 - 200,
        game.config.height / 2,
        "masterbedroombg"
      )
      .setScale(0.5);
    this.doorimg = this.add
      .image(game.config.width / 2 - 200, game.config.height / 2, "bedroomdoor")
      .setScale(0.5);
    this.closetimg = this.add
      .image(game.config.width / 2 - 200, game.config.height / 2, "closet")
      .setScale(0.5);
    this.nightstandimg = this.add
      .image(game.config.width / 2 - 200, game.config.height / 2, "nightstand")
      .setScale(0.5);
    this.vanityimg = this.add
      .image(game.config.width / 2 - 200, game.config.height / 2, "vanity")
      .setScale(0.5);
    this.boximg = this.add
      .image(game.config.width / 2 - 200, game.config.height / 2, "jewerlybox")
      .setScale(0.5)
      .setVisible(false);
    this.bed = this.add
      .image(game.config.width / 2 - 200, game.config.height / 2, "bed")
      .setScale(0.5);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, 300, 750);
    this.input.on("pointerdown", this.player.movePlayer, this.player);

    this.subrect = this.add
      .rectangle(game.config.width / 2, 900, 200, 20, 0x000000, 0.5)
      .setVisible(false);
    this.subtext = this.add
      .text(game.config.width / 2, 902, "Hello")
      .setFontSize(20)
      .setOrigin(0.5)
      .setVisible(false);

    this.creak = this.sound.add("creak").setVolume(0.25);
    this.cry = this.sound.add("momcry").setVolume(0.25);
    this.bgm = this.sound.add("bgm").setVolume(0.25);
    this.bgm.loop = true;
    this.bgm.play();
    this.subrect.setVisible(true);
    this.subtext.setText("(Eerie ambience)");
    this.subtext.setVisible(true);

    this.door = this.add.rectangle(260, 750, 10, 100, 0xffffff, 0.5);
    this.physics.add.existing(this.door);
    this.door.setVisible(false);

    this.doorinter = this.add
      .text(240, 750, " \n \n ")
      .setFontSize(30)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("Livingroom door"));

    this.closet = this.add.rectangle(1200, 550, 100, 200, 0xffffff, 0.5);
    this.physics.add.existing(this.closet);
    this.closet.setVisible(false);

    this.closetinter = this.add
      .text(1200, 550, "    \n    \n    \n    ")
      .setFontSize(45)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("A closet"));

    this.nightstand = this.add.rectangle(960, 250, 150, 150, 0xffffff, 0.5);
    this.physics.add.existing(this.nightstand);
    this.nightstand.setVisible(false);

    this.nightstandinter = this.add
      .text(960, 270, "     \n     ")
      .setFontSize(50)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("A nightstand"));

    this.vanity = this.add.rectangle(450, 250, 200, 150, 0xffffff, 0.5);
    this.physics.add.existing(this.vanity);
    this.vanity.setVisible(false);

    this.vanityinter = this.add
      .text(440, 250, "      \n      ")
      .setFontSize(50)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("A small vanity"));

    this.vanitySearch = 0;

    this.box = this.add.rectangle(450, 250, 100, 100, 0xffffff, 0.5);
    this.physics.add.existing(this.box);
    this.box.setVisible(false);

    this.boxinter = this.add
      .text(440, 250, "  ")
      .setFontSize(30)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("A small box"))
      .setVisible(false);

    this.screenTint = this.add
      .rectangle(0, 0, this.w * 0.75, this.h, 0x000000, 0.5)
      .setOrigin(0, 0)
      .setVisible(false);

    // Light switch image
    this.lightOn = this.add
      .image(this.w - 6 * this.s, this.h - 9 * this.s, "lighton")
      .setScale(0.15);
    this.lightOff = this.add
      .image(this.w - 4 * this.s, this.h - 9 * this.s, "lightoff")
      .setScale(0.15);

    // Light switch sound effect
    this.switchOn = this.sound.add("switchon").setVolume(0.25);
    this.switchOff = this.sound.add("switchoff").setVolume(0.25);

    // Tint for light switch
    if (this.screenTint.setVisible(false)) {
      this.lightOff.setVisible(false);
    } else {
      this.lightOn.setVisible(false);
    }

    this.light = 1;

    this.lightSwitchinter = this.add
      .text(this.w - 5 * this.s, this.h - 12 * this.s, "   \n   \n   ")
      .setFontSize(`${2 * this.s - 12}px`)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("Toggle light switch?"))
      .on("pointerdown", () => {
        if (this.light == 1) {
          this.switchOff.play();
          this.subtext.setText("(Light switch flip)");
          this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
              this.subtext.setText("(Mother crying)");
            },
          });
          this.lightOn.setVisible(false);
          this.lightOff.setVisible(true);
          this.light = 0;
          this.screenTint.setVisible(true);
          this.bgm.stop();
          this.cry.play();
        } else {
          this.switchOn.play();
          this.subtext.setText("(Light switch flip)");
          this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
              this.subtext.setText("(Eerie ambience)");
            },
          });
          this.lightOn.setVisible(true);
          this.lightOff.setVisible(false);
          this.light = 1;
          this.screenTint.setVisible(false);
          this.cry.stop();
          this.bgm.play();
        }
      });
    // Updating setUpInteractivity calls with necessary parameters
    setUpInteractivity(this.physics, this.player, this.door, this.interact);
    setUpInteractivity(this.physics, this.player, this.closet, this.interact);
    setUpInteractivity(
      this.physics,
      this.player,
      this.nightstand,
      this.interact
    );
    setUpInteractivity(this.physics, this.player, this.vanity, this.interact);
    setUpInteractivity(this.physics, this.player, this.box, this.interact);

    // Updating createBarrier calls with necessary parameters
    createBarrier(this.physics, this.player, 250, 500, 1, this.room.height);
    createBarrier(this.physics, this.player, 1250, 500, 1, this.room.height);
    createBarrier(this.physics, this.player, 950, 180, this.room.width, 1);
    createBarrier(this.physics, this.player, 950, 850, this.room.width, 1);
    createBarrier(this.physics, this.player, 175, 260, 300, 800);
    createBarrier(this.physics, this.player, 215, 900, 200, 200);
  }

  update() {
    this.player.update(this.cursors);
  }
}
