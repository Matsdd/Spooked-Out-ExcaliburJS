import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources } from '../resources'
import { Startbutton } from './startButton.js'
import { Settingsbutton } from "./settingsButton"
import { Quitbutton } from "./quitButton"
import { Titlebutton } from "./titleButton"
import { Continue } from "./continue"

export class titleMenu extends Scene {

    constructor() {
        super({})
    }
    
    onInitialize(engine) {
        const Titlescreen = new Actor();
        Titlescreen.graphics.use(Resources.Titleback.toSprite());
        Titlescreen.pos = new Vector(767, 430);
        Titlescreen.scale = new Vector(0.8, 0.8);
        this.add(Titlescreen);

        const button = new Startbutton(300, 420)
        button.on('pointerdown', (event) => {
            engine.goToScene('lobbyRoom')
        })
        this.add(button)

        const button2 = new Settingsbutton(300, 570)
        button2.on('pointerdown', (event) => {
            engine.goToScene('settingsMenu')
        })
        this.add(button2)

        const button3 = new Quitbutton(300, 720)
        button3.on('pointerdown', (event) => {
            engine.kill()
        })
        this.add(button3)
    }
}