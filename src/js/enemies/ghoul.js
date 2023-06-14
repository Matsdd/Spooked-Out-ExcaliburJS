import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, } from 'excalibur'
import { Resources, ResourceLoader } from '../resources.js'


export class ghoul extends Actor{

    constructor() {
        super({
          width: Resources.bGround.width / 4,
          height: Resources.bGround.height / 4,
        });
      } 

      onInitialize() {
        this.graphics.use(Resources.ghoul.toSprite());
        this.pos = new Vector(300 , 300);
        this.scale = new Vector(1.03 , 1.15);
      }

}