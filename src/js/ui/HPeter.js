import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class HP extends Actor {

    constructor() {
        super({width:Resources.Hp3.width, height:Resources.Hp3.height})
        this.graphics.use(Resources.Hp3.toSprite())
        this.pos = new Vector(1000,800)
        this.scale = new Vector(100/512, 100/512)
        this.graphics.opacity = 0
    }

    onInitialize() {
    }
}