import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import * as ex from 'excalibur'
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { demon } from '../enemies/demonBoss.js'
import { poltergeist } from '../enemies/poltergeist.js'
import { frederik } from '../frederik.js'
import { Resources } from '../resources.js'
import { roomBack } from './roomBack.js'
import { Barrier } from '../ui/barrier.js'
import { Donker } from '../props/donker.js'
import { ui } from '../ui/ui.js'
import { Tp } from '../ui/tp.js'
import { CFG } from '../ui/checkforghosts.js'
import { ghost } from "../enemies/ghost.js"

export class room extends Scene {
    roomBackground
    game
    Sjaak
    tpx
    tpy
    teleportActive = false
    teleporterInRoom = false
    constructor(game,tpx,tpy) {
        super({})
        this.game = game
        this.tpx = tpx
        this.tpy = tpy
    }

    onInitialize(engine) {

        let background = new roomBack(this.roomBackground);
        this.add(background);

        this.spawnBarriers()

        //const Ui = new ui()
        //this.add(Ui)

        const barriertop = new Barrier(765, -10, 1530, 20)
        this.add(barriertop)
        const barrierleft = new Barrier(-10, 540, 20, 1080)
        this.add(barrierleft)
        const barrierdown = new Barrier(765, 870, 1530, 20)
        this.add(barrierdown)
        const barrierright = new Barrier(1540, 540, 20, 1080)
        this.add(barrierright)

        this.check = new CFG()
        this.check.on('precollision', (event) => {
            if (event.other instanceof ghost) {
                if (event.other instanceof frederik) {
                    return
                }
                this.teleportActive = false
            }
        }) 
        this.add(this.check)
    }

    onPostUpdate() {
        if (this.teleportActive && !this.teleporterInRoom) {
            const teleporter = new Tp(this.tpx,this.tpy,90,30, this.game,this)
            this.add(teleporter)
            this.teleporterInRoom = true
        }
        this.teleportActive = true
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