import '../css/style.css'
import * as ex from 'excalibur'
import { Actor, Engine, Vector, Timer, TextAlign } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Title extends Engine {

    startGame() {        
        console.log("Enjoy!")
    }
}
