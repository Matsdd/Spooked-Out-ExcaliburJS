import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'

export class lobbyRoom extends Scene {

    constructor() {
        super({})
    }
    
    onInitialize(engine) {

        let Sjaak = new mainCharacter()
        this.add(Sjaak)
    }
}