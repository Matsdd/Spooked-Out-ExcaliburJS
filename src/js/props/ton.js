import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'
import { Barrier } from '../ui/barrier.js';
import { bullet } from '../bullet.js'

export class ton extends Actor {
  constructor(posX, posY) {
    super({ width: Resources.ton.width/ 1.9 , height: Resources.ton.height/ 2.2});
    this.pos = new Vector(posX, posY);
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.ton.toSprite());
    this.scale = new Vector(0.4, 0.4);

    this.on('collisionstart', (event) => {
      if (event.other instanceof bullet) {
        this.kill();
      }
    });
    
    const currentScene = Engine.currentScene;
    const ton1 = new Barrier(this.pos.x,this.pos.y, Resources.ton.width / 4.7,Resources.ton.height / 5.5)
    currentScene.add(ton1);
  }

  onPreUpdate() {
    if (this.pos.x > 1600 || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > 1000) {
      this.kill()
    }
  }

}