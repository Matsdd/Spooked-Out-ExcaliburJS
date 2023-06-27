import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class Stof extends Actor {

    constructor() {
        super({width:Resources.Barrier.width, height:Resources.Barrier.height})
        this.graphics.use(Resources.Barrier.toSprite())
        this.pos = new Vector(765,430)
        this.scale = new Vector(1,1)
        this.graphics.opacity = 1
    }
}