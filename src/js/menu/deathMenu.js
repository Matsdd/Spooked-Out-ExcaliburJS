import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources } from '../resources'
import { Quitbutton } from "./quitButton"
import { Titlebutton } from "./titleButton"

import { roomBack } from '../rooms/roomBack.js'

export class deathMenu extends Scene {

    constructor(game) {
        super({})
        this.game = game
    }
    
    onInitialize(engine) {
        let deathbackground = new roomBack(Resources.DeathBack);
        this.add(deathbackground);

        const button2 = new Titlebutton(800, 530)
        button2.on('pointerdown', (event) => {
            engine.goToScene('titleMenu')
        })
        this.add(button2)

        const button3 = new Quitbutton(800, 680)
        button3.on('pointerdown', (event) => {
            engine.kill()
        })
        this.add(button3)
    }

    onActivate() {
        this.game.score = 0
        this.game.playerHp = 3
    }
}