import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js';
import { bullet } from '../bullet.js';
import { flames } from '../props/flames.js';

export class wraith extends ghost {
  bounceTimer = 0
  constructor(target, posX, posY, chosenPath,game,getscore) {
    super({
      width: Resources.Wraith.width / 1.6,
      height: Resources.Wraith.height / 1.75,
    });
    this.target = target;
    this.speed = 70;
    this.getscore = getscore
    this.minDistance = 1;
    this.maxDistance = 7000
    this.rotation = 0;
    this.hp = 20 + (game.difficulty * 4)
    this.game = game
    this.soundInterval = null;
    this.graphics.use(Resources.Wraith.toSprite());
    this.scale = new Vector(0.5, 0.5);
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
    this.aggro = false;
    this.burn = false;
    this.burnCount = 0;
    this.burnTimer = 0;
    this.burn1 = true;
    this.dead = false;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  onInitialize() {

    this.on('collisionstart', (event) => {
      //const hitSound = new Audio(Resources.hitSound.path);
      const ghostDeath1 = new Audio(Resources.ghostDeath1.path);
      const ghostDeath2 = new Audio(Resources.ghostDeath2.path);
      ghostDeath1.volume = 0.5
      ghostDeath2.volume = 0.5
      //hitSound.volume = 0.3;
      if (event.other instanceof bullet) {
        this.hp -= 1;
        this.aggro = true;
        //hitSound.play();
        if (this.hp <= 0) {
          this.kill();
          this.dead = true;
          if (this.getscore) {
            this.game.addScore(5,false)
          }
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
        this.maxDistance = 450,
          this.path = [
            new Vector(470, 600),
            new Vector(470, 450),
            new Vector(570, 450),
            new Vector(570, 600),
          ]
        break;
      case 1:
        this.maxDistance = 450,
          this.path = [
            new Vector(1000, 350),
            new Vector(400, 350),
            new Vector(1000, 350),
            new Vector(400, 350),
          ]
        break;
    }

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
    if ( this.dead === true ){
      sound.volume = 0 ;
      sound2.volume = 0 ;
      sound3.volume = 0 ;
      sound4.volume = 0 ;
    } else {
      sound.volume = 0.2;
      sound2.volume = 0.2;
      sound3.volume = 0.2;
      sound4.volume = 0.2;
    }

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
      if (distance > this.minDistance && distance < this.maxDistance || this.aggro === true) {
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

    if ( this.burn === true && this.burnTimer <= 0) {
      if (this.burn1 === false ){
        this.hp -= 1;
        hitSound.play();
        }
        if (this.burn1 === true ){
          this.Flames = new flames(this)
          engine.currentScene.add(this.Flames)
          }
      this.burn1 = false;
      this.burnTimer = 100;
      this.burnCount += 1;
      if ( this.burnCount === 3 ) {
        this.burn = false;
        this.burnCount = 0;
        this.burn1 = true;
        this.Flames.kill()
      }
      if (this.hp <= 0) {
        this.kill();
        if (this.getscore) {
          this.game.addScore(1,false)
        }
      }
    }

    if ( this.burnTimer > 0 ) {
      this.burnTimer--
    }

    this.bounceTimer -= 1
    if (this.prox) {
      this.moveTowardsTarget(this.target.pos);
    } else {
      const targetWaypoint = this.path[this.currentWaypoint];
      this.moveTowardsTarget(targetWaypoint);
    }

    // Call the base update method to apply the calculated velocity and rotation
    super.update(engine, delta);
  }

  onPostKill() {
    // Clear the sound interval
    clearTimeout(this.soundInterval);
    this.dead = true;
    this.Flames.kill()
  }
}

