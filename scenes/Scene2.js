const gameState2 = {
    counter: 0,
    active: true,
    startLoopPos: 250,
    positionReached: false,
    pauseOn: false
};

class Scene2 extends Phaser.Scene {

    constructor() {
        super("Level2");
    }

    init() {

    }

    preload() {

    }

    create() {

        //creates player animations
        this.anims.create({
            key: 'walkDownShoes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoes', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'walkUpShoes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoes', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'walkLeftShoes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoes', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'walkRightShoes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoes', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'idleShoes',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerShoes', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'playerShoesHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerShoesHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'shuriken',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shuriken', {start: 0, end: 2})
        });
        this.anims.create({
            key: 'playerShoesIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerShoes', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'playerShoesIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerShoes', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'playerShoesIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerShoes', {start: 0, end: 1})
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
        
        //adds player
        gameState2.player = this.physics.add.sprite(200, 180, 'playerShoes', 18).setScale(.7);

        //setup
        this.physics.world.setBounds(0, 0, 1280, 1280);
        gameState2.lives = 2;
        gameState2.currentLevel = 1;
        gameState2.skeletonsLeft = 25;
        gameState2.cursors = this.input.keyboard.createCursorKeys();
        gameState2.score = gameState.score;

        //player camera and worldbounds setup
        this.cameras.main.setBounds(0,0,1280,1280)
        this.cameras.main.startFollow(gameState2.player, 480, 320);
        gameState2.player.setCollideWorldBounds(true);

        //adds different physics groups
        gameState2.shuriken = this.physics.add.group();
        gameState2.shuriken.maxSize = 2;
        gameState2.skeletons = this.physics.add.group();
        gameState2.skeletons.maxSize = 50;
        gameState2.skeletonAttack = this.physics.add.group();
        gameState2.singleHearts = this.physics.add.group();
        gameState2.shurikenDrop = this.physics.add.group();
        gameState2.pauseGroup = this.add.group();

        //adds GUI
        gameState2.hearts = this.add.sprite(70, 470, 'hearts', 0);
        gameState2.hearts.setScrollFactor(0);
        gameState2.scoreText = this.add.text(10, 10, ``, { fontSize: '20px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' });
        gameState2.scoreText.setScrollFactor(0);


        //fixes player bounding box error
        this.time.addEvent({
            delay: 1000,
            callback: delayDone,
            callbackScope: this,
            loop: false
        });
        function delayDone () {
            gameState2.player.body.setSize(33, 50);
            gameState2.player.body.setOffset(16, 12);
        }

        //generates skeletons
        function skeletonGen() {
            if (gameState2.positionReached && gameState2.pauseOn === false) {
                const xCoord = Math.random() * 1280;
                const yCoord = Math.random() * 1280;
                const offsetX = Math.abs(xCoord - gameState2.player.body.x);
                const offsetY = Math.abs(yCoord - gameState2.player.body.y);    
                
                if (offsetX > 70 && offsetY > 70) {
                    gameState2.skeletons.create(xCoord, yCoord, 'skeleton', 18).setScale(.55);
                }
            }
        }   
        gameState2.skeletonGenLoop = this.time.addEvent({
            delay: 2000,
            callback: skeletonGen,
            callbackScope: this,
            loop: true
        });

        //updates score every second
        gameState2.scoreTextEvent = this.time.addEvent({
            delay: 1000,
            callback: updateScore,
            callbackScope: this,
            loop: true
        });
        function updateScore() {
            if (gameState2.positionReached && gameState2.pauseOn === false) {
                gameState2.score++;
                gameState2.scoreText.setText(`Score: ${gameState2.score}\nLevel: ${gameState2.currentLevel}\nSkeletons left: ${gameState2.skeletonsLeft}`);
            }
        }

        //sets collisions
        this.physics.add.collider(gameState2.player, gameState2.skeletons, (player, skeleton) => {
            gameState2.lives -= 1;
            skeleton.destroy();
            gameState2.skeletonsLeft--;
            updateScore();
        });
        
        this.physics.add.collider(gameState2.player, gameState2.skeletonAttack, (player, fireball) => {
            gameState2.lives -= 1;
            fireball.destroy();
        });
        
        this.physics.add.collider(gameState2.skeletons, gameState2.shuriken, (skeleton, shuriken) => {
            skeleton.destroy();
            shuriken.destroy();
            
            gameState2.score += 10;
            
            const randomNumber = Math.floor(Math.random() * 10);
            if (gameState2.lives < 3) {
                if (randomNumber === 3 || randomNumber === 4) {
                    gameState2.singleHearts.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2 || randomNumber === 1) {
                const newDrop = gameState2.shurikenDrop.create(skeleton.x, skeleton.y, 'shuriken', 0).setScale(1.4);
                newDrop.play('shuriken');
            }
            
            gameState2.skeletonsLeft--;
            updateScore();
        });

        this.physics.add.collider(gameState2.player, gameState2.singleHearts, (player, singleHeart) => {
            singleHeart.destroy();
            gameState2.lives++;
        });
        
        this.physics.add.collider(gameState2.player, gameState2.shurikenDrop, (player, shuriken) => {
            gameState2.shuriken.maxSize++;
            shuriken.destroy();
        });

        //adds map to screen and sets map collisions
        gameState2.secondMap = this.add.tilemap('secondLevel', 16, 16, 60, 40);
        let terrain = gameState2.secondMap.addTilesetImage('overworld', 'terrain');
        
        gameState2.botLayerSecondMap = gameState2.secondMap.createStaticLayer('bottom', [terrain], 0, 0).setDepth(-1);
        gameState2.topLayerSecondMap = gameState2.secondMap.createStaticLayer('top', [terrain], 0, 0).setDepth(-1);
        
        this.physics.add.collider(gameState2.player, gameState2.topLayerSecondMap);
        this.physics.add.collider(gameState2.skeletons, gameState2.topLayerSecondMap);
        this.physics.add.collider(gameState2.skeletonAttack, gameState2.topLayerSecondMap, (fireball) => {
            fireball.destroy();
        });
        gameState2.topLayerSecondMap.setCollisionByProperty({collision: true});

        //restarts the game when lost and click on screen
        this.input.on('pointerup', () => {
            if (gameState.active === false) {
                this.scene.start("Level 1");
                gameState.active = true;
            }
        });

        //adds dialogue boxes
        gameState2.levelDialogueImage = this.add.image(gameState2.player.body.x, gameState2.player.body.y -70, 'dialog').setScale(.6);
        gameState2.levelDialogueText = this.add.text(gameState2.player.body.x - 105, gameState2.player.body.y -90, "Welcome to the second Level!!\nThis level is going to be harder, but maybe you\nhave noticed your new awesome shoes.\nThey make you run and shoot faster! Good luck!", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' });

    }

    update () {

        //adds escape input
        gameState2.pause = this.input.keyboard.addKey(27);
        gameState2.pause.on('down', () => {
            this.physics.pause();
            gameState2.pauseOn = true;
            gameState2.pauseScreen = this.add.image(0,40, 'pauseMenu');
            gameState2.pauseScreen.setOrigin(0,0);
            gameState2.backButtonPause = this.add.image(570, 440, 'backButton').setScale(.3);
            gameState2.backButtonPause.setOrigin(0,0);
            gameState2.pauseGroup.add(gameState2.pauseScreen);
            gameState2.pauseGroup.add(gameState2.backButtonPause);
            gameState2.pauseGroup.getChildren().forEach(child => {
                child.setScrollFactor(0);
            });
            gameState2.pauseScreen.setInteractive();
            gameState2.backButtonPause.setInteractive();
            gameState2.pauseScreen.on('pointerup', () => {
                this.scene.start('Menu');
            });
        });
        if (gameState2.pauseOn) {
            gameState2.backButtonPause.on('pointerup', () => {
                gameState2.pauseGroup.clear(true);
                gameState2.pauseOn = false;
                this.physics.resume();
            });
        }

        //starts skeletongen when certain position is reached
        if (gameState2.player.body.y > gameState2.startLoopPos) {
            gameState2.positionReached = true;
        }

        //removes level text on position reached
        if (gameState2.positionReached) {
            gameState2.levelDialogueImage.destroy();
            gameState2.levelDialogueText.destroy();
        }

        //makes player walk
        if (gameState2.active === true) {
            if (gameState2.cursors.down.isDown) {
                gameState2.player.play('walkDownShoes', true);
                gameState2.player.setVelocityY(110);
                gameState2.player.setVelocityX(0);
            } else if (gameState2.cursors.up.isDown) {
                gameState2.player.setVelocityY(-110);
                gameState2.player.play('walkUpShoes', true);
                gameState2.player.setVelocityX(0);
            } 
            
            if (gameState2.cursors.left.isDown) {
                gameState2.player.setVelocityX(-110);
                gameState2.player.setVelocityY(0);
                gameState2.player.play('walkLeftShoes', true);
            } else if (gameState2.cursors.right.isDown) {
                gameState2.player.setVelocityX(110);
                gameState2.player.setVelocityY(0);
                gameState2.player.play('walkRightShoes', true);
            } 
        }

        //player idle when not moving
        if (gameState2.cursors.left.isUp) {
            if (gameState2.player.body.velocity.x < 0) {
                gameState2.player.setVelocityX(-0.001);
                gameState2.player.play('playerShoesIdleLeft', true);
                gameState2.player.setTexture('playerShoes', 9);
            }
        }
        if (gameState2.cursors.right.isUp) {
            if (gameState2.player.body.velocity.x > 0) {
                gameState2.player.setVelocityX(0.001);
                gameState2.player.play('playerShoesIdleRight', true);
                gameState2.player.setTexture('playerShoes', 27);
            }
        }
        if (gameState2.cursors.up.isUp) {
            if (gameState2.player.body.velocity.y < 0) {
                gameState2.player.setVelocityY(-0.001);
                gameState2.player.play('playerShoesIdleUp', true);
                gameState2.player.setTexture('playerShoes', 1);
            }
        }
        if (gameState2.cursors.down.isUp) {
            if (gameState2.player.body.velocity.y > 0) {
                gameState2.player.setVelocityY(0);
                gameState2.player.play('idleShoes', true);
            }
        }

        //shoots shuriken
        if (gameState2.active) {
            if (Phaser.Input.Keyboard.JustDown(gameState2.cursors.space) && gameState2.shuriken.getLength() < gameState2.shuriken.maxSize) {
                
                let newShuriken = gameState2.shuriken.create(gameState2.player.x, gameState2.player.y, 'shuriken', 0);
                if (gameState2.player.body.velocity.x > 0) {
                    newShuriken.setVelocityX(150);
                    newShuriken.play('shuriken', true);
                } else if (gameState2.player.body.velocity.x < 0) {
                    newShuriken.setVelocityX(-150);
                    newShuriken.play('shuriken', true);
                } else if (gameState2.player.body.velocity.y > 0) {
                    newShuriken.setVelocityY(150);
                    newShuriken.play('shuriken', true);
                } else if (gameState2.player.body.velocity.y < 0) {
                    newShuriken.setVelocityY(-150);
                    newShuriken.play('shuriken', true);
                } else {
                    newShuriken.setVelocityY(150);
                    newShuriken.play('shuriken', true);
                }
            }
        }
    
        //destroys shuriken when out of camera
        gameState2.shuriken.getChildren().forEach(shuriken => {
    
            shuriken.body.setSize(12,12);
    
            shuriken.body.setCollideWorldBounds(false);
            if (shuriken.y > (gameState2.player.body.y + 350 )) {
                shuriken.destroy();
            } else if (shuriken.y < (gameState2.player.body.y - 250)) {
                shuriken.destroy();
            } else if (shuriken.x > (gameState2.player.body.x + 350)) {
                shuriken.destroy();
            } else if (shuriken.x < (gameState2.player.body.x + -350)) {
                shuriken.destroy();
            }
    
            if (gameState2.active === false) {
                shuriken.destroy();
            }
        })
        
        //destroys hearts and fireballs on game over 
        gameState2.singleHearts.getChildren().forEach(heart => {
            if (gameState2.active === false) {
                heart.destroy();
            }
        })
        gameState2.skeletonAttack.getChildren().forEach(fireball => {
            fireball.body.setSize(58, 20);
            fireball.body.setOffset(0,20);
    
            if (gameState2.active === false) {
                fireball.destroy();
            }
        });

        //sets skeleton velocities, spawnpoints and animations, destroys on game over
        gameState2.skeletons.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            if (gameState2.positionReached) {
                this.physics.moveToObject(skeleton, gameState2.player, 10)
    
                if (skeleton.body.velocity.x > 0) {
                    skeleton.play('skeletonRight', true);
                } else if (skeleton.body.velocity.x < 0) {
                    skeleton.play('skeletonLeft', true);
                }
    
                let randNum = Math.floor(Math.random() * 1000)
                if (randNum === 1) {
                    if (skeleton.body.velocity.x > 0) {
                        skeleton.play('skeletonCastRight', true);
                        const newFireBall = gameState2.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.3).play('fireballRight', true);
                        this.physics.moveToObject(newFireBall, gameState2.player, 70);
                        newFireBall.play('fireballRight', true);
                    } else if (skeleton.body.velocity.x < 0) {
                        skeleton.play('skeletonCastLeft', true);
                        const newFireBall = gameState2.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.3).play('fireballLeft', true);
                        this.physics.moveToObject(newFireBall, gameState2.player, 70);
                        newFireBall.play('fireballLeft', true);
                    }
                }
            }
            if (gameState2.active === false) {
                skeleton.destroy();
            }
        });
    
