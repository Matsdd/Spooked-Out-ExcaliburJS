import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { arach } from '../enemies/arach.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'
import { Healwater } from '../props/healwater.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class kitchen2 extends room {
    roomBackground = Resources.kitchen2
    zwart
    previousScene
    tpx = 580
    tpy = 80
    spawnBarriers(engine) {
        this.previousScene = this.engine.currentScene
        const up = new Barrier(767,80,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const leftbottomshelf = new Barrier(335,645,80,440)
        this.add(leftbottomshelf)
        const lefttopshelf = new Barrier(335,210,80,300)
        this.add(lefttopshelf)
        const topchair = new Barrier(440,170,60,60)
        this.add(topchair)
        const cooking = new Barrier(598,620,145,345)
        this.add(cooking)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
        const rightwall1 = new Barrier(1020,380,440,120)
        this.add(rightwall1)
        const rightwall2 = new Barrier(810,315,15,80)
        this.add(rightwall2)
        const rightwall3 = new Barrier(810,120,15,180)
        this.add(rightwall3)
        const shelves = new Barrier(1020,100,400,80)
        this.add(shelves)
        const boxes = new Barrier(1140,220,200,200)
        this.add(boxes)
    }
    onDeactivate() {
        this.Sjaak.kill()
        this.Arach.kill()
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
        this.Sjaak = new mainCharacter(767,800,this.game)
        this.add(this.Sjaak)

        this.Arach = new arach(this.Sjaak, 930, 230, 1,this.game,true)
        this.add(this.Arach)
    }
}