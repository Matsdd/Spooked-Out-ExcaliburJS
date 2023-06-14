import '../css/style.css'
import * as ex from 'excalibur'
import { Actor, Engine, Vector, Timer, TextAlign } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Game extends Engine {




    constructor() {
        super({ width: 1530.01, height: 860.01 })
        this.start(ResourceLoader).then(() => this.startGame())
        // this.showDebug(true)
    }

    startGame() {        
        console.log("Enjoy!")
    }
}



new Game()
