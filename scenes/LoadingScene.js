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
        this.load.spritesheet('playerHurt', 'sprites/player_hurt.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('skeletonCast', 'sprites/skeleton_cast.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('fireball', 'sprites/fireball.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('shuriken', 'sprites/throwingstars.png', {frameWidth: 12, frameHeight: 12});
        this.load.spritesheet('hearts', 'sprites/hearts.png', {frameWidth: 121, frameHeight: 38})

        //loadsSingleImages
        this.load.image('singleHeart', 'sprites/single_heart.png');
        this.load.image('dialog', 'images/dialog_box.png');

        //loads tilemap
        this.load.image('terrain', 'maps/assets/overworld.png');
        this.load.tilemapTiledJSON('startingMap', 'maps/starting_map.json');

        //loads tilemap (for first level)
        this.load.tilemapTiledJSON('firstLevel', 'maps/level1.json');

        //loads player with shoes (for second level)
        this.load.spritesheet('playerShoes', 'sprites/player_shoes.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('playerShoesHurt', 'sprites/player_hurt_shoes.png', {frameWidth: 64, frameHeight: 64});

        //loads player with shoes and pants (for third level)
        this.load.spritesheet('playerShoesPants', 'sprites/player_shoes_pants.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('playerShoesPantsHurt', 'sprites/player_hurt_shoes_pants.png', {frameWidth: 64, frameHeight: 64});

        //loads tilemap (for second level)
        this.load.tilemapTiledJSON('secondLevel', 'maps/level2.json');

        //loads tilemap (for third level)
        this.load.tilemapTiledJSON('thirdLevel', 'maps/level3.json');

        //loads menu images
        this.load.image('titleScreen', 'images/title_screen.png');
        this.load.image('playButton', 'images/play_button.png');
        this.load.image('creditsButton', 'images/credits_button.png');
        this.load.image('levelButton', 'images/level_button.png');

        //loads level selection images and text
        this.load.image('levelSelection', 'images/level_selection.png');
        this.load.image('tutorialScreenFrame', 'screens/tutorial_screenshot_rahmen.png');
        this.load.image('levelOneScreenFrame', 'screens/level_one_screenshot_rahmen.png');
        this.load.image('levelTwoScreenFrame', 'screens/level_two_screenshot_rahmen.png');
        this.load.image('levelThreeScreenFrame', 'screens/level_three_screenshot_rahmen.png');
        this.load.image('tutorialText', 'screens/tutorial_text.png');
        this.load.image('level1Text', 'screens/level1_text.png');
        this.load.image('level2Text', 'screens/level2_text.png');
        this.load.image('level3Text', 'screens/level3_text.png');

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

        this.scene.start('Menu');

    }

    update () {

    }

}