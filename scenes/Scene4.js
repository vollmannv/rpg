const gameState4 = {
    counter: 0,
    active: true,
    startLoopPos: 250,
    positionReached: false,
    pauseOn: false,
}

class Scene4 extends Phaser.Scene {

    constructor() {
        super("Level4");
    }

    init () {

    }

    preload () {

    }

    create () {

        //creates player animations
        this.anims.create({
            key: 'walkDownClothes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerClothes', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'walkUpClothes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerClothes', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'walkLeftClothes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerClothes', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'walkRightClothes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerClothes', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'idleClothes',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerClothes', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'playerClothesHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerClothesHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'shuriken',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shuriken', {start: 0, end: 2})
        });
        this.anims.create({
            key: 'playerClothesIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerClothes', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'playerClothes',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerClothes', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'playerClothesIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerClothes', {start: 0, end: 1})
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
            key: 'skeletonHatLeft',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNames('skeletonHat', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'skeletonHatRight',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNames('skeletonHat', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'skeletonHatUp',
            repeat: -1,
            frameRate: 15,
            frames: this.anims.generateFrameNames('skeletonHat', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'skeletonHatDown',
            repeat: -1,
            frameRate: 15,
            frames: this.anims.generateFrameNames('skeletonHat', {start: 19, end: 26})
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
        gameState4.player = this.physics.add.sprite(205, 185, 'playerClothes', 18).setScale(.7);

        //setup
        this.physics.world.setBounds(0, 0, 1280, 1280);
        gameState4.lives = 5;
        gameState4.currentLevel = 4;
        gameState4.skeletonsLeft = 65;
        gameState4.cursors = this.input.keyboard.createCursorKeys();
        gameState4.score = gameState.score;

        //player camera and worldbounds setup
        this.cameras.main.setBounds(0,0,1280,1280)
        this.cameras.main.startFollow(gameState4.player, 480, 320);
        gameState4.player.setCollideWorldBounds(true);

        //adds different physics groups
        gameState4.shuriken = this.physics.add.group();
        gameState4.shuriken.maxSize = 4;
        gameState4.skeletons = this.physics.add.group();
        gameState4.skeletons.maxSize = 30;
        gameState4.skeletonsArmor = this.physics.add.group();
        gameState4.skeletonsArmor.maxSize = 4;
        gameState4.skeletonsHat = this.physics.add.group();
        gameState4.skeletonsHat.maxSize = 10;
        gameState4.skeletonAttack = this.physics.add.group();
        gameState4.singleHearts = this.physics.add.group();
        gameState4.shurikenDrop = this.physics.add.group();
        gameState4.pauseGroup = this.add.group();

        //adds GUI
        gameState4.hearts = this.add.sprite(70, 470, 'hearts', 0);
        gameState4.hearts.setScrollFactor(0);
        gameState4.extraHeart = this.add.sprite(154, 471, 'extraHeart', 0);
        gameState4.extraHeart.setScrollFactor(0);
        gameState4.secondExtraHeart = this.add.sprite(195, 471, 'extraHeart', 0);
        gameState4.secondExtraHeart.setScrollFactor(0);
        gameState4.scoreText = this.add.text(10, 10, ``, { fontSize: '20px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' });
        gameState4.scoreText.setScrollFactor(0);

        //fixes player bounding box error
        this.time.addEvent({
            delay: 1000,
            callback: delayDone,
            callbackScope: this,
            loop: false
        });
        function delayDone () {
            gameState4.player.body.setSize(33, 50);
            gameState4.player.body.setOffset(16, 12);
        }

        //generates skeletons
        function skeletonGen() {
            if (gameState4.positionReached && gameState4.pauseOn === false) {
                const xCoord = Math.random() * 1280;
                const yCoord = Math.random() * 1280;
                const offsetX = Math.abs(xCoord - gameState4.player.body.x);
                const offsetY = Math.abs(yCoord - gameState4.player.body.y);    
                
                if (offsetX > 70 && offsetY > 70 && gameState4.skeletons.getLength() < gameState4.skeletons.maxSize) {
                    gameState4.skeletons.create(xCoord, yCoord, 'skeleton', 18).setScale(.55);
                }
            }
        }   
        gameState4.skeletonGenLoop = this.time.addEvent({
            delay: 2000,
            callback: skeletonGen,
            callbackScope: this,
            loop: true
        });
        function skeletonArmorGen() {
            if (gameState4.positionReached && gameState4.pauseOn === false) {
                const xCoord = Math.random() * 1280;
                const yCoord = Math.random() * 1280;
                const offsetX = Math.abs(xCoord - gameState4.player.body.x);
                const offsetY = Math.abs(yCoord - gameState4.player.body.y);    
                
                if (offsetX > 70 && offsetY > 70 && gameState4.skeletonsArmor.getLength() < gameState4.skeletonsArmor.maxSize) {
                    let newSkeleton = gameState4.skeletonsArmor.create(xCoord, yCoord, 'skeletonArmor', 18).setScale(.9);
                    newSkeleton.setData('health', 2);
                }
            }
        }   
        gameState4.skeletonArmorGenLoop = this.time.addEvent({
            delay: 15000,
            callback: skeletonArmorGen,
            callbackScope: this,
            loop: true
        });
        function skeletonHatGen() {
            if (gameState4.positionReached && gameState4.pauseOn === false) {
                const xCoord = Math.random() * 1280;
                const yCoord = Math.random() * 1280;
                const offsetX = Math.abs(xCoord - gameState4.player.body.x);
                const offsetY = Math.abs(yCoord - gameState4.player.body.y);    
                
                if (offsetX > 70 && offsetY > 70 && gameState4.skeletonsArmor.getLength() < gameState4.skeletonsArmor.maxSize) {
                    gameState4.skeletonsHat.create(xCoord, yCoord, 'skeletonHat', 18).setScale(.4);
                }
            }
        }   
        gameState4.skeletonHatGenLoop = this.time.addEvent({
            delay: 8000,
            callback: skeletonHatGen,
            callbackScope: this,
            loop: true
        });

        //updates score every second
        gameState4.scoreTextEvent = this.time.addEvent({
            delay: 1000,
            callback: updateScore,
            callbackScope: this,
            loop: true
        });
        function updateScore() {
            if (gameState4.positionReached && gameState4.pauseOn === false) {
                gameState4.score++;
                gameState4.scoreText.setText(`Score: ${gameState4.score}\nLevel: ${gameState4.currentLevel}\nSkeletons left: ${gameState4.skeletonsLeft}`);
            }
        }

        //sets collisions
        this.physics.add.collider(gameState4.player, gameState4.skeletons, (player, skeleton) => {
            gameState4.lives -= 1;
            skeleton.destroy();
            gameState4.skeletonsLeft--;
            updateScore();
        });
        this.physics.add.collider(gameState4.player, gameState4.skeletonsArmor, (player, skeleton) => {
            gameState4.lives -= 2;
            skeleton.destroy();
            gameState4.skeletonsArmorLeft--;
            updateScore();
        });
        this.physics.add.collider(gameState4.player, gameState4.skeletonsHat, (player, skeleton) => {
            gameState4.lives--;
            skeleton.destroy();
            gameState4.skeletonsLeft--;
            updateScore();
        })
        
        this.physics.add.collider(gameState4.player, gameState4.skeletonAttack, (player, fireball) => {
            gameState4.lives -= 1;
            fireball.destroy();
        });
        
        this.physics.add.collider(gameState4.skeletons, gameState4.shuriken, (skeleton, shuriken) => {
            skeleton.destroy();
            shuriken.destroy();
            
            gameState4.score += 10;
            
            const randomNumber = Math.floor(Math.random() * 10);
            if (gameState4.lives < 3) {
                if (randomNumber === 3 || randomNumber === 4) {
                    gameState4.singleHearts.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2 || randomNumber === 1) {
                const newDrop = gameState4.shurikenDrop.create(skeleton.x, skeleton.y, 'shuriken', 0).setScale(1.4);
                newDrop.play('shuriken');
            }
            
            gameState4.skeletonsLeft--;
            updateScore();
        });

        this.physics.add.collider(gameState4.skeletonsArmor, gameState4.shuriken, (skeleton, shuriken) => {
            
            let health = skeleton.getData('health');
            health--;
            skeleton.setData('health', health);
            if (health === 0) {
                skeleton.destroy();
                gameState4.score += 50;
                    
                const randomNumber = Math.floor(Math.random() * 10);
                if (gameState4.lives < 4) {
                    if (randomNumber === 3 || randomNumber === 4) {
                        gameState4.singleHearts.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                    }
                }
                if (randomNumber === 2 || randomNumber === 1) {
                    const newDrop = gameState4.shurikenDrop.create(skeleton.x, skeleton.y, 'shuriken', 0).setScale(1.4);
                    newDrop.play('shuriken');
                }
                    
                gameState4.skeletonsLeft--;
                updateScore();
            }
            shuriken.destroy();
        });

        this.physics.add.collider(gameState4.skeletonsHat, gameState4.shuriken, (skeleton, shuriken) => {
            skeleton.destroy();
            shuriken.destroy();
            
            gameState4.score += 10;
            
            const randomNumber = Math.floor(Math.random() * 10);
            if (gameState4.lives < 3) {
                if (randomNumber === 3 || randomNumber === 4) {
                    gameState4.singleHearts.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2 || randomNumber === 1) {
                const newDrop = gameState4.shurikenDrop.create(skeleton.x, skeleton.y, 'shuriken', 0).setScale(1.4);
                newDrop.play('shuriken');
            }
            
            gameState4.skeletonsLeft--;
            updateScore();
        });

        this.physics.add.collider(gameState4.player, gameState4.singleHearts, (player, singleHeart) => {
            singleHeart.destroy();
            gameState4.lives++;
        });
        
        this.physics.add.collider(gameState4.player, gameState4.shurikenDrop, (player, shuriken) => {
            gameState4.shuriken.maxSize++;
            shuriken.destroy();
        });

        //adds map to screen and sets map collisions
        gameState4.fourthMap = this.add.tilemap('fourthLevel', 16, 16, 60, 40);
        let terrain = gameState4.fourthMap.addTilesetImage('overworld', 'terrain');
        
        gameState4.botLayerFourthMap = gameState4.fourthMap.createStaticLayer('bottom', [terrain], 0, 0).setDepth(-1);
        gameState4.topLayerFourthMap = gameState4.fourthMap.createStaticLayer('top', [terrain], 0, 0).setDepth(-1);
        
        this.physics.add.collider(gameState4.player, gameState4.topLayerFourthMap);
        this.physics.add.collider(gameState4.skeletons, gameState4.topLayerFourthMap);
        this.physics.add.collider(gameState4.skeletonAttack, gameState4.topLayerFourthMap, (fireball) => {
            fireball.destroy();
        });
        gameState4.topLayerFourthMap.setCollisionByProperty({collision: true});

        //restarts the game when lost and click on screen
        this.input.on('pointerup', () => {
            if (gameState.active === false) {
                this.scene.start("Level1");
                gameState.active = true;
            }
        });

        //adds dialogue boxes
        gameState4.levelDialogueImage = this.add.image(gameState4.player.body.x, gameState4.player.body.y -70, 'dialog').setScale(.6);
        gameState4.levelDialogueText = this.add.text(gameState4.player.body.x - 105, gameState4.player.body.y -90, "Welcome to the third Level!!\nThis level is going to be way harder, so you get\nan additional heart and some awesome pants.\nThere will be a new type of enemy... Good luck!", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' });

    }

    update () {

        //adds escape input
        gameState4.pause = this.input.keyboard.addKey(27);
        gameState4.pause.on('down', () => {
            this.physics.pause();
            gameState4.pauseOn = true;
            gameState4.pauseScreen = this.add.image(0,40, 'pauseMenu');
            gameState4.pauseScreen.setOrigin(0,0);
            gameState4.backButtonPause = this.add.image(570, 440, 'backButton').setScale(.3);
            gameState4.backButtonPause.setOrigin(0,0);
            gameState4.pauseGroup.add(gameState4.pauseScreen);
            gameState4.pauseGroup.add(gameState4.backButtonPause);
            gameState4.pauseGroup.getChildren().forEach(child => {
                child.setScrollFactor(0);
            });
            gameState4.pauseScreen.setInteractive();
            gameState4.backButtonPause.setInteractive();
            gameState4.pauseScreen.on('pointerup', () => {
                if (gameState4.pauseOn) {
                    this.scene.start('Menu');
                }
            });
        });
        if (gameState4.pauseOn) {
            gameState4.backButtonPause.on('pointerup', () => {
                gameState4.pauseGroup.clear(true);
                gameState4.pauseOn = false;
                this.physics.resume();
            });
        }

        //starts skeletongen when certain position is reached
        if (gameState4.player.body.y > gameState4.startLoopPos) {
            gameState4.positionReached = true;
        }

        //removes level text on position reached
        if (gameState4.positionReached) {
            gameState4.levelDialogueImage.destroy();
            gameState4.levelDialogueText.destroy();
        }

        //makes player walk
        if (gameState4.active === true) {
            if (gameState4.cursors.down.isDown) {
                gameState4.player.play('walkDownClothes', true);
                gameState4.player.setVelocityY(110);
                gameState4.player.setVelocityX(0);
            } else if (gameState4.cursors.up.isDown) {
                gameState4.player.setVelocityY(-110);
                gameState4.player.play('walkUpClothes', true);
                gameState4.player.setVelocityX(0);
            } 
            
            if (gameState4.cursors.left.isDown) {
                gameState4.player.setVelocityX(-110);
                gameState4.player.setVelocityY(0);
                gameState4.player.play('walkLeftClothes', true);
            } else if (gameState4.cursors.right.isDown) {
                gameState4.player.setVelocityX(110);
                gameState4.player.setVelocityY(0);
                gameState4.player.play('walkRightClothes', true);
            } 
        }

        //player idle when not moving
        if (gameState4.cursors.left.isUp) {
            if (gameState4.player.body.velocity.x < 0) {
                gameState4.player.setVelocityX(-0.001);
                gameState4.player.play('playerClothesIdleLeft', true);
                gameState4.player.setTexture('playerClothes', 9);
            }
        }
        if (gameState4.cursors.right.isUp) {
            if (gameState4.player.body.velocity.x > 0) {
                gameState4.player.setVelocityX(0.001);
                gameState4.player.play('playerClothesIdleRight', true);
                gameState4.player.setTexture('playerClothes', 27);
            }
        }
        if (gameState4.cursors.up.isUp) {
            if (gameState4.player.body.velocity.y < 0) {
                gameState4.player.setVelocityY(-0.001);
                gameState4.player.play('playerClothesIdleUp', true);
                gameState4.player.setTexture('playerClothes', 1);
            }
        }
        if (gameState4.cursors.down.isUp) {
            if (gameState4.player.body.velocity.y > 0) {
                gameState4.player.setVelocityY(0);
                gameState4.player.play('idleClothes', true);
            }
        }

        //shoots shuriken
        if (gameState4.active) {
            if (Phaser.Input.Keyboard.JustDown(gameState4.cursors.space) && gameState4.shuriken.getLength() < gameState4.shuriken.maxSize) {
                
                let newShuriken = gameState4.shuriken.create(gameState4.player.x, gameState4.player.y, 'shuriken', 0);
                if (gameState4.player.body.velocity.x > 0) {
                    newShuriken.setVelocityX(150);
                    newShuriken.play('shuriken', true);
                } else if (gameState4.player.body.velocity.x < 0) {
                    newShuriken.setVelocityX(-150);
                    newShuriken.play('shuriken', true);
                } else if (gameState4.player.body.velocity.y > 0) {
                    newShuriken.setVelocityY(150);
                    newShuriken.play('shuriken', true);
                } else if (gameState4.player.body.velocity.y < 0) {
                    newShuriken.setVelocityY(-150);
                    newShuriken.play('shuriken', true);
                } else {
                    newShuriken.setVelocityY(150);
                    newShuriken.play('shuriken', true);
                }
            }
        }

        //destroys shuriken when out of camera
        gameState4.shuriken.getChildren().forEach(shuriken => {
    
            shuriken.body.setSize(12,12);
    
            shuriken.body.setCollideWorldBounds(false);
            if (shuriken.y > (gameState4.player.body.y + 350 )) {
                shuriken.destroy();
            } else if (shuriken.y < (gameState4.player.body.y - 250)) {
                shuriken.destroy();
            } else if (shuriken.x > (gameState4.player.body.x + 350)) {
                shuriken.destroy();
            } else if (shuriken.x < (gameState4.player.body.x + -350)) {
                shuriken.destroy();
            }
    
            if (gameState4.active === false) {
                shuriken.destroy();
            }
        })

        //destroys hearts and fireballs on game over 
        gameState4.singleHearts.getChildren().forEach(heart => {
            if (gameState4.active === false) {
                heart.destroy();
            }
        })
        gameState4.skeletonAttack.getChildren().forEach(fireball => {
            if (fireball.body.velocity.x > 0) {
                fireball.body.setSize(58, 20);
                fireball.body.setOffset(0,20);
            } else {
                fireball.body.setSize(20, 58);
                fireball.body.setOffset(20,5);
            }
    
            if (gameState4.active === false) {
                fireball.destroy();
            }
        });

        //sets skeleton velocities, spawnpoints and animations, destroys on game over
        gameState4.skeletons.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            if (gameState4.positionReached) {
                this.physics.moveToObject(skeleton, gameState4.player, 15);
    
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
                            const newFireBall = gameState4.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.3);
                            newFireBall.setVelocityX(70);
                            newFireBall.play('fireballRight', true);
                        } else if (skeleton.body.velocity.x < 0) {
                            const newFireBall = gameState4.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.3);
                            newFireBall.setVelocityX(-70);
                            newFireBall.play('fireballLeft', true);
                        }
                    } else {
                        if (skeleton.body.velocity.y > 0) {
                            const newFireBall = gameState4.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.4);
                            newFireBall.setVelocityY(70);
                            newFireBall.play('fireballDown', true);
                        } else if (skeleton.body.velocity.y < 0) {
                            const newFireBall = gameState4.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.4);
                            newFireBall.setVelocityY(-70);
                            newFireBall.play('fireballUp', true);
                        } 
                    }
                }
            }
            if (gameState4.active === false) {
                skeleton.destroy();
            }
        });

