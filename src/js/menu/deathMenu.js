import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources } from '../resources'
import { Quitbutton } from "./quitButton"
import { Titlebutton } from "./titleButton"
import * as ex from 'excalibur'

import { roomBack } from '../rooms/roomBack.js'

export class deathMenu extends Scene {

    constructor(game) {
        super({})
        this.game = game
    }
    
    onInitialize(engine) {
        let deathbackground = new roomBack(Resources.DeathBack);
        this.add(deathbackground);

        const button2 = new Titlebutton(800, 530)
        button2.on('pointerdown', (event) => {
            engine.goToScene('titleMenu')
        })
        this.add(button2)

        const button3 = new Quitbutton(800, 680)
        button3.on('pointerdown', (event) => {
            engine.kill()
        })
        this.add(button3)
    }

    onActivate() {
        if (JSON.parse(localStorage.getItem("bestscore")) != null && this.game.score > JSON.parse(localStorage.getItem("bestscore"))) {
            localStorage.setItem("bestscore", JSON.stringify(this.game.score))

            this.yourscore = new ex.Label({
                text: 'new High score',
                z: 99,
                pos: ex.vec(70, 253),
                font: new ex.Font({
                    size: 36,
                    unit: ex.FontUnit.Px,
                    //textAlign: TextAlign.Right,
                    color: ex.Color.White
                })
              });
              this.add(this.yourscore)
              
            this.previousscore = new ex.Label({
                text: 'previous score',
                z: 99,
                pos: ex.vec(70, 353),
                font: new ex.Font({
                    size: 36,
                    unit: ex.FontUnit.Px,
                    //textAlign: TextAlign.Right,
                    color: ex.Color.White
                })
            });
            this.add(this.previousscore)

            
            this.bestscore = new ex.Label({
                text: 'previous high score:',
                z: 99,
                pos: ex.vec(70, 453),
                font: new ex.Font({
                    size: 36,
                    unit: ex.FontUnit.Px,
                    //textAlign: TextAlign.Right,
                    color: ex.Color.White
                })
            });
            this.add(this.bestscore)
        }else{
            this.yourscore = new ex.Label({
                text: 'your score',
                z: 99,
                pos: ex.vec(70, 253),
                font: new ex.Font({
                    size: 36,
                    unit: ex.FontUnit.Px,
                    //textAlign: TextAlign.Right,
                    color: ex.Color.White
                })
            });
            this.add(this.yourscore)

            this.previousscore = new ex.Label({
                text: 'previous score',
                z: 99,
                pos: ex.vec(70, 353),
                font: new ex.Font({
                    size: 36,
                    unit: ex.FontUnit.Px,
                    //textAlign: TextAlign.Right,
                    color: ex.Color.White
                })
            });
            this.add(this.previousscore)

            this.bestscore = new ex.Label({
                text: 'high score',
                z: 99,
                pos: ex.vec(70, 453),
                font: new ex.Font({
                    size: 36,
                    unit: ex.FontUnit.Px,
                    //textAlign: TextAlign.Right,
                    color: ex.Color.White
                })
            });
            this.add(this.bestscore)
        }


        this.game.score = 0
        this.game.playerHp = 3
        this.game.previousscene = 13
    }
}