import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { wisp } from '../enemies/wisp.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'
import { Mirror } from '../ui/mirror.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class barRoom extends room {
    roomBackground = Resources.Bar
    zwart
    tpx = 375
    tpy = 80
    spawnBarriers() {
        const up = new Barrier(767,80,950,10)
        this.add(up)
        const upshelf = new Barrier(620,95,320,45)
        this.add(upshelf)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
        const barcounter1 = new Barrier(400,570,220,80)
        this.add(barcounter1)
        const barcounter2 = new Barrier(460,405,100,380)
        this.add(barcounter2)
        const barcounter3 = new Barrier(400,300,420,80)
        this.add(barcounter3)
        const barcounter4 = new Barrier(620,95,320,45)
        this.add(barcounter4)
    }
    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800)
        this.add(this.Sjaak)
    }
}