import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import * as ex from 'excalibur'
import { mainCharacter } from '../mainCharacter.js'
import { wraith } from '../enemies/wraith.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'

import { room } from './room.js'

export class lobbyRoom extends room {
    roomBackground = Resources.Lobby
    zwart
    tpx = 1290
    tpy = 80
    spawnBarriers() {
        const barriertopleft = new Barrier(205,215,410,430)
        this.add(barriertopleft)
        const barriertop = new Barrier(980,40,1150,80)
        this.add(barriertop)
        const barrierbali1 = new Barrier(600,390,600,80)
        this.add(barrierbali1)
        const barrierbali2 = new Barrier(865,280,70,200)
        this.add(barrierbali2)
        const barrierfridge1 = new Barrier(20,650,40,200)
        this.add(barrierfridge1)
        const barrierfridge2 = new Barrier(1520,465,40,450)
        this.add(barrierfridge2)
        
        const licht = new Licht(this)
        this.add(licht)
    }

    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(400, 700)
        this.add(this.Sjaak)

        this.Wraith = new wraith(400, 200)
        this.add(this.Wraith)
    }
}