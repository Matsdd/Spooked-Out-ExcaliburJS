import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import * as ex from 'excalibur'
import { mainCharacter } from '../mainCharacter.js'
import { shade } from '../enemies/shade.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'

import { room } from './room.js'

export class officeRoom2 extends room {
    roomBackground = Resources.Office2
    zwart
    previousScene
    tpx = 970
    tpy = 80
    spawnBarriers(engine) {
        this.previousScene = this.engine.currentScene
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
        
        const desk4 = new Barrier(30,650,160,160)
        this.add(desk4)
        const desk5 = new Barrier(400,850,60,60)
        this.add(desk5)
        
        const shelf1 = new Barrier(285,630,50,50)
        this.add(shelf1)
        const shelf2 = new Barrier(560,670,50,90)
        this.add(shelf2)

        const chair6 = new Barrier(420,720,40,40)
        this.add(chair6)

        //kamer4
        const wall14 = new Barrier(840,580,150,80)
        this.add(wall14)
        const wall15 = new Barrier(1160,580,300,80)
        this.add(wall15)
        const wall16 = new Barrier(1460,580,110,80)
        this.add(wall16)
        const wall17 = new Barrier(810,740,90,240)
        this.add(wall17)
        const wall18 = new Barrier(1190,740,10,240)
        this.add(wall18)
        
        const desk6 = new Barrier(960,840,220,60)
        this.add(desk6)
        const desk7 = new Barrier(1470,760,60,280)
        this.add(desk7)
        
        const shelf3 = new Barrier(1160,820,60,130)
        this.add(shelf3)

        const chair7 = new Barrier(890,710,40,40)
        this.add(chair7)
        const chair8 = new Barrier(1000,760,40,40)
        this.add(chair8)
        const chair9 = new Barrier(1340,740,40,40)
        this.add(chair9)

    }
    onDeactivate() {
        this.Sjaak.kill()
        this.Sjaak.shootAvailable = false
        if (this.Sjaak.scoreLabel != null) {
          this.Sjaak.scoreLabel.kill()
        }
        this.Sjaak.roomCountLabel.text = ''
        this.Sjaak.hp.kill()
        this.Sjaak.ammo.kill()
        this.Sjaak.score.kill()
        this.Sjaak.sprint.kill()
        this.Spirit.kill()
        this.Spirit2.kill()
        this.Shade.kill()
        this.licht.kill()
        if (this.teleporten != null) {
            this.teleporter.kill()
        }
        this.teleportActive = false
        this.teleporterInRoom = false

        if (this.zwart != null) {
            this.zwart.kill()
        }
    }

    onActivate() {
        this.Sjaak = new mainCharacter(700, 800,this.game)
        this.add(this.Sjaak)

        this.Spirit = new spirit(this.Sjaak, 150, 190,this.game,true)
        this.add(this.Spirit)
        this.Spirit2 = new spirit(this.Sjaak, 520, 130,this.game,true)
        this.add(this.Spirit2)

        this.Shade = new shade(this.Sjaak, 940, 150, 0,this.game,true)
        this.add(this.Shade)

        
        this.licht = new Licht(this,Resources.LichtUit,910,50)
        this.add(this.licht)
    }
}