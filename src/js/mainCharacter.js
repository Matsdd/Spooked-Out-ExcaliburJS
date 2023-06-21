import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, Engine } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { ghost } from './enemies/ghost.js'
import { wraith } from './enemies/wraith.js'
import { arach } from './enemies/arach.js'
import { bullet } from './bullet.js'
import { vaas } from './props/vaas.js'
import { shelf } from './props/shelf.js'
import { room } from './rooms/room.js'
import { settingsMenu } from './menu/settingsmenu'
import { Barrier } from './ui/barrier.js'
import { BarrierChecker } from './ui/playerBarrierChecker.js'
import { Healwater } from './props/healwater.js'

import * as ex from 'excalibur'

export class mainCharacter extends Actor {
  barrierTarget
  ableUp
  ableDown
  ableRight
  ableLeft
  game

  constructor(posX, posY, game) {
    super({
      width: Resources.mainCharacter.width / 1.6,
      height: Resources.mainCharacter.height / 1.6,
    });
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.speed = 150;
    this.rotation = 0;
    this.hp = 3;
    this.pos = new Vector(posX, posY);
    this.game = game;
    this.bullets = 10;
    this.reloadtimer = 0;
    this.slowtimer = 0;

  }

  onInitialize(Engine) {
    Engine.add('SettingsMenu', new settingsMenu())

    this.graphics.use(Resources.mainCharacter.toSprite());
    this.scale = new Vector(0.2, 0.2);
    this.vel.y = 0;

    this.on('collisionstart', (event) => {
      const playerHit = new Audio(Resources.playerHit2.path);
      if (event.other instanceof arach) {
        this.hp -= 1;
        this.speed -= 10;
        this.slowtimer = 500;
        playerHit.play(1);
        console.log(this.hp)
        this.die(Engine)
      } else {
      if (event.other instanceof wraith) {
        this.hp -= 2
        playerHit.play(1);
        console.log(this.hp)
        this.die(Engine)
      } else {
      if (event.other instanceof ghost) {
        this.hp -= 1
        playerHit.play(1);
        console.log(this.hp)
        this.die(Engine)
      }
    }
      if (event.other instanceof vaas) {
        this.hp -= 1;
        playerHit.play();
        this.die(Engine)
      }
      if (event.other instanceof shelf) {
        this.hp -= 1;
        playerHit.play();
        this.die(Engine)
      }
      if (event.other instanceof Healwater) {
        if (event.other.healed == false) {
          this.hp += 3
          event.other.healed = true
        }
      }
    }
    })

    const currentScene = Engine.currentScene;
    const mainCharacterInScene = currentScene.actors.find(actor => actor instanceof mainCharacter);
    

    Engine.input.pointers.primary.on('down', (evt) => {
      if (mainCharacterInScene === this && this.reloadtimer <= 0 && this.bullets > 0) {
        
        const mouseX = evt.worldPos.x;
        const mouseY = evt.worldPos.y;

        const Bullet = new bullet(this.pos.x, this.pos.y, new Vector(mouseX, mouseY));
        currentScene.add(Bullet);
        this.bullets--
      }
    });

    const areaCheckerUp = new BarrierChecker(10, 10, 55, 10, this, 'up')
    areaCheckerUp.on('precollision', (event) => {
      if (event.other instanceof Barrier) {
        this.ableUp = 0
      }
    })
    Engine.currentScene.add(areaCheckerUp)
    const areaCheckerDown = new BarrierChecker(10, 10, 55, 10, this, 'down')
    areaCheckerDown.on('precollision', (event) => {
      if (event.other instanceof Barrier) {
        this.ableDown = 0
      }
    })
    Engine.currentScene.add(areaCheckerDown)
    Engine.currentScene.add(areaCheckerUp)
    const areaCheckerRight = new BarrierChecker(10, 10, 10, 55, this, 'right')
    areaCheckerRight.on('precollision', (event) => {
      if (event.other instanceof Barrier) {
        this.ableRight = 0
      }
    })
    Engine.currentScene.add(areaCheckerRight)
    Engine.currentScene.add(areaCheckerUp)
    const areaCheckerLeft = new BarrierChecker(10, 10, 10, 55, this, 'left')
    areaCheckerLeft.on('precollision', (event) => {
      if (event.other instanceof Barrier) {
        this.ableLeft = 0
      }
    })
    Engine.currentScene.add(areaCheckerLeft)
  }

  goToDeath(game) {
    this.game.goToScene('deathMenu')
  }

  onPreUpdate(Engine) {
    if (this.hp <= 0) {
      this.kill()
      console.log(this.hp)
    }
  }

  goPosition(barrier, type) {
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
      this.vel.x = this.speed / 1.5 * this.ableRight;
      this.vel.y = -this.speed / 1.5 * this.ableUp;

    } else if (this.isMovingLeft) {
      this.vel.x = -this.speed / 1.5 * this.ableLeft;
      this.vel.y = -this.speed / 1.5 * this.ableUp;

    } else {
      this.vel.y = -this.speed * this.ableUp;

    }
  }

  moveDown() {
    if (this.isMovingRight) {
      this.vel.x = this.speed / 1.5 * this.ableRight;
      this.vel.y = this.speed / 1.5 * this.ableDown;

    } else if (this.isMovingLeft) {
      this.vel.x = -this.speed / 1.5 * this.ableLeft;
      this.vel.y = this.speed / 1.5 * this.ableDown;

    } else {
      this.vel.y = this.speed * this.ableDown;

    }
  }

  stopMovement() {
    this.vel.x = 0;
    this.vel.y = 0;
  }

  reload() {
    //reload sound here
    this.bullets = 10;
    this.reloadtimer = 100;
  }

  die(Engine) {
    const deathScream = new Audio(Resources.deathScream.path);
    if (this.hp <= 0) {
      deathScream.play();
      Engine.goToScene('deathMenu')
    }
  }

  update(engine) {
    if (this.slowtimer > 0) {
      this.slowtimer--
    }

    if (this.slowtimer <= 0) {
      this.speed = 150;
    }
    
    if (this.reloadtimer > 0) {
      this.reloadtimer--
    }

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

    const gunReload = new Audio(Resources.gunLoad.path);
    if (this.reloadtimer <= 0 && engine.input.keyboard.wasPressed(Input.Keys.R)) {
      this.reload();
      gunReload.play();
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