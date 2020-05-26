class LoadingScene extends Phaser.Scene {

    constructor() {
        super("Loading");
    }

    init() {

    }

    preload() {

        //loads all spritesheets
        this.load.spritesheet('player', 'sprites/player_body.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeleton', 'sprites/skeleton_body.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonArmor', 'sprites/skeleton_armor_body.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonHat', 'sprites/skeleton_hat_body.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('playerHurt', 'sprites/player_hurt.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonCast', 'sprites/skeleton_cast.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('fireball', 'sprites/fireball.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shuriken', 'sprites/throwingstars.png', {frameWidth: 12, frameHeight: 12});
        this.load.spritesheet('shurikenBlue', 'sprites/throwingstars_blue.png', {frameWidth: 12, frameHeight: 12});
        this.load.spritesheet('hearts', 'sprites/hearts.png', {frameWidth: 121, frameHeight: 38});
        this.load.spritesheet('extraHeart', 'sprites/extra_heart.png', {frameWidth: 41, frameHeight: 38});

        //loadsSingleImages
        this.load.image('singleHeart', 'sprites/single_heart.png');
        this.load.image('dialog', 'images/dialog_box.png');

        //loads tilemap
        this.load.image('terrain', 'maps/assets/overworld.png');
        this.load.tilemapTiledJSON('startingMap', 'maps/starting_map.json');

        //loads tilemap (for first level)
        this.load.tilemapTiledJSON('firstLevel', 'maps/level1.json')
        //loads tilemap (for second level)
        this.load.tilemapTiledJSON('secondLevel', 'maps/level2.json');
        //loads tilemap (for third level)
        this.load.tilemapTiledJSON('thirdLevel', 'maps/level3.json');
        //loads tilemap (for fourth level)
        this.load.tilemapTiledJSON('fourthLevel', 'maps/level4.json');

        //loads tilemap (for endlessmode)
        this.load.tilemapTiledJSON('endlessMap', 'maps/endless.json');

        //loads player with shoes (for second level)
        this.load.spritesheet('playerShoes', 'sprites/player_shoes.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('playerShoesHurt', 'sprites/player_hurt_shoes.png', {frameWidth: 64, frameHeight: 64});

        //loads player with shoes and pants (for third level)
        this.load.spritesheet('playerShoesPants', 'sprites/player_shoes_pants.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('playerShoesPantsHurt', 'sprites/player_hurt_shoes_pants.png', {frameWidth: 64, frameHeight: 64});

        //loads player with clothes (for fourth level)
        this.load.spritesheet('playerClothes', 'sprites/player_clothes.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('playerClothesHurt', 'sprites/player_hurt_clothes.png', {frameWidth: 64, frameHeight: 64});

        //loads menu images
        this.load.image('titleScreen', 'images/title_screen.png');
        this.load.image('playButton', 'images/play_button.png');
        this.load.image('creditsButton', 'images/credits_button.png');
        this.load.image('levelButton', 'images/level_button.png');
        this.load.image('endlessButton', 'images/try_endless.png');

        //loads level selection images and text
        this.load.image('levelSelection', 'images/level_selection.png');
        this.load.image('tutorialScreenFrame', 'screens/tutorial_screenshot_rahmen.png');
        this.load.image('levelOneScreenFrame', 'screens/level_one_screenshot_rahmen.png');
        this.load.image('levelTwoScreenFrame', 'screens/level_two_screenshot_rahmen.png');
        this.load.image('levelThreeScreenFrame', 'screens/level_three_screenshot_rahmen.png');
        this.load.image('levelFourScreenFrame', 'screens/level_four_screenshot_rahmen.png');
        this.load.image('tutorialText', 'screens/tutorial_text.png');
        this.load.image('level1Text', 'screens/level1_text.png');
        this.load.image('level2Text', 'screens/level2_text.png');
        this.load.image('level3Text', 'screens/level3_text.png');
        this.load.image('level4Text', 'screens/level4_text.png');

        //loads items for endless mode
        this.load.image('chestBlue', 'items/ChestBlue.png');
        this.load.image('chestYellow', 'items/ChestYellow.png');
        this.load.image('chestRed', 'items/ChestRed.png');
        this.load.image('chestGreen', 'items/ChestGreen.png');
        this.load.image('coin', 'items/Coin.png');
        this.load.image('gem', 'items/Gem.png');

        //shop
        this.load.image('testBg', 'images/bg.png');
        this.load.image('whiteSquare', 'images/shop/white_square.png');

        //loads clothes for endless mode
        this.load.spritesheet('helmetArmor', 'sprites/clothes/walk/helmet_armor.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('helmetHood', 'sprites/clothes/walk/helmet_hood.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('pantsArmor', 'sprites/clothes/walk/pants_armor.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('pantsGreen', 'sprites/clothes/walk/pants_green.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shield', 'sprites/clothes/walk/shield.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shirtArmor', 'sprites/clothes/walk/shirt_armor.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shirtWhite', 'sprites/clothes/walk/shirt_white.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shoesArmor', 'sprites/clothes/walk/shoes_armor.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shoesBrown', 'sprites/clothes/walk/shoes_brown.png', {frameWidth: 64, frameHeight: 64});

        this.load.spritesheet('helmetArmorHurt', 'sprites/clothes/hurt/helmet_armor_hurt.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('helmetHoodHurt', 'sprites/clothes/hurt/helmet_hood_hurt.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('pantsArmorHurt', 'sprites/clothes/hurt/pants_armor_hurt.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('pantsGreenHurt', 'sprites/clothes/hurt/pants_green_hurt.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shirtArmorHurt', 'sprites/clothes/hurt/shirt_armor_hurt.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shirtWhiteHurt', 'sprites/clothes/hurt/shirt_white_hurt.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shoesArmorHurt', 'sprites/clothes/hurt/shoes_armor_hurt.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shoesBrownHurt', 'sprites/clothes/hurt/shoes_brown_hurt.png', {frameWidth: 64, frameHeight: 64});

        //loads pause menu
        this.load.image('pauseMenu', 'images/pause_menu.png');

        //loads back button
        this.load.image('backButton', 'images/back_button.png');

        //creates loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        });
        for (let i = 0;i < 100;i++) {
            this.load.spritesheet("cat" + i, "sprites/player_body.png", {frameWidth: 64, frameHeight: 64})
        }
        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, 250, 700 * percent, 25);
            console.log(percent);
        });
                

    }

    create() {

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
        this.anims.create({
            key: 'shurikenBlue',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('shurikenBlue', {start: 0, end: 2})
        });

        this.anims.create({
            key: 'walkDownShoes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoes', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'walkUpShoes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoes', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'walkLeftShoes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoes', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'walkRightShoes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerShoes', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'idleShoes',
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
            key: 'playerShoesIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerShoes', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'playerShoesIdleRight',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerShoes', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'playerShoesIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerShoes', {start: 0, end: 1})
        });
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
            key: 'playerShoesPantsHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerShoesPantsHurt', {start: 0, end: 5})
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
        this.anims.create({
            key: 'walkDownClothes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerClothes', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'walkUpClothes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerClothes', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'walkLeftClothes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerClothes', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'walkRightClothes',
            repeat: -1,
            frameRate: 13,
            frames: this.anims.generateFrameNames('playerClothes', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'idleClothes',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerClothes', {start: 18, end: 19})
        });
        this.anims.create({
            key: 'playerClothesHurt',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('playerClothesHurt', {start: 0, end: 5})
        });
        this.anims.create({
            key: 'playerClothesIdleLeft',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerClothes', {start: 9, end: 9})
        });
        this.anims.create({
            key: 'playerClothes',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerClothes', {start: 27, end: 27})
        });
        this.anims.create({
            key: 'playerClothesIdleUp',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNames('playerClothes', {start: 0, end: 1})
        });


        //creates skeleton animations
        this.anims.create({
            key: 'skeletonLeft',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('skeleton', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'skeletonRight',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('skeleton', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'skeletonUp',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('skeleton', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'skeletonDown',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('skeleton', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'skeletonArmorLeft',
            repeat: -1,
            frameRate: 3,
            frames: this.anims.generateFrameNames('skeletonArmor', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'skeletonArmorRight',
            repeat: -1,
            frameRate: 3,
            frames: this.anims.generateFrameNames('skeletonArmor', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'skeletonArmorUp',
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames('skeletonArmor', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'skeletonArmorDown',
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames('skeletonArmor', {start: 19, end: 26})
        });
        this.anims.create({
            key: 'skeletonHatRight',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNames('skeletonHat', {start: 27, end: 35})
        });
        this.anims.create({
            key: 'skeletonHatLeft',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNames('skeletonHat', {start: 9, end: 17})
        });
        this.anims.create({
            key: 'skeletonHatUp',
            repeat: -1,
            frameRate: 15,
            frames: this.anims.generateFrameNames('skeletonHat', {start: 0, end: 8})
        });
        this.anims.create({
            key: 'skeletonHatDown',
            repeat: -1,
            frameRate: 15,
            frames: this.anims.generateFrameNames('skeletonHat', {start: 19, end: 26})
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

        this.scene.start('Menu');

    }

    update () {

    }

}