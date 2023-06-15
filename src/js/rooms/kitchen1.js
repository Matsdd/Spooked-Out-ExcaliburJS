import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { room } from './room.js'

export class kitchen1 extends room {

    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        let background = new roomBack(Resources.Lobby);
        this.add(background);
    }
}