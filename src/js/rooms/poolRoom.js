import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'

export class poolRoom extends Scene {

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

        let Ghoul = new ghoul(Sjaak)
        this.add(Ghoul)

        let Spirit = new spirit(Sjaak)
        this.add(Spirit)
        
    }
}