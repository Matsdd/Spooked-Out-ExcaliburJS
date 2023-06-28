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
import { sprint } from './ui/sprint.js'
import { score } from './ui/score.js'
import { bril } from './hoeden/bril.js'

import * as ex from 'excalibur'
import { upgradeHp } from './artifacts/upgradeHp.js';
import { upgradeAmmo } from './artifacts/upgradeAmmo.js';
import { upgradeSpeed } from './artifacts/upgradeSpeed.js';
import { upgradeDual } from './artifacts/upgradeDual.js';
import { upgradePierce } from './artifacts/upgradePierce.js';
import { upgradeFlame } from './artifacts/upgradeFlame.js';

export class mainCharacter extends Actor {
  barrierTarget
  ableUp
  ableDown
  ableRight
  ableLeft
  game
  bounceTimer = 0
  scoreLabel = ''
  currentscene

  constructor(posX, posY, game) {
    super({
      width: Resources.mainCharacter.width / 1.6,
      height: Resources.mainCharacter.height / 1.6,
    });
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.speed = 140;
    this.runspeed = 180
    this.rotation = 0;
    this.pos = new Vector(posX, posY);
    this.x = posX
    this.y = posY
    this.game = game;
    this.bullets = 10;
    this.maxAmmo = 10
    this.reloadtimer = 0;
    this.slowtimer = 0;
    this.reloadCounter = 0
    this.shootAvailable = true
    this.stamina = 180
    this.sprinting = false
    this.sprintTimer = 40
    this.hpArtifact1 = false;
    this.hpArtifact2 = false;
    this.ammoArtifact1 = false;
    this.ammoArtifact2 = false;
    this.upgradeTimer = 0;
    this.bounceSpeed = 140; 
    this.speedMultiplier = 140;
    this.dualShot = false;
    this.burnShot = false;
    this.pierceShot = false;
  }

