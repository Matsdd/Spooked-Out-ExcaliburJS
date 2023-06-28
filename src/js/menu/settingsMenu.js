import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources } from '../resources'
import { Startbutton } from './startButton.js'
import { Settingsbutton } from "./settingsButton"
import { Quitbutton } from "./quitButton"
import { Titlebutton } from "./titleButton"
import { Continue } from "./continue"

import { roomBack } from '../rooms/roomBack.js'

export class settingsMenu extends Scene {

    constructor(game) {
        super({})
        this.game = game
    }
    
    onInitialize(engine) {
        const gameMusic = new Audio(Resources.gameMusic.path);
        gameMusic.loop = true;
        gameMusic.volume = 0.3;
        gameMusic.addEventListener('canplay', () => {
            gameMusic.play();
        });

        let settingsbackground = new roomBack(Resources.Settingsback);
        this.add(settingsbackground);

        const button = new Continue(800, 420)
        button.on('pointerdown', (event) => {
            gameMusic.pause();
            switch (this.game.previousscene) {
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
                case 13: 
                  if(this.scene == 'lobbyRoom') {
                    return;
                } else {
                  this.game.goToScene('lobbyRoom')
                }
                  break;
                  }
        })
        this.add(button)

        const button2 = new Titlebutton(800, 570)
        button2.on('pointerdown', (event) => {
            engine.goToScene('titleMenu')
            localStorage.setItem("score", JSON.stringify(this.game.score))
    
            const prev = JSON.parse(localStorage.getItem("score"))
            console.log(prev);
        })
        this.add(button2)

        const button3 = new Quitbutton(800, 720)
        button3.on('pointerdown', (event) => {
            engine.kill()
        })
        this.add(button3)
    }
}