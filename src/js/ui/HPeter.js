import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class HP extends Actor {

    constructor(player) {
        super({width:Resources.Hp3.width, height:Resources.Hp3.height})
        this.graphics.use(Resources.Hp3.toSprite())
        this.pos = new Vector(80,140)
        this.scale = new Vector(0.25,0.25)
        this.graphics.opacity = 0.7
        this.player = player
        this.z = 99
    }

    update() {
        this.player.fixHp(this)
    }

    setHp(hp) {
        switch(hp) {
            case 0:
                this.graphics.use(Resources.Hp0.toSprite())
            break
            case 1:
                this.graphics.use(Resources.Hp1.toSprite())
            break
            case 2:
                this.graphics.use(Resources.Hp2.toSprite())
            break
            case 3:
                this.graphics.use(Resources.Hp3.toSprite())
            break
            case 4:
                this.graphics.use(Resources.Hp4.toSprite())
            break
            case 5:
                this.graphics.use(Resources.Hp5.toSprite())
            break
            case 6:
                this.graphics.use(Resources.Hp6.toSprite())
            break
            case 7:
                this.graphics.use(Resources.Hp7.toSprite())
            break
            case 8:
                this.graphics.use(Resources.Hp8.toSprite())
            break
            case 9:
                this.graphics.use(Resources.Hp9.toSprite())
            break
        }
    }
}