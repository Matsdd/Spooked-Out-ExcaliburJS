import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { wraith } from '../enemies/wraith.js'
import { treasure } from '../props/treasure.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'
import { Healwater } from '../props/healwater.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class playroom extends room {
    roomBackground = Resources.Playroom
    zwart
    previousScene
    tpx = 767
    tpy = 80
    spawnBarriers(engine) {
        this.previousScene = this.engine.currentScene
        const up = new Barrier(767,80,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
        const slide = new Barrier(460,470,170,100)
        this.add(slide)
        const tablechairs = new Barrier(425,220,110,120)
        this.add(tablechairs)
        const jenga = new Barrier(1055,605,63,95)
        this.add(jenga)
        const stairs = new Barrier(1088,250,1,120)
        this.add(stairs)
        const slide1 = new Barrier(1060,200,60,1)
        this.add(slide1)
        const slide2 = new Barrier(1050,100,80,1)
        this.add(slide2)
        const slide3 = new Barrier(980,220,80,1)
        this.add(slide3)
        const slide4 = new Barrier(940,150,30,1)
        this.add(slide4)
        const slide5 = new Barrier(460,470,170,100)
        this.add(slide5)

        const licht = new Licht(this,Resources.LichtAan,820,60)
        this.add(licht)
    }
    onDeactivate() {
        this.Sjaak.kill()
        this.Treasure.kill()
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
        this.Sjaak = new mainCharacter(767, 800,this.game)
        this.add(this.Sjaak)

        this.Treasure = new treasure(this.Sjaak, 960, 300,this.game)
        this.add(this.Treasure)

        this.Wraith = new wraith(this.Sjaak, 400, 350, 1,this.game,true)
        this.add(this.Wraith)
        
    }
}