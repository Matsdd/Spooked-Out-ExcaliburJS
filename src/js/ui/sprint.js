import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class HP extends Actor {

    constructor(player) {
        super({width:Resources.sprint.width, height:Resources.sprint.height})
        this.graphics.use(Resources.sprint.toSprite())
        this.pos = new Vector(100,180)
        this.scale = new Vector(0.25,0.25)
        this.graphics.opacity = 0.7
        this.player = player
        this.z = 99
    }

    update() {
        this.player.fixHp(this)
    }
}