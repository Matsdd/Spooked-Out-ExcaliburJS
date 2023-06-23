import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'
import { Barrier } from '../ui/barrier.js';
import { bullet } from '../bullet.js'

export class spin extends Actor {
  constructor(x, y, target) {
    super({ width: Resources.Vaas.width / 5, height: Resources.Vaas.height / 5 });
    this.pos = new Vector(x, y);
    this.target = target;
    this.speed = 700;
    this.offset = new Vector(40, 0);
  }

  onInitialize(engine) {
    this.graphics.use(Resources.Vaas.toSprite());
    this.scale = new Vector(0.2, 0.2);

    this.on('collisionstart', (event) => {
      if (event.other instanceof mainCharacter) {
        this.kill();
      }
    });
    this.on('collisionstart', (event) => {
      if (event.other instanceof Barrier) {
        this.kill()
      }
    })

    this.moveTowardsTarget();
  }

  moveTowardsTarget() {
    const direction = this.target.pos.sub(this.pos).normalize();
    const offsetDirection = direction.clone().normalize().scale(this.offset.x, this.offset.y);
    const offsetPosition = this.pos.add(offsetDirection);
    this.pos = offsetPosition;
    this.vel = direction.scale(this.speed);
    this.rotation = direction.toAngle();
  }
}