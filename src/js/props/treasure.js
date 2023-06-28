import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'
import { mimic } from '../enemies/mimic.js'
import { Barrier } from '../ui/barrier.js';
import { bullet } from '../bullet.js'
import { bril } from "../hoeden/bril.js";
import { duikbril } from "../hoeden/duikbril.js";
import { clown } from "../hoeden/clown.js";
import { plaag } from "../hoeden/plaag.js";
import { cowboy } from "../hoeden/cowboy.js";
import { mini } from "../hoeden/mini.js";

export class treasure extends Actor {
  constructor(target, posX, posY,game) {
    super({ width: Resources.Treasure.width / 1.6, height: Resources.Treasure.height / 3});
    this.pos = new Vector(posX, posY);
    this.game = game
    this.target = target;
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.Treasure.toSprite());
    this.scale = new Vector(0.4, 0.4);
    const currentScene = Engine.currentScene;

    const treasure1 = new Barrier(this.pos.x, this.pos.y, Resources.Treasure.width /4.2,Resources.Treasure.height / 8)
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
        this.randomNumber = this.getRandomInt(6);
        switch (this.randomNumber) {
            case 0:
              this.Hoed = new bril(this.pos.x, this.pos.y);
              currentScene.add(this.Hoed);
              break;
            case 1:
              this.Hoed = new duikbril(this.pos.x, this.pos.y);
              currentScene.add(this.Hoed);
              break;
            case 2:
              this.Hoed = new clown(this.pos.x, this.pos.y);
              currentScene.add(this.Hoed);
              break;
            case 3:
              this.Hoed = new plaag(this.pos.x, this.pos.y);
              currentScene.add(this.Hoed);
              break;
            case 4:
              this.Hoed = new cowboy(this.pos.x, this.pos.y);
              currentScene.add(this.Hoed);
              break;
            case 5:
              this.Hoed = new mini(this.pos.x, this.pos.y);
              currentScene.add(this.Hoed);
              break;
        }
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
    //this.game.getScore(3,false)
  }

}