import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { phantom } from "../enemies/phantom.js"
import { mare } from "../enemies/mare.js"
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'


export class Bedroom1 extends room {
    roomBackground = Resources.Bedroom1
    zwart
    previousScene
    tpx = 785
    tpy = 80
    spawnBarriers(engine) {
        this.previousScene = this.engine.currentScene
        const bed = new Barrier(450,580,300,300)
        this.add(bed)
        const wardrobe = new Barrier(345,150,80,330)
        this.add(wardrobe)
        const tv = new Barrier(1180,640,150,280)
        this.add(tv)
        const table1 = new Barrier(1100,110,200,100)
        this.add(table1)
        const table2 = new Barrier(1190,205,100,280)
        this.add(table2)
        const chair = new Barrier(1040,260,70,60)
        this.add(chair)

        const up = new Barrier(767,80,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
        
        const licht = new Licht(this,Resources.LichtAan,730,60)
        this.add(licht)
    }
    onDeactivate() {
        this.Sjaak.kill()
        this.Phantom.kill()
        this.Mare.kill()

        if (this.zwart != null) {
            this.zwart.kill()
        }
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800,this.game)
        this.add(this.Sjaak)
        this.Phantom = new phantom(this.Sjaak,1060, 270, this.game,true)
        this.add(this.Phantom)
        this.Mare = new mare(this.Sjaak,460, 170, 0, this.game,true)
        this.add(this.Mare)
    }
}