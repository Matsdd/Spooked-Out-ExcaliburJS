import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js';
import { bullet } from '../bullet.js';
import { wisp } from './wisp.js';
import { fireBall } from '../props/fireball.js';
import { bossBar } from '../ui/bossBar.js';

export class bloodyMary extends ghost {
  bounceTimer = 0
  constructor(target, posX, posY, chosenPath) {
    super({
      width: Resources.BloodyMary.width / 1.3,
      height: Resources.BloodyMary.height / 1.6,
    });
    this.target = target;
    this.speed = 40;
    this.minDistance = 1;
    this.maxDistance = 550;
    this.rotation = 0;
    this.hp = 50;
    this.maxHp = 50
    this.timer = 0
    this.secondaryTimer = 0
    this.cooldown = 300
    this.secondaryCooldown = 500
    this.soundInterval = null;
    this.fireKind = 0
    this.graphics.use(Resources.BloodyMary.toSprite());
    this.scale = new Vector(0.6, 0.6);
    this.pos = new Vector(posX, posY);
    this.prox = false
    this.path = [
      new Vector(),
      new Vector(),
      new Vector(),
      new Vector(),
    ]
    this.currentWaypoint = 0;
    this.chosenPath = chosenPath;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  onInitialize(engine) {

    this.on('collisionstart', (event) => {
      const hitSound = new Audio(Resources.hitSound.path);
      const ghostDeath1 = new Audio(Resources.ghostDeath1.path);
      const ghostDeath2 = new Audio(Resources.ghostDeath2.path);
      ghostDeath1.volume = 0.5
      ghostDeath2.volume = 0.5
      hitSound.volume = 0.3;
      if (event.other instanceof bullet) {
        this.hp -= 1;
        hitSound.play();
        if (this.hp <= 0) {
          this.kill();
          this.randomNumber
          this.randomNumber = this.getRandomInt(2);

          switch (this.randomNumber) {
            case 0:
              ghostDeath1.play();
              break;
            case 1:
              ghostDeath2.play();
              break;
          }

        }
      }
      if (event.other instanceof mainCharacter) {
        this.vel = new Vector(
          Math.cos(this.rotation) * -10 * this.speed,
          Math.sin(this.rotation) * -10 * this.speed
        )
        this.bounceTimer = 10
      }
    });
      switch (this.chosenPath) {
        case 0:
          this.path = [
            new Vector(460, 170),
            new Vector(920, 170),
          ]
          break;
    }

    
    const bossbar = new bossBar(this)
    engine.currentScene.add(bossbar)

    // Start playing sounds at random intervals
    this.playSoundAtRandomInterval();
  }

  playSoundAtRandomInterval() {
    const minInterval = 8000; // Minimum interval in milliseconds
    const maxInterval = 17000; // Maximum interval in milliseconds

    const randomInterval = Math.random() * (maxInterval - minInterval) + minInterval;

    // Play the sound
    // const sounds = new Audio[Resources.Ghost1.path, Resources.Ghost2.path, Resources.Ghost3.path];

    const sound = new Audio(Resources.Ghost1.path);
    const sound2 = new Audio(Resources.Ghost2.path);
    const sound3 = new Audio(Resources.Ghost3.path);
    const sound4 = new Audio(Resources.Ghost4.path);
    sound.volume = 0.2;
    sound2.volume = 0.2;
    sound3.volume = 0.2;
    sound4.volume = 0.2;

    // Set pitch
    const minPlaybackRate = 1; // Minimum playback rate
    const maxPlaybackRate = 4; // Maximum playback rate
    const randomPlaybackRate = Math.random() * (maxPlaybackRate - minPlaybackRate) + minPlaybackRate;
    sound.playbackRate = randomPlaybackRate;


    this.randomNumber
    this.randomNumber = this.getRandomInt(4);

    switch (this.randomNumber) {
      case 0:
        sound.play();
        break;
      case 1:
        sound2.play();
        break;
      case 2:
        sound3.play();
        break;
      case 3:
        sound4.play();
        break;
    }



    // Schedule the next sound playback
    this.soundInterval = setTimeout(() => {
      this.playSoundAtRandomInterval();
    }, randomInterval);
  }

  moveTowardsTarget(target) {
    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();

    if (this.bounceTimer < 0) {
      if (distance > this.minDistance && distance < this.maxDistance) {
        const desiredVel = direction.normalize().scale(this.speed);
        this.vel = desiredVel.clampMagnitude(this.speed);

        // Calculate rotation based on movement direction
        this.rotation = Math.atan2(this.vel.y, this.vel.x);
      } else {
        // Follow the predefined path
        const targetWaypoint = this.path[this.currentWaypoint];
        const direction = targetWaypoint.sub(this.pos);
        const distance = direction.distance();

        if (distance > this.minDistance) {
          const desiredVel = direction.normalize().scale(this.speed);
          this.vel = desiredVel.clampMagnitude(this.speed);

          // Calculate rotation based on movement direction
          this.rotation = Math.atan2(this.vel.y, this.vel.x);
        } else {
          // Reached the current waypoint, move to the next one
          this.currentWaypoint = (this.currentWaypoint + 1) % this.path.length;
          this.vel = Vector.Zero;
        }
      }
    }

  }

  update(engine, delta) {
    this.timer++
    this.secondaryTimer++
    this.bounceTimer -= 1
    if (this.prox) {
      this.moveTowardsTarget(this.target.pos);
    } else {
      const targetWaypoint = this.path[this.currentWaypoint];
      this.moveTowardsTarget(targetWaypoint);
    }

    // Call the base update method to apply the calculated velocity and rotation
    super.update(engine, delta);

    
    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();
    const currentScene = engine.currentScene;
    const mariaInScene = currentScene.actors.find(actor => actor instanceof bloodyMary);
    if (mariaInScene === this) {
      if (this.timer > this.cooldown && distance > this.minDistance) {
        const Wisp = new wisp(this.target, this.pos.x, this.pos.y,);
        Wisp.rotation = this.rotation;
        currentScene.add(Wisp);
        this.timer = 0
      }

      if (this.secondaryTimer > this.secondaryCooldown && distance > this.minDistance) {
        if (this.fireKind == 0) {
          const fireball1 = new fireBall(this.pos.x, this.pos.y, this.target,50,0);
          currentScene.add(fireball1);
          this.secondaryTimer = 0
  
          const fireball2 = new fireBall(this.pos.x, this.pos.y, this.target,-50,0);
          currentScene.add(fireball2);
          this.secondaryTimer = 0
  
          const fireball3 = new fireBall(this.pos.x, this.pos.y, this.target,0,50);
          currentScene.add(fireball3);
          this.secondaryTimer = 0
  
          const fireball4 = new fireBall(this.pos.x, this.pos.y, this.target,0,-50);
          currentScene.add(fireball4);
          this.secondaryTimer = 0
          this.fireKind++
        }else{
          const fireball1 = new fireBall(this.pos.x, this.pos.y, this.target,33,33);
          currentScene.add(fireball1);
          this.secondaryTimer = 0
  
          const fireball2 = new fireBall(this.pos.x, this.pos.y, this.target,-33,33);
          currentScene.add(fireball2);
          this.secondaryTimer = 0
  
          const fireball3 = new fireBall(this.pos.x, this.pos.y, this.target,-33,-33);
          currentScene.add(fireball3);
          this.secondaryTimer = 0
  
          const fireball4 = new fireBall(this.pos.x, this.pos.y, this.target,33,-33);
          currentScene.add(fireball4);
          this.secondaryTimer = 0
          this.fireKind = 0
        }
      }
    };
  }

  onPostKill() {
    // Clear the sound interval
    clearTimeout(this.soundInterval);
  }

  
}
