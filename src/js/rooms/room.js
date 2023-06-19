import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import * as ex from 'excalibur'
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { demon } from '../enemies/demonBoss.js'
import { poltergeist } from '../enemies/poltergeist.js'
import { Resources } from '../resources.js'
import { roomBack } from './roomBack.js'
import { Barrier } from '../ui/barrier.js'
import { Donker } from '../props/donker.js'

export class room extends Scene {
    roomBackground
    game
    Sjaak
    constructor(game) {
        super({})
        this.game = game

    }

    onInitialize(engine) {
        const ambience = new Audio(Resources.dungeonAmbience.path);

        let background = new roomBack(this.roomBackground);
        this.add(background);

        this.Sjaak = new mainCharacter(400, 700)
        this.add(this.Sjaak)

        let Ghoul = new ghoul(this.Sjaak, 300, 300)
        this.add(Ghoul)

        let Spirit = new spirit(this.Sjaak, 400, 200)
        this.add(Spirit)

        let Poltergeist = new poltergeist(this.Sjaak, 600, 200)
        this.add(Poltergeist)

        this.spawnBarriers()

        const barriertop = new Barrier(765, -10, 1530, 20)
        this.add(barriertop)
        const barrierleft = new Barrier(-10, 540, 20, 1080)
        this.add(barrierleft)
        const barrierdown = new Barrier(765, 870, 1530, 20)
        this.add(barrierdown)
        const barrierright = new Barrier(1540, 540, 20, 860)
        this.add(barrierright)

        ambience.loop = true;

        ambience.addEventListener('canplay', () => {
            ambience.play();
        });
    }



    volgLicht(zwart) {
        if (zwart == 'make') {
            this.zwart = new Donker(this.Sjaak)
            this.add(this.zwart)
        }
        if (zwart == 'kill') {
            this.zwart.kill()
        }
    }
}