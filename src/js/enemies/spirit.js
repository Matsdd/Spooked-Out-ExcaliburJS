import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js'
import { bullet } from '../bullet.js'

export class spirit extends ghost {
  constructor(target) {
    super({
      width: Resources.spirit.width / 4,
      height: Resources.spirit.height / 4,
    });
    this.target = target;
    this.speed = 140;
    this.minDistance = 1;
    this.maxDistance = 500;
    this.rotation = 0;
    this.hp = 1
  }

  onInitialize() {
    this.graphics.use(Resources.spirit.toSprite());
    this.pos = new Vector(200, 200);
    this.scale = new Vector(0.3, 0.3);

    this.on('collisionstart', (event) => {
      if (event.other instanceof bullet) {
        this.hp -= 1;
        if (this.hp <= 0) {
          this.kill();
        }
      }
    });
  }

  moveTowardsTarget() {
    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();

    if (distance > this.minDistance && distance < this.maxDistance) {
      const desiredVel = direction.normalize().scale(this.speed);
      this.vel = desiredVel.clampMagnitude(this.speed);

      // Calculate rotation based on movement direction
      this.rotation = Math.atan2(this.vel.y, this.vel.x);
    } else {
      this.vel = Vector.Zero;
    }
  }

  update(engine, delta) {
    this.moveTowardsTarget();
  }
}