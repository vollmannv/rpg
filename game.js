const config = {

    type: Phaser.AUTO,
    backgroundColor: "5d9c6e",
    width: 700,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            enableBody: true,
            debug: false
        }
    },
    scene: [Scene1, Scene2]
};

const game = new Phaser.Game(config);