import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, Engine } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { ghost } from './enemies/ghost.js'
import { bullet } from './bullet.js'
import { room } from './rooms/room.js'
import { settingsMenu } from './menu/settingsmenu'

import * as ex from 'excalibur'
 
export class mainCharacter extends Actor {
  constructor() {
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
    this.hp = 2
  }

  onInitialize(Engine) {
    Engine.add('SettingsMenu', new settingsMenu())

    this.graphics.use(Resources.mainCharacter.toSprite());
    this.pos = new Vector(400, 300);
    this.scale = new Vector(0.2, 0.2);
    this.vel.y = 0;

    this.on('collisionstart', (event) => {
      if (event.other instanceof ghost) {
          // event.other.kill()
          this.hp -= 1
          console.log(this.hp)
      }
  })

  Engine.input.pointers.primary.on('down', (evt) => {
     const mouseX = evt.worldPos.x;
     const mouseY = evt.worldPos.y;

  
     let Bullet = new bullet(this.pos.x, this.pos.y, new Vector(mouseX, mouseY));
      Engine.currentScene.add(Bullet); 
    });
}

  onPreUpdate(Engine) {
    if (this.hp <= 0) {
      this.kill()
      console.log(this.hp)
    }
  }

  moveRight() {
    this.vel.x = this.speed;
     
  }

  moveLeft() {
    this.vel.x = -this.speed;
    
  }

  moveUp() { 
   if (this.isMovingRight) {
    this.vel.x = this.speed/1.5;
    this.vel.y = -this.speed/1.5;
    
  } else if (this.isMovingLeft) {
    this.vel.x = -this.speed/1.5;
    this.vel.y = -this.speed/1.5;
    
  } else {
    this.vel.y = -this.speed;
    
  }
}

  moveDown() { 
    if (this.isMovingRight) {
        this.vel.x = this.speed/1.5;
        this.vel.y = this.speed/1.5;
        
      } else if (this.isMovingLeft) {
        this.vel.x = -this.speed/1.5;
        this.vel.y = this.speed/1.5;
       
      } else {
        this.vel.y = this.speed;
       
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

    const mouseX = engine.input.pointers.primary.lastWorldPos.x;
    const mouseY = engine.input.pointers.primary.lastWorldPos.y;
    const direction = new Vector(mouseX, mouseY).sub(this.pos);

    if (direction.distance() > 0) {
      this.rotation = direction.toAngle() + Math.PI / 2;
    }

  }


}