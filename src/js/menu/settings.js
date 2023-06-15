import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources } from '../resources'
import { Quitbutton } from "./quitButton"

export class title extends Scene {

    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        const button3 = new Quitbutton()
        button3.on('pointerdown', (event) => {
            engine.kill()
        })
        this.add(button3)
    }
}