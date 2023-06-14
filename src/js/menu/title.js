import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources } from '../resources'
import { Startbutton } from './startButton.js'

export class title extends Scene {

    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        const Titlescreen = new Actor();
        Titlescreen.graphics.use(Resources.Titlescreen.toSprite());
        Titlescreen.pos = new Vector(767, 430);
        Titlescreen.scale = new Vector(0.8, 0.8);
        this.add(Titlescreen);

        const button = new Startbutton()
        button.on('pointerdown', (event) => {
            engine.goToScene('lobbyRoom')
        })
        this.add(button)
    }
}