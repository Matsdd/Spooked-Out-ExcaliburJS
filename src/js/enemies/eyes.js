import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';

export class eyes extends Actor {
  constructor(x, y, tar) {
    super({width:Resources.Eyes.width, height:Resources.Eyes.height})
    this.pos = new Vector(x, y);
    this.graphics.use(Resources.Eyes.toSprite())
    this.scale = new Vector(0.3, 0.3);
    this.z = 98
    this.tar = tar
  }

  update(Engine) {
    const direction = this.tar.pos.sub(this.pos);
      this.rotation = direction.toAngle() + Math.PI * 2;
  }
}