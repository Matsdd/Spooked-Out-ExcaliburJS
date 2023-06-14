import '../css/style.css'
import { Actor, Engine, Vector, } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { mainCharacter } from './mainCharacter.js'

export class Game extends Engine {




    constructor() {
        super({ width: 1530.01, height: 860.01 })
        this.start(ResourceLoader).then(() => this.startGame())
        // this.showDebug(true)
    }

    startGame() {        
        let Sjaak = new mainCharacter()
        this.add(Sjaak)

        console.log("Enjoy!")
    }
}



new Game()
