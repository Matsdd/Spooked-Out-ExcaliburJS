import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources } from '../resources'
import { Startbutton } from './startButton.js'
import { Settingsbutton } from "./settingsButton"
import { Quitbutton } from "./quitButton"
import { Titlebutton } from "./titleButton"
import { Continue } from "./continue"

import { roomBack } from '../rooms/roomBack.js'

export class settingsMenu extends Scene {

    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        let settingsbackground = new roomBack(Resources.Settingsback);
        this.add(settingsbackground);

        const button = new Continue(800, 420)
        button.on('pointerdown', (event) => {
            engine.goToScene('lobbyRoom')
        })
        this.add(button)

        const button2 = new Titlebutton(800, 570)
        button2.on('pointerdown', (event) => {
            engine.goToScene('titleMenu')
        })
        this.add(button2)

        const button3 = new Quitbutton(800, 720)
        button3.on('pointerdown', (event) => {
            engine.kill()
        })
        this.add(button3)
    }
}