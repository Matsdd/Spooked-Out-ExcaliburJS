import { Actor, Vector, Engine, Scene, Input } from "excalibur"
import * as ex from 'excalibur'
import {Resources} from "../resources.js"
import { mainCharacter } from "../mainCharacter.js"

export class Tp extends Actor {
game
room
scene

    constructor(x,y,width,height, game, room) {
        super({width:Resources.Barrier.width, height:Resources.Barrier.height})
        this.graphics.use(Resources.Barrier.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(width/512, height/512)
        this.graphics.opacity = 0
        this.game = game
        this.room = room
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

    nextRoom(engine, game, score) {
      this.room.game.addScore(10,true)

      if (this.game.rooms == 15) {
        this.game.goToScene('bossPoolRoom')
      } else {

      this.randomNumber
      this.randomNumber = this.getRandomInt(13)
      if (this.randomNumber == this.game.previousscene) {
        this.randomNumber = this.getRandomInt(13)
        if (this.randomNumber == this.game.previousscene) {
          this.randomNumber = this.getRandomInt(13)
          if (this.randomNumber == this.game.previousscene) {
            this.randomNumber = this.getRandomInt(13)
          }
        }
      }
      
    switch (this.randomNumber) {
      case 0:
        if(this.scene == 'poolRoom') {
          return;
      } else {
        this.game.goToScene('poolRoom')
      }
        break;
      case 1:
        if(this.scene == 'dormRoom') {
          return;
      } else {
        this.game.goToScene('dormRoom')
      }
        break;
      case 2:
        if(this.scene == 'storageRoom') {
          return;
      } else {
        this.game.goToScene('storageRoom')
      }
        break;
      case 3:
        if(this.scene == 'Bedroom1') {
          return;
      } else {
        this.game.goToScene('Bedroom1')
      }
        break;
      case 4:
        if(this.scene == 'Bedroom2') {
          return;
      } else {
        this.game.goToScene('Bedroom2')
      }
        break;
      case 5:
        if(this.scene == 'officeRoom1') {
          return;
      } else {
        this.game.goToScene('officeRoom1')
      }
        break;
      case 6:
        if(this.scene == 'officeRoom2') {
          return;
      } else {
        this.game.goToScene('officeRoom2')
      }
        break;
      case 7:
        if(this.scene == 'bathroom') {
          return;
      } else {
        this.game.goToScene('bathroom')
      }
        break;
      case 8:
        if(this.scene == 'playroom') {
          return;
      } else {
        this.game.goToScene('playroom')
      }
        break;
      case 9:
        if(this.scene == 'kitchen1') {
          return;
      } else {
        this.game.goToScene('kitchen1')
      }
        break;
      case 10:
        if(this.scene == 'kitchen2') {
          return;
      } else {
        this.game.goToScene('kitchen2')
      }
        break;
      case 11:
        if(this.scene == 'engine') {
          return;
      } else {
        this.game.goToScene('engine')
      }
        break;
      case 12:
        if(this.scene == 'barRoom') {
          return;
      } else {
        this.game.goToScene('barRoom')
      }
        break;
        }
        this.game.previousscene = this.randomNumber
      }
    }
}
