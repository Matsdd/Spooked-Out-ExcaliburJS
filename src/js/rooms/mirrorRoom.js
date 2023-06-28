import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'
import { bloodyMary } from '../enemies/bloodyMary.js'
import { Stof } from '../ui/STOOFZUGER.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class mirrorroom extends room {
    roomBackground = Resources.Mirrorroom
    zwart
    tpx = 767
    tpy = 80
    spawnBarriers() {
        const up = new Barrier(767,80,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
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
        this.Maria.kill()
        if (this.teleporten != null) {
            this.teleporter.kill()
        }
        this.teleportActive = false
        this.teleporterInRoom = false
    }

    onActivate() {
        this.Sjaak = new mainCharacter(600, 800,this.game)
        this.add(this.Sjaak)

        this.Maria = new bloodyMary(this.Sjaak,767,300,this.game,true)
        this.add(this.Maria)
        
        const stof = new Stof()
        this.add(stof)
    }
}