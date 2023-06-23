import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, Engine } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js'
import { vaas } from '../props/vaas.js'
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
    this.maxDistance = 500;
    this.rotation = 0;
    this.hp = 15;
    this.timer = 0;
    this.cooldown = 100;
    this.pos = new Vector(posX, posY);
  }

  onInitialize(Engine) {
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

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  update(Engine) {
    this.randomNumber
    this.timer++
    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();

    const currentScene = Engine.currentScene;
    const poltergeistInScene = currentScene.actors.find(actor => actor instanceof poltergeist);
    if (poltergeistInScene === this) {
      
      if (this.timer > this.cooldown && distance > this.minDistance) {
        this.randomNumber = this.getRandomInt(2);
        
        switch (this.randomNumber) {
          case 0:
            const Vaas1 = new vaas(this.pos.x*0.90, this.pos.y*0.99, this.target);
            Vaas1.rotation = this.rotation;
            currentScene.add(Vaas1);
            break;
          case 1:
            const Vaas = new vaas(this.pos.x*1.1, this.pos.y*1.01, this.target);
            Vaas.rotation = this.rotation;
            currentScene.add(Vaas);
            break;
        }

        this.timer = 0
      };
    }


    if (direction.distance() > 0) {
      this.rotation = direction.toAngle() + Math.PI / 2;
    }else {
      this.timer = 0
    }
  }
}

