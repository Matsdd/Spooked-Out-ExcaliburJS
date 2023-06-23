import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class Ammo extends Actor {

    constructor(player) {
        super({width:Resources.Ammo10.width, height:Resources.Ammo10.height})
        this.graphics.use(Resources.Ammo10.toSprite())
        this.pos = new Vector(100,200)
        this.scale = new Vector(0.4,0.4)
        this.graphics.opacity = 0.7
        this.player = player
    }

    update() {
        this.player.fixAmmo(this)
    }

    setAmmo(am) {
        switch(am) {
            case 0:
                this.graphics.use(Resources.Ammo0.toSprite())
            break
            case 1:
                this.graphics.use(Resources.Ammo1.toSprite())
            break
            case 2:
                this.graphics.use(Resources.Ammo2.toSprite())
            break
            case 3:
                this.graphics.use(Resources.Ammo3.toSprite())
            break
            case 4:
                this.graphics.use(Resources.Ammo4.toSprite())
            break
            case 5:
                this.graphics.use(Resources.Ammo5.toSprite())
            break
            case 6:
                this.graphics.use(Resources.Ammo6.toSprite())
            break
            case 7:
                this.graphics.use(Resources.Ammo7.toSprite())
            break
            case 8:
                this.graphics.use(Resources.Ammo8.toSprite())
            break
            case 9:
                this.graphics.use(Resources.Ammo9.toSprite())
            break
            case 10:
                this.graphics.use(Resources.Ammo10.toSprite())
            break
            case 11:
                this.graphics.use(Resources.Ammo11.toSprite())
            break
            case 12:
                this.graphics.use(Resources.Ammo12.toSprite())
            break
            case 13:
                this.graphics.use(Resources.Ammo13.toSprite())
            break
            case 14:
                this.graphics.use(Resources.Ammo14.toSprite())
            break
            case 15:
                this.graphics.use(Resources.Ammo15.toSprite())
            break
            case 16:
                this.graphics.use(Resources.Ammo16.toSprite())
            break
            case 17:
                this.graphics.use(Resources.Ammo17.toSprite())
            break
            case 18:
                this.graphics.use(Resources.Ammo18.toSprite())
            break
            case 19:
                this.graphics.use(Resources.Ammo19.toSprite())
            break
            case 20:
                this.graphics.use(Resources.Ammo20.toSprite())
            break
            case 21:
                this.graphics.use(Resources.Ammo21.toSprite())
            break
            case 22:
                this.graphics.use(Resources.Ammo22.toSprite())
            break
            case 23:
                this.graphics.use(Resources.Ammo23.toSprite())
            break
            case 24:
                this.graphics.use(Resources.Ammo24.toSprite())
            break
            case 25:
                this.graphics.use(Resources.Ammo25.toSprite())
            break
            case 26:
                this.graphics.use(Resources.Ammo26.toSprite())
            break
            case 27:
                this.graphics.use(Resources.Ammo27.toSprite())
            break
            case 28:
                this.graphics.use(Resources.Ammo28.toSprite())
            break
            case 29:
                this.graphics.use(Resources.Ammo29.toSprite())
            break
            case 30:
                this.graphics.use(Resources.Ammo30.toSprite())
            break
        }
    }
}