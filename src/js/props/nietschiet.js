import { Actor, Vector, Engine } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'
import { Barrier } from '../ui/barrier.js';
import { bullet } from '../bullet.js'

export class nietschiet extends Actor {
  constructor(posX, posY) {
    super({ width: Resources.nietschiet.width/ 2.6 , height: Resources.nietschiet.height/ 2.1});
    this.pos = new Vector(posX, posY);
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.nietschiet.toSprite());
    this.scale = new Vector(0.6, 0.6);

    this.on('collisionstart', (event) => {
      if (event.other instanceof bullet) {
        this.kill();
      }
    });
    
    const currentScene = Engine.currentScene;
    const nietschiet1 = new Barrier(this.pos.x,this.pos.y, Resources.nietschiet.width / 4.2,Resources.nietschiet.height / 3.5)
    currentScene.add(nietschiet1);
  }

  onPreUpdate() {
    if (this.pos.x > 1600 || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > 1000) {
      this.kill()
    }
  }

}