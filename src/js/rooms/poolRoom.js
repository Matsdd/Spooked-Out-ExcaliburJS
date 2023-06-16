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
        const barriertopleft = new Barrier(205,215,410,430)
        this.add(barriertopleft)
        
        const teleporter = new Tp(1290,80,90,20, this.game)
        this.add(teleporter)
    }
}