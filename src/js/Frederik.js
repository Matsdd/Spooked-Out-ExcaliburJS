import { Actor, Engine, Vector, Timer } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Enemy extends Actor{
    constructor() {
        super({
            width: Resources.mainCharacter.width/2,
            height: Resources.mainCharacter.height/2,
        })
    }

    onInitialize() {
        this.graphics.use(Resources.Frederik.toSprite())
    }
}