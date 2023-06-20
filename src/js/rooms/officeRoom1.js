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

export class officeRoom1 extends room {
    roomBackground = Resources.Office1
    zwart
    tpx = 800
    tpy = 60
    spawnBarriers() {
        const up = new Barrier(767,60,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
        const topleftcounter = new Barrier(767,60,950,10)
        this.add(topleftcounter)
        const topleftchair = new Barrier(300,510,10,860)
        this.add(topleftchair)
        const toprightcounter = new Barrier(1234,510,10,860)
        this.add(toprightcounter)
        const toprightchair = new Barrier(767,60,950,10)
        this.add(toprightchair)
        const bottomleftcounter = new Barrier(300,510,10,860)
        this.add(bottomleftcounter)
        const bottomleftchair = new Barrier(1234,510,10,860)
        this.add(bottomleftchair)



    }
    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800)
        this.add(this.Sjaak)
    }
}