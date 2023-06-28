import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'
import { hoed } from "./hoed.js";

export class cowboy extends hoed {
  constructor(posX, posY) {
    super({ width: Resources.cowboy.width/ 2.3 , height: Resources.cowboy.height/ 2.3});
    this.pos = new Vector(posX, posY);
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.cowboy.toSprite());
    this.scale = new Vector(0.2, 0.2);

    this.on('collisionstart', (event) => {
      if (event.other instanceof mainCharacter) {
        this.kill();
      }
    });
  }

  onPreUpdate() {
    if (this.pos.x > 1600 || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > 1000) {
      this.kill()
    }
  }

}