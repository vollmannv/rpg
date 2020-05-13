import {TutorialScene} from "./scenes/TutorialScene";
import {Scene1} from "./scenes/Scene1";
import {Scene2} from "./scenes/Scene2";
import {Scene3} from "./scenes/Scene3";

const config = {

    type: Phaser.AUTO,
    backgroundColor: "ffffff",
    width: 700,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            enableBody: true,
            debug: false
        }
    },
    scene: [TutorialScene, Scene1, Scene2, Scene3]
};

const game = new Phaser.Game(config);