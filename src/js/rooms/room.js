import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import * as ex from 'excalibur'
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { demon } from '../enemies/demonBoss.js'
import { Resources } from '../resources.js'
import { roomBack } from './roomBack.js'
import { Barrier } from '../ui/barrier.js'

export class room extends Scene {
    roomBackground
    game
    constructor(game) {
        super({})
        this.game = game

    }
    
    onInitialize(engine) {

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

        const barriertop = new Barrier(765,-10,1530,20)
        this.add(barriertop)
        const barrierleft = new Barrier(-10,540,20,860)
        this.add(barrierleft)
        const barrierdown = new Barrier(765,870,1530,20)
        this.add(barrierdown)
        const barrierright = new Barrier(1540,540,20,860)
        this.add(barrierright)
    }
}