import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { demon } from '../enemies/demonBoss.js'
import { Resources } from '../resources.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class bossRoom extends room {
    Sjaak
    constructor() {
        super({})
    }

    onInitialize(engine) {
        const bossMusic = new Audio(Resources.bossMusic.path)

        bossMusic.loop = true;
        bossMusic.volume = 0.3

        bossMusic.addEventListener('canplay', () => {
            bossMusic.play(0.3);
        });

        let background = new roomBack(Resources.Boss);
        this.add(background);

        this.Sjaak = new mainCharacter(800, 650)
        this.add(this.Sjaak)

        let Demon = new demon(this.Sjaak, 800, 200)
        this.add(Demon)
    }
}