const gameState = {
    counter: 0,
    active: true,
    score: 0,
    startLoopPos: 800,
    positionReached: false
};

class Scene1 extends Phaser.Scene {
    constructor() {
        super("Level 1");
    }

    init() {
    
    }

    preload() {

        this.load.spritesheet('player', 'sprites/player_body.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeleton', 'sprites/skeleton_body.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('playerHurt', 'sprites/player_hurt.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonCast', 'sprites/skeleton_cast.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('fireball', 'sprites/fireball.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shuriken', 'sprites/throwingstars.png', {frameWidth: 12, frameHeight: 12});
        this.load.spritesheet('hearts', 'sprites/hearts.png', {frameWidth: 121, frameHeight: 38})

        this.load.image('singleHeart', 'sprites/single_heart.png');

        this.load.image('bg', 'images/bg.jpg');
        this.load.image('dialog', 'images/dialog_box.png');

        this.load.image('terrain', 'maps/assets/overworld.png');
        this.load.tilemapTiledJSON('startingMap', 'maps/starting_map.json');

    }

    create() {

        this.physics.world.setBounds(0, 0, 1920, 1920);
        gameState.score = 0;
        gameState.lives = 2;
        gameState.currentLevel = 1;
        gameState.skeletonsLeft = 21;
        gameState.scoreText = this.add.text(10, 10, ``, { fontSize: '20px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' });
        gameState.scoreText.setScrollFactor(0);

        this.input.on('pointerup', () => {
            if (gameState.active === false) {
                this.scene.restart();
                gameState.active = true;
            }
        })
        
        gameState.hearts = this.add.sprite(70, 470, 'hearts', 0);
        gameState.hearts.setScrollFactor(0);

        gameState.player = this.physics.add.sprite(150, 140, 'player', 18).setScale(.7);
        this.cameras.main.setBounds(0,0,1920,1920)
        this.cameras.main.startFollow(gameState.player, 480, 320);
        

        this.time.addEvent({
            delay: 1000,
            callback: delayDone,
            callbackScope: this,
            loop: false
        });

        gameState.shuriken = this.physics.add.group();
        gameState.shuriken.maxSize = 0;

        function delayDone () {
            gameState.player.body.setSize(33, 50);
            gameState.player.body.setOffset(16, 12);
        }

        gameState.player.setCollideWorldBounds(true);

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

        gameState.cursors = this.input.keyboard.createCursorKeys();

        gameState.skeletons = this.physics.add.group();
        function skeletonGen() {
            if (gameState.positionReached) {
                const xCoord = Math.random() * 1920;
                const yCoord = Math.random() * 1920;
                const offsetX = Math.abs(xCoord - gameState.player.body.x);
                const offsetY = Math.abs(yCoord - gameState.player.body.y);    
                
                if (offsetX > 70 && offsetY > 70) {
                    gameState.skeletons.create(xCoord, yCoord, 'skeleton', 18).setScale(.55);
                }
            }
        }   
        
        this.add.image(422, 80, 'dialog').setScale(.6);
        this.add.text(320, 60, "Welcome to my game!!\nYou can walk with the arrow keys\nTo shoot a shuriken, press the Space bar\nDoesn't work? Try picking up this one!", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' })
        gameState.shurikenDrop = this.physics.add.group();
        const startingShuriken = gameState.shurikenDrop.create(423, 147, 'shuriken', 0).setScale(2);
        startingShuriken.play('shuriken');

        this.add.image(950, 143, 'dialog').setScale(.7);
        this.add.text(830, 122, "You can hide behind rocks. Why? Wait to find out!\nYou may have noticed the hearts on the bottom left.\nThe red hearts are your HP.\nPick up the heart and see what happens.", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' })
        this.add.text
        gameState.singleHearts = this.physics.add.group();
        gameState.singleHearts.create(945, 69, 'singleHeart', 0).setScale(.8);

        this.add.image(820, 475, 'dialog').setScale(.6);
        this.add.text(714, 455, "This is a skeleton.They have taken over the land!\nDon't get too close, you will lose a heart.\nTry shooting it with your shuriken...\nSometimes they drop valuable items.", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' })
        gameState.skeletons.create(792, 408, 'skeleton', 18).setScale(.55);

        this.add.image(565, 620, 'dialog').setScale(.5);
        this.add.text(476, 600, "You are now ready for your first Level!\nGo further down.\nThe skeletons will appear.\nOh yeah, they shoot fireballs!", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' });

        gameState.skeletonGenLoop = this.time.addEvent({
            delay: 2000,
            callback: skeletonGen,
            callbackScope: this,
            loop: true
        });

        gameState.scoreTextEvent = this.time.addEvent({
            delay: 1000,
            callback: updateScore,
            callbackScope: this,
            loop: true
        });

        function updateScore() {
            if (gameState.positionReached) {
                gameState.score++;
                gameState.scoreText.setText(`Score: ${gameState.score}\nLevel: ${gameState.currentLevel}\nSkeletons left: ${gameState.skeletonsLeft}`);
            }
        }


        this.physics.add.collider(gameState.player, gameState.skeletons, (player, skeleton) => {
            gameState.lives -= 1;
            skeleton.destroy();
            gameState.skeletonsLeft--;
            updateScore();
        });

        gameState.skeletonAttack = this.physics.add.group();

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
                if (randomNumber === 3) {
                    gameState.singleHearts.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2) {
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

        gameState.startingMap = this.add.tilemap('startingMap', 16, 16, 60, 40);
        let terrain = gameState.startingMap.addTilesetImage('overworld', 'terrain');

        gameState.botLayerStartingMap = gameState.startingMap.createStaticLayer('bottom', [terrain], 0, 0).setDepth(-1);
        gameState.topLayerStartingMap = gameState.startingMap.createStaticLayer('top', [terrain], 0, 0).setDepth(-1);

        this.physics.add.collider(gameState.player, gameState.topLayerStartingMap);
        this.physics.add.collider(gameState.skeletons, gameState.topLayerStartingMap);
        this.physics.add.collider(gameState.skeletonAttack, gameState.topLayerStartingMap, (fireball) => {
            fireball.destroy();
        });
        gameState.topLayerStartingMap.setCollisionByProperty({collision: true});

    }

    update() {

        if (gameState.player.body.y > gameState.startLoopPos) {
            gameState.positionReached = true;
        }
    
        if (gameState.active === true) {
            if (gameState.cursors.down.isDown) {
                gameState.player.play('walkDown', true);
                gameState.player.setVelocityY(80);
                gameState.player.setVelocityX(0);
            } else if (gameState.cursors.up.isDown) {
                gameState.player.setVelocityY(-80);
                gameState.player.play('walkUp', true);
                gameState.player.setVelocityX(0);
            } else {
                gameState.player.setVelocityY(0);
            }
            
            if (gameState.cursors.left.isDown) {
                gameState.player.setVelocityX(-80);
                gameState.player.setVelocityY(0);
                gameState.player.play('walkLeft', true);
            } else if (gameState.cursors.right.isDown) {
                gameState.player.setVelocityX(80);
                gameState.player.setVelocityY(0);
                gameState.player.play('walkRight', true);
            } else {
                gameState.player.setVelocityX(0);
            }
        }
        if (gameState.player.body.velocity.x === 0 && gameState.player.body.velocity.y === 0) {
            gameState.player.play('idle', true)
        }
    
        if (gameState.active) {
            if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space) && gameState.shuriken.getLength() < gameState.shuriken.maxSize) {
                
                let newShuriken = gameState.shuriken.create(gameState.player.x, gameState.player.y, 'shuriken', 0);
                if (gameState.player.body.velocity.x > 0) {
                    newShuriken.setVelocityX(100);
                    newShuriken.play('shuriken', true);
                } else if (gameState.player.body.velocity.x < 0) {
                    newShuriken.setVelocityX(-100);
                    newShuriken.play('shuriken', true);
                } else if (gameState.player.body.velocity.y > 0) {
                    newShuriken.setVelocityY(100);
                    newShuriken.play('shuriken', true);
                } else if (gameState.player.body.velocity.y < 0) {
                    newShuriken.setVelocityY(-100);
                    newShuriken.play('shuriken', true);
                } else {
                    newShuriken.setVelocityY(100);
                    newShuriken.play('shuriken', true);
                }
            }
        }
    
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
    
        gameState.singleHearts.getChildren().forEach(heart => {
            if (gameState.active === false) {
                heart.destroy();
            }
        })
    
        gameState.skeletons.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            if (gameState.positionReached) {
                this.physics.moveToObject(skeleton, gameState.player, 10)
    
                if (skeleton.body.velocity.x > 0) {
                    skeleton.play('skeletonRight', true);
                } else if (skeleton.body.velocity.x < 0) {
                    skeleton.play('skeletonLeft', true);
                }
    
                let randNum = Math.floor(Math.random() * 1000)
                if (randNum === 1) {
                    if (skeleton.body.velocity.x > 0) {
                        skeleton.play('skeletonCastRight', true);
                        const newFireBall = gameState.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.3).play('fireballRight', true);
                        this.physics.moveToObject(newFireBall, gameState.player, 70);
                        newFireBall.play('fireballRight', true);
                    } else if (skeleton.body.velocity.x < 0) {
                        skeleton.play('skeletonCastLeft', true);
                        const newFireBall = gameState.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.3).play('fireballLeft', true);
                        this.physics.moveToObject(newFireBall, gameState.player, 70);
                        newFireBall.play('fireballLeft', true);
                    }
                }
            }
    
            if (gameState.active === false) {
                skeleton.destroy();
            }
    
        });
    
        gameState.skeletonAttack.getChildren().forEach(fireball => {
            fireball.body.setSize(58, 20);
            fireball.body.setOffset(0,20);
    
            if (gameState.active === false) {
                fireball.destroy();
            }
        });
    
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