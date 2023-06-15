import { Actor, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Titlebutton extends Actor {

    constructor(x,y) {
        super({width:Resources.Titlescreen.width/1, height:Resources.Titlescreen.height/1})
        this.graphics.use(Resources.Titlescreen.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(0.8,0.8)
    }

    onInitialize() {
    }
}