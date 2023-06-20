import { Actor, Vector } from "excalibur";
import { Resources } from './resources.js';
import { ghost } from './enemies/ghost.js';
import { phantom } from './enemies/phantom.js'
import { Barrier } from './ui/barrier.js';
import { vaas } from './props/vaas.js'
import { mainCharacter } from './mainCharacter.js'

export class bullet extends Actor {
  constructor(x, y, target) {
    super({ width: Resources.bullet.width / 20, height: Resources.bullet.height / 20 });
    this.pos = new Vector(x, y);
    this.target = target;
    this.speed = 700;
    this.offset = new Vector(40, 0);
  }

  onInitialize(engine) {
    this.graphics.use(Resources.bullet.toSprite());
    this.scale = new Vector(0.2, 0.2);
    const gunShot = new Audio(Resources.gunShot.path);
    gunShot.playbackRate = 2;
    gunShot.play();

    this.on('collisionstart', (event) => {
      if (event.other instanceof phantom) {
        if (event.other.graphics.opacity == 1) {
          this.kill();
          console.log(event.other.hp);
        }
      } else {
      if (event.other instanceof ghost) {
        if (event.other.bouncing) {
          const direction = new Vector(this.target.x, this.target.y).sub(this.pos).normalize();
          this.vel = direction.scale(-this.speed);
          this.rotation += Math.PI
        }else{
          this.kill();
        }
        console.log(event.other.hp);
      }
      if (event.other instanceof mainCharacter) {
        this.kill()
        event.other.hp--
        event.other.die(engine)
        console.log(event.other.hp);
      }
    }
    });

    this.on('collisionstart', (event) => {
      if (event.other instanceof Barrier) {
        this.kill()
      }
    })
    this.on('collisionstart', (event) => {
      if (event.other instanceof vaas) {
        this.kill()
      }
    })

    this.moveTowardsTarget();
  }

  moveTowardsTarget() {
    const direction = new Vector(this.target.x, this.target.y).sub(this.pos).normalize();
    const offsetDirection = direction.clone().normalize().scale(this.offset.x, this.offset.y);
    const offsetPosition = this.pos.add(offsetDirection);
    this.pos = offsetPosition;
    this.vel = direction.scale(this.speed);
    this.rotation = direction.toAngle();
  }

  onPreUpdate() {
    if (this.pos.x > 1600 || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > 1000) {
      this.kill()
    }
  }
}