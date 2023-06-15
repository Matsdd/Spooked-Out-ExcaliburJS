import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { ghost } from './enemies/ghost.js'

export class bullet extends Actor{

    constructor(x, y) {
        super({width:Resources.bullet.width/20, height:Resources.bullet.height/20})
        this.pos = new Vector(x, y)
    }

onInitialize(Engine) {
    this.graphics.use(Resources.bullet.toSprite())
    this.vel = new Vector(100,0)
    this.scale = new Vector(0.2, 0.2);


    this.on('collisionstart', (event) => {
        if (event.other instanceof ghost) {
            this.kill()
            event.other.hp -= 1
            console.log(this.hp)
        }
    })
    }

}