import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js';
import { bullet } from '../bullet.js';

export class mimic extends ghost {
  bounceTimer = 0
  constructor(target, posX, posY,game) {
    super({
      width: Resources.Mimic.width / 1.6,
      height: Resources.Mimic.height / 1.6,
    });
    this.target = target;
    this.speed = 30;
    this.minDistance = 1;
    this.rotation = 0;
    this.hp = 20 + (game.difficulty * 5)
    this.game = game
    this.soundInterval = null;
    this.graphics.use(Resources.Mimic.toSprite());
    this.scale = new Vector(0.45, 0.45);
    this.pos = new Vector(posX, posY);
    this.burn = false;
    this.burnCount = 0;
    this.burnTimer = 0;
    this.burn1 = true;
    this.dead = false;
  }

  onInitialize() {

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
        this.aggro = true;
        if (this.hp <= 0) {
          this.kill();
          this.dead = true;
          this.game.addScore(12,false)
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



    // Start playing sounds at random intervals
    this.playSoundAtRandomInterval();
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
      if (distance > this.minDistance) {
        const desiredVel = direction.normalize().scale(this.speed);
        this.vel = desiredVel.clampMagnitude(this.speed);

        // Calculate rotation based on movement direction
        this.rotation = Math.atan2(this.vel.y, this.vel.x);
      }
    }
  }

  update(engine, delta) {

    if ( this.burn === true && this.burnTimer <= 0) {
      if (this.burn1 === false ){
      this.hp -= 1;
      }
      this.burn1 = false;
      this.burnTimer = 100;
      this.burnCount += 1;
      console.log(this.hp)
      if ( this.burnCount === 3 ) {
        this.burn = false;
        this.burnCount = 0;
        this.burn1 = true;
      }
      if (this.hp <= 0) {
        this.kill();
      }
    }

    if ( this.burnTimer > 0 ) {
      this.burnTimer--
    }

    this.bounceTimer -= 1
    this.moveTowardsTarget(this.target.pos);


    this.speed = 120 - (this.hp * 3)

    // Call the base update method to apply the calculated velocity and rotation
    super.update(engine, delta);
  }

  onPostKill() {
    // Clear the sound interval
    clearTimeout(this.soundInterval);
  }
}
