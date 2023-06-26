import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"
import { bullet } from '../bullet.js'

export class Licht extends Actor {
    game
    constructor(game,grap,x,y) {
        super({width:Resources.LichtUit.width*0.5, height:Resources.LichtUit.height*0.8})
        this.graphics.use(grap.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(0.25,0.25)
        this.game = game
        this.graphicsUsing = grap
    }

    onInitialize() {
        this.on('collisionstart', (event) => {
            if (event.other instanceof bullet) {
                if (this.graphicsUsing == Resources.LichtUit) {
                    this.graphicsUsing = Resources.LichtAan
                }else{
                    this.graphicsUsing = Resources.LichtUit
                }
                console.log(this.graphicsUsing);
                this.graphics.use(this.graphicsUsing.toSprite())
            }
        })
    }
    onPreUpdate(Engine) {
        if (this.graphicsUsing == Resources.LichtUit && !this.donker) {
            this.zwartexists = true
            this.donker = true
            this.game.volgLicht('make')
        }
        if (this.graphicsUsing == Resources.LichtAan){
            if (this.donker) {
                this.game.volgLicht('kill')
            }
            this.donker = false
        }
    }

}