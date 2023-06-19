import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class wineCellar extends room {
    Sjaak
    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        let background = new roomBack(Resources.Cellar);
        this.add(background);

        this.Sjaak = new mainCharacter(200, 200)
        this.add(this.Sjaak)

        let Ghoul = new ghoul(this.Sjaak, 1000, 400)
        this.add(Ghoul)

        let Spirit = new spirit(this.Sjaak, 1000, 500)
        this.add(Spirit)

        let Poltergeist = new poltergeist(this.Sjaak, 1000, 600)
        this.add(Poltergeist)
    }
}