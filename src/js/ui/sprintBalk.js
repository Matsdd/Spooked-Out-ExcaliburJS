import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class sprintbalk extends Actor {

    constructor() {
        super({width:Resources.sprintB.width, height:Resources.sprintB.height})
        this.graphics.use(Resources.sprintB.toSprite())
        this.pos = new Vector(124,225)
        this.scale = new Vector(0.4,0.4)
        this.graphics.opacity = 0.7
        this.z = 98
    }
}