import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Lane extends Actor{

constructor(x,y) {
    super({width:Resources.Lane.width, height:Resources.Lane.height})
    this.graphics.use(Resources.Lane.toSprite())
    this.pos = new Vector(x+800,y)
    this.scale = new Vector(1, 1)
    this.graphics.opacity = 0
    
}
}

