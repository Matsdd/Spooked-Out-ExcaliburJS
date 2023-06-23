import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, Engine, TextAlign } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
//import * as ex from 'excalibur'
import { ghost } from './enemies/ghost.js'
import { wraith } from './enemies/wraith.js'
import { spin } from './props/spin.js'
import { demon } from './enemies/demonBoss.js'
import { guardian } from './enemies/guardian.js'
import { bullet } from './bullet.js'
import { vaas } from './props/vaas.js'
import { shelf } from './props/shelf.js'
import { room } from './rooms/room.js'
import { settingsMenu } from './menu/settingsMenu'
import { Barrier } from './ui/barrier.js'
import { BarrierChecker } from './ui/playerBarrierChecker.js'
import { Healwater } from './props/healwater.js'
import { HP } from './ui/HPeter.js'
import { Ammo } from './ui/ammo.js'

import * as ex from 'excalibur'

export class mainCharacter extends Actor {
  barrierTarget
  ableUp
  ableDown
  ableRight
  ableLeft
  game
  bounceTimer = 0
  scoreLabel = ''

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
    this.pos = new Vector(posX, posY);
    this.game = game;
    this.bullets = 10;
    this.maxAmmo = 10
    this.reloadtimer = 0;
    this.slowtimer = 0;
    this.reloadCounter = 0
    this.shootAvailable = true
  }

  onInitialize(Engine) {
    Engine.add('SettingsMenu', new settingsMenu())

    this.graphics.use(Resources.mainCharacter.toSprite());
    this.scale = new Vector(0.2, 0.2);
    this.vel.y = 0;

    this.on('collisionstart', (event) => {
      const playerHit = new Audio(Resources.playerHit2.path);
      if (event.other instanceof wraith) {
        this.game.playerHp -= 2
        playerHit.play(1);
        console.log(this.game.playerHp)
        this.die(Engine)
      } else {
      if (event.other instanceof ghost) {
        this.game.playerHp -= 1
        playerHit.play(1);
        console.log(this.game.playerHp)
        this.die(Engine)
      }
    }
      if (event.other instanceof spin) {
        this.speed -= 8;
        this.slowtimer = 500;
      }
      if (event.other instanceof vaas) {
        this.game.playerHp -= 1;
        playerHit.play();
        this.die(Engine)
      }
      if (event.other instanceof shelf) {
        this.game.playerHp -= 1;
        playerHit.play();
        this.die(Engine)
      }
      if (event.other instanceof Healwater) {
        if (event.other.healed == false) {
          this.game.playerHp += 3
          if (this.game.playerHp > this.game.maxPlayerHP) {
            this.game.playerHp = this.game.maxPlayerHp
          }
          event.other.healed = true
        }
      }
      if (event.other instanceof demon) {
        const pushAngle = Math.PI / 2;
        const pushMagnitude = 7 * this.speed;
        this.vel = new Vector(
          Math.cos(pushAngle) * pushMagnitude,
          Math.sin(pushAngle) * pushMagnitude
        )
        this.bounceTimer = 10
      }
      if (event.other instanceof guardian && this.pos.y <= 310) {
        const pushAngle = 3 * Math.PI / 2;
        const pushMagnitude = 3 * this.speed;
        this.vel = new Vector(
          Math.cos(pushAngle) * pushMagnitude,
          Math.sin(pushAngle) * pushMagnitude
        )
        this.bounceTimer = 10
      }
      if (event.other instanceof guardian && this.pos.y >= 700) {
        const pushAngle = Math.PI / 2;
        const pushMagnitude = 3 * this.speed;
        this.vel = new Vector(
          Math.cos(pushAngle) * pushMagnitude,
          Math.sin(pushAngle) * pushMagnitude
        )
        this.bounceTimer = 10
      } else {
        if (event.other instanceof guardian && this.pos.y > 310 && this.pos.x < 850) {
          const pushAngle = Math.PI;
          const pushMagnitude = 3 * this.speed;
          this.vel = new Vector(
            Math.cos(pushAngle) * pushMagnitude,
            Math.sin(pushAngle) * pushMagnitude
          )
          this.bounceTimer = 10
        }
        if (event.other instanceof guardian && this.pos.y > 310 && this.pos.x > 850) {
          const pushAngle = 0;
          const pushMagnitude = 3 * this.speed;
          this.vel = new Vector(
            Math.cos(pushAngle) * pushMagnitude,
            Math.sin(pushAngle) * pushMagnitude
          )
          this.bounceTimer = 10
        }
      }
    })

    const currentScene = Engine.currentScene;
    const mainCharacterInScene = currentScene.actors.find(actor => actor instanceof mainCharacter);
    

    Engine.input.pointers.primary.on('down', (evt) => {
      if (mainCharacterInScene === this && this.reloadtimer < 0 && this.bullets > 0 && this.shootAvailable) {
        
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

    this.hp = new HP(this)
    Engine.currentScene.add(this.hp)
    this.ammo = new Ammo(this)
    Engine.currentScene.add(this.ammo)

    this.scoreLabel = new ex.Label({
      text: 'cash',
      pos: ex.vec(40, 180),
      font: new ex.Font({
          size: 36,
          unit: ex.FontUnit.Px,
          //textAlign: TextAlign.Right,
          color: ex.Color.White
      })
    });
    Engine.currentScene.add(this.scoreLabel)
  }
  
  onActivate() {
    pipi.setAmmo(this.bullets)
    pipi.setHp(this.game.playerHp)
  }

  goToDeath(game) {
    this.game.goToScene('deathMenu')
  }

  fixAmmo(pipi) {
    pipi.setAmmo(this.bullets)
  }
  fixHp(pipi) {
    pipi.setHp(this.game.playerHp)
  }

  onPreUpdate(Engine) {
    if (this.game.playerHp <= 0) {
      this.kill()
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
    this.reloadtimer = 10;
    this.reloadCounter = 10
  }

  die(Engine) {
    const deathScream = new Audio(Resources.deathScream.path);
    if (this.game.playerHp <= 0) {
      deathScream.play();
      Engine.goToScene('deathMenu')
      this.game.playerHp = 3
    }
  }

  update(engine) {
    this.bounceTimer -= 1

    if (this.reloadtimer <= 0 && this.reloadCounter != 0) {
      if (this.bullets !== this.maxAmmo) {
        this.bullets++
        this.reloadtimer = 10
      }
      this.reloadCounter--
    }
    
    this.reloadtimer--

    if (this.slowtimer <= 0) {
      this.speed = 150;
    }

    if (this.scoreLabel != '') {
      this.scoreLabel.text = this.game.score + ''
    }
    
    if (this.slowtimer > 0) {
      this.slowtimer--
    }

    

    if (engine.input.keyboard.wasPressed(ex.Input.Keys.Escape)) {
      engine.goToScene('settingsMenu')
    }
    if (this.bounceTimer < 0) {
      this.vel = new Vector(0, 0)
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

  onPostKill() {
    this.shootAvailable = false
    this.scoreLabel.text = ''
    this.hp.kill()
    this.ammo.kill()
  }

}