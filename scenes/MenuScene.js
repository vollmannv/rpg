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

        menuState.title = this.add.image(0,0, 'titleScreen');
        menuState.title.setOrigin(0,0)

        menuState.playButton = this.add.image(190, 200, 'playButton');
        menuState.playButton.setOrigin(0,0);

        menuState.playButton.setInteractive();
        menuState.playButton.on("pointerup", () => {
            this.scene.start('Tutorial');
        });

    }

    update() {

    }

}