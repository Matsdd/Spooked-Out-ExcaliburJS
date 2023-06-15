import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { ghost } from './enemies/ghost.js'
import { bullet } from './bullet.js'
 
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

  onInitialize() {
    this.graphics.use(Resources.mainCharacter.toSprite());
    this.pos = new Vector(400, 300);
    this.scale = new Vector(0.2, 0.2);
    this.vel.y = 0;

    this.on('collisionstart', (event) => {
      if (event.other instanceof ghost) {
          event.other.kill()
          this.hp -= 1
          console.log(this.hp)
      }
  })

  this.on('pointerdown', (event) => {
    const bulletSpeed = 10; // Adjust the bullet speed as desired

    // Get the direction vector from the main character towards the mouse position
    const mousePos = new Vector(event.clientX, event.clientY);
    const direction = mousePos.clone().subtract(this.pos).normalize();

    // Calculate the velocity vector for the bullet
    const velocity = direction.clone().scale(bulletSpeed);

    // Create a new bullet object with the initial position and velocity
    const Bullet = new bullet(this.pos.x, this.pos.y, velocity);

    // Add the bullet to the current scene
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

  

  update(engine) {
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