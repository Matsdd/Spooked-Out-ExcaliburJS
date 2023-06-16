import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class BarrierChecker extends Actor {
    player
    type
    constructor(x,y,width,height,player,type) {
        super({width:Resources.Barrier.width, height:Resources.Barrier.height})
        this.graphics.use(Resources.Barrier.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(width/512, height/512)
        this.graphics.opacity = 1
        this.player = player
        this.type = type
    }

    onPreUpdate() {
        this.player.goPosition(this,this.type)
    }
}