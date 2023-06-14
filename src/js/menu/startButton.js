import { Actor, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Startbutton extends Actor {

    constructor(x,y,size) {
        super({width:Resources.Play.width/1.5, height:Resources.Play.height/1.5})
        this.graphics.use(Resources.Play.toSprite())
        this.pos = new Vector(388,306)
        this.scale = new Vector(0.8,0.8)
    }

    onInitialize() {
    }
}