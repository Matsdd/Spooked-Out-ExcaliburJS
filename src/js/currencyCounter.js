import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class CurrencyCounter extends Actor{

    onInitialize(Engine) {
    this.graphics.use(Resources.CurrencyCounter.toSprite());
    this.pos = new Vector(100, 100);
    this.scale = new Vector(0.4, 0.4);
    }
};