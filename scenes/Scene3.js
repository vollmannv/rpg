const gameState3 = {
    counter: 0,
    active: true,
    startLoopPos: 250,
    positionReached: false,
    pauseOn: false
}

class Scene3 extends Phaser.Scene {
    constructor () {
        super("Level 3");
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
            key: 'playerShoesHurtPants',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerShoesHurtPants', {start: 0, end: 5})
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
            key: 'skeletonUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('skeleton', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'skeletonDown',
            repeat: -1,
            frameRate: 10,
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

        //adds player
        gameState3.player = this.physics.add.sprite(200, 180, 'playerShoesPants', 18).setScale(.7);

        //setup
        this.physics.world.setBounds(0, 0, 1280, 1280);
        gameState3.lives = 3;
        gameState3.currentLevel = 1;
        gameState3.skeletonsLeft = 25;
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
        gameState3.skeletons.maxSize = 50;
        gameState3.skeletonAttack = this.physics.add.group();
        gameState3.singleHearts = this.physics.add.group();
        gameState3.shurikenDrop = this.physics.add.group();
        gameState3.pauseGroup = this.add.group();

        //adds GUI
        gameState3.hearts = this.add.sprite(70, 470, 'hearts', 0);
        gameState3.hearts.setScrollFactor(0);
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
                
                if (offsetX > 70 && offsetY > 70) {
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
                this.scene.start("Level 1");
                gameState.active = true;
            }
        });

        //adds dialogue boxes
        //gameState3.levelDialogueImage = this.add.image(gameState3.player.body.x, gameState3.player.body.y -70, 'dialog').setScale(.6);
        //gameState3.levelDialogueText = this.add.text(gameState3.player.body.x - 105, gameState3.player.body.y -90, "Welcome to the third Level!!\nThis level is going to be harder, but maybe you\nhave noticed your new awesome shoes.\nThey make you run and shoot faster! Good luck!", { fontSize: '8px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black', fontAlign: 'center' });

    }

    update () {

    }

}