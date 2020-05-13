const gameStateTutorial = {
    counter: 0,
    active: true,
    score: 0,
    startLoopPos: 1900,
    positionReached: false
};

class TutorialScene extends Phaser.Scene {

    constructor() {
        super("Tutorial");
    }

    init () {

    }

    preload() {

        //loads all spritesheets
        this.load.spritesheet('player', 'sprites/player_body.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeleton', 'sprites/skeleton_body.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('playerHurt', 'sprites/player_hurt.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonCast', 'sprites/skeleton_cast.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('fireball', 'sprites/fireball.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shuriken', 'sprites/throwingstars.png', {frameWidth: 12, frameHeight: 12});
        this.load.spritesheet('hearts', 'sprites/hearts.png', {frameWidth: 121, frameHeight: 38})

        //loadsSingleImages
        this.load.image('singleHeart', 'sprites/single_heart.png');
        this.load.image('dialog', 'images/dialog_box.png');

        //loads tilemap
        this.load.image('terrain', 'maps/assets/overworld.png');
        this.load.tilemapTiledJSON('startingMap', 'maps/starting_map.json');

        //loads tilemap (for first level)
        this.load.tilemapTiledJSON('firstLevel', 'maps/level1.json');

        //loads player with shoes (for second level)
        this.load.spritesheet('playerShoes', 'sprites/player_shoes.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('playerShoesHurt', 'sprites/player_hurt_shoes.png', {frameWidth: 64, frameHeight: 64});

        //loads tilemap (for second level)
        this.load.tilemapTiledJSON('secondLevel', 'maps/level2.json');

    }

    create() {

        //creates player animations
        this.anims.create({
            key: 'walkDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('player', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'walkUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('player', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'walkLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('player', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'walkRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('player', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'idle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('player', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'playerHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'shuriken',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shuriken', {start: 0, end: 2})
        });
        this.anims.create({
            key: 'playerIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('player', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'playerIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('player', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'playerIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('player', {start: 0, end: 1})
        });

        //creates skeleton animations
        this.anims.create({
            key: 'skeletonLeft',
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames('skeleton', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'skeletonRight',
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames('skeleton', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'skeletonCastRight',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('skeletonCast', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'skeletonCastLeft',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('skeletonCast', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'fireballLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('fireball', {start: 0, end: 7})
        });
        this.anims.create({
            key: 'fireballRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('fireball', {start: 32, end: 39})
        });

        //setup
        this.physics.world.setBounds(0, 0, 1280, 1280);
        gameStateTutorial.score = 0;
        gameStateTutorial.lives = 2;
        gameStateTutorial.currentLevel = 1;
        gameStateTutorial.skeletonsLeft = 1;
        gameStateTutorial.scoreText = this.add.text(10, 10, ``, { fontSize: '20px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' });
        gameStateTutorial.scoreText.setScrollFactor(0);
        gameStateTutorial.cursors = this.input.keyboard.createCursorKeys();

        //adds GUI
        gameStateTutorial.hearts = this.add.sprite(70, 470, 'hearts', 0);
        gameStateTutorial.hearts.setScrollFactor(0);

        //adds player
        gameStateTutorial.player = this.physics.add.sprite(150, 140, 'player', 18).setScale(.7);
        
        //player camera and worldbounds setup
        this.cameras.main.setBounds(0,0,1280,1280);
        this.cameras.main.startFollow(gameStateTutorial.player, 480, 320);
        gameStateTutorial.player.setCollideWorldBounds(true);
        
        //adds different physics groups
        gameStateTutorial.shuriken = this.physics.add.group();
        gameStateTutorial.shuriken.maxSize = 0;
        gameStateTutorial.skeletons = this.physics.add.group();
        gameStateTutorial.skeletonAttack = this.physics.add.group();
        gameStateTutorial.singleHearts = this.physics.add.group();
        gameStateTutorial.singleHearts.create(945, 69, 'singleHeart', 0).setScale(.8);
        gameStateTutorial.shurikenDrop = this.physics.add.group();
        
        //fixes player bounding box error
        this.time.addEvent({
            delay: 1000,
            callback: delayDone,
            callbackScope: this,
            loop: false
        });
        function delayDone () {
            gameStateTutorial.player.body.setSize(33, 50);
            gameStateTutorial.player.body.setOffset(16, 12);
        }

        //adds dialogue boxes
        gameStateTutorial.textImage1 = this.add.image(422, 80, 'dialog').setScale(.6);
        gameStateTutorial.text1 = this.add.text(320, 60, "Welcome to my game!!\nYou can walk with the arrow keys\nTo shoot a shuriken, press the Space bar\nDoesn't work? Try picking up this one!", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' })
        const startingShuriken = gameStateTutorial.shurikenDrop.create(423, 147, 'shuriken', 0).setScale(2);
        startingShuriken.play('shuriken');
        
        gameStateTutorial.textImage2 = this.add.image(950, 143, 'dialog').setScale(.7);
        gameStateTutorial.text2 = this.add.text(830, 122, "You can hide behind rocks. Why? Wait to find out!\nYou may have noticed the hearts on the bottom left.\nThe red hearts are your HP.\nPick up the heart and see what happens.", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' })
        this.add.text
        
        gameStateTutorial.textImage3 = this.add.image(820, 475, 'dialog').setScale(.6);
        gameStateTutorial.text3 = this.add.text(714, 455, "This is a skeleton.They have taken over the land!\nDon't get too close, you will lose a heart.\nTry shooting it with your shuriken...\nSometimes they drop valuable items.", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' })
        gameStateTutorial.skeletons.create(792, 408, 'skeleton', 18).setScale(.55);
        
        //sets collisions
        this.physics.add.collider(gameStateTutorial.player, gameStateTutorial.skeletons, (player, skeleton) => {
            gameStateTutorial.lives -= 1;
            skeleton.destroy();
            gameStateTutorial.skeletonsLeft--;
        });
        
        this.physics.add.collider(gameStateTutorial.player, gameStateTutorial.skeletonAttack, (player, fireball) => {
            gameStateTutorial.lives -= 1;
            fireball.destroy();
        });
        
        this.physics.add.collider(gameStateTutorial.skeletons, gameStateTutorial.shuriken, (skeleton, shuriken) => {
            skeleton.destroy();
            shuriken.destroy();
            
            gameStateTutorial.score += 10;
            
            const randomNumber = Math.floor(Math.random() * 10);
            if (gameStateTutorial.lives < 3) {
                if (randomNumber === 3 || randomNumber === 4) {
                    gameStateTutorial.singleHearts.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2 || randomNumber === 1) {
                const newDrop = gameStateTutorial.shurikenDrop.create(skeleton.x, skeleton.y, 'shuriken', 0).setScale(1.4);
                newDrop.play('shuriken');
            }
            
            gameStateTutorial.skeletonsLeft--;
        });

        this.physics.add.collider(gameStateTutorial.player, gameStateTutorial.singleHearts, (player, singleHeart) => {
            singleHeart.destroy();
            gameStateTutorial.lives++;
        });
        
        this.physics.add.collider(gameStateTutorial.player, gameStateTutorial.shurikenDrop, (player, shuriken) => {
            gameStateTutorial.shuriken.maxSize++;
            shuriken.destroy();
        });

        //adds map to screen and sets map collisions
        gameStateTutorial.startingMap = this.add.tilemap('startingMap', 16, 16, 60, 40);
        let terrain = gameStateTutorial.startingMap.addTilesetImage('overworld', 'terrain');
        
        gameStateTutorial.botLayerStartingMap = gameStateTutorial.startingMap.createStaticLayer('bottom', [terrain], 0, 0).setDepth(-1);
        gameStateTutorial.topLayerStartingMap = gameStateTutorial.startingMap.createStaticLayer('top', [terrain], 0, 0).setDepth(-1);
        
        this.physics.add.collider(gameStateTutorial.player, gameStateTutorial.topLayerStartingMap);
        this.physics.add.collider(gameStateTutorial.skeletons, gameStateTutorial.topLayerStartingMap);
        this.physics.add.collider(gameStateTutorial.skeletonAttack, gameStateTutorial.topLayerStartingMap, (fireball) => {
            fireball.destroy();
        });
        gameStateTutorial.topLayerStartingMap.setCollisionByProperty({collision: true});

    }

    update() {

        //makes player walk
        if (gameStateTutorial.active === true) {
            if (gameStateTutorial.cursors.down.isDown) {
                gameStateTutorial.player.play('walkDown', true);
                gameStateTutorial.player.setVelocityY(80);
                gameStateTutorial.player.setVelocityX(0);
            } else if (gameStateTutorial.cursors.up.isDown) {
                gameStateTutorial.player.setVelocityY(-80);
                gameStateTutorial.player.play('walkUp', true);
                gameStateTutorial.player.setVelocityX(0);
            } 
            
            if (gameStateTutorial.cursors.left.isDown) {
                gameStateTutorial.player.setVelocityX(-80);
                gameStateTutorial.player.setVelocityY(0);
                gameStateTutorial.player.play('walkLeft', true);
            } else if (gameStateTutorial.cursors.right.isDown) {
                gameStateTutorial.player.setVelocityX(80);
                gameStateTutorial.player.setVelocityY(0);
                gameStateTutorial.player.play('walkRight', true);
            } 
        }

        //player idle when not moving
        if (gameStateTutorial.cursors.left.isUp) {
            if (gameStateTutorial.player.body.velocity.x < 0) {
                gameStateTutorial.player.setVelocityX(-0.001);
                gameStateTutorial.player.play('playerIdleLeft', true);
                gameStateTutorial.player.setTexture('player', 9);
            }
        }
        if (gameStateTutorial.cursors.right.isUp) {
            if (gameStateTutorial.player.body.velocity.x > 0) {
                gameStateTutorial.player.setVelocityX(0.001);
                gameStateTutorial.player.play('playerIdleRight', true);
                gameStateTutorial.player.setTexture('player', 27);
            }
        }
        if (gameStateTutorial.cursors.up.isUp) {
            if (gameStateTutorial.player.body.velocity.y < 0) {
                gameStateTutorial.player.setVelocityY(-0.001);
                gameStateTutorial.player.play('playerIdleUp', true);
                gameStateTutorial.player.setTexture('player', 1);
            }
        }
        if (gameStateTutorial.cursors.down.isUp) {
            if (gameStateTutorial.player.body.velocity.y > 0) {
                gameStateTutorial.player.setVelocityY(0);
                gameStateTutorial.player.play('idle', true);
            }
        }

        
        //shoots shuriken
        if (gameStateTutorial.active) {
            if (Phaser.Input.Keyboard.JustDown(gameStateTutorial.cursors.space) && gameStateTutorial.shuriken.getLength() < gameStateTutorial.shuriken.maxSize) {
                
                let newShuriken = gameStateTutorial.shuriken.create(gameStateTutorial.player.x, gameStateTutorial.player.y, 'shuriken', 0);
                if (gameStateTutorial.player.body.velocity.x > 0) {
                    newShuriken.setVelocityX(150);
                    newShuriken.play('shuriken', true);
                } else if (gameStateTutorial.player.body.velocity.x < 0) {
                    newShuriken.setVelocityX(-150);
                    newShuriken.play('shuriken', true);
                } else if (gameStateTutorial.player.body.velocity.y > 0) {
                    newShuriken.setVelocityY(150);
                    newShuriken.play('shuriken', true);
                } else if (gameStateTutorial.player.body.velocity.y < 0) {
                    newShuriken.setVelocityY(-150);
                    newShuriken.play('shuriken', true);
                } else {
                    newShuriken.setVelocityY(150);
                    newShuriken.play('shuriken', true);
                }
            }
        }
    
        //destroys shuriken when out of camera
        gameStateTutorial.shuriken.getChildren().forEach(shuriken => {
    
            shuriken.body.setSize(12,12);
    
            shuriken.body.setCollideWorldBounds(false);
            if (shuriken.y > (gameStateTutorial.player.body.y + 350 )) {
                shuriken.destroy();
            } else if (shuriken.y < (gameStateTutorial.player.body.y - 250)) {
                shuriken.destroy();
            } else if (shuriken.x > (gameStateTutorial.player.body.x + 350)) {
                shuriken.destroy();
            } else if (shuriken.x < (gameStateTutorial.player.body.x + -350)) {
                shuriken.destroy();
            }
    
            if (gameStateTutorial.active === false) {
                shuriken.destroy();
            }
        })
        
        //destroys hearts and fireballs on game over 
        gameStateTutorial.singleHearts.getChildren().forEach(heart => {
            if (gameStateTutorial.active === false) {
                heart.destroy();
            }
        })
        gameStateTutorial.skeletonAttack.getChildren().forEach(fireball => {
            fireball.body.setSize(58, 20);
            fireball.body.setOffset(0,20);
    
            if (gameStateTutorial.active === false) {
                fireball.destroy();
            }
        });
        
        //sets skeleton velocities, spawnpoints and animations, destroys on game over
        gameStateTutorial.skeletons.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            if (gameStateTutorial.positionReached) {
                this.physics.moveToObject(skeleton, gameStateTutorial.player, 10)
    
                if (skeleton.body.velocity.x > 0) {
                    skeleton.play('skeletonRight', true);
                } else if (skeleton.body.velocity.x < 0) {
                    skeleton.play('skeletonLeft', true);
                }
    
                let randNum = Math.floor(Math.random() * 1000)
                if (randNum === 1) {
                    if (skeleton.body.velocity.x > 0) {
                        skeleton.play('skeletonCastRight', true);
                        const newFireBall = gameStateTutorial.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.3).play('fireballRight', true);
                        this.physics.moveToObject(newFireBall, gameStateTutorial.player, 70);
                        newFireBall.play('fireballRight', true);
                    } else if (skeleton.body.velocity.x < 0) {
                        skeleton.play('skeletonCastLeft', true);
                        const newFireBall = gameStateTutorial.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.3).play('fireballLeft', true);
                        this.physics.moveToObject(newFireBall, gameStateTutorial.player, 70);
                        newFireBall.play('fireballLeft', true);
                    }
                }
            }
            if (gameStateTutorial.active === false) {
                skeleton.destroy();
            }
        });
    
        //what to do when level is won
        if (gameStateTutorial.skeletonsLeft === 0 && gameStateTutorial.currentLevel === 1) {
            this.physics.pause();
            gameStateTutorial.skeletons.getChildren().forEach(skeleton => {
                skeleton.destroy();
            });
            gameStateTutorial.singleHearts.getChildren().forEach(heart => {
                heart.destroy();
            });
            gameStateTutorial.shuriken.getChildren().forEach(shuriken => {
                shuriken.destroy();
            });
            gameStateTutorial.skeletonAttack.getChildren().forEach(fireball => {
                fireball.destroy();
            });
            gameStateTutorial.scoreText.setText('');
            const levelDialog = this.add.image(gameStateTutorial.player.body.x, gameStateTutorial.player.body.y -70, 'dialog').setScale(.6);
            const levelText = this.add.text(gameStateTutorial.player.body.x -100, gameStateTutorial.player.body.y -85, 'You cleared the tutorial!', { fontSize: '15px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            const levelText2 = this.add.text(gameStateTutorial.player.body.x -95, gameStateTutorial.player.body.y -65, 'Click on the screen to start your first level', { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            gameStateTutorial.textImage1.destroy();
            gameStateTutorial.textImage2.destroy();
            gameStateTutorial.textImage3.destroy();
            gameStateTutorial.text1.destroy();
            gameStateTutorial.text2.destroy();
            gameStateTutorial.text3.destroy();
            this.input.on('pointerup', () => {
                gameStateTutorial.active = true;
                this.physics.resume();
                this.scene.start("Level1");
            });
        }
        
        //what to do when level is lost
        if (gameStateTutorial.lives === 3) {
            gameStateTutorial.hearts.setTexture('hearts', 0);
        } else if (gameStateTutorial.lives === 2) {
            gameStateTutorial.hearts.setTexture('hearts', 1);
        } else if (gameStateTutorial.lives === 1) {
            gameStateTutorial.hearts.setTexture('hearts', 2);
        } else if (gameStateTutorial.lives === 0 && gameStateTutorial.active) {
            const levelDialog = this.add.image(gameStateTutorial.player.body.x, gameStateTutorial.player.body.y -70, 'dialog').setScale(.6);
            const levelText = this.add.text(gameStateTutorial.player.body.x -100, gameStateTutorial.player.body.y -85, 'You lost!', { fontSize: '18px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            const levelText2 = this.add.text(gameStateTutorial.player.body.x -110, gameStateTutorial.player.body.y -65, 'Click on the screen to restart the game', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            gameStateTutorial.hearts.setTexture('hearts', 3);
            this.physics.pause();
            gameStateTutorial.skeletonGenLoop.destroy();
            gameStateTutorial.scoreTextEvent.destroy();
            gameStateTutorial.player.play('playerHurt', true);
            gameStateTutorial.active = false;
            gameStateTutorial.positionReached = false;
        }

    }

}