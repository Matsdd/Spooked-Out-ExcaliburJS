import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Selection extends Actor{

    onInitialize(Engine) {
        this.graphics.use(Resources.Selection.toSprite());
        this.pos = new Vector(700, 100);
        this.scale = new Vector(0.4, 0.4)
    }
};