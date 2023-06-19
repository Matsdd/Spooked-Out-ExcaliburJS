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
        const zwembadlinks = new Barrier(20,650,40,200)
        this.add(zwembadlinks)
        const barrierfridge2 = new Barrier(1520,465,40,450)
        this.add(barrierfridge2)
        

        const licht = new Licht(this)
        this.add(licht)
    }
}