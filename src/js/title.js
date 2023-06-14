import '../css/style.css'
import * as ex from 'excalibur'
import { Actor, Engine, Vector, Timer, TextAlign } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Exploder } from './exploder'
import { LaserBingus } from './laserBingus'
import { Fortification } from './fortification'

import { CurrencyCounter } from './currencyCounter'
import { Settings } from './settings'
import { Selection } from './selection'

import { Spot } from './spot'

export class Title extends Engine {

    startGame() {        
        console.log("Enjoy!")
    }
}
