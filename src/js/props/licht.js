import { Actor, Vector } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"
import { bullet } from '../bullet.js'
import { Donker } from './donker.js'

export class Licht extends Actor {
    graphicsUsing = Resources.LichtAan
    donker = false
    zwart = 'T'
    constructor() {
        super({width:Resources.LichtUit.width*0.5, height:Resources.LichtUit.height*0.8})
        this.graphics.use(Resources.LichtUit.toSprite())
        this.pos = new Vector(1000,50)
        this.scale = new Vector(0.25,0.25)
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
            this.zwart = new Donker()
            Engine.currentScene.add(this.zwart)
            this.zwartexists = true
            this.donker = true
        }
        if (this.graphicsUsing == Resources.LichtAan){
            if (this.donker) {
                this.zwart.kill()
            }
            this.donker = false
        }
    }

}