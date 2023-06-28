import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class sprint extends Actor {

    constructor() {
        super({width:Resources.sprint.width, height:Resources.sprint.height})
        this.graphics.use(Resources.sprint.toSprite())
        this.pos = new Vector(120,220)
        this.scale = new Vector(0.3,0.3)
        this.graphics.opacity = 0.7
        this.z = 98
    }
}