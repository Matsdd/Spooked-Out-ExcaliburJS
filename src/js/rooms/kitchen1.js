import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { poltergeist } from '../enemies/poltergeist.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'
import { Healwater } from '../props/healwater.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class kitchen1 extends room {
    roomBackground = Resources.kitchen1
    zwart
    previousScene
    tpx = 620
    tpy = 100
    spawnBarriers(engine) {
        this.previousScene = this.engine.currentScene
        const up = new Barrier(767,100,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
        const counter1 = new Barrier(860,250,80,350)
        this.add(counter1)
        const counter2 = new Barrier(930,410,220,80)
        this.add(counter2)
        const cabinet1 = new Barrier(1190,210,90,270)
        this.add(cabinet1)
        const fridge = new Barrier(1200,680,90,290)
        this.add(fridge)
        const table = new Barrier(525,680,190,180)
        this.add(table)
        const couch1 = new Barrier(330,720,60,280)
        this.add(couch1)
        const couch2 = new Barrier(500,860,280,40)
        this.add(couch2)
        const wardrobe = new Barrier(320,290,60,250)
        this.add(wardrobe)

        
        this.licht = new Licht(this,Resources.LichtAan,700,70)
        this.add(this.licht)
    }
    onDeactivate() {
        this.Sjaak.kill()
        this.Poltergeist.kill()
        this.Spirit.kill()
        this.Spirit2.kill()
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

        this.Poltergeist = new poltergeist(this.Sjaak, 1000, 200,this.game,true)
        this.add(this.Poltergeist)

        this.Spirit = new spirit(this.Sjaak, 760, 180,this.game,true)
        this.add(this.Spirit)
        this.Spirit2 = new spirit(this.Sjaak, 760, 300,this.game,true)
        this.add(this.Spirit2)
    }
}