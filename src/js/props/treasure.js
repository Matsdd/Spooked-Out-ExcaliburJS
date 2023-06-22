import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'
import { Barrier } from '../ui/barrier.js';
import { bullet } from '../bullet.js'

export class treasure extends Actor {
  constructor(posX, posY) {
    super({ width: Resources.Treasure.width / 2, height: Resources.Treasure.height / 3.5});
    this.pos = new Vector(posX, posY);
  }

  onInitialize() {
    this.graphics.use(Resources.Treasure.toSprite());
    this.scale = new Vector(0.4, 0.4);

    this.on('collisionstart', (event) => {
      if (event.other instanceof bullet) {
        this.kill();
      }
    });
    this.on('collisionstart', (event) => {
      if (event.other instanceof Barrier) {
        this.kill()
      }
    })
  }

  onPreUpdate() {
    if (this.pos.x > 1600 || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > 1000) {
      this.kill()
    }
  }

}