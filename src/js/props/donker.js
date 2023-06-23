import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"
import { bullet } from '../bullet.js'

export class Donker extends Actor {
    sjaak
    constructor(sjaak) {
        super({width:Resources.Donker.width, height:Resources.Donker.height})
        this.graphics.use(Resources.Donker.toSprite())
        this.scale = new Vector(2,2)
        this.pos = new Vector(765,430)
        this.sjaak = sjaak
        this.z = 50
    }

    onPreUpdate() {
        this.pos = this.sjaak.pos
    }

}