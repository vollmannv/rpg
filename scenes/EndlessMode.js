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