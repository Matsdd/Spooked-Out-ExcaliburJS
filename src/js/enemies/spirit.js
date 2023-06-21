import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js'
import { bullet } from '../bullet.js'

export class spirit extends ghost {
  bounceTimer = 0
  constructor(target, posX, posY) {
    super({
      width: Resources.spirit.width / 4,
      height: Resources.spirit.height / 4,
    });
    this.target = target;
    this.posX = posX;
    this.posY = posY;
    this.speed = 140;
    this.minDistance = 1;
    this.maxDistance = 5000;
    this.rotation = 0;
    this.hp = 2
    this.pos = new Vector(posX, posY);
    this.graphics.use(Resources.spirit.toSprite());
    this.pos = new Vector(this.posX, this.posY);
    this.scale = new Vector(0.3, 0.3);
  }

  playSoundAtRandomInterval() {
    const minInterval = 5000; // Minimum interval in milliseconds
    const maxInterval = 13000; // Maximum interval in milliseconds

    const randomInterval = Math.random() * (maxInterval - minInterval) + minInterval;

    // Play the sound
    const sound = new Audio(Resources.Ghost2.path);
    sound.volume = 0.3;

    // Set pitch
    const minPlaybackRate = 1; // Minimum playback rate
    const maxPlaybackRate = 2; // Maximum playback rate
    const randomPlaybackRate = Math.random() * (maxPlaybackRate - minPlaybackRate) + minPlaybackRate;
    sound.playbackRate = randomPlaybackRate;
    sound.play();

    // Schedule the next sound playback
    this.soundInterval = setTimeout(() => {
      this.playSoundAtRandomInterval();
    }, randomInterval);
  }

  onPostKill() {
    // Clear the sound interval
    clearTimeout(this.soundInterval);
  }

  onInitialize() {
    this.on('collisionstart', (event) => {
      const hitSound = new Audio(Resources.hitSound.path);
      hitSound.volume = 0.3;
      if (event.other instanceof bullet) {
        this.hp -= 1;
        hitSound.play();
        if (this.hp <= 0) {
          this.kill();
        }
      }
      if (event.other instanceof mainCharacter) {
        this.vel = new Vector(
          Math.cos(this.rotation) * -10 * this.speed/2,
          Math.sin(this.rotation) * -10 * this.speed/2
        )
        this.bounceTimer = 10
      }
    });

    this.playSoundAtRandomInterval();
  }

  moveTowardsTarget() {
    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();

    if (this.bounceTimer < 0) {
    if (distance > this.minDistance && distance < this.maxDistance) {
      const desiredVel = direction.normalize().scale(this.speed);
      this.vel = desiredVel.clampMagnitude(this.speed);

      // Calculate rotation based on movement direction
      this.rotation = Math.atan2(this.vel.y, this.vel.x);
    } else {
      this.vel = Vector.Zero;
    }
  }
}

  update(engine, delta) {
    this.moveTowardsTarget();
    this.bounceTimer -= 1
  }
}