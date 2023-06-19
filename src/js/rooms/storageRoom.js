import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class storageRoom extends room {
    roomBackground = Resources.Storage
    constructor() {
        super({})
    }
    
    onInitialize(engine) {
    }
}