import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { ghost } from '../enemies/ghost.js';
import { phantom } from '../enemies/phantom.js'
import { Barrier } from '../ui/barrier.js';
import { Stof } from '../ui/STOOFZUGER.js';
import { vaas } from './vaas.js'
import { shelf } from './shelf.js'
import { mainCharacter } from '../mainCharacter.js'

export class fireBall extends Actor {

  constructor(x, y, target, velx, vely) {
    super({ width: Resources.Fire.width / 6, height: Resources.Fire.height / 6});
    this.pos = new Vector(x, y);
    this.target = target;
    this.speed = 300;
    this.vel = new Vector(velx,vely)
  }

    onInitialize(engine) {
        this.graphics.use(Resources.Fire.toSprite());

        this.on('collisionstart', (event) => {
            if (event.other instanceof mainCharacter) {
                this.kill()
                event.other.game.playerHp--
                event.other.die(engine)
            }
            if (event.other instanceof Stof) {
              this.kill()
            }
        })

        this.moveTowardsTarget();
    }

  moveTowardsTarget() {
  }

  onPreUpdate() {
    if (this.pos.x > 1600 || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > 1000) {
      this.kill()
    }
  }
}