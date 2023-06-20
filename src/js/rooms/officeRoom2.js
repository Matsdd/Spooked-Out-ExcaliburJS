import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import * as ex from 'excalibur'
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'

import { room } from './room.js'

export class officeRoom2 extends room {
    roomBackground = Resources.Office2
    zwart
    tpx = 970
    tpy = 80
    spawnBarriers() {
        //all
        const topWall = new Barrier(765,40,1530,80)
        this.add(topWall)

        //kamer1
        const wall1 = new Barrier(80,320,160,80)
        this.add(wall1)
        const wall2 = new Barrier(400,320,320,80)
        this.add(wall2)
        const wall3 = new Barrier(735,320,170,80)
        this.add(wall3)
        const wall4 = new Barrier(430,200,100,240)
        this.add(wall4)
        const wall5 = new Barrier(815,200,10,240)
        this.add(wall5)
        
        const desk1 = new Barrier(60,150,160,160)
        this.add(desk1)
        const desk2 = new Barrier(790,200,60,120)
        this.add(desk2)
        
        const chair1 = new Barrier(150,190,40,40)
        this.add(chair1)
        const chair2 = new Barrier(530,130,40,40)
        this.add(chair2)
        
        const water = new Barrier(450,360,60,40)
        this.add(water)

        //kamer2
        const wall6 = new Barrier(1050,200,10,240)
        this.add(wall6)
        const wall7 = new Barrier(1150,320,210,80)
        this.add(wall7)
        const wall8 = new Barrier(1460,320,200,80)
        this.add(wall8)

        const desk3 = new Barrier(1520,120,80,160)
        this.add(desk3)

        const chair3 = new Barrier(1120,230,40,40)
        this.add(chair3)
        const chair4 = new Barrier(1240,180,40,40)
        this.add(chair4)
        const chair5 = new Barrier(1400,180,40,40)
        this.add(chair5)

        //kamer3
        const wall9 = new Barrier(30,580,200,80)
        this.add(wall9)
        const wall10 = new Barrier(320,580,200,80)
        this.add(wall10)
        const wall11 = new Barrier(550,580,110,80)
        this.add(wall11)
        const wall12 = new Barrier(340,740,60,240)
        this.add(wall12)
        const wall13 = new Barrier(600,740,10,240)
        this.add(wall13)

    }
    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800)
        this.add(this.Sjaak)
    }
}