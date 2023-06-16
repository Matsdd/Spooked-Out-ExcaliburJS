import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import * as ex from 'excalibur'
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'

import { room } from './room.js'

export class lobbyRoom extends room {
    roomBackground = Resources.Lobby
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
        
        const teleporter = new Tp(1290,80,90,20, this.game)
        this.add(teleporter)


    }
}