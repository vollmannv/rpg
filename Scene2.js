const gameState2 = {
    counter: 0,
    active: true,
    score: 0,
    startLoopPos: 70,
    positionReached: false
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
            key: 'walkDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerShoes', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'walkUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerShoes', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'walkLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerShoes', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'walkRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerShoes', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'idle',
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
        this.physics.world.setBounds(0, 0, 1920, 1920);
        gameState2.lives = 2;
        gameState2.currentLevel = 1;
        gameState2.skeletonsLeft = 1;
        gameState2.cursors = this.input.keyboard.createCursorKeys();

        //player camera and worldbounds setup
        this.cameras.main.setBounds(0,0,1920,1920)
        this.cameras.main.startFollow(gameState2.player, 480, 320);
        gameState2.player.setCollideWorldBounds(true);

        //adds different physics groups
        gameState2.shuriken = this.physics.add.group();
        gameState2.shuriken.maxSize = 0;
        gameState2.skeletons = this.physics.add.group();
        gameState2.skeletonAttack = this.physics.add.group();

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
            if (gameState2.positionReached) {
                const xCoord = Math.random() * 1920;
                const yCoord = Math.random() * 1920;
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
            if (gameState2.positionReached) {
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
                if (randomNumber === 3) {
                    gameState2.singleHearts.create(skeleton.x, skeleton.y, 'singleHeart').setScale(.35);
                }
            }
            if (randomNumber === 2) {
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

    }

    update () {



    }

}