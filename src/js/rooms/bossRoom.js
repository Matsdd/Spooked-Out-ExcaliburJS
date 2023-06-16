import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class bossRoom extends room {

    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        let background = new roomBack(Resources.Boss);
        this.add(background);

        let Sjaak = new mainCharacter()
        this.add(Sjaak)
    }
}