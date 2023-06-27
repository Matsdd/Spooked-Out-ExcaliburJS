import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { guardian } from '../enemies/guardian.js'
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
    tpx = 1300
    tpy = 80
    spawnBarriers() {

        const up = new Barrier(767,80,1550,10)
        this.add(up)
        const left = new Barrier(390,280,250,480)
        this.add(left)
        const right = new Barrier(1450,710,250,480)
        this.add(right)
        const counter = new Barrier(1000,100,80,60)
        this.add(counter)

        const licht = new Licht(this,Resources.LichtAan,180,50)
        this.add(licht)
    }
    onDeactivate() {
        this.Sjaak.kill()
        this.Guardian.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(110, 250,this.game)
        this.add(this.Sjaak)

        this.Guardian = new guardian(this.Sjaak, 900, 500, this.game,true)
        this.add(this.Guardian)
    }
}