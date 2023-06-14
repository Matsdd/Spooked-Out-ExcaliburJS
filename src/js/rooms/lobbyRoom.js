import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { Resources } from '../resources.js'

export class lobbyRoom extends Scene {

    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        const Lobby = new Actor();
        Lobby.graphics.use(Resources.Lobby.toSprite());
        Lobby.pos = new Vector(767, 430);
        Lobby.scale = new Vector(0.8, 0.8);
        this.add(Lobby);


        let Sjaak = new mainCharacter()
        this.add(Sjaak)

        let Ghoul = new ghoul()
        this.add(Ghoul)
        console.log("jippieeee")
    }
}