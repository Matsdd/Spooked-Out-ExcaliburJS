import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources } from '../resources'
import { Startbutton } from './startButton.js'
import { Settingsbutton } from "./settingsButton"
import { Quitbutton } from "./quitButton"
import { Titlebutton } from "./titleButton"
import { Continue } from "./continue"

import { roomBack } from '../rooms/roomBack.js'

export class titleMenu extends Scene {

    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        let Titlescreen = new roomBack(Resources.Titleback);
        this.add(Titlescreen);

        const button = new Startbutton(300, 420)
        button.on('pointerdown', (event) => {
            engine.goToScene('lobbyRoom')
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
}