import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"

export class sprint extends Actor {

    constructor(player) {
        super({width:Resources.sprint.width, height:Resources.sprint.height})
        this.graphics.use(Resources.sprint.toSprite())
        this.pos = new Vector(200,200)
        this.scale = new Vector(0.15,0.15)
        this.graphics.opacity = 0.7
        this.player = player
        this.z = 99
    }

    update() {
        //this.player.fixSprint(this)
    }

    setSprint(sprint) {
        this.pos.x = sprint
    }
}