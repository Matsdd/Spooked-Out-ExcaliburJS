import { Actor, Vector, Engine, Scene, Input } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"
import { mainCharacter } from "../mainCharacter.js"

export class Mirror extends Actor {

game
mirrorActivated = 0

    constructor(x,y,width,height, game) {
        super({width:Resources.Barrier.width, height:Resources.Barrier.height})
        this.graphics.use(Resources.Barrier.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(width/512, height/512)
        this.graphics.opacity = 0
        this.game = game
    }

    onInitialize(engine) {
        this.on('precollision', (event) => {
            if (event.other instanceof mainCharacter) {
                if (this.mirrorActivated >= 3) {
                    this.game.goToScene('mirrorroom')
                    this.game.previousscene = 16
                }      
                if (engine.input.keyboard.wasPressed(Input.Keys.B)) {
                    this.mirrorActivated++
                }
            }
        })
    }

    update(engine) {
        console.log(this.mirrorActivated);
    }

}