  onInitialize(Engine) {
    Engine.add('SettingsMenu', new settingsMenu())

    this.graphics.use(Resources.mainCharacter.toSprite());
    this.scale = new Vector(0.2, 0.2);
    this.vel.y = 0;

    this.on('collisionstart', (event) => {
      const playerHit = new Audio(Resources.playerHit2.path);

      if (event.other instanceof upgradeHp && this.upgradeTimer === 0) {
        switch(this.game.cosmetics[0]) {
          case 0:
            this.game.cosmetics[0] = 1
          break
          case 1:
            this.game.cosmetics[0] = 2
          break
          default:
            break
        }
        
        this.game.playerHp = this.game.cosmetics[0] * 3 + 3
        this.upgradeTimer = 100;
      }
      if (event.other instanceof upgradeAmmo && this.upgradeTimer == 0) {
        switch(this.game.cosmetics[1]) {
          case 0:
            this.game.cosmetics[1] = 1
          break
          case 1:
            this.game.cosmetics[1] = 2
          break
          default:
            break
        }
        
        this.maxAmmo = this.game.cosmetics[1] * 10 + 10
        this.bullets = this.game.cosmetics[1] * 10 + 10
        this.upgradeTimer = 100;
      }
      if (event.other instanceof upgradeSpeed && this.upgradeTimer === 0) {
        switch(this.game.cosmetics[2]) {
          case 0:
            this.game.cosmetics[2] = 1
          break
          case 1:
            this.game.cosmetics[2] = 2
          break
          case 2:
            this.game.cosmetics[2] = 3
          break
          default:
            break
        }
        
        this.speed = this.game.cosmetics[2] * 10 + 140
        this.runspeed = this.game.cosmetics[2] * 10 + 180
        this.upgradeTimer = 100;
      }
      if (event.other instanceof upgradeDual) {
        this.game.cosmetics[3] = true
        this.dualShot = true
      }
      if (event.other instanceof upgradePierce) {
        this.game.cosmetics[4] = true
        this.pierceShot = true
      }
      if (event.other instanceof upgradeFlame) {
        this.game.cosmetics[5] = true
        this.burnShot = true
      }
      if (event.other instanceof bril) {
        this.bril = true
      }
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
          if( this.hpArtifact1 === true){
            this.game.playerHp = 6
          event.other.healed = true
          }
          if( this.hpArtifact2 === true){
            this.game.playerHp = 9
          event.other.healed = true
          }else{
            this.game.playerHp = 3
            event.other.healed = true
        }
        }
      }
      if (event.other instanceof demon) {
        const pushAngle = Math.PI / 2;
        const pushMagnitude = 7 * this.bounceSpeed;
        this.vel = new Vector(
          Math.cos(pushAngle) * pushMagnitude,
          Math.sin(pushAngle) * pushMagnitude
        )
        this.bounceTimer = 10
      }
      if (event.other instanceof guardian && this.pos.y <= 310) {
        const pushAngle = 3 * Math.PI / 2;
        const pushMagnitude = 3 * this.bounceSpeed;
        this.vel = new Vector(
          Math.cos(pushAngle) * pushMagnitude,
          Math.sin(pushAngle) * pushMagnitude
        )
        this.bounceTimer = 10
      }
      if (event.other instanceof guardian && this.pos.y >= 700) {
        const pushAngle = Math.PI / 2;
        const pushMagnitude = 3 * this.bounceSpeed;
        this.vel = new Vector(
          Math.cos(pushAngle) * pushMagnitude,
          Math.sin(pushAngle) * pushMagnitude
        )
        this.bounceTimer = 10
      } else {
        if (event.other instanceof guardian && this.pos.y > 310 && this.pos.x < 850) {
          const pushAngle = Math.PI;
          const pushMagnitude = 3 * this.bounceSpeed;
          this.vel = new Vector(
            Math.cos(pushAngle) * pushMagnitude,
            Math.sin(pushAngle) * pushMagnitude
          )
          this.bounceTimer = 10
        }
        if (event.other instanceof guardian && this.pos.y > 310 && this.pos.x > 850) {
          const pushAngle = 0;
          const pushMagnitude = 3 * this.bounceSpeed;
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
        if (this.dualShot === true) {
          const mouseX = evt.worldPos.x;
          const mouseY = evt.worldPos.y;

          const spawnDelay = 100;
    
          const Bullet = new bullet(this.pos.x, this.pos.y, new Vector(mouseX, mouseY), this.pierceShot, this.burnShot);
          currentScene.add(Bullet);
    
          setTimeout(() => {
            const Bullet2 = new bullet(this.pos.x, this.pos.y, new Vector(mouseX, mouseY), this.pierceShot, this.burnShot);
            currentScene.add(Bullet2);
          }, spawnDelay);
    
          this.bullets--;
        }else {
        const mouseX = evt.worldPos.x;
        const mouseY = evt.worldPos.y;

        const Bullet = new bullet(this.pos.x, this.pos.y, new Vector(mouseX, mouseY), this.pierceShot, this.burnShot);
        currentScene.add(Bullet);
        this.bullets--
      }
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

    this.currentscene = Engine.currentScene
    this.hp = new HP(this)
    Engine.currentScene.add(this.hp)
    this.ammo = new Ammo(this)
    Engine.currentScene.add(this.ammo)
    this.score = new score()
    Engine.currentScene.add(this.score)
    this.sprint = new sprint(this)
    Engine.currentScene.add(this.sprint)

    this.scoreLabel = new ex.Label({
      text: 'cash',
      z: 99,
      pos: ex.vec(70, 53),
      font: new ex.Font({
          size: 36,
          unit: ex.FontUnit.Px,
          //textAlign: TextAlign.Right,
          color: ex.Color.White
      })
    });
    Engine.currentScene.add(this.scoreLabel)

    if (this.pos.x > 1600 || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > 1000) {
      this.pos = new Vector(this.x,this.y)
    }
  }
  
  onActivate() {
    pipi.setAmmo(this.bullets)
    pipi.setHp(this.game.playerHp)

    this.game.playerHp = (this.game.cosmetics[0] + 3) * 3
    this.maxAmmo = this.game.cosmetics[1] * 10 + 10
    this.bullets = this.game.cosmetics[1] * 10 + 10
    this.speed = this.game.cosmetics[2] * 10 + 140
    this.runspeed = this.game.cosmetics[2] * 10 + 180

    this.burnShot = this.game.cosmetics[5]
    this.dualShot = this.game.cosmetics[3]
    this.pierceShot = this.game.cosmetics[4]

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
  fixSprint(pipi) {
    pipi.setSprint(this.stamina)
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
    const gunReload = new Audio(Resources.gunLoad.path);
    gunReload.play(); 
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

    if(this.upgradeTimer > 0) {
      this.upgradeTimer--
    }
    
    if (!this.sprinting && this.stamina < 180) {
      this.stamina += 2.5
      if (this.stamina > 180) {
        this.stamina = 180
      }
    }
    this.sprintTimer--
    if (this.sprintTimer < 0) {
      this.sprinting = false
    }


    if (this.reloadtimer <= 0 && this.reloadCounter != 0) {
      if (this.bullets !== this.maxAmmo) {
        this.bullets++
        this.reloadtimer = 10
      }
      this.reloadCounter--
    }
    
    this.reloadtimer--

    if (this.slowtimer <= 0) {
      this.speed = this.speedMultiplier;
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
      if (engine.input.keyboard.isHeld(Input.Keys.ShiftLeft) || engine.input.keyboard.isHeld(Input.Keys.ShiftRight)) {
        if (this.stamina > 0) {
          this.speed = this.runspeed
          this.stamina--
          this.sprintTimer = 40
          this.sprinting = true
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

      if (this.reloadtimer <= 0 && engine.input.keyboard.wasPressed(Input.Keys.R)) {
        this.reload();
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
    this.score.kill()
    this.sprint.kill()


  }

}