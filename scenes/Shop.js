let items = []

class Shop extends Phaser.Scene {

    constructor () {

        super("Shop");

    }

    init () {

    }

    preload () {

    }

    create () {

        //adds background
        this.add.image(0,0,'testBg').setOrigin(0,0);

        //dynamically adds white squares
        for (let x = 0; x < 5; x++) {
            this.add.image(x*90+135, 150, 'whiteSquare').setScale(.7).setOrigin(0,0);
            this.add.image(x*90+135, 275, 'whiteSquare').setScale(.7).setOrigin(0,0);
        }

        //adds clothing picture
        this.shoesBrown = this.add.image(25+90, 80, 'shoesBrown', 18).setScale(1.7).setOrigin(0,0);
        this.shoesArmor = this.add.image(115+90, 80, 'shoesArmor', 18).setScale(1.7).setOrigin(0,0);
        this.pantsGreen = this.add.image(205+90, 95, 'pantsGreen', 18).setScale(1.7).setOrigin(0,0);
        this.pantsArmor = this.add.image(295+90, 95, 'pantsArmor', 18).setScale(1.7).setOrigin(0,0);
        this.shirtWhite = this.add.image(25+90, 230, 'shirtWhite', 18).setScale(1.7).setOrigin(0,0);
        this.shirtArmor = this.add.image(115+90, 230, 'shirtArmor', 18).setScale(1.7).setOrigin(0,0);
        this.helmetHood = this.add.image(215+90, 260, 'helmetHood', 18).setScale(1.4).setOrigin(0,0);
        this.helmetArmor = this.add.image(305+90, 260, 'helmetArmor', 18).setScale(1.4).setOrigin(0,0);
        this.shuriken = this.add.image(513, 165, 'shuriken', 0).setScale(2.5).setOrigin(0,0);
        this.shurikenBlue = this.add.image(513, 286, 'shurikenBlue', 0).setScale(2.6).setOrigin(0,0);
        
        //adds clothing buttons
        this.shoesBrownButton = this.add.image(135, 200, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        this.shoesArmorButton = this.add.image(90+135, 200, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        this.pantsGreenButton = this.add.image(180+135, 200, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        this.pantsArmorButton = this.add.image(270+135, 200, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        this.shurikenButton = this.add.image(360+135, 200, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        this.shirtWhiteButton = this.add.image(135, 325, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        this.shirtArmorButton = this.add.image(90+135, 325, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        this.helmetHoodButton = this.add.image(180+135, 325, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        this.helmetArmorButton = this.add.image(270+135, 325, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        this.shurikenBlueButton = this.add.image(360+135, 325, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();

        //adds button interactivity
        this.shoesBrownButton.on('pointerup', () => {
            globals.activeClothes.push(globals.clothes[0]);
        });
        this.shoesArmorButton.on('pointerup', () => {
            globals.activeClothes.push(globals.clothes[1]);
        });
        this.pantsGreenButton.on('pointerup', () => {
            globals.activeClothes.push(globals.clothes[2]);
        });
        this.pantsArmorButton.on('pointerup', () => {
            globals.activeClothes.push(globals.clothes[3]);
        });
        this.shirtWhiteButton.on('pointerup', () => {
            globals.activeClothes.push(globals.clothes[4]);
        });
        this.shirtArmorButton.on('pointerup', () => {
            globals.activeClothes.push(globals.clothes[5]);
        });
        this.helmetHoodButton.on('pointerup', () => {
            globals.activeClothes.push(globals.clothes[6]);
        });
        this.helmetArmorButton.on('pointerup', () => {
            globals.activeClothes.push(globals.clothes[7]);
        });

        //back button logic
        this.back = this.add.image(570, 440, 'backButton').setScale(.3);
        this.back.setInteractive();
        this.back.on('pointerup', () => {
            this.scene.stop();
            this.scene.resume('Endless');
        }, this);

    }

    update () {

    }

}