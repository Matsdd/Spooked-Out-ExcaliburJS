import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { wraith } from '../enemies/wraith.js'
import { mimic } from '../enemies/mimic.js'
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
    previousScene
    tpx = 767
    tpy = 80
    spawnBarriers(engine) {
        this.previousScene = this.engine.currentScene
        const up = new Barrier(767,80,950,10)
        this.add(up)
        const updesk = new Barrier(480,85,100,40)
        this.add(updesk)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const tablestuffright = new Barrier(850,610,160,250)
        this.add(tablestuffright)
        const chairs = new Barrier(950,610,80,180)
        this.add(chairs)
        const shelf = new Barrier(1220,150,40,130)
        this.add(shelf)
        const middlewall = new Barrier(767,555,20,610)
        this.add(middlewall)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
        const rightshelf = new Barrier(1210,570,60,360)
        this.add(rightshelf)
        const wall1 = new Barrier(770,290,390,70)
        this.add(wall1)
        const wall2 = new Barrier(1165,290,160,70)
        this.add(wall2)
        const wall3 = new Barrier(385,290,200,70)
        this.add(wall3)
        const leftshelf1 = new Barrier(355,350,150,100)
        this.add(leftshelf1)
        const leftshelf2 = new Barrier(690,350,150,100)
        this.add(leftshelf2)
        const leftshelf3 = new Barrier(725,575,70,160)
        this.add(leftshelf3)
        const chairlet = new Barrier(350,580,60,60)
        this.add(chairlet)
        const bed = new Barrier(513,780,202,250)
        this.add(bed)

        const licht = new Licht(this,Resources.LichtAan,720,50)
        this.add(licht)
    }
    onDeactivate() {
        this.Sjaak.kill()
        this.Sjaak.shootAvailable = false
        this.Sjaak.scoreLabel.text = ''
        this.Sjaak.roomCountLabel.text = ''
        this.Sjaak.hp.kill()
        this.Sjaak.ammo.kill()
        this.Sjaak.score.kill()
        this.Sjaak.sprint.kill()
        this.Ghoul.kill()
        this.Wraith.kill()
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
        this.Sjaak = new mainCharacter(1067, 800,this.game)
        this.add(this.Sjaak)
        this.Ghoul = new ghoul(this.Sjaak, 365, 170, 2,this.game,true)
        this.add(this.Ghoul)
        this.Wraith = new wraith(this.Sjaak, 470, 450, 0,this.game,true)
        this.add(this.Wraith)
    }
}