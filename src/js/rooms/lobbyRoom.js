import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'

export class lobbyRoom extends Scene {

    constructor() {
        super({})
    }
    
    onInitialize(engine) {

        let Sjaak = new mainCharacter()
        this.add(Sjaak)

        let Ghoul = new ghoul()
        this.add(Ghoul)
        console.log("jippieeee")
    }
}