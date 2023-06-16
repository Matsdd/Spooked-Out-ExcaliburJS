import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import * as ex from 'excalibur'
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { demon } from '../enemies/demonBoss.js'
import { Resources } from '../resources.js'
import { roomBack } from './roomBack.js'

export class room extends Scene {
    roomBackground
    game
    constructor(game) {
        super({})
        this.game = game

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

        let Sjaak = new mainCharacter(500, 500)
        this.add(Sjaak)

        let Ghoul = new ghoul(Sjaak, 300, 300)
        this.add(Ghoul)

        let Spirit = new spirit(Sjaak, 400, 200)
        this.add(Spirit)

        let Demon = new demon(Sjaak, 1200, 200)
        this.add(Demon)
        this.spawnBarriers()

        

    }
}