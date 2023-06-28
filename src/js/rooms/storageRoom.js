import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { cellarTp} from '../ui/cellartp.js'
import { Licht } from '../props/licht.js'
import { treasure } from '../props/treasure.js'
import { ton } from '../props/ton.js'
import { nietschiet } from '../props/nietschiet.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'
import { poltergeist } from "../enemies/poltergeist.js"

export class storageRoom extends room {
    roomBackground = Resources.Storage
    zwart
    previousScene
    tpx = 790
    tpy = 80
    spawnBarriers(engine) {
        this.previousScene = this.engine.currentScene
        const up = new Barrier(767,80,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)

        const leftCounter = new Barrier(330,335,80,330)
        this.add(leftCounter)
        const upperCounter = new Barrier(1210,315,80,160)
        this.add(upperCounter)
        const lowerCounter = new Barrier(1210,630,80,340)
        this.add(lowerCounter)

        const cellarteleporter = new cellarTp(430,745,140,120, this.game)
        this.add(cellarteleporter)
    }

    onDeactivate() {
        this.Sjaak.kill()
        this.Poltergeist.kill()
        this.Treasure.kill()
        this.Nietschiet.kill()
        this.Ton1.kill()
        this.Ton2.kill()
        this.Ton3.kill()
        this.Ton4.kill()
        this.Ton5.kill()
        this.Ton6.kill()
        this.Ton7.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(867, 800,this.game)
        this.add(this.Sjaak)

        this.Poltergeist = new poltergeist(this.Sjaak, 767, 200,this.game,true)
        this.add(this.Poltergeist)

        this.Treasure = new treasure(this.Sjaak, 1000, 110,this.game,true)
        this.add(this.Treasure)

        this.Nietschiet = new nietschiet(438, 730)
        this.add(this.Nietschiet)

        this.Ton1 = new ton(800,430)
        this.add(this.Ton1)
        this.Ton2 = new ton(430,200)
        this.add(this.Ton2)
        this.Ton3 = new ton(1090, 300)
        this.add(this.Ton3)
        this.Ton4 = new ton(600,540)
        this.add(this.Ton4)
        this.Ton5 = new ton(1000,540)
        this.add(this.Ton5)
        this.Ton6 = new ton(867,540)
        this.add(this.Ton6)
        this.Ton8 = new ton(660, 670)
        this.add(this.Ton8)
        this.Ton7 = new ton(680, 820)
        this.add(this.Ton7)

        const licht = new Licht(this,Resources.LichtAan,720,60)
        this.add(licht)
    }

    onDeactivate() {
        if (this.zwart != null) {
            this.zwart.kill()
        }
        this.Sjaak.kill()
        this.Sjaak.shootAvailable = false
        this.Sjaak.scoreLabel.text = ''
        this.Sjaak.roomCountLabel.text = ''
        this.Sjaak.hp.kill()
        this.Sjaak.ammo.kill()
        this.Sjaak.score.kill()
        this.Sjaak.sprint.kill()
        this.Poltergeist.kill()
        this.Treasure.kill()
        this.Nietschiet.kill()
        if (this.teleporten != null) {
            this.teleporter.kill()
        }
        this.teleportActive = false
        this.teleporterInRoom = false

        this.Ton1.kill()
        this.Ton2.kill()
        this.Ton3.kill()
        this.Ton4.kill()
        this.Ton5.kill()
        this.Ton6.kill()
        this.Ton7.kill()
        this.Ton8.kill()
    }
}