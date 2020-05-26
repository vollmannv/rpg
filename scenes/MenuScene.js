const menuState = {

}
class MenuScene extends Phaser.Scene {

    constructor() {

        super ("Menu");

    }

    init () {

    }

    preload() {

    }

    create() {

        //adds titlePage
        menuState.title = this.add.image(0,0, 'titleScreen');
        menuState.title.setOrigin(0,0)

        //adds buttons
        menuState.playButton = this.add.image(195, 220, 'playButton');
        menuState.playButton.setOrigin(0,0);
        menuState.levelButton = this.add.image(195, 280, 'levelButton');
        menuState.levelButton.setOrigin(0,0);
        menuState.creditsButton = this.add.image(240, 365, 'creditsButton').setScale(.7);
        menuState.creditsButton.setOrigin(0,0);
        menuState.endlessButton = this.add.image(20, 380, 'endlessButton').setScale(.4);
        menuState.endlessButton.setOrigin(0,0);

        //redirects to next page
        menuState.playButton.setInteractive();
        menuState.playButton.on("pointerup", () => {
            this.scene.start('Tutorial');
        });
        menuState.levelButton.setInteractive();
        menuState.levelButton.on('pointerup', () => {
            this.scene.start('Level Selection');
        });
        menuState.endlessButton.setInteractive();
        menuState.endlessButton.on('pointerup', () => {
            this.scene.start('Endless');
        })


    }

    update() {

    }

}