import { Actor, Vector, Engine, Scene } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"


export class score extends Actor {
    constructor() {
        super({width:Resources.Score.width, height:Resources.Score.height})
        this.graphics.use(Resources.Score.toSprite())
        this.pos = new Vector(80,40)
        this.scale = new Vector(0.3,0.3)
        this.z = 98
    }
}