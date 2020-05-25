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

        //adds coin & gem
        globals.GUIHearts = this.add.sprite(70, 470, 'hearts', 0).setScrollFactor(0);
        globals.GUICoins = this.add.sprite(10, 10, 'coin').setOrigin(0,0).setScale(1.7).setScrollFactor(0);
        globals.GUIGems = this.add.sprite(10, 45, 'gem').setOrigin(0,0).setScale(1.7).setScrollFactor(0);
        updateScore(this);
        this.blackShurikenGUI = this.add.group();
        this.blueShurikenGUI = this.add.group();
        updateShuriken(this);

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
        if (!globals.clothesBought.includes('shoesBrown')) {
            this.shoesBrownButton = this.add.image(135, 200, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        }
        if (!globals.clothesBought.includes('shoesArmor')) {
            this.shoesArmorButton = this.add.image(90+135, 200, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        }
        if (!globals.clothesBought.includes('pantsGreen')) {
            this.pantsGreenButton = this.add.image(180+135, 200, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        }
        if (!globals.clothesBought.includes('pantsArmor')) {
            this.pantsArmorButton = this.add.image(270+135, 200, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        }
        if (!globals.clothesBought.includes('shirtWhite')) {
            this.shirtWhiteButton = this.add.image(135, 325, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        }
        if (!globals.clothesBought.includes('shirtArmor')) {
            this.shirtArmorButton = this.add.image(90+135, 325, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        }
        if (!globals.clothesBought.includes('helmetHood')) {
            this.helmetHoodButton = this.add.image(180+135, 325, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        }
        if (!globals.clothesBought.includes('helmetArmor')) {
            this.helmetArmorButton = this.add.image(270+135, 325, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        }

        this.shurikenButton = this.add.image(360+135, 200, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();
        this.shurikenBlueButton = this.add.image(360+135, 325, 'dialog').setScale(.175).setOrigin(0,0).setInteractive();

        //adds prices
        for (let x = 0; x < 4; x++) {
            this.add.image(x*90+138, 203, 'coin').setScale(.7).setOrigin(0,0);
            this.add.image(x*90+138, 328, 'coin').setScale(.7).setOrigin(0,0);
        }
        this.add.image(4*90+138, 203, 'gem').setScale(.7).setOrigin(0,0);
        this.add.image(4*90+138, 328, 'gem').setScale(.7).setOrigin(0,0);
        
        if (!globals.clothesBought.includes('shoesBrown')) {
            this.shoesBrownPrize = this.add.text(160, 202, '240', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0);
        }
        if (!globals.clothesBought.includes('shoesArmor')) {
            this.shoesArmorPrize = this.add.text(90+160, 202, '800', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0);
        }
        if (!globals.clothesBought.includes('pantsGreen')) {
            this.pantsGreenPrize = this.add.text(180+160, 202, '100', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0);
        }
        if (!globals.clothesBought.includes('pantsArmor')) {
            this.pantsArmorPrize = this.add.text(270+160, 202, '500', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0);
        }
        if (!globals.clothesBought.includes('shirtWhite')) {
            this.shirtWhitePrize = this.add.text(160, 327, '100', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0);
        }
        if (!globals.clothesBought.includes('shirtArmor')) {
            this.shirtArmorPrize = this.add.text(90+160, 327, '500', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0);
        }
        if (!globals.clothesBought.includes('helmetHood')) {
            this.helmetHoodPrize = this.add.text(180+160, 327, '100', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0);
        }
        if (!globals.clothesBought.includes('helmetArmor')) {
            this.helmetArmorPrize = this.add.text(270+160, 327, '500', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0);
        }

        this.shurikenPrize = this.add.text(360+165, 202, '7', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0);
        this.shurikenBluePrize = this.add.text(360+163, 327, '20', { fontSize: '10px', fill: '#00000', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0);

        //adds button interactivity
        if (!globals.clothesBought.includes('shoesBrown')) {
            this.shoesBrownButton.on('pointerup', () => {
                if (globals.coins >= 240) {
                    globals.activeClothes.push(globals.clothes[0]);
                    globals.clothesBought.push('shoesBrown');
                    globals.coins -= 240;
                    globals.maxLives += 1;
                    updateScore(this);
                    this.shoesBrownButton.destroy();
                    this.shoesBrownPrize.destroy();
                    globals.speed = 1.3;
                }
            });
        }
        if (!globals.clothesBought.includes('shoesArmor')) {
            this.shoesArmorButton.on('pointerup', () => {
                if (globals.coins >= 800) {
                    globals.activeClothes.push(globals.clothes[1]);
                    globals.clothesBought.push('shoesArmor');
                    globals.coins -= 800;
                    globals.maxLives += 2;
                    updateScore(this);
                    this.shoesArmorButton.destroy();
                    this.shoesArmorPrize.destroy();
                    globals.speed = 1.8;
                }
            });
        }
        if (!globals.clothesBought.includes('pantsGreen')) {
            this.pantsGreenButton.on('pointerup', () => {
                if (globals.coins >= 100) {
                    globals.activeClothes.push(globals.clothes[2]);
                    globals.clothesBought.push('pantsGreen');
                    globals.coins -= 100;
                    globals.maxLives += 1;
                    updateScore(this);
                    this.pantsGreenButton.destroy();
                    this.pantsGreenPrize.destroy();
                }
            });
        }
        if (!globals.clothesBought.includes('pantsArmor')) {
            this.pantsArmorButton.on('pointerup', () => {
                if (globals.coins >= 500) {
                    globals.activeClothes.push(globals.clothes[3]);
                    globals.clothesBought.push('pantsArmor');
                    globals.coins -= 500;
                    globals.maxLives += 2;
                    updateScore(this);
                    this.pantsArmorButton.destroy();
                    this.pantsArmorPrize.destroy();
                }
            });
        }
        if (!globals.clothesBought.includes('shirtWhite')) {
            this.shirtWhiteButton.on('pointerup', () => {
                if (globals.coins >= 100) {
                    globals.activeClothes.push(globals.clothes[4]);
                    globals.clothesBought.push('shirtWhite');
                    globals.coins -= 100;
                    globals.maxLives += 1;
                    updateScore(this);
                    this.shirtWhiteButton.destroy();
                    this.shirtWhitePrize.destroy();
                }
            });
        }
        if (!globals.clothesBought.includes('shirtArmor')) {
            this.shirtArmorButton.on('pointerup', () => {
                if (globals.coins >= 500) {
                    globals.activeClothes.push(globals.clothes[5]);
                    globals.clothesBought.push('shirtArmor');
                    globals.coins -= 500;
                    globals.maxLives += 2;
                    updateScore(this);
                    this.shirtArmorButton.destroy();
                    this.shirtArmorPrize.destroy();
                }
            });
        }
        if (!globals.clothesBought.includes('helmetHood')) {
            this.helmetHoodButton.on('pointerup', () => {
                if (globals.coins >= 100) {
                    globals.activeClothes.push(globals.clothes[6]);
                    globals.clothesBought.push('helmetHood');
                    globals.coins -= 100;
                    globals.maxLives += 1;
                    updateScore(this);
                    this.helmetHoodButton.destroy();
                    this.helmetHoodPrize.destroy();
                }
            });
        }
        if (!globals.clothesBought.includes('helmetArmor')) {
            this.helmetArmorButton.on('pointerup', () => {
                if (globals.coins >= 500) {
                    globals.activeClothes.push(globals.clothes[7]);
                    globals.clothesBought.push('helmetArmor');
                    globals.coins -= 500;
                    globals.maxLives += 2;
                    updateScore(this);
                    this.helmetArmorButton.destroy();
                    this.helmetArmorPrize.destroy();
                }
            });
        }

        this.shurikenBlueButton.on('pointerup', () => {
            if (globals.gems >= 20) {
                globals.shurikenBlueMax += 1;
                globals.gems -= 20;
                updateScore(this);
                updateShuriken(this);
                globals.updateShuriken = true;
            }
        });
        this.shurikenButton.on('pointerup', () => {
            if (globals.gems >= 7) {
                globals.shurikenBlackMax += 1;
                globals.gems -= 7;
                updateScore(this);
                updateShuriken(this);
                globals.updateShuriken = true;
            }
        });

        //adds updateText Method
        function updateScore (scene) {
            if(scene.coinText) {
                scene.coinText.destroy();
                scene.gemText.destroy();
            }
            scene.coinText = scene.add.text(45, 12, globals.coins, { fontSize: '20px', fill: '#ffffff', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0).setScrollFactor(0);
            scene.gemText = scene.add.text(45, 47, globals.gems, { fontSize: '20px', fill: '#ffffff', fontWeight: '700', fontFamily: 'Arial Black' }).setOrigin(0,0).setScrollFactor(0);
        }

        //adds update shuriken method
        function updateShuriken (scene) {

            for (let i = 0; i < globals.shurikenBlackMax; i++) {
                scene.add.sprite(15*i+10, 80, 'shuriken').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            }
            for (let i = 0; i < globals.shurikenBlueMax; i++) {
                scene.add.sprite(15*i+10, 110, 'shurikenBlue').setScale(2.5).setScrollFactor(0).setOrigin(0,0);
            }
        }

        //back button logic
        this.back = this.add.image(570, 440, 'backButton').setScale(.3);
        this.back.setInteractive();
        this.back.on('pointerup', () => {
            this.scene.stop();
            this.scene.resume('Endless');
            globals.shopCollision = false;
        }, this);

    }

    update () {

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

    }

}