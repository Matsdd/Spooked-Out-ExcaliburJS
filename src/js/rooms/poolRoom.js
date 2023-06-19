import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class poolRoom extends room {
    roomBackground = Resources.Pool
    zwart
    spawnBarriers() {
        const zwembadlinks = new Barrier(550,510,10,480)
        this.add(zwembadlinks)
        const zwembadrechts = new Barrier(1025,510,10,480)
        this.add(zwembadrechts)
        const zwembadonder1 = new Barrier(630,750,150,10)
        this.add(zwembadonder1)
        const zwembadonder2 = new Barrier(1025,510,10,480)
        this.add(zwembadonder2)
        const zwembadboven1 = new Barrier(550,510,10,480)
        this.add(zwembadboven1)
        const zwembadboven2 = new Barrier(1025,510,10,480)
        this.add(zwembadboven2)


        const licht = new Licht(this)
        this.add(licht)
    }
}