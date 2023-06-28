import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'
import { phantom } from "../enemies/phantom.js"

export class officeRoom1 extends room {
    roomBackground = Resources.Office1
    zwart
    previousScene
    tpx = 800
    tpy = 60
    spawnBarriers(engine) {
        this.previousScene = this.engine.currentScene
        const up = new Barrier(767,60,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)

        const topleftdevider = new Barrier(613,115,10,200)
        this.add(topleftdevider)
        const middleleftdevider = new Barrier(613,450,10,340)
        this.add(middleleftdevider)
        const bottomleftdevider = new Barrier(613,800,10,200)
        this.add(bottomleftdevider)

        const topleftcounter = new Barrier(450,80,350,80)
        this.add(topleftcounter)
        const topleftcounter2 = new Barrier(320,150,70,145)
        this.add(topleftcounter2)
        const topleftchair = new Barrier(465,235,50,50)
        this.add(topleftchair)
        const topleftcounter3 = new Barrier(570,370,70,35)
        this.add(topleftcounter3)

        const bottomleftcounter = new Barrier(450,450,320,130)
        this.add(bottomleftcounter)
        const bottomleftchair = new Barrier(460,570,50,50)
        this.add(bottomleftchair)
        const bottomleftwardrobe = new Barrier(320,760,70,220)
        this.add(bottomleftwardrobe)
        const bottomlefttable = new Barrier(520,850,100,45)
        this.add(bottomlefttable)

        const toprightdevider = new Barrier(915,115,10,200)
        this.add(toprightdevider)
        const middlerightdevider = new Barrier(915,450,10,340)
        this.add(middlerightdevider)
        const bottomrightdevider = new Barrier(915,800,10,200)
        this.add(bottomrightdevider)

        const toprightcounter = new Barrier(1120,90,230,80)
        this.add(toprightcounter)
        const toprightcounter2 = new Barrier(1220,200,80,150)
        this.add(toprightcounter2)
        const toprightchair = new Barrier(1070,160,40,40)
        this.add(toprightchair)
        const toprightchair2 = new Barrier(1140,210,40,40)
        this.add(toprightchair2)
        const toprighttable = new Barrier(975,425,105,145)
        this.add(toprighttable)

        const rightdevider = new Barrier(1013,420,205,80)
        this.add(rightdevider)
        const rightdevider2 = new Barrier(1215,420,50,80)
        this.add(rightdevider2)
        const bottomrightchair = new Barrier(1200,680,50,50)
        this.add(bottomrightchair)
        const bottomrightcounter = new Barrier(1120,700,60,220)
        this.add(bottomrightcounter)

        const licht = new Licht(this,Resources.LichtAan,740,50)
        this.add(licht)
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
        this.Phantom.kill()
        this.Spirit4.kill()
        this.Spirit5.kill()
        this.Spirit6.kill()
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

        this.Phantom = new phantom(this.Sjaak,460,220,this.game)
        this.add(this.Phantom)
        this.Spirit4 = new spirit(this.Sjaak,450,710,this.game,true)
        this.add(this.Spirit4)
        this.Spirit5 = new spirit(this.Sjaak,450,630,this.game,true)
        this.add(this.Spirit5)
        this.Spirit6 = new spirit(this.Sjaak,450,800,this.game,true)
        this.add(this.Spirit6)
    }
}