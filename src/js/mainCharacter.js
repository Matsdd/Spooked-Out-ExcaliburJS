import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';

export class mainCharacter extends Actor {
  constructor() {
    super({
      width: Resources.mainCharacter.width / 1,
      height: Resources.mainCharacter.height / 1,
    });
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isMovingUp = false; 
    this.isMovingDown = false; 
    this.speed = 150;
    this.rotation = 0;
    this.hp = 10
  }

  onInitialize() {
    this.graphics.use(Resources.mainCharacter.toSprite());
    this.pos = new Vector(400, 300);
    this.scale = new Vector(0.2, 0.2);
    this.vel.y = 0;
  }

  moveRight() {
    this.vel.x = this.speed;
    this.rotation = 0; 
  }

  moveLeft() {
    this.vel.x = -this.speed;
    this.rotation = Math.PI;
  }

  moveUp() { 
   if (this.isMovingRight) {
    this.vel.x = this.speed/1.5;
    this.vel.y = -this.speed/1.5;
    this.rotation = -Math.PI / 4;
  } else if (this.isMovingLeft) {
    this.vel.x = -this.speed/1.5;
    this.vel.y = -this.speed/1.5;
    this.rotation = -Math.PI * 3 / 4;
  } else {
    this.vel.y = -this.speed;
    this.rotation = -Math.PI / 2;
  }
}

  moveDown() { 
    if (this.isMovingRight) {
        this.vel.x = this.speed/1.5;
        this.vel.y = this.speed/1.5;
        this.rotation = Math.PI / 4;
      } else if (this.isMovingLeft) {
        this.vel.x = -this.speed/1.5;
        this.vel.y = this.speed/1.5;
        this.rotation = Math.PI * 3 / 4;
      } else {
        this.vel.y = this.speed;
        this.rotation = Math.PI / 2;
      }
  }

  stopMovement() {
    this.vel.x = 0;
    this.vel.y = 0; 
  }

  update(engine, delta) {
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

  }
}