class LivingRoom extends GameScene {
  constructor() {
    super("livingroom", "LivingRoom");
  }

  preload() {
    this.load.path = "/assets/"; // <- for local
    // this.load.path = '/Memoria/assets/' // <- for github
    this.load.image("lighton", "Buttons/Light switch on.png");
    this.load.image("lightoff", "Buttons/Light switch off.png");
    this.load.image("player", "Delilah.png");
    this.load.image("mother", "Mother.png");
    this.load.image("RoomOn", "LivingRoom/LivingRoomLightON.png");
    this.load.image("RoomOff", "LivingRoom/LivingRoomLightOFF.png");
    this.load.image("doorVert", "Bathroom/Bathroom door.png");
    this.load.image("doorHori", "Door.png");
    this.load.audio("switchon", "sounds/LIGHT SWITCH ON SOUND.mp3");
    this.load.audio("switchoff", "sounds/LIGHT SWITCH OFF SOUND.mp3");
    this.load.audio("page", "sounds/page.mp3");
    this.load.audio("bgm", "sounds/ambience.wav");
    this.load.audio("creak", "sounds/creak.mp3");
  }

  getObjectKey(object) {
    for (const key in this) {
      // console.log(key)
      if (this[key] === object) {
        return key;
      }
    }
    return null;
  }

  interact = (player, object) => {
    const objectKey = this.getObjectKey(object);
    if (objectKey) {
      switch (objectKey) {
        case "frame":
        case "tv":
          this.showMessage(this[`${objectKey}Msg`]);
          break;
        case "belt":
        case "bottle":
        case "blood":
          if (this.light == 0) {
            this.showMessage(this[`${objectKey}Msg`]);
          }
          break;
        case "master":
        case "bathroom":
        case "babyroom":
          this.handleDoorOpen(objectKey);
          break;
        case "bedroom":
          this.showMessage(
            "It's your old room. You don't exactly feel the need to go inside."
          );
          break;
      }
    }
    if (this.momGroup.contains(object)) {
      this.resetPlayerPosition();
    }
  }

  handleDoorOpen(room) {
    this.creak.play();
    this.subtext.setText("(Door creaks open)");
    this.bgm.stop();
    this.gotoScene(room);
  }

  resetPlayerPosition() {
    this.player.x = 750;
    this.player.y = 1500;
    this.player.setVelocity(0, 0);
    this.player.target = null;
  }

  createMom(x, y, path) {
    const mom = new Mom(this, x, y, path, 0.15, false, true, 0);
    this.momGroup.add(mom);
  }

  onEnter() {
    // adding images for rooms
    this.roomOn = this.add
      .image(game.config.width / 2 - 208, game.config.height / 2, "RoomOn")
      .setScale(0.5);
    this.roomOff = this.add
      .image(game.config.width / 2 - 208, game.config.height / 2, "RoomOff")
      .setScale(0.5)
      .setVisible(false);

    // adding images for doors
    this.masterDoor = this.add
      .image(game.config.width / 1.34, game.config.height / 1.84, "doorVert")
      .setScale(0.5);
    this.bedroomDoor = this.add
      .image(game.config.width / 6.1, game.config.height / 1.84, "doorVert")
      .setScale(0.5);
    this.bathroomDoor = this.add
      .image(game.config.width / 7.05, game.config.height / 1.85, "doorHori")
      .setScale(0.5);
    this.babyDoor = this.add
      .image(game.config.width / 6.1, game.config.height / 1.42, "doorHori")
      .setScale(0.5);

    // subtitles
    this.subrect = this.add
      .rectangle(game.config.width / 2, 900, 200, 20, 0x000000, 0.5)
      .setVisible(false);
    this.subtext = this.add
      .text(game.config.width / 2, 902, "Hello")
      .setFontSize(20)
      .setOrigin(0.5)
      .setVisible(false);

    // adding player
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.startPosition) {
      this.player = new Player(
        this,
        this.startPosition.x,
        this.startPosition.y
      );
    } else {
      this.player = new Player(this, 750, 1500);
    }
    this.input.on("pointerdown", this.player.movePlayer, this.player);
    
    // adding move around mom
    this.momGroup = this.physics.add.group();
    let path1 = [
      { x: 900, y: 800 },
      { x: 1100, y: 800 },
    ];
    this.createMom(900, 800, path1);

    let path2 = [
      { x: 500, y: 450 },
      { x: 500, y: 250 },
      { x: 1100, y: 250 },
    ];
    this.createMom(500, 450, path2);

    // adding sounds
    this.switchOn = this.sound.add("switchon").setVolume(0.25);
    this.switchOff = this.sound.add("switchoff").setVolume(0.25);
    this.creak = this.sound.add("creak").setVolume(0.25);
    this.bgm = this.sound.add("bgm").setVolume(0.25);
    this.bgm.loop = true;
    this.bgm.play();
    this.subrect.setVisible(true);
    this.subtext.setText("(Eerie ambience)");
    this.subtext.setVisible(true);

