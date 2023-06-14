import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, } from 'excalibur'
import { Resources, ResourceLoader } from '../resources.js'


export class ghoul extends Actor{

    constructor() {
        super({
          width: Resources.ghoul.width / 1,
          height: Resources.ghoul.height / 1,
        });
      } 

      onInitialize() {
        this.graphics.use(Resources.ghoul.toSprite());
        this.pos = new Vector(200 , 200);
        this.scale = new Vector(0.3 , 0.3);
      }

}