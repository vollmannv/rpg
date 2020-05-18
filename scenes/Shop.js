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

        this.input.on('pointerup', () => {
            this.scene.resume('Endless');
            }
        }, this);

    }

    update () {

    }

}