    // picture frame object
    this.frameMsg = "A worn family picture. You and your family seem so happy.";
    this.frame = this.add.rectangle(
      game.config.width / 2.05,
      170,
      300,
      20,
      0xffffff,
      0.5
    );
    this.physics.add.existing(this.frame);
    this.frame.setVisible(false);

    this.frameinter = this.add
      .text(game.config.width / 2.05, 70, "          \n          \n          ")
      .setFontSize(50)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("A family portrait"));

    // tv object
    this.tvMsg = "The TV seems old and broken. It won't turn on.";
    this.tv = this.add.rectangle(
      game.config.width / 1.95,
      game.config.height / 1.6,
      140,
      100,
      0xffffff,
      0.5
    );
    this.physics.add.existing(this.tv);
    this.tv.setVisible(false);

    this.tvinter = this.add
      .text(game.config.width / 1.95, game.config.height / 1.675, "   \n   ")
      .setFontSize(25)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("A TV"));

    // belt object
    this.beltMsg = "A rolled up belt. For some reason it makes you shudder.";
    this.belt = this.add.rectangle(
      game.config.width / 1.96,
      game.config.height / 2.37,
      160,
      110,
      0xffffff,
      0.5
    );
    this.physics.add.existing(this.belt);
    this.belt.setVisible(false);

    this.beltinter = this.add
      .text(game.config.width / 1.96, game.config.height / 2.37, "  ")
      .setFontSize(20)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("A belt"))
      .setVisible(false);

    // bottle object
    this.bottleMsg =
      "A broken beer bottle. It looks like it may have been used as a weapon.";
    this.bottle = this.add.rectangle(
      game.config.width / 1.92,
      game.config.height / 1.9,
      150,
      70,
      0xffffff,
      0.5
    );
    this.physics.add.existing(this.bottle);
    this.bottle.setVisible(false);

    this.bottleinter = this.add
      .text(game.config.width / 1.94, game.config.height / 1.95, "   ")
      .setFontSize(20)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("A bottle"))
      .setVisible(false);

    // blood object
    this.bloodMsg = "A pool of blood. The blood seems fresh.";
    this.blood = this.add.rectangle(
      game.config.width / 2.2,
      game.config.height / 1.9,
      90,
      90,
      0xffffff,
      0.5
    );
    this.physics.add.existing(this.blood);
    this.blood.setVisible(false);

    this.bloodinter = this.add
      .text(game.config.width / 2.2, game.config.height / 1.9, "   \n   ")
      .setFontSize(30)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("A bloodstain"))
      .setVisible(false);

    // masterbedroom
    this.master = this.add.rectangle(
      game.config.width / 1.48,
      game.config.height / 2,
      10,
      100,
      0xffffff,
      0.5
    );
    this.physics.add.existing(this.master);
    this.master.setVisible(false);

    this.masterinter = this.add
      .text(game.config.width / 1.465, game.config.height / 2, " \n \n ")
      .setFontSize(30)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("Master bedroom door"));

    // bathroom
    this.bathroom = this.add.rectangle(
      game.config.width / 5.4,
      game.config.height / 1.74,
      100,
      10,
      0xffffff,
      0.5
    );
    this.physics.add.existing(this.bathroom);
    this.bathroom.setVisible(false);

    this.bathroominter = this.add
      .text(game.config.width / 5.4, game.config.height / 1.7, "      ")
      .setFontSize(30)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("Bathroom door"));

    // baby room
    this.babyroom = this.add.rectangle(
      game.config.width / 6.1,
      game.config.height / 2.32,
      100,
      10,
      0xffffff,
      0.5
    );
    this.physics.add.existing(this.babyroom);
    this.babyroom.setVisible(false);

    this.babyroominter = this.add
      .text(game.config.width / 6.1, game.config.height / 2.4, "     ")
      .setFontSize(30)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("Baby Brother's door"));

    // bedroom
    this.bedroom = this.add.rectangle(
      game.config.width / 9.5,
      game.config.height / 2,
      10,
      100,
      0xffffff,
      0.5
    );
    this.physics.add.existing(this.bedroom);
    this.bedroom.setVisible(false);

    this.bedroominter = this.add
      .text(game.config.width / 10, game.config.height / 2, " \n \n ")
      .setFontSize(30)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("Your bedroom door"));

    this.exit = this.add.rectangle(750, 980, 200, 10, 0xffffff, 0.5);
    this.physics.add.existing(this.exit);
    this.exit.setVisible(false);

    this.exitinter = this.add
      .text(740, 980, "           ")
      .setFontSize(30)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("Exit"));

    // tint for when light is off
    this.screenTint = this.add
      .rectangle(0, 0, this.w - 500, this.h, 0x000000, 0.5)
      .setOrigin(0, 0)
      .setVisible(false);

    // light switch
    this.lightOn = this.add
      .image(this.w - 6 * this.s, this.h - 9 * this.s, "lighton")
      .setScale(0.15);
    this.lightOff = this.add
      .image(this.w - 4 * this.s, this.h - 9 * this.s, "lightoff")
      .setScale(0.15);

    if (this.screenTint.setVisible(false)) {
      this.lightOff.setVisible(false);
    } else {
      this.lightOn.setVisible(false);
    }

    this.light = 1;

    // light switch interactivity
    this.lightSwitchinter = this.add
      .text(this.w - 5 * this.s, this.h - 12 * this.s, "   \n   \n   ")
      .setFontSize(`${2 * this.s - 12}px`)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.showMessage("Toggle light switch?"))
      .on("pointerdown", () => {
        if (this.light == 1) {
          this.light = 0;
          this.switchOff.play();
          this.subtext.setText("(Light switch flip)");
          this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
              this.subtext.setText("(Eerie ambience)");
            },
          });
          this.lightOn.setVisible(false);
          this.lightOff.setVisible(true);
          this.screenTint.setVisible(true);
          this.roomOn.setVisible(false);
          this.roomOff.setVisible(true);
          this.beltinter.setVisible(true);
          this.bottleinter.setVisible(true);
          this.bloodinter.setVisible(true);
          this.frameMsg =
            "A much newer looking family picture. Your Father looks angry, your baby brother is crossed out, and your mom seems to be holding something.";
          this.tvMsg =
            "The TV is playing a show your baby brother used to love. It hasn't aired in 20 years.";
          this.momGroup.children.iterate(function (mom) {
            mom.setVisible(true);
            mom.body.checkCollision.none = false;
            mom.speed = this.inventory.length * 100;
          }, this);
        } else {
          this.light = 1;
          this.switchOn.play();
          this.subtext.setText("(Light switch flip)");
          this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
              this.subtext.setText("(Eerie ambience)");
            },
          });
          this.lightOff.setVisible(false);
          this.lightOn.setVisible(true);
          this.screenTint.setVisible(false);
          this.roomOff.setVisible(false);
          this.roomOn.setVisible(true);
          this.beltinter.setVisible(false);
          this.bottleinter.setVisible(false);
          this.bloodinter.setVisible(false);
          this.frameMsg = "A picture of a family of 4. They seem so happy.";
          this.tvMsg = "The TV seems old and broken. It won't turn on.";
          this.momGroup.children.iterate(function (mom) {
            mom.setVisible(false);
            mom.body.checkCollision.none = true;
            mom.speed = 0;
          }, this);
        }
      });
    // Object interactivity
    setUpInteractivity(this.physics, this.player, this.frame, this.interact);
    setUpInteractivity(this.physics, this.player, this.tv, this.interact);
    setUpInteractivity(this.physics, this.player, this.belt, this.interact);
    setUpInteractivity(this.physics, this.player, this.bottle, this.interact);
    setUpInteractivity(this.physics, this.player, this.blood, this.interact);
    setUpInteractivity(this.physics, this.player, this.master, this.interact);
    setUpInteractivity(this.physics, this.player, this.bathroom, this.interact);
    setUpInteractivity(this.physics, this.player, this.babyroom, this.interact);
    setUpInteractivity(this.physics, this.player, this.bedroom, this.interact);
    setUpInteractivity(this.physics, this.player, this.exit, this.interact);
    this.momGroup.children.iterate(function (mom) {
      setUpInteractivity(this.physics, this.player, mom, this.interact);
    }, this);

    // Setting world bounds
    createBarrier(
      this.physics,
      this.player,
      this.roomOn.x - 550,
      this.roomOn.y,
      1,
      this.roomOn.height
    );
    createBarrier(
      this.physics,
      this.player,
      this.roomOn.x + 550,
      this.roomOn.y,
      1,
      this.roomOn.height
    );
    // createBarrier(this.physics, this.player, 200, 0, this.roomOn.height, 300);
    // createBarrier(this.physics, this.player, 285, 265, 300, 300);
    // createBarrier(this.physics, this.player, 400, 425, 75, 50);
    // createBarrier(this.physics, this.player, 225, 425, 75, 50);
    // createBarrier(this.physics, this.player, 1035, 985, 400, 200);
    // createBarrier(this.physics, this.player, 450, 985, 400, 200);
    // createBarrier(this.physics, this.player, 415, 785, 400, 400);
    // createBarrier(this.physics, this.player, 225, 585, 150, 75);
    // createBarrier(this.physics, this.player, 510, 585, 200, 75);
    // createBarrier(this.physics, this.player, this.roomOn.x + 525, 0, 100, 875);
    // createBarrier(
    //   this.physics,
    //   this.player,
    //   this.roomOn.x + 525,
    //   1000,
    //   100,
    //   875
    // );
  }

  update() {
    this.momGroup.children.iterate(function (mom) {
      mom.update();
    });
    this.player.update(this.cursors);
  }
}
