import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class Licht extends Actor {

    constructor() {
        super({width:Resources.LichtUit.width*0.5, height:Resources.LichtUit.height*0.8})
        this.graphics.use(Resources.LichtUit.toSprite())
        this.pos = new Vector(1000,50)
        this.scale = new Vector(0.25,0.25)
    }

    onInitialize() {
        
    }
}