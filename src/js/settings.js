import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Settings extends Actor{

    onInitialize(Engine) {
        this.graphics.use(Resources.Settings.toSprite());
        this.pos = new Vector(1430, 100);
        this.scale = new Vector(0.4, 0.4)
    }
};