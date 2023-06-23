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
        const barcounter3 = new Barrier(680,255,500,80)
        this.add(barcounter3)
        const barcounter4 = new Barrier(900,220,60,100)
        this.add(barcounter4)
        const barcounter5 = new Barrier(900,80,60,50)
        this.add(barcounter5)
        const rightshelf1 = new Barrier(1220,375,70,280)
        this.add(rightshelf1)
        const rightshelf2 = new Barrier(1220,710,70,180)
        this.add(rightshelf2)
        const table1 = new Barrier(470,730,120,120)
        this.add(table1)
        const table2 = new Barrier(855,710,130,130)
        this.add(table2)
        const table3 = new Barrier(970,520,130,130)
        this.add(table3)
        const chair1 = new Barrier(575,320,50,60)
        this.add(chair1)
        const chair2 = new Barrier(685,320,50,60)
        this.add(chair2)
        const chair3 = new Barrier(772,315,40,50)
        this.add(chair3)
        const chair4 = new Barrier(842,315,30,40)
        this.add(chair4)
    }
    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(700, 800, this.game)
        this.add(this.Sjaak)
    }
}