import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"
import { treasure } from '../props/treasure.js'
import { ton } from '../props/ton.js'
import { nietschiet } from '../props/nietschiet.js'

export class Glow extends Actor {

    constructor(x,y) {
        super({width:Resources.Gloei.width, height:Resources.Gloei.height})
        this.graphics.use(Resources.Gloei.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(0.25,0.25)
        this.z = 98
        this.graphics.opacity = 0.6
    }
}