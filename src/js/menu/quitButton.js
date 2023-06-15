import { Actor, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Quitbutton extends Actor {

    constructor(x,y) {
        super({width:Resources.Quit.width/1, height:Resources.Quit.height/1})
        this.graphics.use(Resources.Quit.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(0.8,0.8)
    }

    onInitialize() {
    }
}