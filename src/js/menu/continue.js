import { Actor, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Continue extends Actor {

    constructor(x,y) {
        super({width:Resources.Continue.width/1, height:Resources.Continue.height/1})
        this.graphics.use(Resources.Continue.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(0.8,0.8)
    }

    onInitialize() {
    }
}