import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { ghost } from './enemies/ghost.js'
import { mainCharacter } from './mainCharacter.js'

export class bullet extends Actor{

    constructor(x, y, target) {
        super({width:Resources.bullet.width/20, height:Resources.bullet.height/20})
        this.pos = new Vector(x, y)
        this.target = target;
        this.speed = 500;
    }

onInitialize(Engine) {
    this.graphics.use(Resources.bullet.toSprite())
    this.scale = new Vector(0.2, 0.2);




    this.on('collisionstart', (event) => {
        if (event.other instanceof ghost) {
            this.kill()
            event.other.hp -= 1
            console.log(this.hp)
        }
    })

    this.moveTowardsTarget();

    }

    moveTowardsTarget() {
        const direction = new Vector(this.target.x, this.target.y).sub(this.pos).normalize();
        this.vel = direction.scale(this.speed);
        this.rotation = direction.toAngle();
      }
    }