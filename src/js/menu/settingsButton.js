import { Actor, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Settingsbutton extends Actor {

    constructor(x,y) {
        super({width:Resources.Settings.width/1, height:Resources.Settings.height/1})
        this.graphics.use(Resources.Settings.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(0.8,0.8)
    }

    onInitialize() {
    }
}