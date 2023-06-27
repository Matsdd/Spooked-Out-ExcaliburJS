import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'
import { mimic } from '../enemies/mimic.js'
import { Barrier } from '../ui/barrier.js';
import { bullet } from '../bullet.js'

export class treasure extends Actor {
  constructor(target, posX, posY,game) {
    super({ width: Resources.Treasure.width / 1.8, height: Resources.Treasure.height / 3});
    this.pos = new Vector(posX, posY);
    this.game = game
    this.target = target;
    this.game = game
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.Treasure.toSprite());
    this.scale = new Vector(0.4, 0.4);
    const currentScene = Engine.currentScene;

    const treasure1 = new Barrier(this.pos.x, this.pos.y, Resources.Treasure.width /4,Resources.Treasure.height / 8)
    currentScene.add(treasure1);

    this.on('collisionstart', (event) => {
      if (event.other instanceof bullet) {
        this.randomNumber
        this.randomNumber = this.getRandomInt(3);
        if (this.randomNumber === 0) {
          const Mimic = new mimic(this.target, this.pos.x, this.pos.y, this.game);
          currentScene.add(Mimic);
          this.kill();
        } else {
        this.kill();
        }
      }
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  onPreUpdate() {
    if (this.pos.x > 1600 || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > 1000) {
      this.kill()
    }
  }

  onPostKill() {
    this.game.getscore(3,false)
  }

}