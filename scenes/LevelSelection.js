const levelSelectionState = {

}

class LevelSelection extends Phaser.Scene {
    constructor() {

        super ('Level Selection');

    }

    init () {

    }

    preload () {

    }

    create () {

        //adds background image
        levelSelectionState.background = this.add.image(0,0,'levelSelection');
        levelSelectionState.background.setOrigin(0,0);

        //adds level images
        levelSelectionState.tutorial = this.add.image(40, 100, 'tutorialScreenFrame').setScale(.15);
        levelSelectionState.tutorial.setOrigin(0,0);
        levelSelectionState.level1 = this.add.image(275, 100, 'levelOneScreenFrame').setScale(.15);
        levelSelectionState.level1.setOrigin(0,0);
        levelSelectionState.level2 = this.add.image(510, 100, 'levelTwoScreenFrame').setScale(.15);
        levelSelectionState.level2.setOrigin(0,0);
        levelSelectionState.level3 = this.add.image(40, 275, 'levelThreeScreenFrame').setScale(.15);
        levelSelectionState.level3.setOrigin(0,0);
        levelSelectionState.level4 = this.add.image(275, 275, 'levelFourScreenFrame').setScale(.15);
        levelSelectionState.level4.setOrigin(0,0);

        //adds level text
        levelSelectionState.tutorialText = this.add.image(30, 210, 'tutorialText').setScale(.3);
        levelSelectionState.tutorialText.setOrigin(0,0);
        levelSelectionState.level1Text = this.add.image(271, 210, 'level1Text').setScale(.3);
        levelSelectionState.level1Text.setOrigin(0,0);
        levelSelectionState.level2Text = this.add.image(507, 210, 'level2Text').setScale(.3);
        levelSelectionState.level2Text.setOrigin(0,0);
        levelSelectionState.level3Text = this.add.image(40, 383, 'level3Text').setScale(.36);
        levelSelectionState.level3Text.setOrigin(0,0);
        levelSelectionState.level4Text = this.add.image(275, 383, 'level4Text').setScale(.36);
        levelSelectionState.level4Text.setOrigin(0,0);

        //adds level interactivity
        levelSelectionState.tutorial.setInteractive();
        levelSelectionState.level1.setInteractive();
        levelSelectionState.level2.setInteractive();
        levelSelectionState.level3.setInteractive();
        levelSelectionState.level4.setInteractive();
        levelSelectionState.tutorial.on('pointerup', () => {
            this.scene.start("Tutorial");
        });
        levelSelectionState.level1.on('pointerup', () => {
            this.scene.start("Level1");
        });
        levelSelectionState.level2.on('pointerup', () => {
            this.scene.start("Level2");
        });
        levelSelectionState.level3.on('pointerup', () => {
            this.scene.start("Level3");
        });
        levelSelectionState.level4.on('pointerup', () => {
            this.scene.start("Level4");
        });


        //adds back button
        levelSelectionState.back = this.add.image(570,440, 'backButton').setScale(.3);
        levelSelectionState.back.setOrigin(0,0);
        levelSelectionState.back.setInteractive();
        levelSelectionState.back.on('pointerup', () => {
            this.scene.start("Menu");
        });
    }

    update () {

    }
}