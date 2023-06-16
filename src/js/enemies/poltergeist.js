import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, Engine } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js'
import { bullet } from '../bullet.js'

export class poltergeist extends ghost {
  constructor(target, posX, posY) {
    super({
      width: Resources.poltergeist.width / 1.6,
      height: Resources.poltergeist.height / 1.6,
    });
    this.target = target;
    this.speed = 0;
    this.minDistance = 1;
    this.rotation = 0;
    this.hp = 3
    this.pos = new Vector(posX, posY);
  }

  onInitialize() {
    this.graphics.use(Resources.poltergeist.toSprite());
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

  update(Engine) {
    const direction = this.target.pos.sub(this.pos);

    if (direction.distance() > 0) {
      this.rotation = direction.toAngle() + Math.PI / 2;
    }
  }
}

