const globals = {
    activeClothes: [],
    clothesBought: [],
    shopCollision: true,
    maxLives: 3,
    coins: 0,
    gems: 0,
    currentShuriken: 'black',
    shurikenBlackMax: 1,
    shurikenBlueMax: 0,
    speed: 1,
    updateShuriken: false
}

class Endless extends Phaser.Scene {

    constructor () {

        super("Endless");

    }

    init () {

    }

    preload () {

    }

    create () {

        //setup
        this.startLoopPosistion = 150;
        this.extraHearts = [];
        this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        //adds physics groups
        this.shurikenBlack = this.physics.add.group();
        this.shurikenBlue = this.physics.add.group();
        this.heartDrops = this.physics.add.group();
        this.pauseGroup = this.add.group();
        this.shurikenBlackGUI = this.add.group();
        this.shurikenBlueGUI = this.add.group();

        //adds player to screen
        this.player = this.physics.add.sprite(100, 100, 'player', 18).setScale(.7);
        this.player.setCollideWorldBounds(true);
        this.player.setOrigin(0,0);

        //adds extraHearts
        this.extraHeart1 = this.add.sprite(154, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);
        this.extraHeart2 = this.add.sprite(195, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);
        this.extraHeart3 = this.add.sprite(236, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);
        this.extraHeart4 = this.add.sprite(277, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);
        this.extraHeart5 = this.add.sprite(318, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);
        this.extraHeart6 = this.add.sprite(359, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);
        this.extraHeart7 = this.add.sprite(400, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);
        this.extraHeart8 = this.add.sprite(441, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);
        this.extraHeart9 = this.add.sprite(482, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);
        this.extraHeart10 = this.add.sprite(523, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);
        this.extraHeart11 = this.add.sprite(564, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);
        this.extraHeart12 = this.add.sprite(605, 471, 'extraHeart', 0).setVisible(false).setScrollFactor(0);

        //player camera and worldbounds setup
        this.cameras.main.setBounds(0,0,1500,1500);
        this.cameras.main.startFollow(this.player, 480, 320);
        this.physics.world.setBounds(0,0,1500,1500);

        //GUI
        globals.GUIHearts = this.add.sprite(70, 470, 'hearts', 0).setScrollFactor(0);
        globals.GUICoins = this.add.sprite(10, 10, 'coin').setOrigin(0,0).setScale(1.7).setScrollFactor(0);
        globals.GUIGems = this.add.sprite(10, 45, 'gem').setOrigin(0,0).setScale(1.7).setScrollFactor(0);
        updateScore(this);
        updateShuriken(this);

        
        //adds cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //adds map to screen
        this.map = this.add.tilemap('endlessMap', 16, 16, 160,160);
        let terrain = this.map.addTilesetImage('overworld', 'terrain');
        this.layer = this.map.createStaticLayer('layer', [terrain], 0, 0).setDepth(-1);
        this.shop = this.map.createStaticLayer('shop', [terrain], 0, 0).setDepth(-1);
        this.shop.setCollisionByProperty({collision: true});

        //adds shop collision
        this.physics.add.collider(this.player, this.shop, () => {
            if (this.cursors.down.isDown) {
                this.cursors.down.isDown = false;
                this.player.play('idle', true);
                this.player.setVelocityY(0);
            } else if (this.cursors.up.isDown) {
                this.cursors.up.isDown = false;
                this.player.play('playerIdleUp', true);
                this.player.setVelocityY(0);
            } else if (this.cursors.left.isDown) {
                this.cursors.left.isDown = false;
                this.player.play('playerIdleLeft', true);
                this.player.setVelocityX(0);
            } else if (this.cursors.right.isDown) {
                this.cursors.right.isDown = false;
                this.player.play('playerIdleRight', true);
                this.player.setVelocityX(0);
            }
            if (globals.shopCollision) {
                this.scene.pause();
                this.scene.launch('Shop');
                this.time.addEvent({
                    delay: 3000,
                    callback: turnCollisionOn,
                    callbackScope: this,
                    loop: false
                });
            }
        });
        
        function turnCollisionOn () {
            globals.shopCollision = true;
        }

        //creates clothing sprites (push to globals.activeClothes to show on player)
        globals.clothes = [];
        const shoesBrown = this.physics.add.sprite(0,0, 'shoesBrown', 18).setScale(.7).setVisible(false);
        shoesBrown.setOrigin(0,0);
        shoesBrown.setName('shoesBrown');
        const shoesArmor = this.physics.add.sprite(0,0, 'shoesArmor', 18).setScale(.7).setVisible(false);
        shoesArmor.setOrigin(0,0);
        shoesArmor.setName('shoesArmor');
        const pantsGreen = this.physics.add.sprite(0,0, 'pantsGreen', 18).setScale(.7).setVisible(false);
        pantsGreen.setOrigin(0,0);
        pantsGreen.setName('pantsGreen');
        const pantsArmor = this.physics.add.sprite(0,0, 'pantsArmor', 18).setScale(.7).setVisible(false);
        pantsArmor.setOrigin(0,0);
        pantsArmor.setName('pantsArmor');
        const shirtWhite = this.physics.add.sprite(0,0, 'shirtWhite', 18).setScale(.7).setVisible(false);
        shirtWhite.setOrigin(0,0);
        shirtWhite.setName('shirtWhite');
        const shirtArmor = this.physics.add.sprite(0,0, 'shirtArmor', 18).setScale(.7).setVisible(false);
        shirtArmor.setOrigin(0,0);
        shirtArmor.setName('shirtArmor');
        const helmetHood = this.physics.add.sprite(0,0, 'helmetHood', 18).setScale(.7).setVisible(false);
        helmetHood.setOrigin(0,0);
        helmetHood.setName('helmetHood');
        const helmetArmor = this.physics.add.sprite(0,0, 'helmetArmor', 18).setScale(.7).setVisible(false);
        helmetArmor.setOrigin(0,0);
        helmetArmor.setName('helmetArmor');
        globals.clothes.push(shoesBrown, shoesArmor, pantsGreen, pantsArmor, shirtWhite, shirtArmor, helmetHood, helmetArmor);
        
        //fixes player bounding box error
        this.time.addEvent({
            delay: 1000,
            callback: delayDone,
            callbackScope: this,
            loop: false
        });
        function delayDone () {
            this.player.body.setSize(33, 50);
            this.player.body.setOffset(16, 12);
            for (let i = 0; i < globals.clothes.length; i++) {
                globals.clothes[i].body.setSize(33, 50);
                globals.clothes[i].body.setOffset(16, 12);
            }
        }
        
        //adds updateText Method
        function updateScore (scene) {
            if(scene.coinText) {
                scene.coinText.destroy();
                scene.gemText.destroy();
            }
            scene.coinText = scene.add.text(45, 12, globals.coins, { fontSize: '20px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0).setScrollFactor(0);
            scene.gemText = scene.add.text(45, 47, globals.gems, { fontSize: '20px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0).setScrollFactor(0);
        }

        //adds shuriken GUI
        function updateShuriken (scene) {
            scene.shurikenBlack.maxSize = globals.shurikenBlackMax;
            scene.shurikenBlue.maxSize = globals.shurikenBlueMax;
            scene.shurikenBlackGUI.getChildren().forEach(child => {
                child.destroy();
            });
            scene.shurikenBlueGUI.getChildren().forEach(child => {
                child.destroy();
            });
            for (let i = 0; i < globals.shurikenBlackMax; i++) {
                scene.shurikenBlackGUI.create(15*i+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            }
            for (let i = 0; i < globals.shurikenBlueMax; i++) {
                scene.shurikenBlueGUI.create(15*i+10, 110, 'shurikenBlue').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            }
        }
        
    }
    
    update () {

       //updates shuriken
       if (globals.updateShuriken) {
            this.shurikenBlack.maxSize = globals.shurikenBlackMax;
            this.shurikenBlue.maxSize = globals.shurikenBlueMax;
            this.shurikenBlackGUI.getChildren().forEach(child => {
                child.destroy();
            });
            this.shurikenBlueGUI.getChildren().forEach(child => {
                child.destroy();
            });
            for (let i = 0; i < globals.shurikenBlackMax; i++) {
                this.shurikenBlackGUI.create(15*i+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            }
            for (let i = 0; i < globals.shurikenBlueMax; i++) {
                this.shurikenBlueGUI.create(15*i+10, 110, 'shurikenBlue').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            }
            globals.updateShuriken = false;
       }

       //sets max size for shuriken
       this.shurikenBlack.maxSize = globals.shurikenBlackMax;
       this.shurikenBlue.maxSize = globals.shurikenBlueMax;

       //updates score
        if(this.coinText) {
            this.coinText.destroy();
            this.gemText.destroy();
        }
        this.coinText = this.add.text(45, 12, globals.coins, { fontSize: '20px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0).setScrollFactor(0);
        this.gemText = this.add.text(45, 47, globals.gems, { fontSize: '20px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0).setScrollFactor(0);

        //adds hearts for clothes
        if (globals.maxLives > 3) {
            this.extraHeart1.setVisible(true);
        }
        if (globals.maxLives > 4) {
            this.extraHeart2.setVisible(true);
        }
        if (globals.maxLives > 5) {
            this.extraHeart3.setVisible(true);
        }
        if (globals.maxLives > 6) {
            this.extraHeart4.setVisible(true);
        }
        if (globals.maxLives > 7) {
            this.extraHeart5.setVisible(true);
        }
        if (globals.maxLives > 8) {
            this.extraHeart6.setVisible(true);
        }
        if (globals.maxLives > 9) {
            this.extraHeart7.setVisible(true);
        }
        if (globals.maxLives > 10) {
            this.extraHeart8.setVisible(true);
        }
        if (globals.maxLives > 11) {
            this.extraHeart9.setVisible(true);
        }
        if (globals.maxLives > 12) {
            this.extraHeart10.setVisible(true);
        }
        if (globals.maxLives > 13) {
            this.extraHeart11.setVisible(true);
        }
        if (globals.maxLives > 14) {
            this.extraHeart12.setVisible(true);
        }

        //makes player walk
        if (this.cursors.down.isDown) {
            this.player.play('walkDown', true);
            this.player.setVelocityY(80*globals.speed);
            this.player.setVelocityX(0);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-80*globals.speed);
            this.player.play('walkUp', true);
            this.player.setVelocityX(0);
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-80*globals.speed);
            this.player.setVelocityY(0);
            this.player.play('walkLeft', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(80*globals.speed);
            this.player.setVelocityY(0);
            this.player.play('walkRight', true);
        }
        
        //player idle when not moving
        if (this.cursors.left.isUp) {
            if (this.player.body.velocity.x < 0) {
                this.player.setVelocityX(-0.001);
                this.player.play('playerIdleLeft', true);
                this.player.setTexture('player', 9);
            }
        }
        if (this.cursors.right.isUp) {
            if (this.player.body.velocity.x > 0) {
                this.player.setVelocityX(0.001);
                this.player.play('playerIdleRight', true);
                this.player.setTexture('player', 27);
            }
        }
        if (this.cursors.up.isUp) {
            if (this.player.body.velocity.y < 0) {
                this.player.setVelocityY(-0.001);
                this.player.play('playerIdleUp', true);
                this.player.setTexture('player', 1);
            }
        }
        if (this.cursors.down.isUp) {
            if (this.player.body.velocity.y > 0) {
                this.player.setVelocityY(0);
                this.player.play('idle', true);
            }
        }
        
        //checks for clothes
        for (let i = 0; i < globals.activeClothes.length; i++) {
            let clothes = globals.activeClothes[i]
            clothes.setVisible(true);
            clothes.setVelocityX(this.player.body.velocity.x);
            clothes.setVelocityY(this.player.body.velocity.y);
            clothes.setX(this.player.x);
            clothes.setY(this.player.y);
            let name = clothes.name;
            if (this.player.anims.currentAnim) {
                if (this.player.anims.currentAnim.key === 'walkRight') {
                    clothes.play(`${name}Right`, true);
                } else if (this.player.anims.currentAnim.key === 'walkLeft') {
                    clothes.play(`${name}Left`, true);
                } else if (this.player.anims.currentAnim.key === 'walkDown') {
                    clothes.play(`${name}Down`, true);
                } else if (this.player.anims.currentAnim.key === 'walkUp') {
                    clothes.play(`${name}Up`, true);
                } else if (this.player.anims.currentAnim.key === 'playerIdleRight') {
                    clothes.play(`${name}IdleRight`, true);
                } else if (this.player.anims.currentAnim.key === 'playerIdleLeft') {
                    clothes.play(`${name}IdleLeft`, true);
                } else if (this.player.anims.currentAnim.key === 'playerIdleUp') {
                    clothes.play(`${name}IdleUp`, true);
                } else if (this.player.anims.currentAnim.key === 'playerHurt') {
                    clothes.play(`${name}Hurt`, true);
                } else {
                    clothes.play(`${name}Idle`, true);
                }
            }
        }

        //sets active shuriken
        if (Phaser.Input.Keyboard.JustDown(this.c)) {
            if (globals.currentShuriken === 'black' && this.shurikenBlue.maxSize > 0) {
                globals.currentShuriken = 'blue';
            } else if (globals.currentShuriken === 'blue') {
                globals.currentShuriken = 'black';
            }
        }

        //shoots shuriken
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {

            if (globals.currentShuriken === 'black') {
                if (this.shurikenBlack.getLength() < this.shurikenBlack.maxSize) {
                    let newShuriken = this.shurikenBlack.create(this.player.body.x+4, this.player.body.y+14, 'shuriken', 0).setOrigin(0,0);
                    this.shurikenBlackGUI.getLast(true).destroy();
                    if (this.player.body.velocity.x > 0) {
                        newShuriken.setVelocityX(150*globals.speed);
                        newShuriken.play('shuriken', true);
                    } else if (this.player.body.velocity.x < 0) {
                        newShuriken.setVelocityX(-150*globals.speed);
                        newShuriken.play('shuriken', true);
                    } else if (this.player.body.velocity.y > 0) {
                        newShuriken.setVelocityY(150*globals.speed);
                        newShuriken.play('shuriken', true);
                    } else if (this.player.body.velocity.y < 0) {
                        newShuriken.setVelocityY(-150*globals.speed);
                        newShuriken.play('shuriken', true);
                    } else {
                        newShuriken.setVelocityY(150*globals.speed);
                        newShuriken.play('shuriken', true);
                    }
                }
            } else if (globals.currentShuriken === 'blue') {
                if (this.shurikenBlue.getLength() < this.shurikenBlue.maxSize) {
                    let newShuriken = this.shurikenBlue.create(this.player.body.x+4, this.player.body.y+14, 'shurikenBlue', 0).setOrigin(0,0);
                    this.shurikenBlueGUI.getLast(true).destroy();
                    if (this.player.body.velocity.x > 0) {
                        newShuriken.setVelocityX(200*globals.speed);
                        newShuriken.play('shurikenBlue', true);
                    } else if (this.player.body.velocity.x < 0) {
                        newShuriken.setVelocityX(-200*globals.speed);
                        newShuriken.play('shurikenBlue', true);
                    } else if (this.player.body.velocity.y > 0) {
                        newShuriken.setVelocityY(200*globals.speed);
                        newShuriken.play('shurikenBlue', true);
                    } else if (this.player.body.velocity.y < 0) {
                        newShuriken.setVelocityY(-200*globals.speed);
                        newShuriken.play('shurikenBlue', true);
                    } else {
                        newShuriken.setVelocityY(200*globals.speed);
                        newShuriken.play('shurikenBlue', true);
                    }
                }
            }
            
        }

        //removes shuriken
        this.shurikenBlack.getChildren().forEach(shuriken => {
    
            shuriken.body.setSize(12,12);
    
            shuriken.body.setCollideWorldBounds(false);
            if (shuriken.y > (this.player.body.y + 350 )) {
                shuriken.destroy();
                this.shurikenBlackGUI.create(15*(this.shurikenBlack.maxSize-this.shurikenBlack.getLength()-1)+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.y < (this.player.body.y - 250)) {
                shuriken.destroy();
                this.shurikenBlackGUI.create(15*(this.shurikenBlack.maxSize-this.shurikenBlack.getLength()-1)+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.x > (this.player.body.x + 350)) {
                shuriken.destroy();
                this.shurikenBlackGUI.create(15*(this.shurikenBlack.maxSize-this.shurikenBlack.getLength()-1)+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.x < (this.player.body.x + -350)) {
                shuriken.destroy();
                this.shurikenBlackGUI.create(15*(this.shurikenBlack.maxSize-this.shurikenBlack.getLength()-1)+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            }
        });
        this.shurikenBlue.getChildren().forEach(shuriken => {
    
            shuriken.body.setSize(12,12);
    
            shuriken.body.setCollideWorldBounds(false);
            if (shuriken.y > (this.player.body.y + 350 )) {
                shuriken.destroy();
                this.shurikenBlueGUI.create(15*(this.shurikenBlue.maxSize-this.shurikenBlue.getLength()-1)+10, 110, 'shurikenBlue').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.y < (this.player.body.y - 250)) {
                shuriken.destroy();
                this.shurikenBlueGUI.create(15*(this.shurikenBlue.maxSize-this.shurikenBlue.getLength()-1)+10, 110, 'shurikenBlue').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.x > (this.player.body.x + 350)) {
                shuriken.destroy();
                this.shurikenBlueGUI.create(15*(this.shurikenBlue.maxSize-this.shurikenBlue.getLength()-1)+10, 110, 'shurikenBlue').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.x < (this.player.body.x + -350)) {
                shuriken.destroy();
                this.shurikenBlueGUI.create(15*(this.shurikenBlue.maxSize-this.shurikenBlue.getLength()-1)+10, 110, 'shurikenBlue').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            }
        });
    }   
}