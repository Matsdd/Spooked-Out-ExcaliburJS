import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Enemy } from './enemy'

export class Laser extends Actor{

    constructor(x, y) {
        super({width:Resources.Laser.width, height:Resources.Laser.height})
        this.pos = new Vector(x, y)
    }

onInitialize(Engine) {
    this.graphics.use(Resources.Laser.toSprite())
    this.vel = new Vector(800,0)
    this.scale = new Vector(1, 1);

    this.on('collisionstart', (event) => {
        if (event.other instanceof Enemy) {
            this.kill()
            event.other.hp -= 1
        }
    })
    }

}
