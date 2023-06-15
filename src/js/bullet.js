import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { ghost } from './enemies/ghost.js'

export class bullet extends Actor{

    constructor(x, y) {
        super({width:Resources.bullet.width, height:Resources.bullet.height})
        this.pos = new Vector(x, y)
        this.vel = velocity;
    }

onInitialize(Engine) {
    this.graphics.use(Resources.bullet.toSprite())
    this.vel = new Vector(100,0)
    this.scale = new Vector(1, 1);

    }

}