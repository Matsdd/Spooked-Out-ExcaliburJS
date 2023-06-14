import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Laser } from './laser.js'
import { Lane } from './lane.js'
import { Enemy } from "./enemy.js";

export class LaserBingus extends Actor{

timer = 0;

myLane

constructor(x, y) {
    super({width:Resources.LaserBingus.width, height:Resources.LaserBingus.height})
    this.pos = new Vector(x, y)
}

onInitialize(Engine) {
    this.graphics.use(Resources.LaserBingus.toSprite())
    this.scale = new Vector(0.35, 0.35);

    
    this.myLane = new Lane(this.pos.x, this.pos.y, this.Lane)
    
    Engine.currentScene.add(this.myLane)
    
    this.myLane.on('precollision', (event) => {


        if (event.other instanceof Enemy) {
            this.timer += 1;

            if (this.timer > 60) {

                const laser = new Laser(this.pos.x, this.pos.y)
                Engine.currentScene.add(laser)
                
                this.timer = 0;
            }
        }
    })
    }



}

