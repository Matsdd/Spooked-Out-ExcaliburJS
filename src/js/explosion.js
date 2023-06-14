import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Explosion extends Actor{

    timer = 0;

    constructor(x, y) {
        super({width:Resources.Explosion.width, height:Resources.Explosion.height})
        this.pos = new Vector(x, y)
    }

onInitialize(Engine) {
this.graphics.use(Resources.Explosion.toSprite())
this.scale = new Vector(0.5, 0.5);
}
}