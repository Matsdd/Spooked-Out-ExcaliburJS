import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class Stof extends Actor {

    constructor() {
        super({width:Resources.Stofzuiger.width, height:Resources.Stofzuiger.height})
        this.graphics.use(Resources.Stofzuiger.toSprite())
        this.pos = new Vector(765,430)
        this.scale = new Vector(1.3,1.3)
        this.graphics.opacity = 0
    }

    update() {
        this.kill()
    }
}