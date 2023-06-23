import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class CFG extends Actor {

    constructor() {
        super({width:Resources.Barrier.width, height:Resources.Barrier.height})
        this.graphics.use(Resources.Barrier.toSprite())
        this.pos = new Vector(500,500)
        this.scale = new Vector(2000,2000)
        this.graphics.opacity = 0
    }

    onInitialize() {
    }
}