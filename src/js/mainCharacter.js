import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, Engine } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { ghost } from './enemies/ghost.js'
import { bullet } from './bullet.js'
import { room } from './rooms/room.js'
import { settingsMenu } from './menu/settingsmenu'
import { Barrier } from './ui/barrier.js'
import { BarrierChecker } from './ui/playerBarrierChecker.js'

import * as ex from 'excalibur'
 
export class mainCharacter extends Actor {
  barrierTarget
  ableUp
  ableDown
  ableRight
  ableLeft
  constructor(posX, posY) {
    super({
      width: Resources.mainCharacter.width/1.6,
      height: Resources.mainCharacter.height/1.6,
    });
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isMovingUp = false; 
    this.isMovingDown = false; 
    this.speed = 150;
    this.rotation = 0;
    this.hp = 10
    this.pos = new Vector(posX, posY);
  }

  onInitialize(Engine) {
    Engine.add('SettingsMenu', new settingsMenu())

    this.graphics.use(Resources.mainCharacter.toSprite());
    this.scale = new Vector(0.2, 0.2);
    this.vel.y = 0;

    this.on('collisionstart', (event) => {
      if (event.other instanceof ghost) {
          this.hp -= 1
          if (this.hp <= 0) {
            this.kill();
          }
      }
  })

  const currentScene = Engine.currentScene;
  const mainCharacterInScene = currentScene.actors.find(actor => actor instanceof mainCharacter);
  if (mainCharacterInScene === this) {
    
    Engine.input.pointers.primary.on('down', (evt) => {
      const mouseX = evt.worldPos.x;
      const mouseY = evt.worldPos.y;

      const Bullet = new bullet(this.pos.x, this.pos.y, new Vector(mouseX, mouseY));
      currentScene.add(Bullet);
    });
  }

  const areaCheckerUp = new BarrierChecker(10,10,55,10,this,'up')
  areaCheckerUp.on('precollision', (event) => {
    if (event.other instanceof Barrier) {
      this.ableUp = 0
    }
  })
  Engine.currentScene.add(areaCheckerUp)
  const areaCheckerDown = new BarrierChecker(10,10,55,10,this,'down')
  areaCheckerDown.on('precollision', (event) => {
    if (event.other instanceof Barrier) {
      this.ableDown = 0
    }
  })
  Engine.currentScene.add(areaCheckerDown)
  Engine.currentScene.add(areaCheckerUp)
  const areaCheckerRight = new BarrierChecker(10,10,10,55,this,'right')
  areaCheckerRight.on('precollision', (event) => {
    if (event.other instanceof Barrier) {
      this.ableRight = 0
    }
  })
  Engine.currentScene.add(areaCheckerRight)
  Engine.currentScene.add(areaCheckerUp)
  const areaCheckerLeft = new BarrierChecker(10,10,10,55,this,'left')
  areaCheckerLeft.on('precollision', (event) => {
    if (event.other instanceof Barrier) {
      this.ableLeft = 0
    }
  })
  Engine.currentScene.add(areaCheckerLeft)
}

  onPreUpdate(Engine) {
    if (this.hp <= 0) {
      this.kill()
      console.log(this.hp)
    }
  }

  goPosition(barrier,type) {
    //voor barriercollision(:
    if (type == 'up') {
      barrier.pos.x = this.pos.x
      barrier.pos.y = this.pos.y - 30
    }
    if (type == 'down') {
      barrier.pos.x = this.pos.x
      barrier.pos.y = this.pos.y + 30
    }
    if (type == 'right') {
      barrier.pos.x = this.pos.x + 30
      barrier.pos.y = this.pos.y
    }
    if (type == 'left') {
      barrier.pos.x = this.pos.x - 30
      barrier.pos.y = this.pos.y
    }
  }

  moveRight() {
    this.vel.x = this.speed * this.ableRight;
     
  }

  moveLeft() {
    this.vel.x = -this.speed * this.ableLeft;
    
  }

  moveUp() { 
    if (this.isMovingRight) {
      this.vel.x = this.speed/1.5 * this.ableRight;
      this.vel.y = -this.speed/1.5 * this.ableUp;
      
    } else if (this.isMovingLeft) {
      this.vel.x = -this.speed/1.5 * this.ableLeft;
      this.vel.y = -this.speed/1.5 * this.ableUp;
      
    } else {
      this.vel.y = -this.speed * this.ableUp;
      
    }
}

  moveDown() { 
    if (this.isMovingRight) {
        this.vel.x = this.speed/1.5 * this.ableRight;
        this.vel.y = this.speed/1.5 * this.ableDown;
        
      } else if (this.isMovingLeft) {
        this.vel.x = -this.speed/1.5 * this.ableLeft;
        this.vel.y = this.speed/1.5 * this.ableDown;
       
      } else {
        this.vel.y = this.speed * this.ableDown;
       
      }
  }

  stopMovement() {
    this.vel.x = 0;
    this.vel.y = 0; 
  }

  

  update(engine) {
    if (engine.input.keyboard.wasPressed(ex.Input.Keys.Escape)) {
      engine.goToScene('settingsMenu')
    }

    if (engine.input.keyboard.wasPressed(Input.Keys.D)) {
      this.isMovingRight = true;
      this.moveRight();
    }

    if (engine.input.keyboard.wasReleased(Input.Keys.D)) {
      this.isMovingRight = false;
      if (!this.isMovingLeft) {
        this.stopMovement();
      }
    }

    if (engine.input.keyboard.wasPressed(Input.Keys.A)) {
      this.isMovingLeft = true;
      this.moveLeft();
    }

    if (engine.input.keyboard.wasReleased(Input.Keys.A)) {
      this.isMovingLeft = false;
      if (!this.isMovingRight) {
        this.stopMovement();
      }
    }

    
    if (engine.input.keyboard.wasPressed(Input.Keys.W)) {
      this.isMovingUp = true;
      this.moveUp();
    }

    if (engine.input.keyboard.wasReleased(Input.Keys.W)) {
      this.isMovingUp = false;
      if (!this.isMovingDown) {
        this.stopMovement();
      }
    }

    if (engine.input.keyboard.wasPressed(Input.Keys.S)) {
      this.isMovingDown = true;
      this.moveDown();
    }

    if (engine.input.keyboard.wasReleased(Input.Keys.S)) {
      this.isMovingDown = false;
      if (!this.isMovingUp) {
        this.stopMovement();
      }
    }

    if (this.isMovingRight && engine.input.keyboard.isHeld(Input.Keys.D)) {
      this.moveRight();
    }

    if (this.isMovingLeft && engine.input.keyboard.isHeld(Input.Keys.A)) {
      this.moveLeft();
    }

    
    if (this.isMovingUp && engine.input.keyboard.isHeld(Input.Keys.W)) {
      this.moveUp();
    }

    if (this.isMovingDown && engine.input.keyboard.isHeld(Input.Keys.S)) {
      this.moveDown();
    }

    this.ableUp = 1
    this.ableDown = 1
    this.ableLeft = 1
    this.ableRight = 1

    const mouseX = engine.input.pointers.primary.lastWorldPos.x;
    const mouseY = engine.input.pointers.primary.lastWorldPos.y;
    const direction = new Vector(mouseX, mouseY).sub(this.pos);

    if (direction.distance() > 0) {
      this.rotation = direction.toAngle() + Math.PI / 2;
    }
  }
}