import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'
import { Healwater } from '../props/healwater.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class bedroom2 extends room {
    roomBackground = Resources.Bedroom2
    zwart
    tpx = 767
    tpy = 80
    spawnBarriers() {
        const up = new Barrier(767,80,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
    }
    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800)
        this.add(this.Sjaak)
    }
}