import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources } from '../resources'
import { Startbutton } from './startButton.js'
import { Settingsbutton } from "./settingsButton"
import { Quitbutton } from "./quitButton"
import { Titlebutton } from "./titleButton"
import { Continue } from "./continue"

import { roomBack } from '../rooms/roomBack.js'

export class titleMenu extends Scene {

    constructor(game) {
        super({})
        this.game = game
    }

    onInitialize(engine) {
        const gameMusic = new Audio(Resources.gameMusic.path);
        gameMusic.loop = true;
        gameMusic.volume = 0.3;
        gameMusic.addEventListener('canplay', () => {
            gameMusic.play();
        });

        // engine.currentScene.on('exit', () => {
        //     gameMusic.pause();
        // });

        // window.addEventListener('unload', () => {
        //     gameMusic.pause();
        // });

        let Titlescreen = new roomBack(Resources.Titleback);
        this.add(Titlescreen);

        const button = new Startbutton(300, 420)
        button.on('pointerdown', (event) => {
            engine.goToScene('lobbyRoom')
            gameMusic.pause();

        })
        this.add(button)

        const button2 = new Settingsbutton(300, 570)
        button2.on('pointerdown', (event) => {
            engine.goToScene('settingsMenu')
        })
        this.add(button2)

        const button3 = new Quitbutton(300, 720)
        button3.on('pointerdown', (event) => {
            engine.kill()
        })
        this.add(button3)
    }

    
    onActivate() {
        localStorage.setItem("score", JSON.stringify(this.game.score))

        const prev = JSON.parse(localStorage.getItem("score"))
        console.log(prev);
        
        this.game.score = 0
        this.game.playerHp = 3
        this.game.previousscene = 13
    }
}