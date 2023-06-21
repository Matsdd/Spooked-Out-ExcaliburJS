import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class Fire extends Actor {

    constructor(x,y) {
        super({width:Resources.Fire.width*0.3, height:Resources.Fire.height*0.3})
        this.graphics.use(Resources.Fire.toSprite())
        this.despawnTime = 900
        this.pos = new Vector(x,y)
        this.scale = new Vector(0.4, 0.4)
    }

    onPreUpdate() {
        this.despawnTime--
        if (this.despawnTime <= 0) {
            this.kill()
        }
    }
}