import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'
import { artifact } from "./artifact.js";

export class upgradeSpeed extends artifact {
  constructor(posX, posY) {
    super({ width: Resources.upgradeSpeed.width/ 1.8 , height: Resources.upgradeSpeed.height/ 1.4});
    this.pos = new Vector(posX, posY);
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.upgradeSpeed.toSprite());
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