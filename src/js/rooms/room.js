import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import * as ex from 'excalibur'
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { roomBack } from './roomBack.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'

export class room extends Scene {
    roomBackground
    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        /*let playerGroup = ex.CollisionGroupManager.create('player')
        let barrierGroup = ex.CollisionGroupManager.create('barrier')
        let enemyGroup = ex.CollisionGroupManager.create('enemy')

        let playersCanCollideWith = ex.CollisionGroup.collidesWith([
            playerGroup, // collide with other players
            barrierGroup, // collide with the floor
        ])*/

        let background = new roomBack(this.roomBackground);
        this.add(background);

        let Sjaak = new mainCharacter()
        this.add(Sjaak)

        let Ghoul = new ghoul(Sjaak)
        this.add(Ghoul)

        let Spirit = new spirit(Sjaak)
        this.add(Spirit)
        this.spawnBarriers()

        
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
        
        const teleporter = new Tp(1290,80,90,20)
        this.add(teleporter)
    }
}