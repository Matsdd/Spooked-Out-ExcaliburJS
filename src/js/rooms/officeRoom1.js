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
        const topleftcounter = new Barrier(450,80,350,80)
        this.add(topleftcounter)
        const topleftcounter2 = new Barrier(320,150,70,145)
        this.add(topleftcounter2)
        const topleftchair = new Barrier(465,235,50,50)
        this.add(topleftchair)
        const topleftcounter3 = new Barrier(570,370,70,35)
        this.add(topleftcounter3)

        const topleftdevider = new Barrier(613,115,10,200)
        this.add(topleftdevider)
        const middleleftdevider = new Barrier(613,450,10,340)
        this.add(middleleftdevider)
        const bottomleftdevider = new Barrier(613,800,10,200)
        this.add(bottomleftdevider)

        const bottomleftcounter = new Barrier(450,450,320,130)
        this.add(bottomleftcounter)
        const bottomleftchair = new Barrier(460,570,50,50)
        this.add(bottomleftchair)
        const bottomleftwardrobe = new Barrier(320,760,70,220)
        this.add(bottomleftwardrobe)
        const bottomlefttable = new Barrier(520,850,100,45)
        this.add(bottomlefttable)

        const toprightdevider = new Barrier(915,115,10,200)
        this.add(toprightdevider)
        const middlerightdevider = new Barrier(915,450,10,340)
        this.add(middlerightdevider)
        const bottomrightdevider = new Barrier(915,800,10,200)
        this.add(bottomrightdevider)

        const toprightcounter = new Barrier(1234,510,10,860)
        this.add(toprightcounter)
        const toprightchair = new Barrier(767,60,950,10)
        this.add(toprightchair)


    }
    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800)
        this.add(this.Sjaak)
    }
}