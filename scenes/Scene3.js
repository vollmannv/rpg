const gameState3 = {
    counter: 0,
    active: true,
    startLoopPos: 250,
    positionReached: false,
    pauseOn: false,
    skeletonLives: []
}

class Scene3 extends Phaser.Scene {
    constructor () {
        super("Level3");
    }

    init () {

    }

    preload () {

    }

    create () {

        //creates player animations
        this.anims.create({
            key: 'walkDownShoesPants',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoesPants', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'walkUpShoesPants',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoesPants', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'walkLeftShoesPants',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoesPants', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'walkRightShoesPants',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoesPants', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'idleShoesPants',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerShoesPants', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'playerShoesPantsHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerShoesPantsHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'shuriken',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shuriken', {start: 0, end: 2})
        });
        this.anims.create({
            key: 'playerShoesPantsIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerShoesPants', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'playerShoesPantsIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerShoesPants', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'playerShoesPantsIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerShoesPants', {start: 0, end: 1})
        });

        //creates skeleton animations
        this.anims.create({
            key: 'skeletonLeft',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('skeleton', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'skeletonRight',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('skeleton', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'skeletonUp',
            repeat: -1,
            frameRate: 9,
            frames: this.anims.generateFrameNames('skeleton', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'skeletonDown',
            repeat: -1,
            frameRate: 9,
            frames: this.anims.generateFrameNames('skeleton', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'skeletonArmorLeft',
            repeat: -1,
            frameRate: 3,
            frames: this.anims.generateFrameNames('skeletonArmor', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'skeletonArmorRight',
            repeat: -1,
            frameRate: 3,
            frames: this.anims.generateFrameNames('skeletonArmor', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'skeletonArmorUp',
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames('skeletonArmor', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'skeletonArmorDown',
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames('skeletonArmor', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'fireballDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('fireball', {start: 48, end: 55})
        });
        this.anims.create({
            key: 'fireballUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('fireball', {start: 16, end: 23})
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

        //adds player
        gameState3.player = this.physics.add.sprite(200, 180, 'playerShoesPants', 18).setScale(.7);

        //setup
        this.physics.world.setBounds(0, 0, 1280, 1280);
        gameState3.lives = 4;
        gameState3.currentLevel = 3;
        gameState3.skeletonsLeft = 35;
        gameState3.cursors = this.input.keyboard.createCursorKeys();
        gameState3.score = gameState.score;

        //player camera and worldbounds setup
        this.cameras.main.setBounds(0,0,1280,1280)
        this.cameras.main.startFollow(gameState3.player, 480, 320);
        gameState3.player.setCollideWorldBounds(true);

        //adds different physics groups
        gameState3.shuriken = this.physics.add.group();
        gameState3.shuriken.maxSize = 2;
        gameState3.skeletons = this.physics.add.group();
        gameState3.skeletons.maxSize = 20;
        gameState3.skeletonsArmor = this.physics.add.group();
        gameState3.skeletonsArmor.maxSize = 4;
        gameState3.skeletonAttack = this.physics.add.group();
        gameState3.singleHearts = this.physics.add.group();
        gameState3.shurikenDrop = this.physics.add.group();
        gameState3.pauseGroup = this.add.group();

        //adds GUI
        gameState3.hearts = this.add.sprite(70, 470, 'hearts', 0);
        gameState3.hearts.setScrollFactor(0);
        gameState3.extraHeart = this.add.sprite(154, 471, 'extraHeart', 0);
        gameState3.extraHeart.setScrollFactor(0);
        gameState3.scoreText = this.add.text(10, 10, ``, { fontSize: '20px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' });
        gameState3.scoreText.setScrollFactor(0);


        //fixes player bounding box error
        this.time.addEvent({
            delay: 1000,
            callback: delayDone,
            callbackScope: this,
            loop: false
        });
        function delayDone () {
            gameState3.player.body.setSize(33, 50);
            gameState3.player.body.setOffset(16, 12);
        }

        //generates skeletons
        function skeletonGen() {
            if (gameState3.positionReached && gameState3.pauseOn === false) {
                const xCoord = Math.random() * 1280;
                const yCoord = Math.random() * 1280;
                const offsetX = Math.abs(xCoord - gameState3.player.body.x);
                const offsetY = Math.abs(yCoord - gameState3.player.body.y);    
                
                if (offsetX > 70 && offsetY > 70 && gameState3.skeletons.getLength() < gameState3.skeletons.maxSize) {
                    gameState3.skeletons.create(xCoord, yCoord, 'skeleton', 18).setScale(.55);
                }
            }
        }   
        gameState3.skeletonGenLoop = this.time.addEvent({
            delay: 2000,
            callback: skeletonGen,
            callbackScope: this,
            loop: true
        });
        function skeletonArmorGen() {
            if (gameState3.positionReached && gameState3.pauseOn === false) {
                const xCoord = Math.random() * 1280;
                const yCoord = Math.random() * 1280;
                const offsetX = Math.abs(xCoord - gameState3.player.body.x);
                const offsetY = Math.abs(yCoord - gameState3.player.body.y);    
                
                if (offsetX > 70 && offsetY > 70 && gameState3.skeletonsArmor.getLength() < gameState3.skeletonsArmor.maxSize) {
                    let newSkeleton = gameState3.skeletonsArmor.create(xCoord, yCoord, 'skeletonArmor', 18).setScale(.8);
                    newSkeleton.setData('health', 2);
                }
            }
        }   
        gameState3.skeletonArmorGenLoop = this.time.addEvent({
            delay: 15000,
            callback: skeletonArmorGen,
            callbackScope: this,
            loop: true
        });

        //updates score every second
        gameState3.scoreTextEvent = this.time.addEvent({
            delay: 1000,
            callback: updateScore,
            callbackScope: this,
            loop: true
        });
        function updateScore() {
            if (gameState3.positionReached && gameState3.pauseOn === false) {
                gameState3.score++;
                gameState3.scoreText.setText(`Score: ${gameState3.score}\nLevel: ${gameState3.currentLevel}\nSkeletons left: ${gameState3.skeletonsLeft}`);
            }
        }

        //sets collisions
        this.physics.add.collider(gameState3.player, gameState3.skeletons, (player, skeleton) => {
            gameState3.lives -= 1;
            skeleton.destroy();
            gameState3.skeletonsLeft--;
            updateScore();
        });
        this.physics.add.collider(gameState3.player, gameState3.skeletonsArmor, (player, skeleton) => {
            gameState3.lives -= 2;
            skeleton.destroy();
            gameState3.skeletonsArmorLeft--;
            updateScore();
        });
        
        this.physics.add.collider(gameState3.player, gameState3.skeletonAttack, (player, fireball) => {
            gameState3.lives -= 1;
            fireball.destroy();
        });
        
        this.physics.add.collider(gameState3.skeletons, gameState3.shuriken, (skeleton, shuriken) => {
            skeleton.destroy();
            shuriken.destroy();
            
            gameState3.score += 10;
            
            const randomNumber = Math.floor(Math.random() * 10);
            if (gameState3.lives < 3) {
                if (randomNumber === 3 || randomNumber === 4) {
                    gameState3.singleHearts.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2 || randomNumber === 1) {
                const newDrop = gameState3.shurikenDrop.create(skeleton.x, skeleton.y, 'shuriken', 0).setScale(1.4);
                newDrop.play('shuriken');
            }
            
            gameState3.skeletonsLeft--;
            updateScore();
        });

        this.physics.add.collider(gameState3.skeletonsArmor, gameState3.shuriken, (skeleton, shuriken) => {
            
            let health = skeleton.getData('health');
            health--;
            skeleton.setData('health', health);
            if (health === 0) {
                skeleton.destroy();
                gameState3.score += 50;
                    
                const randomNumber = Math.floor(Math.random() * 10);
                if (gameState3.lives < 4) {
                    if (randomNumber === 3 || randomNumber === 4) {
                        gameState3.singleHearts.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                    }
                }
                if (randomNumber === 2 || randomNumber === 1) {
                    const newDrop = gameState3.shurikenDrop.create(skeleton.x, skeleton.y, 'shuriken', 0).setScale(1.4);
                    newDrop.play('shuriken');
                }
                    
                gameState3.skeletonsLeft--;
                updateScore();
            }
            shuriken.destroy();
        });

        this.physics.add.collider(gameState3.player, gameState3.singleHearts, (player, singleHeart) => {
            singleHeart.destroy();
            gameState3.lives++;
        });
        
        this.physics.add.collider(gameState3.player, gameState3.shurikenDrop, (player, shuriken) => {
            gameState3.shuriken.maxSize++;
            shuriken.destroy();
        });

        //adds map to screen and sets map collisions
        gameState3.thirdMap = this.add.tilemap('thirdLevel', 16, 16, 60, 40);
        let terrain = gameState3.thirdMap.addTilesetImage('overworld', 'terrain');
        
        gameState3.botLayerThirdMap = gameState3.thirdMap.createStaticLayer('bottom', [terrain], 0, 0).setDepth(-1);
        gameState3.topLayerThirdMap = gameState3.thirdMap.createStaticLayer('top', [terrain], 0, 0).setDepth(-1);
        
        this.physics.add.collider(gameState3.player, gameState3.topLayerThirdMap);
        this.physics.add.collider(gameState3.skeletons, gameState3.topLayerThirdMap);
        this.physics.add.collider(gameState3.skeletonAttack, gameState3.topLayerThirdMap, (fireball) => {
            fireball.destroy();
        });
        gameState3.topLayerThirdMap.setCollisionByProperty({collision: true});

        //restarts the game when lost and click on screen
        this.input.on('pointerup', () => {
            if (gameState.active === false) {
                this.scene.start("Level1");
                gameState.active = true;
            }
        });

        //adds dialogue boxes
        gameState3.levelDialogueImage = this.add.image(gameState3.player.body.x, gameState3.player.body.y -70, 'dialog').setScale(.6);
        gameState3.levelDialogueText = this.add.text(gameState3.player.body.x - 105, gameState3.player.body.y -90, "Welcome to the third Level!!\nThis level is going to be way harder, so you get\nan additional heart and some awesome pants.\nThere will be a new type of enemy... Good luck!", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' });

    }

    update () {

        //adds escape input
        gameState3.pause = this.input.keyboard.addKey(27);
        gameState3.pause.on('down', () => {
            this.physics.pause();
            gameState3.pauseOn = true;
            gameState3.pauseScreen = this.add.image(0,40, 'pauseMenu');
            gameState3.pauseScreen.setOrigin(0,0);
            gameState3.backButtonPause = this.add.image(570, 440, 'backButton').setScale(.3);
            gameState3.backButtonPause.setOrigin(0,0);
            gameState3.pauseGroup.add(gameState3.pauseScreen);
            gameState3.pauseGroup.add(gameState3.backButtonPause);
            gameState3.pauseGroup.getChildren().forEach(child => {
                child.setScrollFactor(0);
            });
            gameState3.pauseScreen.setInteractive();
            gameState3.backButtonPause.setInteractive();
            gameState3.pauseScreen.on('pointerup', () => {
                if (gameState3.pauseOn) {
                    this.scene.start('Menu');
                }
            });
        });
        if (gameState3.pauseOn) {
            gameState3.backButtonPause.on('pointerup', () => {
                gameState3.pauseGroup.clear(true);
                gameState3.pauseOn = false;
                this.physics.resume();
            });
        }

        //starts skeletongen when certain position is reached
        if (gameState3.player.body.y > gameState3.startLoopPos) {
            gameState3.positionReached = true;
        }

        //removes level text on position reached
        if (gameState3.positionReached) {
            gameState3.levelDialogueImage.destroy();
            gameState3.levelDialogueText.destroy();
        }

        //makes player walk
        if (gameState3.active === true) {
            if (gameState3.cursors.down.isDown) {
                gameState3.player.play('walkDownShoesPants', true);
                gameState3.player.setVelocityY(110);
                gameState3.player.setVelocityX(0);
            } else if (gameState3.cursors.up.isDown) {
                gameState3.player.setVelocityY(-110);
                gameState3.player.play('walkUpShoesPants', true);
                gameState3.player.setVelocityX(0);
            } 
            
            if (gameState3.cursors.left.isDown) {
                gameState3.player.setVelocityX(-110);
                gameState3.player.setVelocityY(0);
                gameState3.player.play('walkLeftShoesPants', true);
            } else if (gameState3.cursors.right.isDown) {
                gameState3.player.setVelocityX(110);
                gameState3.player.setVelocityY(0);
                gameState3.player.play('walkRightShoesPants', true);
            } 
        }

        //player idle when not moving
        if (gameState3.cursors.left.isUp) {
            if (gameState3.player.body.velocity.x < 0) {
                gameState3.player.setVelocityX(-0.001);
                gameState3.player.play('playerShoesPantsIdleLeft', true);
                gameState3.player.setTexture('playerShoesPants', 9);
            }
        }
        if (gameState3.cursors.right.isUp) {
            if (gameState3.player.body.velocity.x > 0) {
                gameState3.player.setVelocityX(0.001);
                gameState3.player.play('playerShoesPantsIdleRight', true);
                gameState3.player.setTexture('playerShoesPants', 27);
            }
        }
        if (gameState3.cursors.up.isUp) {
            if (gameState3.player.body.velocity.y < 0) {
                gameState3.player.setVelocityY(-0.001);
                gameState3.player.play('playerShoesPantsIdleUp', true);
                gameState3.player.setTexture('playerShoesPants', 1);
            }
        }
        if (gameState3.cursors.down.isUp) {
            if (gameState3.player.body.velocity.y > 0) {
                gameState3.player.setVelocityY(0);
                gameState3.player.play('idleShoesPants', true);
            }
        }

        //shoots shuriken
        if (gameState3.active) {
            if (Phaser.Input.Keyboard.JustDown(gameState3.cursors.space) && gameState3.shuriken.getLength() < gameState3.shuriken.maxSize) {
                
                let newShuriken = gameState3.shuriken.create(gameState3.player.x, gameState3.player.y, 'shuriken', 0);
                if (gameState3.player.body.velocity.x > 0) {
                    newShuriken.setVelocityX(150);
                    newShuriken.play('shuriken', true);
                } else if (gameState3.player.body.velocity.x < 0) {
                    newShuriken.setVelocityX(-150);
                    newShuriken.play('shuriken', true);
                } else if (gameState3.player.body.velocity.y > 0) {
                    newShuriken.setVelocityY(150);
                    newShuriken.play('shuriken', true);
                } else if (gameState3.player.body.velocity.y < 0) {
                    newShuriken.setVelocityY(-150);
                    newShuriken.play('shuriken', true);
                } else {
                    newShuriken.setVelocityY(150);
                    newShuriken.play('shuriken', true);
                }
            }
        }
    
        //destroys shuriken when out of camera
        gameState3.shuriken.getChildren().forEach(shuriken => {
    
            shuriken.body.setSize(12,12);
    
            shuriken.body.setCollideWorldBounds(false);
            if (shuriken.y > (gameState3.player.body.y + 350 )) {
                shuriken.destroy();
            } else if (shuriken.y < (gameState3.player.body.y - 250)) {
                shuriken.destroy();
            } else if (shuriken.x > (gameState3.player.body.x + 350)) {
                shuriken.destroy();
            } else if (shuriken.x < (gameState3.player.body.x + -350)) {
                shuriken.destroy();
            }
    
            if (gameState3.active === false) {
                shuriken.destroy();
            }
        })
        
        //destroys hearts and fireballs on game over 
        gameState3.singleHearts.getChildren().forEach(heart => {
            if (gameState3.active === false) {
                heart.destroy();
            }
        })
        gameState3.skeletonAttack.getChildren().forEach(fireball => {
            if (fireball.body.velocity.x > 0) {
                fireball.body.setSize(58, 20);
                fireball.body.setOffset(0,20);
            } else {
                fireball.body.setSize(20, 58);
                fireball.body.setOffset(20,5);
            }
    
            if (gameState3.active === false) {
                fireball.destroy();
            }
        });

        //sets skeleton velocities, spawnpoints and animations, destroys on game over
        gameState3.skeletons.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            if (gameState3.positionReached) {
                this.physics.moveToObject(skeleton, gameState3.player, 15);
    
                if (skeleton.body.velocity.x > 0) {
                    if (Math.abs(skeleton.body.velocity.x) > Math.abs(skeleton.body.velocity.y)) {
                        skeleton.play('skeletonRight', true);
                    } else {
                        if (skeleton.body.velocity.y > 0) {
                            skeleton.play('skeletonDown', true);
                        } else {
                            skeleton.play('skeletonUp', true);
                        }
                    }
                } else if (skeleton.body.velocity.x < 0) {
                    if (Math.abs(skeleton.body.velocity.x) > Math.abs(skeleton.body.velocity.y)) {
                        skeleton.play('skeletonLeft', true);
                    } else {
                        if(skeleton.body.velocity.y > 0) {
                            skeleton.play('skeletonDown', true);
                        } else {
                            skeleton.play('skeletonUp', true);
                        }
                    }
                }
    
                let randNum = Math.floor(Math.random() * 1000)
                if (randNum === 1) {
                    if (Math.abs(skeleton.body.velocity.x) > Math.abs(skeleton.body.velocity.y)) {
                        if (skeleton.body.velocity.x > 0) {
                            const newFireBall = gameState3.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.3);
                            newFireBall.setVelocityX(70);
                            newFireBall.play('fireballRight', true);
                        } else if (skeleton.body.velocity.x < 0) {
                            const newFireBall = gameState3.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.3);
                            newFireBall.setVelocityX(-70);
                            newFireBall.play('fireballLeft', true);
                        }
                    } else {
                        if (skeleton.body.velocity.y > 0) {
                            const newFireBall = gameState3.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.4);
                            newFireBall.setVelocityY(70);
                            newFireBall.play('fireballDown', true);
                        } else if (skeleton.body.velocity.y < 0) {
                            const newFireBall = gameState3.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.4);
                            newFireBall.setVelocityY(-70);
                            newFireBall.play('fireballUp', true);
                        } 
                    }
                }
            }
            if (gameState3.active === false) {
                skeleton.destroy();
            }
        });

        //skeletonArmorLoop
        gameState3.skeletonsArmor.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            if (gameState3.positionReached) {
                this.physics.moveToObject(skeleton, gameState3.player, 5);
    
                if (skeleton.body.velocity.x > 0) {
                    if (Math.abs(skeleton.body.velocity.x) > Math.abs(skeleton.body.velocity.y)) {
                        skeleton.play('skeletonArmorRight', true);
                    } else {
                        if (skeleton.body.velocity.y > 0) {
                            skeleton.play('skeletonArmorDown', true);
                        } else {
                            skeleton.play('skeletonArmorUp', true);
                        }
                    }
                } else if (skeleton.body.velocity.x < 0) {
                    if (Math.abs(skeleton.body.velocity.x) > Math.abs(skeleton.body.velocity.y)) {
                        skeleton.play('skeletonArmorLeft', true);
                    } else {
                        if(skeleton.body.velocity.y > 0) {
                            skeleton.play('skeletonArmorDown', true);
                        } else {
                            skeleton.play('skeletonArmorUp', true);
                        }
                    }
                }
    
                let randNum = Math.floor(Math.random() * 1000)
                if (randNum === 1) {
                    if (Math.abs(skeleton.body.velocity.x) > Math.abs(skeleton.body.velocity.y)) {
                        if (skeleton.body.velocity.x > 0) {
                            const newFireBall = gameState3.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.6);
                            newFireBall.setVelocityX(70);
                            newFireBall.play('fireballRight', true);
                        } else if (skeleton.body.velocity.x < 0) {
                            const newFireBall = gameState3.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.6);
                            newFireBall.setVelocityX(-70);
                            newFireBall.play('fireballLeft', true);
                        }
                    } else {
                        if (skeleton.body.velocity.y > 0) {
                            const newFireBall = gameState3.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.7);
                            newFireBall.setVelocityY(70);
                            newFireBall.play('fireballDown', true);
                        } else if (skeleton.body.velocity.y < 0) {
                            const newFireBall = gameState3.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.7);
                            newFireBall.setVelocityY(-70);
                            newFireBall.play('fireballUp', true);
                        } 
                    }
                }
            }
            if (gameState3.active === false) {
                skeleton.destroy();
            }
        });
    
