const gameState = {
    counter: 0,
    active: true,
    score: 0,
    startLoopPos: 200,
    positionReached: false,
    pauseOn: false
};

class Scene1 extends Phaser.Scene {
    constructor() {
        super("Level1");
    }

    init() {
    
    }

    preload() {

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
            frameRate: 7,
            frames: this.anims.generateFrameNames('skeleton', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'skeletonDown',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('skeleton', {start: 19, end: 26})
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
        
        //setup
        this.physics.world.setBounds(0, 0, 1280, 1280);
        gameState.score = 0;
        gameState.lives = 3;
        gameState.currentLevel = 1;
        gameState.skeletonsLeft = 10;
        gameState.scoreText = this.add.text(10, 10, ``, { fontSize: '20px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' });
        gameState.scoreText.setScrollFactor(0);
        gameState.cursors = this.input.keyboard.createCursorKeys();

        //adds GUI
        gameState.hearts = this.add.sprite(70, 470, 'hearts', 0);
        gameState.hearts.setScrollFactor(0);

        //adds player
        gameState.player = this.physics.add.sprite(184, 190, 'player', 18).setScale(.7);

        //adds level text
        gameState.levelDialogueImage = this.add.image(gameState.player.body.x, gameState.player.body.y -70, 'dialog').setScale(.6);
        gameState.levelDialogueText = this.add.text(gameState.player.body.x - 105, gameState.player.body.y -90, "Welcome to the first Level!!\nThe skeletons are coming... Go further down.\nShoot ten of then to move on to the next level.\n Good luck!", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' });
        
        //player camera and worldbounds setup
        this.cameras.main.setBounds(0,0,1280,1280);
        this.cameras.main.startFollow(gameState.player, 480, 320);
        gameState.player.setCollideWorldBounds(true);
        
        //adds different physics groups
        gameState.shuriken = this.physics.add.group();
        gameState.shuriken.maxSize = 1;
        gameState.skeletons = this.physics.add.group();
        gameState.skeletons.maxSize = 8;
        gameState.skeletonAttack = this.physics.add.group();
        gameState.singleHearts = this.physics.add.group();
        gameState.shurikenDrop = this.physics.add.group();
        gameState.pauseGroup = this.add.group();
        
        //fixes player bounding box error
        this.time.addEvent({
            delay: 1000,
            callback: delayDone,
            callbackScope: this,
            loop: false
        });
        function delayDone () {
            gameState.player.body.setSize(33, 50);
            gameState.player.body.setOffset(16, 12);
        }
        
        //generates skeletons
        function skeletonGen() {
            if (gameState.positionReached && gameState.pauseOn === false) {
                const xCoord = Math.random() * 1280;
                const yCoord = Math.random() * 1280;
                const offsetX = Math.abs(xCoord - gameState.player.body.x);
                const offsetY = Math.abs(yCoord - gameState.player.body.y);    
                
                if (offsetX > 70 && offsetY > 70 && gameState.skeletons.getLength() < gameState.skeletons.maxSize) {
                    gameState.skeletons.create(xCoord, yCoord, 'skeleton', 18).setScale(.55);
                }
            }
        }   
        gameState.skeletonGenLoop = this.time.addEvent({
            delay: 2000,
            callback: skeletonGen,
            callbackScope: this,
            loop: true
        });
        
        //updates score every second
        gameState.scoreTextEvent = this.time.addEvent({
            delay: 1000,
            callback: updateScore,
            callbackScope: this,
            loop: true
        });
        function updateScore() {
            if (gameState.positionReached && gameState.pauseOn === false) {
                gameState.score++;
                gameState.scoreText.setText(`Score: ${gameState.score}\nLevel: ${gameState.currentLevel}\nSkeletons left: ${gameState.skeletonsLeft}`);
            }
        }
        
        //sets collisions
        this.physics.add.collider(gameState.player, gameState.skeletons, (player, skeleton) => {
            gameState.lives -= 1;
            skeleton.destroy();
            gameState.skeletonsLeft--;
            updateScore();
        });
        
        this.physics.add.collider(gameState.player, gameState.skeletonAttack, (player, fireball) => {
            gameState.lives -= 1;
            fireball.destroy();
        });
        
        this.physics.add.collider(gameState.skeletons, gameState.shuriken, (skeleton, shuriken) => {
            skeleton.destroy();
            shuriken.destroy();
            
            gameState.score += 10;
            
            const randomNumber = Math.floor(Math.random() * 10);
            if (gameState.lives < 3) {
                if (randomNumber === 3 || randomNumber === 4) {
                    gameState.singleHearts.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2 || randomNumber === 1) {
                const newDrop = gameState.shurikenDrop.create(skeleton.x, skeleton.y, 'shuriken', 0).setScale(1.4);
                newDrop.play('shuriken');
            }
            
            gameState.skeletonsLeft--;
            updateScore();
        });

        this.physics.add.collider(gameState.player, gameState.singleHearts, (player, singleHeart) => {
            singleHeart.destroy();
            gameState.lives++;
        });
        
        this.physics.add.collider(gameState.player, gameState.shurikenDrop, (player, shuriken) => {
            gameState.shuriken.maxSize++;
            shuriken.destroy();
        });

        //adds map to screen and sets map collisions
        gameState.startingMap = this.add.tilemap('firstLevel', 16, 16, 60, 40);
        let terrain = gameState.startingMap.addTilesetImage('overworld', 'terrain');
        
        gameState.botLayerStartingMap = gameState.startingMap.createStaticLayer('bottom', [terrain], 0, 0).setDepth(-1);
        gameState.topLayerStartingMap = gameState.startingMap.createStaticLayer('top', [terrain], 0, 0).setDepth(-1);
        
        this.physics.add.collider(gameState.player, gameState.topLayerStartingMap);
        this.physics.add.collider(gameState.skeletons, gameState.topLayerStartingMap);
        this.physics.add.collider(gameState.skeletonAttack, gameState.topLayerStartingMap, (fireball) => {
            fireball.destroy();
        });
        gameState.topLayerStartingMap.setCollisionByProperty({collision: true});
        
        //restarts the game when lost and click on screen
        this.input.on('pointerup', () => {
            if (gameState.active === false) {
                this.scene.restart();
                gameState.active = true;
            }
        });

    }
    
    update() {

        //adds escape input
        gameState.pause = this.input.keyboard.addKey(27);
        gameState.pause.on('down', () => {
            this.physics.pause();
            gameState.pauseOn = true;
            gameState.pauseScreen = this.add.image(0,40, 'pauseMenu');
            gameState.pauseScreen.setOrigin(0,0);
            gameState.backButtonPause = this.add.image(570, 440, 'backButton').setScale(.3);
            gameState.backButtonPause.setOrigin(0,0);
            gameState.pauseGroup.add(gameState.pauseScreen);
            gameState.pauseGroup.add(gameState.backButtonPause);
            gameState.pauseGroup.getChildren().forEach(child => {
                child.setScrollFactor(0);
            });
            gameState.pauseScreen.setInteractive();
            gameState.backButtonPause.setInteractive();
            gameState.pauseScreen.on('pointerup', () => {
                if (gameState.pauseOn) {
                    this.scene.start('Menu');
                }
            });
        });
        if (gameState.pauseOn) {
            gameState.backButtonPause.on('pointerup', () => {
                gameState.pauseGroup.clear(true);
                gameState.pauseOn = false;
                this.physics.resume();
            });
        }
        
        //starts skeletongen when certain position is reached
        if (gameState.player.body.y > gameState.startLoopPos) {
            gameState.positionReached = true;
        }

        //destroys level dialogue on position reached
        if (gameState.positionReached) {
            gameState.levelDialogueImage.destroy();
            gameState.levelDialogueText.destroy();
        }
        
        //makes player walk
        if (gameState.active === true) {
            if (gameState.cursors.down.isDown) {
                gameState.player.play('walkDown', true);
                gameState.player.setVelocityY(80);
                gameState.player.setVelocityX(0);
            } else if (gameState.cursors.up.isDown) {
                gameState.player.setVelocityY(-80);
                gameState.player.play('walkUp', true);
                gameState.player.setVelocityX(0);
            } 
            
            if (gameState.cursors.left.isDown) {
                gameState.player.setVelocityX(-80);
                gameState.player.setVelocityY(0);
                gameState.player.play('walkLeft', true);
            } else if (gameState.cursors.right.isDown) {
                gameState.player.setVelocityX(80);
                gameState.player.setVelocityY(0);
                gameState.player.play('walkRight', true);
            } 
        }

        //player idle when not moving
        if (gameState.cursors.left.isUp) {
            if (gameState.player.body.velocity.x < 0) {
                gameState.player.setVelocityX(-0.001);
                gameState.player.play('playerIdleLeft', true);
                gameState.player.setTexture('player', 9);
            }
        }
        if (gameState.cursors.right.isUp) {
            if (gameState.player.body.velocity.x > 0) {
                gameState.player.setVelocityX(0.001);
                gameState.player.play('playerIdleRight', true);
                gameState.player.setTexture('player', 27);
            }
        }
        if (gameState.cursors.up.isUp) {
            if (gameState.player.body.velocity.y < 0) {
                gameState.player.setVelocityY(-0.001);
                gameState.player.play('playerIdleUp', true);
                gameState.player.setTexture('player', 1);
            }
        }
        if (gameState.cursors.down.isUp) {
            if (gameState.player.body.velocity.y > 0) {
                gameState.player.setVelocityY(0);
                gameState.player.play('idle', true);
            }
        }

        
        //shoots shuriken
        if (gameState.active) {
            if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space) && gameState.shuriken.getLength() < gameState.shuriken.maxSize) {
                
                let newShuriken = gameState.shuriken.create(gameState.player.x, gameState.player.y, 'shuriken', 0);
                if (gameState.player.body.velocity.x > 0) {
                    newShuriken.setVelocityX(150);
                    newShuriken.play('shuriken', true);
                } else if (gameState.player.body.velocity.x < 0) {
                    newShuriken.setVelocityX(-150);
                    newShuriken.play('shuriken', true);
                } else if (gameState.player.body.velocity.y > 0) {
                    newShuriken.setVelocityY(150);
                    newShuriken.play('shuriken', true);
                } else if (gameState.player.body.velocity.y < 0) {
                    newShuriken.setVelocityY(-150);
                    newShuriken.play('shuriken', true);
                } else {
                    newShuriken.setVelocityY(150);
                    newShuriken.play('shuriken', true);
                }
            }
        }
    
        //destroys shuriken when out of camera
        gameState.shuriken.getChildren().forEach(shuriken => {
    
            shuriken.body.setSize(12,12);
    
            shuriken.body.setCollideWorldBounds(false);
            if (shuriken.y > (gameState.player.body.y + 350 )) {
                shuriken.destroy();
            } else if (shuriken.y < (gameState.player.body.y - 250)) {
                shuriken.destroy();
            } else if (shuriken.x > (gameState.player.body.x + 350)) {
                shuriken.destroy();
            } else if (shuriken.x < (gameState.player.body.x + -350)) {
                shuriken.destroy();
            }
    
            if (gameState.active === false) {
                shuriken.destroy();
            }
        })
        
        //destroys hearts and fireballs on game over 
        gameState.singleHearts.getChildren().forEach(heart => {
            if (gameState.active === false) {
                heart.destroy();
            }
        })
        gameState.skeletonAttack.getChildren().forEach(fireball => {

            if (fireball.body.velocity.x > 0) {
                fireball.body.setSize(58, 20);
                fireball.body.setOffset(0,20);
            } else {
                fireball.body.setSize(20, 58);
                fireball.body.setOffset(20,5);
            }
    
            if (gameState.active === false) {
                fireball.destroy();
            }
        });
        
        //sets skeleton velocities, spawnpoints and animations, destroys on game over
        gameState.skeletons.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            if (gameState.positionReached) {
                this.physics.moveToObject(skeleton, gameState.player, 15);
    
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
                            const newFireBall = gameState.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.3);
                            newFireBall.setVelocityX(70);
                            newFireBall.play('fireballRight', true);
                        } else if (skeleton.body.velocity.x < 0) {
                            const newFireBall = gameState.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.3);
                            newFireBall.setVelocityX(-70);
                            newFireBall.play('fireballLeft', true);
                        }
                    } else {
                        if (skeleton.body.velocity.y > 0) {
                            const newFireBall = gameState.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.4);
                            newFireBall.setVelocityY(70);
                            newFireBall.play('fireballDown', true);
                        } else if (skeleton.body.velocity.y < 0) {
                            const newFireBall = gameState.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.4);
                            newFireBall.setVelocityY(-70);
                            newFireBall.play('fireballUp', true);
                        } 
                    }
                }
            }
            if (gameState.active === false) {
                skeleton.destroy();
            }
        });
    
        //what to do when level is won
        if (gameState.skeletonsLeft === 0 && gameState.currentLevel === 1) {
            this.physics.pause();
            gameState.skeletons.getChildren().forEach(skeleton => {
                skeleton.destroy();
            });
            gameState.singleHearts.getChildren().forEach(heart => {
                heart.destroy();
            });
            gameState.shuriken.getChildren().forEach(shuriken => {
                shuriken.destroy();
            });
            gameState.skeletonAttack.getChildren().forEach(fireball => {
                fireball.destroy();
            });
            gameState.scoreText.setText('');
            const levelDialog = this.add.image(gameState.player.body.x, gameState.player.body.y -70, 'dialog').setScale(.6);
            const levelText = this.add.text(gameState.player.body.x -100, gameState.player.body.y -85, 'You cleared level 1!', { fontSize: '18px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            const levelText2 = this.add.text(gameState.player.body.x -100, gameState.player.body.y -65, 'Click on the screen to start level 2', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            this.input.on('pointerup', () => {
                gameState.active = true;
                this.physics.resume();
                this.scene.start("Level2");
            });
        }
        
        //what to do when level is lost
        if (gameState.lives === 3) {
            gameState.hearts.setTexture('hearts', 0);
        } else if (gameState.lives === 2) {
            gameState.hearts.setTexture('hearts', 1);
        } else if (gameState.lives === 1) {
            gameState.hearts.setTexture('hearts', 2);
        } else if (gameState.lives === 0 && gameState.active) {
            const levelDialog = this.add.image(gameState.player.body.x, gameState.player.body.y -70, 'dialog').setScale(.6);
            const levelText = this.add.text(gameState.player.body.x -100, gameState.player.body.y -85, 'You lost!', { fontSize: '18px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            const levelText2 = this.add.text(gameState.player.body.x -110, gameState.player.body.y -65, 'Click on the screen to restart the game', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            gameState.hearts.setTexture('hearts', 3);
            this.physics.pause();
            gameState.skeletonGenLoop.destroy();
            gameState.scoreTextEvent.destroy();
            gameState.player.play('playerHurt', true);
            gameState.active = false;
            gameState.positionReached = false;
        }

    }
}