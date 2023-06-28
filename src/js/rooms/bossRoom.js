import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { demon } from '../enemies/demonBoss.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'
import { shelf } from '../props/shelf.js'


import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class bossRoom extends room {
        roomBackground = Resources.Boss
        Sjaak
        tpx = 767
        tpy = 50
        Demon
        Shelf
        shelfTimer = 180
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
    }

    onDeactivate() {
        this.Sjaak.kill()
        this.Sjaak.shootAvailable = false
        this.Sjaak.scoreLabel.text = ''
        this.Sjaak.roomCountLabel.text = ''
        this.Sjaak.hp.kill()
        this.Sjaak.ammo.kill()
        this.Sjaak.score.kill()
        this.Sjaak.sprint.kill()
        this.Demon.kill()

        if (this.zwart != null) {
            this.zwart.kill()
        }
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800,this.game)
        this.add(this.Sjaak)
        if (this.teleporten != null) {
            this.teleporter.kill()
        }
        this.teleportActive = false
        this.teleporterInRoom = false

        this.Demon = new demon(this.Sjaak, 767, 150,this.game,true)
        this.add(this.Demon)
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    onPreUpdate() {
            this.randomNumber

        if (this.shelfTimer <= 0 ) {
            this.randomNumber = this.getRandomInt(6);
            switch (this.randomNumber) {
                case 0:
                    this.Shelf = new shelf(50, 410)
                    this.add(this.Shelf)
                    this.shelfTimer = 300;
                break;
                case 1:
                    this.Shelf = new shelf(1490, 410)
                    this.add(this.Shelf)
                    this.shelfTimer = 300;
                break;
                case 2:
                    this.Shelf = new shelf(1490, 580)
                    this.add(this.Shelf)
                    this.shelfTimer = 300;
                break;
                case 3:
                    this.Shelf = new shelf(50, 580)
                    this.add(this.Shelf)
                    this.shelfTimer = 300;
                break;
                case 4:
                    this.Shelf = new shelf(1490, 770)
                    this.add(this.Shelf)
                    this.shelfTimer = 300;
                break;
                case 5:
                    this.Shelf = new shelf(50, 770)
                    this.add(this.Shelf)
                    this.shelfTimer = 300;
                break;
        }
    }

        if (this.shelfTimer > 0){
            this.shelfTimer--
        }
    }      
}   