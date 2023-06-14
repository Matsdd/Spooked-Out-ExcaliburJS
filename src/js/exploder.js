import { Actor, Engine, Vector, Timer } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Explosion } from './explosion'
import { Enemy } from './enemy.js'
import * as ex from 'excalibur'

export class Exploder extends Enemy{

randomNumber
lane
hp = 10
lane1 = false;
lane2 = false;
lane3 = false;
lane4 = false;
game;

    getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  constructor(game) {
    super({width:Resources.Exploder.width/4, height:Resources.Exploder.height/4})

    this.game = game

    this.randomNumber = this.getRandomInt(4)
    switch (this.randomNumber) {
      case 0:
        this.lane = 300;

        break;
      case 1:
        this.lane = 450;

        break;
      case 2:
        this.lane = 600;

        break;
      case 3:
        this.lane = 750;

        break;  
    }}

onInitialize(Engine) {
this.graphics.use(Resources.Exploder.toSprite())
this.pos = new Vector(1600, this.lane)
this.vel = new Vector(-20,0)
this.scale = new Vector(0.4, 0.4);
}

onPreUpdate(Engine) {
  if (this.hp <= 0) {
    this.kill(this.game.moneyAdd())
    let explosion = new Explosion(this.pos.x, this.pos.y)
      Engine.currentScene.add(explosion)
    const timer = new Timer({
      fcn: () => this.explode(explosion),
      repeats: true,
      interval: 300,
    })    
      Engine.currentScene.add(timer)
      timer.start()
  }
  if (this.hp < 3) {
    this.graphics.use(Resources.DamageExploder.toSprite())
  }
}

explode(explosion) {    
  explosion.kill()
}
}