        //skeletonArmorLoop
        gameState4.skeletonsArmor.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            if (gameState4.positionReached) {
                this.physics.moveToObject(skeleton, gameState4.player, 5);
    
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
                            const newFireBall = gameState4.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.6);
                            newFireBall.setVelocityX(70);
                            newFireBall.play('fireballRight', true);
                        } else if (skeleton.body.velocity.x < 0) {
                            const newFireBall = gameState4.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.6);
                            newFireBall.setVelocityX(-70);
                            newFireBall.play('fireballLeft', true);
                        }
                    } else {
                        if (skeleton.body.velocity.y > 0) {
                            const newFireBall = gameState4.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.7);
                            newFireBall.setVelocityY(70);
                            newFireBall.play('fireballDown', true);
                        } else if (skeleton.body.velocity.y < 0) {
                            const newFireBall = gameState4.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.7);
                            newFireBall.setVelocityY(-70);
                            newFireBall.play('fireballUp', true);
                        } 
                    }
                }
            }
            if (gameState4.active === false) {
                skeleton.destroy();
            }
        });

        //skeleton hat loop
        gameState4.skeletonsHat.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            if (gameState4.positionReached) {
                this.physics.moveToObject(skeleton, gameState4.player, 40);
    
                if (skeleton.body.velocity.x > 0) {
                    if (Math.abs(skeleton.body.velocity.x) > Math.abs(skeleton.body.velocity.y)) {
                        skeleton.play('skeletonHatRight', true);
                    } else {
                        if (skeleton.body.velocity.y > 0) {
                            skeleton.play('skeletonHatDown', true);
                        } else {
                            skeleton.play('skeletonHatUp', true);
                        }
                    }
                } else if (skeleton.body.velocity.x < 0) {
                    if (Math.abs(skeleton.body.velocity.x) > Math.abs(skeleton.body.velocity.y)) {
                        skeleton.play('skeletonHatLeft', true);
                    } else {
                        if(skeleton.body.velocity.y > 0) {
                            skeleton.play('skeletonHatDown', true);
                        } else {
                            skeleton.play('skeletonHatUp', true);
                        }
                    }
                }
            }
    
            if (gameState4.active === false) {
                skeleton.destroy();
            }
        });

        //what to do when level is won
        if (gameState4.skeletonsLeft === 0 && gameState4.currentLevel === 2) {
            this.physics.pause();
            gameState4.skeletons.getChildren().forEach(skeleton => {
                skeleton.destroy();
            });
            gameState4.singleHearts.getChildren().forEach(heart => {
                heart.destroy();
            });
            gameState4.shuriken.getChildren().forEach(shuriken => {
                shuriken.destroy();
            });
            gameState4.skeletonAttack.getChildren().forEach(fireball => {
                fireball.destroy();
            });
            gameState4.scoreText.setText('');
            const levelDialog = this.add.image(gameState4.player.body.x, gameState4.player.body.y -70, 'dialog').setScale(.6);
            const levelText = this.add.text(gameState4.player.body.x -100, gameState4.player.body.y -85, 'You cleared level 3!', { fontSize: '18px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            const levelText2 = this.add.text(gameState4.player.body.x -100, gameState4.player.body.y -65, 'Click on the screen to start level 4', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            this.input.on('pointerup', () => {
                gameState4.active = true;
                this.physics.resume();
                this.scene.start("Level5");
            });
        }
        
        //what to do when level is lost
        if (gameState4.lives === 5) {
            gameState4.hearts.setTexture('hearts', 0);
            gameState4.hearts.setY(470);
            gameState4.extraHeart.setTexture('extraHeart', 0);
            gameState4.secondExtraHeart.setTexture('extraHeart', 0);
        } else if (gameState4.lives === 4) {
            gameState4.hearts.setTexture('hearts', 0);
            gameState4.hearts.setY(470);
            gameState4.extraHeart.setTexture('extraHeart', 0);
            gameState4.secondExtraHeart.setTexture('extraHeart', 1);
        } else if (gameState4.lives === 3) {
            gameState4.hearts.setTexture('hearts', 0);
            gameState4.hearts.setY(470);
            gameState4.extraHeart.setTexture('extraHeart', 1);
            gameState4.secondExtraHeart.setTexture('extraHeart', 1);
        } else if (gameState4.lives === 2) {
            gameState4.hearts.setTexture('hearts', 1);
            gameState4.hearts.setY(471);
            gameState4.extraHeart.setTexture('extraHeart', 1);
            gameState4.secondExtraHeart.setTexture('extraHeart', 1);
        } else if (gameState4.lives === 1) {
            gameState4.hearts.setTexture('hearts', 2);
            gameState4.hearts.setY(472);
            gameState4.extraHeart.setTexture('extraHeart', 1);
            gameState4.secondExtraHeart.setTexture('extraHeart', 1);
        } else if (gameState4.lives === 0 && gameState4.active) {
            const levelDialog = this.add.image(gameState4.player.body.x, gameState4.player.body.y -70, 'dialog').setScale(.6);
            const levelText = this.add.text(gameState4.player.body.x -100, gameState4.player.body.y -85, 'You lost!', { fontSize: '18px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            const levelText2 = this.add.text(gameState4.player.body.x -110, gameState4.player.body.y -65, 'Click on the screen to restart the game', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            gameState4.hearts.setTexture('hearts', 3);
            gameState4.hearts.setY(472);
            gameState4.extraHeart.setTexture('extraHeart', 1);
            gameState4.secondExtraHeart.setTexture('extraHeart', 1);
            this.physics.pause();
            gameState4.skeletonGenLoop.destroy();
            gameState4.skeletonArmorGenLoop.destroy();
            gameState4.skeletonHatGenLoop.destroy();
            gameState4.scoreTextEvent.destroy();
            gameState4.player.play('playerShoesPantsHurt', true);
            gameState4.active = false;
            gameState4.positionReached = false;
            this.input.on('pointerup', () => {
                this.physics.resume();
                this.scene.start("Level1");
            });
        }

    }

}