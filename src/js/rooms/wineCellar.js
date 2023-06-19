import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { cellarTp} from '../ui/cellartp.js'
import { Licht } from '../props/licht.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'
import { poltergeist } from "../enemies/poltergeist.js"

export class wineCellar extends room {
    roomBackground = Resources.Cellar
    zwart
    spawnBarriers() {

        const up = new Barrier(767,80,1550,10)
        this.add(up)
        const left = new Barrier(390,280,250,480)
        this.add(left)
        const right = new Barrier(1450,710,250,480)
        this.add(right)
        const counter = new Barrier(1000,100,80,60)
        this.add(counter)

        const teleporter = new Tp(1300,80,90,20, this.game)
        this.add(teleporter)
    }
    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(110, 250)
        this.add(this.Sjaak)
    }
}