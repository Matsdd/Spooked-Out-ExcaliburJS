import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import * as ex from 'excalibur'
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { roomBack } from './roomBack.js'

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

        

    }
}