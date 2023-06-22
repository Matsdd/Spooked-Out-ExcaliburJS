import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { poltergeist } from '../enemies/poltergeist.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'
import { Healwater } from '../props/healwater.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class kitchen1 extends room {
    roomBackground = Resources.kitchen1
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
        this.Poltergeist.kill()
        this.Spirit.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800)
        this.add(this.Sjaak)

        this.Poltergeist = new poltergeist(this.Sjaak, 1000, 200)
        this.add(this.Poltergeist)

        this.Spirit = new spirit(this.Sjaak, 760, 180)
        this.add(this.Spirit)
        this.Spirit2 = new spirit(this.Sjaak, 760, 300)
        this.add(this.Spirit2)
    }
}