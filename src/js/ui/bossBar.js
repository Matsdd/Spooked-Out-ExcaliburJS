import { Actor, Vector, Engine, Scene, Input } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"
import { mainCharacter } from "../mainCharacter.js"

export class bossBar extends Actor {

char

    constructor(char) {
        super({width:Resources.BossHp8.width, height:Resources.BossHp8.height})
        this.graphics.use(Resources.BossHp8.toSprite())
        this.pos = new Vector(767,60)
        this.scale = new Vector(1,1)
        this.char = char
        this.z = 99
    }

    update(engine) {
        if (this.char.hp < 0.175*this.char.maxHp) {
            this.graphics.use(Resources.BossHp1.toSprite())
        }else
        if (this.char.hp < 0.25*this.char.maxHp) {
            this.graphics.use(Resources.BossHp2.toSprite())
        }else
        if (this.char.hp < 0.375*this.char.maxHp) {
            this.graphics.use(Resources.BossHp3.toSprite())
        }else
        if (this.char.hp < 0.5*this.char.maxHp) {
            this.graphics.use(Resources.BossHp4.toSprite())
        }else
        if (this.char.hp < 0.675*this.char.maxHp) {
            this.graphics.use(Resources.BossHp5.toSprite())
        }else
        if (this.char.hp < 0.75*this.char.maxHp) {
            this.graphics.use(Resources.BossHp6.toSprite())
        }else
        if (this.char.hp < 0.875*this.char.maxHp) {
            this.graphics.use(Resources.BossHp7.toSprite())
        }
        if (this.char.hp <= 0) {
            this.kill()
        }
    }

}
