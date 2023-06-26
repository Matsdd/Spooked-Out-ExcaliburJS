import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'

export class upgradeHp extends Actor {
  constructor(posX, posY) {
    super({ width: Resources.upgradeHp.width/ 1.9 , height: Resources.upgradeHp.height/ 1.2});
    this.pos = new Vector(posX, posY);
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.upgradeHp.toSprite());
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