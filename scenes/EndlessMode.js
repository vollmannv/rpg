const globals = {
    activeClothes: []    
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
            key: 'shoesArmorDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shoesArmor', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'shoesArmorUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shoesArmor', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'shoesArmorLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shoesArmor', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'shoesArmorRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shoesArmor', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'shoesArmorIdle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shoesArmor', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'shoesArmorIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shoesArmor', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'shoesArmorIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shoesArmor', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'shoesArmorIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shoesArmor', {start: 0, end: 1})
        });
        this.anims.create({
            key: 'shoesArmorHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shoesArmorHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'pantsGreenDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('pantsGreen', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'pantsGreenUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('pantsGreen', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'pantsGreenLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('pantsGreen', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'pantsGreenRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('pantsGreen', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'pantsGreenIdle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('pantsGreen', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'pantsGreenIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('pantsGreen', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'pantsGreenIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('pantsGreen', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'pantsGreenIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('pantsGreen', {start: 0, end: 1})
        });
        this.anims.create({
            key: 'pantsGreenHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('pantsGreenHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'pantsArmorDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('pantsArmor', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'pantsArmorUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('pantsArmor', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'pantsArmorLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('pantsArmor', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'pantsArmorRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('pantsArmor', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'pantsArmorIdle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('pantsArmor', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'pantsArmorIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('pantsArmor', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'pantsArmorIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('pantsArmor', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'pantsArmorIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('pantsArmor', {start: 0, end: 1})
        });
        this.anims.create({
            key: 'pantsArmorHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('pantsArmorHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'shirtWhiteDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shirtWhite', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'shirtWhiteUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shirtWhite', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'shirtWhiteLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shirtWhite', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'shirtWhiteRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shirtWhite', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'shirtWhiteIdle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shirtWhite', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'shirtWhiteIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shirtWhite', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'shirtWhiteIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shirtWhite', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'shirtWhiteIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shirtWhite', {start: 0, end: 1})
        });
        this.anims.create({
            key: 'shirtWhiteHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shirtWhiteHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'shirtArmorDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shirtArmor', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'shirtArmorUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shirtArmor', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'shirtArmorLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shirtArmor', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'shirtArmorRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shirtArmor', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'shirtArmorIdle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shirtArmor', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'shirtArmorIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shirtArmor', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'shirtArmorIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shirtArmor', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'shirtArmorIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('shirtArmor', {start: 0, end: 1})
        });
        this.anims.create({
            key: 'shirtArmorHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shirtArmorHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'helmetHoodDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('helmetHood', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'helmetHoodUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('helmetHood', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'helmetHoodLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('helmetHood', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'helmetHoodRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('helmetHood', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'helmetHoodIdle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('helmetHood', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'helmetHoodIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('helmetHood', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'helmetHoodIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('helmetHood', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'helmetHoodIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('helmetHood', {start: 0, end: 1})
        });
        this.anims.create({
            key: 'helmetHoodHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('helmetHoodHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'helmetArmorDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('helmetArmor', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'helmetArmorUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('helmetArmor', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'helmetArmorLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('helmetArmor', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'helmetArmorRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('helmetArmor', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'helmetArmorIdle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('helmetArmor', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'helmetArmorIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('helmetArmor', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'helmetArmorIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('helmetArmor', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'helmetArmorIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('helmetArmor', {start: 0, end: 1})
        });
        this.anims.create({
            key: 'helmetArmorHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('helmetArmorHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'shuriken',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shuriken', {start: 0, end: 2})
        });


        //adds player to screen
        this.player = this.physics.add.sprite(100, 100, 'player', 18).setScale(.7);
        this.player.setCollideWorldBounds(true);
        this.player.setOrigin(0,0);

        
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

        //creates clothing sprites (push to globals.activeClothes to show on player)
        const clothes = [];
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
        clothes.push(shoesBrown, shoesArmor, pantsGreen, pantsArmor, shirtWhite, shirtArmor, helmetHood, helmetArmor);
        
        //fixes player bounding box error
        this.time.addEvent({
            delay: 1000,
            callback: delayDone,
            callbackScope: this,
            loop: false
        });
        function delayDone () {
            this.player.body.setSize(33, 50);
            this.player.body.setOffset(16, 12);
            for (let i = 0; i < clothes.length; i++) {
                clothes[i].body.setSize(33, 50);
                clothes[i].body.setOffset(16, 12);
            }
        }
        
        globals.activeClothes.push(shirtWhite, pantsGreen, shoesBrown);

    }

    update () {

        //checks for clothes
        for (let i = 0; i < globals.activeClothes.length; i++) {
            let clothes = globals.activeClothes[i]
            clothes.setVisible(true);
            clothes.setVelocityX(this.player.body.velocity.x);
            clothes.setVelocityY(this.player.body.velocity.y);
            clothes.setX(this.player.x);
            clothes.setY(this.player.y);
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