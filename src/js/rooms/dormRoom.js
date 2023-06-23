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

export class dormRoom extends room {
    roomBackground = Resources.Dorm
    zwart
    tpx = 620
    tpy = 80
    spawnBarriers() {
        const up = new Barrier(767,80,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
        const beds = new Barrier(1060,465,350,440)
        this.add(beds)
        const midcounter = new Barrier(800,442,75,200)
        this.add(midcounter)
        const topcounter = new Barrier(1115,105,250,80)
        this.add(topcounter)
        const botcounter = new Barrier(1040,840,400,50)
        this.add(botcounter)
        const midwall = new Barrier(860,442,80,300)
        this.add(midwall)
        const topwall = new Barrier(830,110,20,100)
        this.add(topwall)
        const botwall = new Barrier(830,850,20,100)
        this.add(botwall)
        const toptable = new Barrier(330,320,130,250)
        this.add(toptable)
        const bottable1 = new Barrier(330,710,130,280)
        this.add(bottable1)
        const bottable2 = new Barrier(480,850,200,60)
        this.add(bottable2)
        const chair1 = new Barrier(410,305,40,80)
        this.add(chair1)
        const chair2 = new Barrier(440,750,60,60)
        this.add(chair2)

    }
    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800)
        this.add(this.Sjaak)
    }
}