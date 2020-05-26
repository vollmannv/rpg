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
    updateShuriken: false,
    currentWave: 1,
    maxEnemies: 20,
    enemyCount: 0,
    enemiesKilled: 0,
    skeletonNormalSpawnRate: 5000,
    skeletonArmorSpawnRate: 0,
    skeletonHatSpawnRate: 0,
    score: 0,
    pauseOn: false
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
        globals.scoreText = this.add.text(10,400, '',{ fontSize: '20px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0).setScrollFactor(0);
        this.lives = 3;

        //adds physics groups
        this.shurikenBlack = this.physics.add.group();
        this.shurikenBlue = this.physics.add.group();
        this.heartDrops = this.physics.add.group();
        this.pauseGroup = this.add.group();
        this.shurikenBlackGUI = this.add.group();
        this.shurikenBlueGUI = this.add.group();
        globals.skeletonsNormal = this.physics.add.group();
        globals.skeletonsArmor = this.physics.add.group();
        globals.skeletonsSmall = this.physics.add.group();
        globals.skeletonAttack = this.physics.add.group();
        this.chestsBlue = this.physics.add.group();
        this.chestsGreen = this.physics.add.group();
        this.chestsRed = this.physics.add.group();

        //adds player to screen
        globals.player = this.physics.add.sprite(100, 100, 'player', 18).setScale(.7);
        globals.player.setCollideWorldBounds(true);
        globals.player.setOrigin(0,0);

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
        this.cameras.main.startFollow(globals.player, 480, 320);
        this.physics.world.setBounds(0,0,1500,1500);

        //GUI
        this.GUIHearts = this.add.sprite(70, 470, 'hearts', 0).setScrollFactor(0);
        globals.GUICoins = this.add.sprite(10, 10, 'coin').setOrigin(0,0).setScale(1.7).setScrollFactor(0);
        globals.GUIGems = this.add.sprite(10, 45, 'gem').setOrigin(0,0).setScale(1.7).setScrollFactor(0);
        updateMoney(this);
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
        this.physics.add.collider(globals.player, this.shop, () => {
            if (this.cursors.down.isDown) {
                this.cursors.down.isDown = false;
                globals.player.play('idle', true);
                globals.player.setVelocityY(0);
            } else if (this.cursors.up.isDown) {
                this.cursors.up.isDown = false;
                globals.player.play('playerIdleUp', true);
                globals.player.setVelocityY(0);
            } else if (this.cursors.left.isDown) {
                this.cursors.left.isDown = false;
                globals.player.play('playerIdleLeft', true);
                globals.player.setVelocityX(0);
            } else if (this.cursors.right.isDown) {
                this.cursors.right.isDown = false;
                globals.player.play('playerIdleRight', true);
                globals.player.setVelocityX(0);
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
            globals.player.body.setSize(33, 50);
            globals.player.body.setOffset(16, 12);
            for (let i = 0; i < globals.clothes.length; i++) {
                globals.clothes[i].body.setSize(33, 50);
                globals.clothes[i].body.setOffset(16, 12);
            }
        }
        
        //adds updateText Method
        function updateMoney (scene) {
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

        //adds wave text
        this.scoreTextEvent = this.time.addEvent({
            delay: 1000,
            callback: updateScore,
            callbackScope: this,
            loop: true
        });
        function updateScore() {
            if (globals.pauseOn === false) {
                globals.score++;
                globals.scoreText.setText(`Score: ${globals.score}\nWave: ${globals.currentWave}`);
            }
        }

        //skeleton gen
        this.normalSkeletonLoop = this.time.addEvent({
            delay: 1000,
            callback: skeletonGen,
            callbackScope: this,
            loop: true
        });
        this.armorSkeletonLoop = this.time.addEvent({
            delay: 1000,
            callback: skeletonArmorGen,
            callbackScope: this,
            loop: true
        });
        this.smallSkeletonLoop = this.time.addEvent({
            delay: 1000,
            callback: skeletonSmallGen,
            callbackScope: this,
            loop: true
        });

        function skeletonGen () {
            let x = Math.floor(Math.random()*1500);
            let y = Math.floor(Math.random()*1500);
            let playerX = globals.player.body.x;
            let playerY = globals.player.body.y;
            if (x <= playerX) {
                x -= - 100;
            } else if (x > playerX) {
                x += 100;
            }
            if (y <= playerY) {
                y -= 100;
            } else if (y > playerY) {
                y += 100;
            }
            
            if (globals.enemyCount < globals.maxEnemies) {
                globals.skeletonsNormal.create(x, y, 'skeleton', 18).setScale(.55);
                globals.enemyCount++;
            }
        }
        function skeletonArmorGen () {
            let x = Math.floor(Math.random()*1500);
            let y = Math.floor(Math.random()*1500);
            let playerX = globals.player.body.x;
            let playerY = globals.player.body.y;
            if (x <= playerX) {
                x -= - 100;
            } else if (x > playerX) {
                x += 100;
            }
            if (y <= playerY) {
                y -= 100;
            } else if (y > playerY) {
                y += 100;
            }
            
            if (globals.currentWave > 4) {
                if (globals.enemyCount < globals.maxEnemies) {
                    var newSkeleton = globals.skeletonsArmor.create(x, y, 'skeletonArmor', 18).setScale(.9);
                    newSkeleton.setData('health', 2);
                    globals.enemyCount++;
                }
            }
        }
        function skeletonSmallGen () {
            let x = Math.floor(Math.random()*1500);
            let y = Math.floor(Math.random()*1500);
            let playerX = globals.player.body.x;
            let playerY = globals.player.body.y;
            if (x <= playerX) {
                x -= - 100;
            } else if (x > playerX) {
                x += 100;
            }
            if (y <= playerY) {
                y -= 100;
            } else if (y > playerY) {
                y += 100;
            }
            if (globals.currentWave > 2) {
                if (globals.enemyCount < globals.maxEnemies) {
                    globals.skeletonsSmall.create(x, y, 'skeletonHat', 18).setScale(.4);
                    globals.enemyCount++;
                }
            }
        }

        //sets collisions
        this.physics.add.collider(globals.player, globals.skeletonsNormal, (player, skeleton) => {
            this.lives--;
            skeleton.destroy();
            globals.enemiesKilled++;
        });
        this.physics.add.collider(globals.player, globals.skeletonsArmor, (player, skeleton) => {
            this.lives -= 2;
            skeleton.destroy();
            globals.enemiesKilled++;
        });
        this.physics.add.collider(globals.player, globals.skeletonsSmall, (player, skeleton) => {
            this.lives--;
            skeleton.destroy();
            globals.enemiesKilled++;
        })
        
        this.physics.add.collider(globals.player, globals.skeletonAttack, (player, fireball) => {
            this.lives--;
            fireball.destroy();
        });
        
        this.physics.add.collider(globals.skeletonsNormal, this.shurikenBlack, (skeleton, shuriken) => {
            skeleton.destroy();
            shuriken.destroy();
            this.shurikenBlackGUI.create(15*(this.shurikenBlack.maxSize-this.shurikenBlack.getLength()-1)+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            
            globals.score += 10;
            
            const randomNumber = Math.floor(Math.random() * 10);
            if (this.lives < globals.maxLives) {
                if (randomNumber === 1) {
                    this.heartDrops.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2 || randomNumber === 3 || randomNumber === 4) {
                this.chestsBlue.create(skeleton.x, skeleton.y, 'chestBlue').setScale(.7);
            } else if (randomNumber === 5 || randomNumber === 6) {
                this.chestsGreen.create(skeleton.x, skeleton.y, 'chestGreen').setScale(.7);
            } else if (randomNumber === 7) {
                this.chestsRed.create(skeleton.x, skeleton.y, 'chestRed').setScale(.7);
            }         
            globals.enemiesKilled++;
            updateScore();
        });

        this.physics.add.collider(globals.skeletonsArmor, this.shurikenBlack, (skeleton, shuriken) => {
            
            let health = skeleton.getData('health');
            health--;
            skeleton.setData('health', health);
            if (health === 0) {
                skeleton.destroy();
                globals.score += 50;
                    
                const randomNumber = Math.floor(Math.random() * 10);
                if (this.lives < globals.maxLives) {
                    if (randomNumber === 1) {
                        this.heartDrops.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                    }
                }
                if (randomNumber === 2 || randomNumber === 3 || randomNumber === 4) {
                    this.chestsBlue.create(skeleton.x, skeleton.y, 'chestBlue').setScale(.7);
                } else if (randomNumber === 5 || randomNumber === 6) {
                    this.chestsGreen.create(skeleton.x, skeleton.y, 'chestGreen').setScale(.7);
                } else if (randomNumber === 7) {
                    this.chestsRed.create(skeleton.x, skeleton.y, 'chestRed').setScale(.7);
                }
                    
                globals.enemesKilled++;
                updateScore();
            }
            shuriken.destroy();
            this.shurikenBlackGUI.create(15*(this.shurikenBlack.maxSize-this.shurikenBlack.getLength()-1)+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
        });

        this.physics.add.collider(globals.skeletonsSmall, this.shurikenBlack, (skeleton, shuriken) => {
            skeleton.destroy();
            shuriken.destroy();
            this.shurikenBlackGUI.create(15*(this.shurikenBlack.maxSize-this.shurikenBlack.getLength()-1)+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            
            globals.score += 10;
            
            const randomNumber = Math.floor(Math.random() * 10);
            if (this.lives < globals.maxLives) {
                if (randomNumber === 1) {
                    this.heartDrops.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2 || randomNumber === 3 || randomNumber === 4) {
                this.chestsBlue.create(skeleton.x, skeleton.y, 'chestBlue').setScale(.7);
            } else if (randomNumber === 5 || randomNumber === 6) {
                this.chestsGreen.create(skeleton.x, skeleton.y, 'chestGreen').setScale(.7);
            } else if (randomNumber === 7) {
                this.chestsRed.create(skeleton.x, skeleton.y, 'chestRed').setScale(.7);
            }
            
            globals.enemiesKilled++;
            updateScore();
        });

        this.physics.add.collider(globals.skeletonsNormal, this.shurikenBlue, (skeleton, shuriken) => {
            skeleton.destroy();
            globals.score += 10;
            
            const randomNumber = Math.floor(Math.random() * 10);
            if (this.lives < globals.maxLives) {
                if (randomNumber === 1) {
                    this.heartDrops.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2 || randomNumber === 3 || randomNumber === 4) {
                this.chestsBlue.create(skeleton.x, skeleton.y, 'chestBlue').setScale(.7);
            } else if (randomNumber === 5 || randomNumber === 6) {
                this.chestsGreen.create(skeleton.x, skeleton.y, 'chestGreen').setScale(.7);
            } else if (randomNumber === 7) {
                this.chestsRed.create(skeleton.x, skeleton.y, 'chestRed').setScale(.7);
            }         
            globals.enemiesKilled++;
            updateScore();
        });

        this.physics.add.collider(globals.skeletonsArmor, this.shurikenBlue, (skeleton, shuriken) => {
            
            let health = skeleton.getData('health');
            health--;
            skeleton.setData('health', health);
            if (health === 0) {
                skeleton.destroy();
                globals.score += 50;
                    
                const randomNumber = Math.floor(Math.random() * 10);
                if (this.lives < globals.maxLives) {
                    if (randomNumber === 1) {
                        this.heartDrops.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                    }
                }
                if (randomNumber === 2 || randomNumber === 3 || randomNumber === 4) {
                    this.chestsBlue.create(skeleton.x, skeleton.y, 'chestBlue').setScale(.7);
                } else if (randomNumber === 5 || randomNumber === 6) {
                    this.chestsGreen.create(skeleton.x, skeleton.y, 'chestGreen').setScale(.7);
                } else if (randomNumber === 7) {
                    this.chestsRed.create(skeleton.x, skeleton.y, 'chestRed').setScale(.7);
                }
                    
                globals.enemesKilled++;
                updateScore();
            }
        });

        this.physics.add.collider(globals.skeletonsSmall, this.shurikenBlue, (skeleton, shuriken) => {
            skeleton.destroy();
            globals.score += 10;
            
            const randomNumber = Math.floor(Math.random() * 10);
            if (this.lives < globals.maxLives) {
                if (randomNumber === 1) {
                    this.heartDrops.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2 || randomNumber === 3 || randomNumber === 4) {
                this.chestsBlue.create(skeleton.x, skeleton.y, 'chestBlue').setScale(.7);
            } else if (randomNumber === 5 || randomNumber === 6) {
                this.chestsGreen.create(skeleton.x, skeleton.y, 'chestGreen').setScale(.7);
            } else if (randomNumber === 7) {
                this.chestsRed.create(skeleton.x, skeleton.y, 'chestRed').setScale(.7);
            }
            
            globals.enemiesKilled++;
            updateScore();
        });

        this.physics.add.collider(globals.player, this.heartDrops, (player, heart) => {
            heart.destroy();
            this.lives++;
        });

        this.physics.add.collider(globals.player, this.chestsBlue, (player, chest) => {
            const coinIncrease = Math.floor(Math.random() * 10);
            const gemIncrease = Math.floor(Math.random() * 3);
            globals.coins += coinIncrease;
            globals.gems += gemIncrease;
            chest.destroy();
            updateMoney(this);
        });
        this.physics.add.collider(globals.player, this.chestsGreen, (player, chest) => {
            const coinIncrease = Math.floor(Math.random() * 30);
            const gemIncrease = Math.floor(Math.random() * 6);
            globals.coins += coinIncrease;
            globals.gems += gemIncrease;
            chest.destroy();
            updateMoney(this);
        });
        this.physics.add.collider(globals.player, this.chestsRed, (player, chest) => {
            const coinIncrease = Math.floor(Math.random() * 50);
            const gemIncrease = Math.floor(Math.random() * 10);
            globals.coins += coinIncrease;
            globals.gems += gemIncrease;
            chest.destroy();
            updateMoney(this);
        });
    }
    
    update () {
        

        //spawnRates on waves
        this.normalSkeletonLoop.delay = globals.skeletonNormalSpawnRate;
        this.armorSkeletonLoop.delay = globals.skeletonArmorSpawnRate;
        this.smallSkeletonLoop.delay = globals.skeletonSmallSpawnRate;
        globals.skeletonNormalSpawnRate = 6000;
        globals.skeletonArmorSpawnRate = 12000;
        globals.skeletonSmallSpawnRate = 6000;
        if (globals.currentWave === 1) {
            if (globals.enemiesKilled*2 >= globals.maxEnemies) {
                globals.currentWave++;
                globals.enemiesKilled = 0;
                globals.maxEnemies = 0;
                globals.enemyCount = 0;
            }
        } else if (globals.currentWave === 2) {
            if (globals.maxEnemies === 0) {
                globals.maxEnemies = 36;
            }
            if (globals.enemiesKilled*2 >= globals.maxEnemies) {
                globals.currentWave++;
                globals.enemiesKilled = 0;
                globals.maxEnemies = 0;
                globals.enemyCount = 0;
            }
        } else if (globals.currentWave === 3) {
            if (globals.maxEnemies === 0) {
                globals.maxEnemies = 60;
            }
            if (globals.enemiesKilled*2 >= globals.maxEnemies) {
                globals.currentWave++;
                globals.enemiesKilled = 0;
                globals.maxEnemies = 0;
                globals.enemyCount = 0;
            }
        } else if (globals.currentWave === 4) {
            if (globals.maxEnemies === 0) {
                globals.maxEnemies = 86;
            }
            if (globals.enemiesKilled*2 >= globals.maxEnemies) {
                globals.currentWave++;
                globals.enemiesKilled = 0;
                globals.maxEnemies = 0;
                globals.enemyCount = 0;
            }
        } else if (globals.currentWave === 5) {
            if (globals.maxEnemies === 0) {
                globals.maxEnemies = 140;
            }
            if (globals.enemiesKilled*2 >= globals.maxEnemies) {
                globals.currentWave++;
                globals.enemiesKilled = 0;
                globals.maxEnemies = 0;
                globals.enemyCount = 0;
            }
        } else if (globals.currentWave === 6) {
            if (globals.maxEnemies === 0) {
                globals.maxEnemies = 180;
            }

            if (globals.enemiesKilled*2 >= globals.maxEnemies) {
                globals.currentWave++;
                globals.enemiesKilled = 0;
                globals.maxEnemies = 0;
                globals.enemyCount = 0;
            }
        } else if (globals.currentWave > 6) {
            if (globals.maxEnemies === 0) {
                globals.maxEnemies = globals.currentWave * 40;
            }
            if (globals.enemiesKilled*2 >= globals.maxEnemies) {
                globals.currentWave++;
                globals.enemiesKilled = 0;
                globals.maxEnemies = 0;
                globals.enemyCount = 0;
            }
        }
        

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
            globals.player.play('walkDown', true);
            globals.player.setVelocityY(80*globals.speed);
            globals.player.setVelocityX(0);
        } else if (this.cursors.up.isDown) {
            globals.player.setVelocityY(-80*globals.speed);
            globals.player.play('walkUp', true);
            globals.player.setVelocityX(0);
        } else if (this.cursors.left.isDown) {
            globals.player.setVelocityX(-80*globals.speed);
            globals.player.setVelocityY(0);
            globals.player.play('walkLeft', true);
        } else if (this.cursors.right.isDown) {
            globals.player.setVelocityX(80*globals.speed);
            globals.player.setVelocityY(0);
            globals.player.play('walkRight', true);
        }
        
        //player idle when not moving
        if (this.cursors.left.isUp) {
            if (globals.player.body.velocity.x < 0) {
                globals.player.setVelocityX(-0.001);
                globals.player.play('playerIdleLeft', true);
                globals.player.setTexture('player', 9);
            }
        }
        if (this.cursors.right.isUp) {
            if (globals.player.body.velocity.x > 0) {
                globals.player.setVelocityX(0.001);
                globals.player.play('playerIdleRight', true);
                globals.player.setTexture('player', 27);
            }
        }
        if (this.cursors.up.isUp) {
            if (globals.player.body.velocity.y < 0) {
                globals.player.setVelocityY(-0.001);
                globals.player.play('playerIdleUp', true);
                globals.player.setTexture('player', 1);
            }
        }
        if (this.cursors.down.isUp) {
            if (globals.player.body.velocity.y > 0) {
                globals.player.setVelocityY(0);
                globals.player.play('idle', true);
            }
        }
        
        //checks for clothes
        for (let i = 0; i < globals.activeClothes.length; i++) {
            let clothes = globals.activeClothes[i]
            clothes.setVisible(true);
            clothes.setVelocityX(globals.player.body.velocity.x);
            clothes.setVelocityY(globals.player.body.velocity.y);
            clothes.setX(globals.player.x);
            clothes.setY(globals.player.y);
            let name = clothes.name;
            if (globals.player.anims.currentAnim) {
                if (globals.player.anims.currentAnim.key === 'walkRight') {
                    clothes.play(`${name}Right`, true);
                } else if (globals.player.anims.currentAnim.key === 'walkLeft') {
                    clothes.play(`${name}Left`, true);
                } else if (globals.player.anims.currentAnim.key === 'walkDown') {
                    clothes.play(`${name}Down`, true);
                } else if (globals.player.anims.currentAnim.key === 'walkUp') {
                    clothes.play(`${name}Up`, true);
                } else if (globals.player.anims.currentAnim.key === 'playerIdleRight') {
                    clothes.play(`${name}IdleRight`, true);
                } else if (globals.player.anims.currentAnim.key === 'playerIdleLeft') {
                    clothes.play(`${name}IdleLeft`, true);
                } else if (globals.player.anims.currentAnim.key === 'playerIdleUp') {
                    clothes.play(`${name}IdleUp`, true);
                } else if (globals.player.anims.currentAnim.key === 'playerHurt') {
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
                    let newShuriken = this.shurikenBlack.create(globals.player.body.x+4, globals.player.body.y+14, 'shuriken', 0).setOrigin(0,0);
                    this.shurikenBlackGUI.getLast(true).destroy();
                    if (globals.player.body.velocity.x > 0) {
                        newShuriken.setVelocityX(150*globals.speed);
                        newShuriken.play('shuriken', true);
                    } else if (globals.player.body.velocity.x < 0) {
                        newShuriken.setVelocityX(-150*globals.speed);
                        newShuriken.play('shuriken', true);
                    } else if (globals.player.body.velocity.y > 0) {
                        newShuriken.setVelocityY(150*globals.speed);
                        newShuriken.play('shuriken', true);
                    } else if (globals.player.body.velocity.y < 0) {
                        newShuriken.setVelocityY(-150*globals.speed);
                        newShuriken.play('shuriken', true);
                    } else {
                        newShuriken.setVelocityY(150*globals.speed);
                        newShuriken.play('shuriken', true);
                    }
                }
            } else if (globals.currentShuriken === 'blue') {
                if (this.shurikenBlue.getLength() < this.shurikenBlue.maxSize) {
                    let newShuriken = this.shurikenBlue.create(globals.player.body.x+4, globals.player.body.y+14, 'shurikenBlue', 0).setOrigin(0,0);
                    this.shurikenBlueGUI.getLast(true).destroy();
                    if (globals.player.body.velocity.x > 0) {
                        newShuriken.setVelocityX(200*globals.speed);
                        newShuriken.play('shurikenBlue', true);
                    } else if (globals.player.body.velocity.x < 0) {
                        newShuriken.setVelocityX(-200*globals.speed);
                        newShuriken.play('shurikenBlue', true);
                    } else if (globals.player.body.velocity.y > 0) {
                        newShuriken.setVelocityY(200*globals.speed);
                        newShuriken.play('shurikenBlue', true);
                    } else if (globals.player.body.velocity.y < 0) {
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
            if (shuriken.y > (globals.player.body.y + 350 )) {
                shuriken.destroy();
                this.shurikenBlackGUI.create(15*(this.shurikenBlack.maxSize-this.shurikenBlack.getLength()-1)+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.y < (globals.player.body.y - 250)) {
                shuriken.destroy();
                this.shurikenBlackGUI.create(15*(this.shurikenBlack.maxSize-this.shurikenBlack.getLength()-1)+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.x > (globals.player.body.x + 350)) {
                shuriken.destroy();
                this.shurikenBlackGUI.create(15*(this.shurikenBlack.maxSize-this.shurikenBlack.getLength()-1)+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.x < (globals.player.body.x + -350)) {
                shuriken.destroy();
                this.shurikenBlackGUI.create(15*(this.shurikenBlack.maxSize-this.shurikenBlack.getLength()-1)+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            }
        });
        this.shurikenBlue.getChildren().forEach(shuriken => {
    
            shuriken.body.setSize(12,12);
    
            shuriken.body.setCollideWorldBounds(false);
            if (shuriken.y > (globals.player.body.y + 350 )) {
                shuriken.destroy();
                this.shurikenBlueGUI.create(15*(this.shurikenBlue.maxSize-this.shurikenBlue.getLength()-1)+10, 110, 'shurikenBlue').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.y < (globals.player.body.y - 250)) {
                shuriken.destroy();
                this.shurikenBlueGUI.create(15*(this.shurikenBlue.maxSize-this.shurikenBlue.getLength()-1)+10, 110, 'shurikenBlue').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.x > (globals.player.body.x + 350)) {
                shuriken.destroy();
                this.shurikenBlueGUI.create(15*(this.shurikenBlue.maxSize-this.shurikenBlue.getLength()-1)+10, 110, 'shurikenBlue').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            } else if (shuriken.x < (globals.player.body.x + -350)) {
                shuriken.destroy();
                this.shurikenBlueGUI.create(15*(this.shurikenBlue.maxSize-this.shurikenBlue.getLength()-1)+10, 110, 'shurikenBlue').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            }
        });

        //skeleton mechanics
        globals.skeletonsNormal.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            this.physics.moveToObject(skeleton, globals.player, 15);
    
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
    
            let randNum = Math.floor(Math.random() * 645)
            if (randNum === 1) {
                if (Math.abs(skeleton.body.velocity.x) > Math.abs(skeleton.body.velocity.y)) {
                    if (skeleton.body.velocity.x > 0) {
                        const newFireBall = globals.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.3);
                        newFireBall.setVelocityX(90);
                        newFireBall.play('fireballRight', true);
                    } else if (skeleton.body.velocity.x < 0) {
                        const newFireBall = globals.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.3);
                        newFireBall.setVelocityX(-90);
                        newFireBall.play('fireballLeft', true);
                    }
                } else {
                    if (skeleton.body.velocity.y > 0) {
                        const newFireBall = globals.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.4);
                        newFireBall.setVelocityY(90);
                        newFireBall.play('fireballDown', true);
                    } else if (skeleton.body.velocity.y < 0) {
                        const newFireBall = globals.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.4);
                        newFireBall.setVelocityY(-90);
                        newFireBall.play('fireballUp', true);
                    }
                }
            }
        }
        });

        globals.skeletonsSmall.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            
            this.physics.moveToObject(skeleton, globals.player, 40);
    
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
        });

        globals.skeletonsArmor.getChildren().forEach(skeleton => {
    
            skeleton.body.setSize(30,50);
            skeleton.body.setOffset(17,15);
            this.physics.moveToObject(skeleton, globals.player, 5);
    
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
    
            let randNum = Math.floor(Math.random() * 700)
            if (randNum === 1) {
                if (Math.abs(skeleton.body.velocity.x) > Math.abs(skeleton.body.velocity.y)) {
                    if (skeleton.body.velocity.x > 0) {
                        const newFireBall = globals.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.6);
                        newFireBall.setVelocityX(90);
                        newFireBall.play('fireballRight', true);
                    } else if (skeleton.body.velocity.x < 0) {
                        const newFireBall = globals.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.6);
                        newFireBall.setVelocityX(-90);
                        newFireBall.play('fireballLeft', true);
                    }
                } else {
                    if (skeleton.body.velocity.y > 0) {
                        const newFireBall = globals.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 32).setScale(.7);
                        newFireBall.setVelocityY(90);
                        newFireBall.play('fireballDown', true);
                    } else if (skeleton.body.velocity.y < 0) {
                        const newFireBall = globals.skeletonAttack.create(skeleton.x, skeleton.y, 'fireball', 0).setScale(.7);
                        newFireBall.setVelocityY(-90);
                        newFireBall.play('fireballUp', true);
                    } 
                }
            }
        });

        globals.skeletonAttack.getChildren().forEach(fireball => {
            if (fireball.body.velocity.x > 0) {
                fireball.body.setSize(58, 20);
                fireball.body.setOffset(0,20);
            } else {
                fireball.body.setSize(20, 58);
                fireball.body.setOffset(20,5);
            }
        });

        //heartManagement
        if (this.lives === 15) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 0);
            this.extraHeart3.setTexture('extraHeart', 0);
            this.extraHeart4.setTexture('extraHeart', 0);
            this.extraHeart5.setTexture('extraHeart', 0);
            this.extraHeart6.setTexture('extraHeart', 0);
            this.extraHeart7.setTexture('extraHeart', 0);
            this.extraHeart8.setTexture('extraHeart', 0);
            this.extraHeart9.setTexture('extraHeart', 0);
            this.extraHeart10.setTexture('extraHeart', 0);
            this.extraHeart11.setTexture('extraHeart', 0);
            this.extraHeart12.setTexture('extraHeart', 0);
        } else if (this.lives === 14) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 0);
            this.extraHeart3.setTexture('extraHeart', 0);
            this.extraHeart4.setTexture('extraHeart', 0);
            this.extraHeart5.setTexture('extraHeart', 0);
            this.extraHeart6.setTexture('extraHeart', 0);
            this.extraHeart7.setTexture('extraHeart', 0);
            this.extraHeart8.setTexture('extraHeart', 0);
            this.extraHeart9.setTexture('extraHeart', 0);
            this.extraHeart10.setTexture('extraHeart', 0);
            this.extraHeart11.setTexture('extraHeart', 0);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 13) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 0);
            this.extraHeart3.setTexture('extraHeart', 0);
            this.extraHeart4.setTexture('extraHeart', 0);
            this.extraHeart5.setTexture('extraHeart', 0);
            this.extraHeart6.setTexture('extraHeart', 0);
            this.extraHeart7.setTexture('extraHeart', 0);
            this.extraHeart8.setTexture('extraHeart', 0);
            this.extraHeart9.setTexture('extraHeart', 0);
            this.extraHeart10.setTexture('extraHeart', 0);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 12) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 0);
            this.extraHeart3.setTexture('extraHeart', 0);
            this.extraHeart4.setTexture('extraHeart', 0);
            this.extraHeart5.setTexture('extraHeart', 0);
            this.extraHeart6.setTexture('extraHeart', 0);
            this.extraHeart7.setTexture('extraHeart', 0);
            this.extraHeart8.setTexture('extraHeart', 0);
            this.extraHeart9.setTexture('extraHeart', 0);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 11) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 0);
            this.extraHeart3.setTexture('extraHeart', 0);
            this.extraHeart4.setTexture('extraHeart', 0);
            this.extraHeart5.setTexture('extraHeart', 0);
            this.extraHeart6.setTexture('extraHeart', 0);
            this.extraHeart7.setTexture('extraHeart', 0);
            this.extraHeart8.setTexture('extraHeart', 0);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 10) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 0);
            this.extraHeart3.setTexture('extraHeart', 0);
            this.extraHeart4.setTexture('extraHeart', 0);
            this.extraHeart5.setTexture('extraHeart', 0);
            this.extraHeart6.setTexture('extraHeart', 0);
            this.extraHeart7.setTexture('extraHeart', 0);
            this.extraHeart8.setTexture('extraHeart', 1);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 9) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 0);
            this.extraHeart3.setTexture('extraHeart', 0);
            this.extraHeart4.setTexture('extraHeart', 0);
            this.extraHeart5.setTexture('extraHeart', 0);
            this.extraHeart6.setTexture('extraHeart', 0);
            this.extraHeart7.setTexture('extraHeart', 1);
            this.extraHeart8.setTexture('extraHeart', 1);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 8) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 0);
            this.extraHeart3.setTexture('extraHeart', 0);
            this.extraHeart4.setTexture('extraHeart', 0);
            this.extraHeart5.setTexture('extraHeart', 0);
            this.extraHeart6.setTexture('extraHeart', 1);
            this.extraHeart7.setTexture('extraHeart', 1);
            this.extraHeart8.setTexture('extraHeart', 1);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 7) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 0);
            this.extraHeart3.setTexture('extraHeart', 0);
            this.extraHeart4.setTexture('extraHeart', 0);
            this.extraHeart5.setTexture('extraHeart', 1);
            this.extraHeart6.setTexture('extraHeart', 1);
            this.extraHeart7.setTexture('extraHeart', 1);
            this.extraHeart8.setTexture('extraHeart', 1);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 6) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 0);
            this.extraHeart3.setTexture('extraHeart', 0);
            this.extraHeart4.setTexture('extraHeart', 1);
            this.extraHeart5.setTexture('extraHeart', 1);
            this.extraHeart6.setTexture('extraHeart', 1);
            this.extraHeart7.setTexture('extraHeart', 1);
            this.extraHeart8.setTexture('extraHeart', 1);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 5) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 0);
            this.extraHeart3.setTexture('extraHeart', 1);
            this.extraHeart4.setTexture('extraHeart', 1);
            this.extraHeart5.setTexture('extraHeart', 1);
            this.extraHeart6.setTexture('extraHeart', 1);
            this.extraHeart7.setTexture('extraHeart', 1);
            this.extraHeart8.setTexture('extraHeart', 1);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 4) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 0);
            this.extraHeart2.setTexture('extraHeart', 1);
            this.extraHeart3.setTexture('extraHeart', 1);
            this.extraHeart4.setTexture('extraHeart', 1);
            this.extraHeart5.setTexture('extraHeart', 1);
            this.extraHeart6.setTexture('extraHeart', 1);
            this.extraHeart7.setTexture('extraHeart', 1);
            this.extraHeart8.setTexture('extraHeart', 1);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 3) {
            this.GUIHearts.setTexture('hearts', 0);
            this.GUIHearts.setY(470);
            this.extraHeart1.setTexture('extraHeart', 1);
            this.extraHeart2.setTexture('extraHeart', 1);
            this.extraHeart3.setTexture('extraHeart', 1);
            this.extraHeart4.setTexture('extraHeart', 1);
            this.extraHeart5.setTexture('extraHeart', 1);
            this.extraHeart6.setTexture('extraHeart', 1);
            this.extraHeart7.setTexture('extraHeart', 1);
            this.extraHeart8.setTexture('extraHeart', 1);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 2) {
            this.GUIHearts.setTexture('hearts', 1);
            this.GUIHearts.setY(471);
            this.extraHeart1.setTexture('extraHeart', 1);
            this.extraHeart2.setTexture('extraHeart', 1);
            this.extraHeart3.setTexture('extraHeart', 1);
            this.extraHeart4.setTexture('extraHeart', 1);
            this.extraHeart5.setTexture('extraHeart', 1);
            this.extraHeart6.setTexture('extraHeart', 1);
            this.extraHeart7.setTexture('extraHeart', 1);
            this.extraHeart8.setTexture('extraHeart', 1);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 1) {
            this.GUIHearts.setTexture('hearts', 2);
            this.GUIHearts.setY(472);
            this.extraHeart1.setTexture('extraHeart', 1);
            this.extraHeart2.setTexture('extraHeart', 1);
            this.extraHeart3.setTexture('extraHeart', 1);
            this.extraHeart4.setTexture('extraHeart', 1);
            this.extraHeart5.setTexture('extraHeart', 1);
            this.extraHeart6.setTexture('extraHeart', 1);
            this.extraHeart7.setTexture('extraHeart', 1);
            this.extraHeart8.setTexture('extraHeart', 1);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
        } else if (this.lives === 0) {
            const levelDialog = this.add.image(globals.player.body.x, globals.player.body.y -70, 'dialog').setScale(.6);
            const levelText = this.add.text(globals.player.body.x -100, globals.player.body.y -85, 'Game Over!', { fontSize: '18px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            const levelText2 = this.add.text(globals.player.body.x -110, globals.player.body.y -65, 'reload webpage to restart.', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', textAlign: 'center' });
            this.GUIHearts.setTexture('hearts', 3);
            this.GUIHearts.setY(472);
            this.extraHeart1.setTexture('extraHeart', 1);
            this.extraHeart2.setTexture('extraHeart', 1);
            this.extraHeart3.setTexture('extraHeart', 1);
            this.extraHeart4.setTexture('extraHeart', 1);
            this.extraHeart5.setTexture('extraHeart', 1);
            this.extraHeart6.setTexture('extraHeart', 1);
            this.extraHeart7.setTexture('extraHeart', 1);
            this.extraHeart8.setTexture('extraHeart', 1);
            this.extraHeart9.setTexture('extraHeart', 1);
            this.extraHeart10.setTexture('extraHeart', 1);
            this.extraHeart11.setTexture('extraHeart', 1);
            this.extraHeart12.setTexture('extraHeart', 1);
            this.physics.pause();
            this.normalSkeletonLoop.destroy();
            this.armorSkeletonLoop.destroy();
            this.smallSkeletonLoop.destroy();
            this.scoreTextEvent.destroy();
            globals.player.play('playerHurt', true);
        }
        
    }   
}