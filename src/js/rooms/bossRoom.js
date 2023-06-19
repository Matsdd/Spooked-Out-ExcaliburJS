import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { demon } from '../enemies/demonBoss.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'


import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class bossRoom extends room {
        roomBackground = Resources.Boss
        Sjaak
        Demon
        spawnBarriers() {
        const bossMusic = new Audio(Resources.bossMusic.path)

        bossMusic.loop = true;
        bossMusic.volume = 0.3

        bossMusic.addEventListener('canplay', () => {
            bossMusic.play();
        });

        let background = new roomBack(Resources.Boss);
        this.add(background);

        const left = new Barrier(160,10,500,580)
        this.add(left)
        const right = new Barrier(1350,10,450,580)
        this.add(right)

        const up = new Barrier(767,50,950,10)
        this.add(up)
        const teleporter = new Tp(767,50,90,20, this.game)
        this.add(teleporter)
    }

    onDeactivate() {
        this.Sjaak.kill()
        this.Demon.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800)
        this.add(this.Sjaak)

        this.Demon = new demon(this.Sjaak, 767, 150)
        this.add(this.Demon)
    }
}