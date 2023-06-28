import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'

export class flames extends Actor {
  constructor(owner) {
    super({ width: Resources.flames.width/ 2.3, height: Resources.flames.height/ 2.3});
    this.pos = new Vector(owner.pos.x,owner.pos.y);
    this.owner = owner
    this.z = 95
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.flames.toSprite());
    this.scale = new Vector(0.4, 0.4);
  }

  onPreUpdate() {
    this.pos = this.owner.pos
  }

}