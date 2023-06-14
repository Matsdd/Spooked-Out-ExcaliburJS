import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Fortification extends Actor {

    hp = 3

    constructor(x, y) {
        super({ width: Resources.Fortification.width, height: Resources.Fortification.height })
        this.pos = new Vector(x, y)
    }

    onInitialize(Engine) {
        this.graphics.use(Resources.Fortification.toSprite())
        this.scale = new Vector(0.35, 0.35);
    }

    onPreUpdate(Engine) {
        if (this.hp <= 0) {
            this.kill()
        }
    }
}