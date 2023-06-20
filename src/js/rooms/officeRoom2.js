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
    spawnBarriers() {
        const teleporter = new Tp(1290,80,90,20, this.game)
        this.add(teleporter)
        const licht = new Licht(this)
        this.add(licht)
    }

    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(400, 700)
        this.add(this.Sjaak)
    }
}