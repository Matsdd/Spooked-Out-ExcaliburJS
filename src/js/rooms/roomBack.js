import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources } from '../resources.js'

export class roomBack extends Actor {

background = ''

    constructor(back) {
        super({})
        this.background = back
    }

    onInitialize() {
        this.graphics.use(this.background.toSprite());
        this.pos = new Vector(767, 430);
        this.scale = new Vector(0.8, 0.8);
    }
}