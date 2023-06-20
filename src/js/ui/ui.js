import { Actor, Vector, Engine, Scene } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"
import { score } from "../ui/score.js"


export class ui extends Actor {
    constructor() {
        this.pos = new Vector(765, 430)
        this.scale = new Vector(width/512, height/512)
        this.graphics.opacity = 0
        this.game = game
    }


    onInitialize() {
        const Score = new score
        this.add(Score)
        
        this.scoreLabel = new ex.Label({
            text: 'score',
            pos: ex.vec(1510, 20),
            font: new ex.Font({
                size: 24,
                unit: ex.FontUnit.Px,
                textAlign: TextAlign.Right
            })
        });
    }

    onPostUpdate() {
        this.scoreLabel.text = this.score + ''
    }
}