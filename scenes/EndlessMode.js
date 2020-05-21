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
        this.anims.create({
            key: 'playerHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerHurt', {start: 0, end: 5})
        });
        
        //adds clothes animations
        this.anims.create({
            key: 'shoesBrownDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shoesBrown', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'shoesBrownUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shoesBrown', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'shoesBrownLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shoesBrown', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'shoesBrownRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shoesBrown', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'shoesBrownIdle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shoesBrown', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'shoesBrownIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shoesBrown', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'shoesBrownIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shoesBrown', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'shoesBrownIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shoesBrown', {start: 0, end: 1})
        });
        this.anims.create({
            key: 'shoesBrownHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shoesBrownHurt', {start: 0, end: 5})
        });


        this.anims.create({
            key: 'shuriken',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shuriken', {start: 0, end: 2})
        });
        //adds player to screen
        this.player = this.physics.add.sprite(100, 100, 'player', 18).setScale(.7);

        //adds cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        //adds map to screen
        this.map = this.add.tilemap('endlessMap', 16, 16, 160,160);
        let terrain = this.map.addTilesetImage('overworld', 'terrain');
        this.layer = this.map.createStaticLayer('layer', [terrain], 0, 0).setDepth(-1);
        this.shop = this.map.createStaticLayer('shop', [terrain], 0, 0).setDepth(-1);
        this.shop.setCollisionByProperty({collision: true});
        this.physics.add.collider(this.player, this.shop, () => {
            this.scene.pause();
            this.scene.launch('Shop');
        });

        //clothes array
        const shoesBrown = this.physics.add.sprite(0,0, 'shoesBrown', 18).setScale(.7).setVisible(false);
        shoesBrown.setOrigin(0,0);
        shoesBrown.setName('shoesBrown');
        this.activeClothes = [];
        //this.activeClothes.push(shoesBrown); 

    }

    update () {

        //checks for clothes
        
        for (let i = 0; i < this.activeClothes.length; i++) {
            let clothes = this.activeClothes[i]
            clothes.setVisible(true);
            clothes.setVelocityX(this.player.body.velocity.x);
            clothes.setVelocityY(this.player.body.velocity.y);
            clothes.setX(this.player.body.x);
            clothes.setY(this.player.body.y);
            let name = clothes.name;
            if (this.player.anims.currentAnim) {
                if (this.player.anims.currentAnim.key === 'walkRight') {
                    clothes.play(`${name}Right`, true);
                } else if (this.player.anims.currentAnim.key === 'walkLeft') {
                    clothes.play(`${name}Left`, true);
                } else if (this.player.anims.currentAnim.key === 'walkDown') {
                    clothes.play(`${name}Down`, true);
                } else if (this.player.anims.currentAnim.key === 'walkUp') {
                    clothes.play(`${name}Up`, true);
                } else if (this.player.anims.currentAnim.key === 'playerIdleRight') {
                    clothes.play(`${name}IdleRight`, true);
                } else if (this.player.anims.currentAnim.key === 'playerIdleLeft') {
                    clothes.play(`${name}IdleLeft`, true);
                } else if (this.player.anims.currentAnim.key === 'playerIdleUp') {
                    clothes.play(`${name}IdleUp`, true);
                } else if (this.player.anims.currentAnim.key === 'playerHurt') {
                    clothes.play(`${name}Hurt`, true);
                } else {
                    clothes.play(`${name}Idle`, true);
                }
            }
        }

        //makes player walk
        if (this.cursors.down.isDown) {
            this.player.play('walkDown', true);
            this.player.setVelocityY(80);
            this.player.setVelocityX(0);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-80);
            this.player.play('walkUp', true);
            this.player.setVelocityX(0);
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-80);
            this.player.setVelocityY(0);
            this.player.play('walkLeft', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(80);
            this.player.setVelocityY(0);
            this.player.play('walkRight', true);
        }
        
        //player idle when not moving
        if (this.cursors.left.isUp) {
            if (this.player.body.velocity.x < 0) {
                this.player.setVelocityX(-0.001);
                this.player.play('playerIdleLeft', true);
                this.player.setTexture('player', 9);
            }
        }
        if (this.cursors.right.isUp) {
            if (this.player.body.velocity.x > 0) {
                this.player.setVelocityX(0.001);
                this.player.play('playerIdleRight', true);
                this.player.setTexture('player', 27);
            }
        }
        if (this.cursors.up.isUp) {
            if (this.player.body.velocity.y < 0) {
                this.player.setVelocityY(-0.001);
                this.player.play('playerIdleUp', true);
                this.player.setTexture('player', 1);
            }
        }
        if (this.cursors.down.isUp) {
            if (this.player.body.velocity.y > 0) {
                this.player.setVelocityY(0);
                this.player.play('idle', true);
            }
        }
        
    }

}