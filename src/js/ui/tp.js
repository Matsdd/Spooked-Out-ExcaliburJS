import { Actor, Vector, Engine, Scene } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"
import { mainCharacter } from "../mainCharacter.js"

export class Tp extends Actor {

game

    constructor(x,y,width,height, game) {
        super({width:Resources.Barrier.width, height:Resources.Barrier.height})
        this.graphics.use(Resources.Barrier.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(width/512, height/512)
        this.graphics.opacity = 0
        this.game = game
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => {
            if (event.other instanceof mainCharacter) {
                    this.nextRoom(this.game)
                }
            })
        }

        getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }

        nextRoom(engine, game) {
    this.randomNumber

            this.randomNumber = this.getRandomInt(6)

    switch (this.randomNumber) {
      case 0:
        this.game.goToScene('poolRoom')
        break;
      case 1:
        this.game.goToScene('bossRoom')
        break;
      case 2:
        this.game.goToScene('storageRoom')
        break;
      case 3:
        this.game.goToScene('Bedroom1')
        break;
      case 4:
        this.game.goToScene('officeRoom1')
        break;
      case 5:
        this.game.goToScene('officeRoom2')
        break;

        }
    }
}
