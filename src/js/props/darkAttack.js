import { Actor, Vector, Engine, Timer } from "excalibur";
import { Resources } from '../resources.js';
import { ghost } from '../enemies/ghost.js';
import { phantom } from '../enemies/phantom.js'
import { Barrier } from '../ui/barrier.js';
import { vaas } from './vaas.js'
import { shelf } from './shelf.js'
import { mainCharacter } from '../mainCharacter.js'
import { fireBall } from './fireball.js'
import { flash } from '../flash.js'
import { settingsMenu } from '../menu/settingsMenu.js'

export class darkAttack extends Actor {
  constructor(x, y, target) {
    super({ width: Resources.bossattack.width / 2, height: Resources.bossattack.height / 2 });
    this.pos = new Vector(x, y);
    this.target = target;
    this.offset = new Vector(40, 0);
  }

  onInitialize(engine) {
    this.speed = Math.round(Math.random()) * 200 + 500
    console.log(this.target);
    this.engine = engine

    this.graphics.use(Resources.bossattack.toSprite());
    this.scale = new Vector(0.25, 0.25);
    const gunShot = new Audio(Resources.gunShot.path);
    gunShot.volume = 0.4;
    gunShot.playbackRate = 2;
    gunShot.play();

    this.on('collisionstart', (event) => {
      if (event.other instanceof mainCharacter) {
        this.target.speed -= 18;
        this.target.slowtimer = 500;
        event.other.game.playerHp--
        event.other.die(engine)
      }
    })
    this.moveTowardsTarget();
  }

  moveTowardsTarget(Engine) {
    const direction = this.target.pos.sub(this.pos).normalize();
    const offsetDirection = direction.clone().normalize().scale(this.offset.x, this.offset.y);
    const offsetPosition = this.pos.add(offsetDirection);
    this.pos = offsetPosition;
    this.vel = direction.scale(this.speed);
    this.rotation = direction.toAngle();
  }

  update(engine) {
    if (engine.currentScene instanceof settingsMenu) {
      this.kill()
    }
    this.rotation+=0.2
  }

}