        //what to do when level is won
        if (gameState3.skeletonsLeft === 0 && gameState3.currentLevel === 2) {
            this.physics.pause();
            gameState3.skeletons.getChildren().forEach(skeleton => {
                skeleton.destroy();
            });
            gameState3.singleHearts.getChildren().forEach(heart => {
                heart.destroy();
            });
            gameState3.shuriken.getChildren().forEach(shuriken => {
                shuriken.destroy();
            });
            gameState3.skeletonAttack.getChildren().forEach(fireball => {
                fireball.destroy();
            });
            gameState3.scoreText.setText('');
            const levelDialog = this.add.image(gameState3.player.body.x, gameState3.player.body.y -70, 'dialog').setScale(.6);
            const levelText = this.add.text(gameState3.player.body.x -100, gameState3.player.body.y -85, 'You cleared level 3!', { fontSize: '18px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            const levelText2 = this.add.text(gameState3.player.body.x -100, gameState3.player.body.y -65, 'Click on the screen to start level 4', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            this.input.on('pointerup', () => {
                gameState3.active = true;
                this.physics.resume();
                this.scene.start("Level4");
            });
        }
        
        //what to do when level is lost
        if (gameState3.lives === 4) {
            gameState3.hearts.setTexture('hearts', 0);
            gameState3.hearts.setY(470);
            gameState3.extraHeart.setTexture('extraHeart', 0);
        } else if (gameState3.lives === 3) {
            gameState3.hearts.setTexture('hearts', 0);
            gameState3.hearts.setY(470);
            gameState3.extraHeart.setTexture('extraHeart', 1);
        } else if (gameState3.lives === 2) {
            gameState3.hearts.setTexture('hearts', 1);
            gameState3.hearts.setY(471);
            gameState3.extraHeart.setTexture('extraHeart', 1);
        } else if (gameState3.lives === 1) {
            gameState3.hearts.setTexture('hearts', 2);
            gameState3.hearts.setY(472);
            gameState3.extraHeart.setTexture('extraHeart', 1);
        } else if (gameState3.lives === 0 && gameState3.active) {
            const levelDialog = this.add.image(gameState3.player.body.x, gameState3.player.body.y -70, 'dialog').setScale(.6);
            const levelText = this.add.text(gameState3.player.body.x -100, gameState3.player.body.y -85, 'You lost!', { fontSize: '18px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            const levelText2 = this.add.text(gameState3.player.body.x -110, gameState3.player.body.y -65, 'Click on the screen to restart the game', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            gameState3.hearts.setTexture('hearts', 3);
            gameState3.hearts.setY(472);
            gameState3.extraHeart.setTexture('extraHeart', 1);
            this.physics.pause();
            gameState3.skeletonGenLoop.destroy();
            gameState3.skeletonArmorGenLoop.destroy();
            gameState3.scoreTextEvent.destroy();
            gameState3.player.play('playerShoesPantsHurt', true);
            gameState3.active = false;
            gameState3.positionReached = false;
            this.input.on('pointerup', () => {
                this.physics.resume();
                this.scene.start("Level1");
            });
        }

    }

}