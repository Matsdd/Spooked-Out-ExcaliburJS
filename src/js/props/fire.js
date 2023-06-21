import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class Fire extends Actor {

    constructor(x,y) {
        super({width:Resources.Fire.width, height:Resources.Fire.height})
        this.graphics.use(Resources.Fire.toSprite())
        this.despawnTime = 300
        this.pos = new Vector(x,y)
        this.scale = new Vector(0.1, 0.1)
    }

    onPreUpdate() {
        this.despawnTime++
        if (this.despawnTime <= 0) {
            this.kill()
        }
    }
}