import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Startbutton } from './startButton.js'

export class title extends Scene {

    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        const button = new Startbutton()
        button.on('pointerdown', (event) => {
            engine.goToScene('lobbyRoom')
        })
        this.add(button)
    }
}