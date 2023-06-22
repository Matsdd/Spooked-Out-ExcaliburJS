import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { arach } from '../enemies/arach.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'
import { Healwater } from '../props/healwater.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class engineRoom extends room {
    roomBackground = Resources.Engine
    zwart
    tpx = 1215
    tpy = 70
    spawnBarriers() {
        const up = new Barrier(767,70,1550,10)
        this.add(up)
        const leftPipe = new Barrier(270,380,40,425)
        this.add(leftPipe)
        const leftBarrel = new Barrier(210,365,100,155)
        this.add(leftBarrel)
        const rightPipe1 = new Barrier(1500,540,120,245)
        this.add(rightPipe1)
        const rightPipe2 = new Barrier(1395,638,120,45)
        this.add(rightPipe2)
        const rightPipe3 = new Barrier(1355,600,40,70)
        this.add(rightPipe3)
        const middleBlock = new Barrier(793,576,540,255)
        this.add(middleBlock)
        const topBlock = new Barrier(793,160,540,255)
        this.add(topBlock)
        const topPipe1 = new Barrier(1200,260,280,40)
        this.add(topPipe1)
        const topPipe2 = new Barrier(1315,220,45,40)
        this.add(topPipe2)
        const rightBarrel = new Barrier(1255,370,80,180)
        this.add(rightBarrel)
    }
    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(150, 800)
        this.add(this.Sjaak)

        this.Arach = new arach(this.Sjaak, 1170, 150, 0)
        this.add(this.Arach)
    }
}