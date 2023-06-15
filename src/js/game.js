import '../css/style.css'
import { Actor, Engine, Vector, } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { title } from './menu/title'
import { lobbyRoom } from './rooms/lobbyRoom'
import { poolRoom } from './rooms/poolRoom.js'
import { wineCellar } from './rooms/wineCellar.js'
import { bossRoom } from './rooms/bossRoom.js'

export class Game extends Engine {

    constructor() {
        super({ width: 1530.01, height: 860.01 })
        this.start(ResourceLoader).then(() => this.startGame())
        this.showDebug(true)
    }

    startGame() {  
        this.title = new title()
        this.lobbyroom = new lobbyRoom()

        this.addScene('title', this.title)  
        this.addScene('lobbyRoom', this.lobbyroom)  
        this.addScene('poolRoon', this.poolroom)
        this.addScene('wineCellar', this.winecellar)
        this.addScene('bossRoom', this.bossroom)

        this.goToScene('title')

        console.log("Enjoy!")
    }
}



new Game()
