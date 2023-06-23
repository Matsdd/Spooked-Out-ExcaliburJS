import { Actor, Vector } from "excalibur";
import { Resources } from './resources.js';

export class flash extends Actor {
  constructor(x, y) {
    super({width:Resources.Flash.width, height:Resources.Flash.height})
    this.pos = new Vector(x, y);
    this.graphics.use(Resources.Flash.toSprite())
    this.scale = new Vector(0.5, 0.5);
    this.timer = 4
  }

  update() {
    this.timer--
    if (this.timer < 0) {
      this.kill()
    }
  }
}