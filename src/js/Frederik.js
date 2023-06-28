import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, Engine } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { mainCharacter } from './mainCharacter.js';
import { ghost } from './enemies/ghost.js'
import { bullet } from './bullet.js'
import { eyes } from './enemies/eyes.js'
import { Donker } from './props/donker.js'

export class frederik extends ghost {
  bouncing = true
  constructor(target, posX, posY) {
    super({
      width: Resources.Frederik.width / 1.6,
      height: Resources.Frederik.height / 1.6,
    });
    this.target = target;
    this.speed = 0;
    this.minDistance = 1;
    this.maxDistance = 500;
    this.rotation = 0;
    this.cooldown = 100;
    this.pos = new Vector(posX, posY);
    this.Eyes
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.Frederik.toSprite());
    this.scale = new Vector(0.3, 0.3);
  }


  update(Engine) {

    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();

    const currentScene = Engine.currentScene;
    const frederikInScene = currentScene.actors.find(actor => actor instanceof frederik);
    if (frederikInScene === this) {
      
 
    }
      this.rotation = direction.toAngle() + Math.PI / 2;
  }
}

