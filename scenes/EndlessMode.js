class Endless extends Phaser.Scene {

    constructor () {

        super("Endless");

    }

    init () {

    }

    preload () {

    }

    create () {

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

        //adds player to screen
        this.player = this.physics.add.sprite(100, 100, 'player', 18).setScale(.7);
        this.player.play('walkDown', true);

        //adds map to screen
        this.map = this.add.tilemap('endlessMap', 16, 16, 160,160);
        let terrain = this.map.addTilesetImage('overworld', 'terrain');
        this.layer = this.map.createStaticLayer('layer', [terrain], 0 ,0).setDepth(-1);

        this.input.on('pointerup', () => {
            this.scene.pause();
            this.scene.launch('Shop');
        }, this);

    }

    update () {
        
    }

}