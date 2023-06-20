import '../css/style.css'
import {Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

import { titleMenu } from './menu/titleMenu'
import { settingsMenu } from './menu/settingsmenu'
import { deathMenu } from './menu/deathMenu'

import { lobbyRoom } from './rooms/lobbyRoom'
import { poolRoom } from './rooms/poolRoom.js'
import { wineCellar } from './rooms/wineCellar.js'
import { bossRoom } from './rooms/bossRoom.js'
import { storageRoom } from './rooms/storageRoom.js'
import { Bedroom1 } from './rooms/bedroom1'
import { officeRoom1 } from './rooms/officeRoom1'
import { officeRoom2 } from './rooms/officeRoom2'


export class Game extends Engine {

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
        this.winecellar = new wineCellar(this)
        this.bossroom = new bossRoom(this)
        this.storageroom = new storageRoom(this)
        this.Bedroom1 = new Bedroom1(this)
        this.officeroom1 = new officeRoom1(this)
        this.officeroom2 = new officeRoom2(this)


        this.addScene('titleMenu', this.titlemenu)  
        this.addScene('settingsMenu', this.settingsmenu)
        this.addScene('deathMenu', this.deathmenu)

        this.addScene('lobbyRoom', this.lobbyroom)  
        this.addScene('poolRoom', this.poolroom)
        this.addScene('wineCellar', this.winecellar)
        this.addScene('bossRoom', this.bossroom)
        this.addScene('storageRoom', this.storageroom)
        this.addScene('bedRoom1', this.Bedroom1)
        this.addScene('officeRoom1', this.officeroom1)
        this.addScene('officeRoom2', this.officeroom2)


        this.goToScene('wineCellar')

        console.log("Enjoy!")
    }
}



new Game()
