import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, Engine } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js'
import { spirit } from '../enemies/spirit.js'
import { bullet } from '../bullet.js'

export class guardian extends ghost {
  constructor(target, posX, posY) {
    super({
      width: Resources.Guardian.width / 1.6,
      height: Resources.Guardian.height / 1.6,
    });
    this.target = target;
    this.speed = 0;
    this.minDistance = 1;
    this.maxDistance = 500;
    this.rotation = 0;
    this.hp = 50;
    this.timer = 0;
    this.cooldown = 150;
    this.pos = new Vector(posX, posY);
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.Guardian.toSprite());
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

    this.timer++
    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();

    const currentScene = Engine.currentScene;
    const guardianInScene = currentScene.actors.find(actor => actor instanceof guardian);
    if (guardianInScene === this) {
      
      if (this.timer > this.cooldown && distance > this.minDistance) {
  
        const Spirit = new spirit(this.target, this.pos.x, this.pos.y,);
        Spirit.rotation = this.rotation;
        currentScene.add(Spirit);

        const Spirit2 = new spirit(this.target, this.pos.x/1.2, this.pos.y,);
        Spirit.rotation = direction.toAngle() + Math.PI / 2;
        currentScene.add(Spirit2);

        this.timer = 0
      };
    }


//     if (direction.distance() > 0) {
//       this.rotation = direction.toAngle() + Math.PI / 2;
//     }else {
//       this.timer = 0
//     }
  }
}

