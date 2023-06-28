import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'

export class flames extends Actor {
  constructor(posX, posY) {
    super({ width: Resources.flames.width/ 2.3, height: Resources.flames.height/ 2.3});
    this.pos = new Vector(posX, posY);
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.flames.toSprite());
    this.scale = new Vector(0.5, 0.5);
  }

  onPreUpdate() {
    if (this.pos.x > 1600 || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > 1000) {
      this.kill()
    }
  }

}