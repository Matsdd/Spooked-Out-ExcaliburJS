import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { room } from './room.js'

export class poolRoom extends room {
    roomBackground = Resources.Pool
    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        let Sjaak = new mainCharacter(200, 200)
        this.add(Sjaak)

    }
    spawnBarriers() {
        const barrierleft = new Barrier(154,430,308,860)
        this.add(barrierleft)
        const barrierright = new Barrier(1390,430,308,860)
        this.add(barrierright)
        const barriertop = new Barrier(765,48,1000,96)
        this.add(barriertop)

        const barrierpoolleft1 = new Barrier(550,350,20,180)
        this.add(barrierpoolleft1)
        const barrierpoolleft2 = new Barrier(550,660,20,180)
        this.add(barrierpoolleft2)
        const barrierpoolright1 = new Barrier(1020,350,20,180)
        this.add(barrierpoolright1)
        const barrierpoolright2 = new Barrier(1020,660,20,180)
        this.add(barrierpoolright2)

        
        const barrierpooltop1 = new Barrier(630,270,180,20)
        this.add(barrierpooltop1)
        const barrierpooltop2 = new Barrier(920,270,180,20)
        this.add(barrierpooltop2)
        const barrierpoolbottom1 = new Barrier(630,740,180,20)
        this.add(barrierpoolbottom1)
        const barrierpoolbottom2 = new Barrier(920,740,180,20)
        this.add(barrierpoolbottom2)
        
        const teleporter = new Tp(770,90,90,20, this.game)
        this.add(teleporter)
    }
}