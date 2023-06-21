import '../css/style.css'
import {Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

import { titleMenu } from './menu/titleMenu'
import { settingsMenu } from './menu/settingsmenu'
import { deathMenu } from './menu/deathMenu'

import { lobbyRoom } from './rooms/lobbyRoom'
import { poolRoom } from './rooms/poolRoom.js'
import { bossRoom } from './rooms/bossRoom.js'
import { storageRoom } from './rooms/storageRoom.js'
import { wineCellar } from './rooms/wineCellar.js'
import { bathroom } from './rooms/bathroom'
import { mirrorroom } from './rooms/mirrorRoom'

import { Bedroom1 } from './rooms/bedroom1'
import { bedroom2 } from './rooms/bedroom2'
import { officeRoom1 } from './rooms/officeRoom1'
import { officeRoom2 } from './rooms/officeRoom2'
import { kitchen1 } from './rooms/kitchen1'
import { kitchen2 } from './rooms/kitchen2'
import { playroom } from './rooms/playRoom'
import { engineRoom } from './rooms/engineRoom'


export class Game extends Engine {
    score = 0
    constructor() {
        super({ width: 1530.01, height: 860.01 })
        this.start(ResourceLoader).then(() => this.startGame())
        this.showDebug(true)
    }

    startGame() {  
        this.titlemenu = new titleMenu(this)
        this.settingsmenu = new settingsMenu(this)
        this.deathmenu = new deathMenu(this)

        this.lobbyroom = new lobbyRoom(this)

        this.poolroom = new poolRoom(this)
        this.bossroom = new bossRoom(this)
        this.storageroom = new storageRoom(this)
        this.winecellar = new wineCellar(this)
        this.Bathroom = new bathroom(this)
        this.Mirrorroom = new mirrorroom(this)

        this.Bedroom1 = new Bedroom1(this)
        this.Bedroom2 = new bedroom2(this)
        this.officeroom1 = new officeRoom1(this)
        this.officeroom2 = new officeRoom2(this)
        this.kitchen1 = new kitchen1(this)
        this.kitchen2 = new kitchen2(this)
        this.playroom = new playroom(this)
        this.engine = new Engine(this)


        this.addScene('titleMenu', this.titlemenu)  
        this.addScene('settingsMenu', this.settingsmenu)
        this.addScene('deathMenu', this.deathmenu)

        this.addScene('lobbyRoom', this.lobbyroom)  
        this.addScene('poolRoom', this.poolroom)
        this.addScene('bossRoom', this.bossroom)
        this.addScene('storageRoom', this.storageroom)
        this.addScene('wineCellar', this.winecellar)
        this.addScene('bathroom', this.Bathroom)
        this.addScene('mirrorroom', this.Mirrorroom)

        this.addScene('Bedroom1', this.Bedroom1)
        this.addScene('Bedroom2', this.Bedroom2)
        this.addScene('officeRoom1', this.officeroom1)
        this.addScene('officeRoom2', this.officeroom2)
        this.addScene('Kitchen1', this.kitchen1)
        this.addScene('Kitchen2', this.kitchen2)
        this.addScene('playroom', this.Playroom)
        this.addScene('engine', this.engine)


        this.goToScene('titleMenu')

        console.log("Enjoy!")
    }

    addScore() {
        this.score++
        console.log(this.score);
    }
}



new Game()
