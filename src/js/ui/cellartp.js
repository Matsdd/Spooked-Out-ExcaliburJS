import { Actor, Vector, Engine, Scene } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"
import { mainCharacter } from "../mainCharacter.js"

export class cellarTp extends Actor {

game

    constructor(x,y,width,height, game) {
        super({width:Resources.Barrier.width, height:Resources.Barrier.height})
        this.graphics.use(Resources.Barrier.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(width/512, height/512)
        this.graphics.opacity = 0
        this.game = game
    }

    onInitialize(engine,) {
        this.on('collisionstart', (event) => {
            if (event.other instanceof mainCharacter) {
                this.game.goToScene('wineCellar')
                }
            })
        }

}
