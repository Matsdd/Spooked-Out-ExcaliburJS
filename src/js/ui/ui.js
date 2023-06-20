import { Actor, Vector, Engine, Scene } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"


export class ui extends Actor {
    constructor() {
        super({width:Resources.Barrier.width, height:Resources.Barrier.height})
        this.pos = new Vector(x,y)
        this.scale = new Vector(width/512, height/512)
        this.graphics.opacity = 0
        this.game = game
    }
}