        //what to do when level is won
        if (gameState2.skeletonsLeft === 0 && gameState2.currentLevel === 1) {
            this.physics.pause();
            gameState2.skeletons.getChildren().forEach(skeleton => {
                skeleton.destroy();
            });
            gameState2.singleHearts.getChildren().forEach(heart => {
                heart.destroy();
            });
            gameState2.shuriken.getChildren().forEach(shuriken => {
                shuriken.destroy();
            });
            gameState2.skeletonAttack.getChildren().forEach(fireball => {
                fireball.destroy();
            });
            gameState2.scoreText.setText('');
            const levelDialog = this.add.image(gameState2.player.body.x, gameState2.player.body.y -70, 'dialog').setScale(.6);
            const levelText = this.add.text(gameState2.player.body.x -100, gameState2.player.body.y -85, 'You cleared level 2!', { fontSize: '18px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            const levelText2 = this.add.text(gameState2.player.body.x -100, gameState2.player.body.y -65, 'Click on the screen to start level 3', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            this.input.on('pointerup', () => {
                gameState2.active = true;
                this.physics.resume();
                this.scene.start("Level3");
            });
        }
        
        //what to do when level is lost
        if (gameState2.lives === 3) {
            gameState2.hearts.setTexture('hearts', 0);
        } else if (gameState2.lives === 2) {
            gameState2.hearts.setTexture('hearts', 1);
        } else if (gameState2.lives === 1) {
            gameState2.hearts.setTexture('hearts', 2);
        } else if (gameState2.lives === 0 && gameState2.active) {
            const levelDialog = this.add.image(gameState2.player.body.x, gameState2.player.body.y -70, 'dialog').setScale(.6);
            const levelText = this.add.text(gameState2.player.body.x -100, gameState2.player.body.y -85, 'You lost!', { fontSize: '18px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            const levelText2 = this.add.text(gameState2.player.body.x -110, gameState2.player.body.y -65, 'Click on the screen to restart the game', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            gameState2.hearts.setTexture('hearts', 3);
            this.physics.pause();
            gameState2.skeletonGenLoop.destroy();
            gameState2.scoreTextEvent.destroy();
            gameState2.player.play('playerHurt', true);
            gameState2.active = false;
            gameState2.positionReached = false;
            this.input.on('pointerup', () => {
                this.physics.resume();
                this.scene.start("Level1");
            });
        }
    }
}