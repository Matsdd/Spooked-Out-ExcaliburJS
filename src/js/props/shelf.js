import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'
import { Barrier } from '../ui/barrier.js';
import { bullet } from '../bullet.js'

export class shelf extends Actor {
  constructor(posX, posY) {
    super({ width: Resources.shelf.width / 2, height: Resources.shelf.height / 3.5});
    this.speed = 700;
    this.pos = new Vector(posX, posY);
    this.vel = new Vector(0 , 0);
  }

  onInitialize(engine) {
    this.graphics.use(Resources.shelf.toSprite());
    this.scale = new Vector(0.4, 0.4);

    this.on('collisionstart', (event) => {
      if (event.other instanceof mainCharacter) {
        this.kill();
        console.log(event.other.hp);
      }
    });
    this.on('collisionstart', (event) => {
      if (event.other instanceof Barrier) {
        this.kill()
      }
    })

    if (this.pos.x > 500) {
      this.vel = new Vector(-this.speed , 0);
    } else {
      this.vel = new Vector(this.speed , 0);
    }
  }



  onPreUpdate() {
    if (this.pos.x > 1600 || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > 1000) {
      this.kill()
    }
  }

update(engine, delta) {
    
  }

}