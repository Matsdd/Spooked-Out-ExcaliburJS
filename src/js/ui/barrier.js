import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"
import { treasure } from '../props/treasure.js'

export class Barrier extends Actor {

    constructor(x,y,width,height) {
        super({width:Resources.Barrier.width, height:Resources.Barrier.height})
        this.graphics.use(Resources.Barrier.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(width/512, height/512)
        this.graphics.opacity = 0
    }

    onInitialize() {
        this.on('collisionend', (event) => {
            if (event.other instanceof treasure) {
              this.kill();
            }
            if (event.other instanceof ton) {
                this.kill();
              }
          });
    }
}