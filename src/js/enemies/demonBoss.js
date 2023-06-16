import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js'
import { bullet } from '../bullet.js'

export class demon extends ghost {
  constructor(target, posX, posY) {
    super({
      width: Resources.demon.width / 1.6,
      height: Resources.demon.height / 1.6,
    });
    this.target = target;
    this.posX = posX;
    this.posY = posY;
    this.speed = 60;
    this.minDistance = 1;
    this.maxDistance = 1000;
    this.rotation = 0;
    this.hp = 100
  }

  playSoundAtRandomInterval() {
    const minInterval = 8000; // Minimum interval in milliseconds
    const maxInterval = 17000; // Maximum interval in milliseconds

    const randomInterval = Math.random() * (maxInterval - minInterval) + minInterval;

    // Play the sound
    const sound = new Audio(Resources.bossRoar.path);
    sound.volume = 0.5;

    // Set pitch
    const minPlaybackRate = 0.6; // Minimum playback rate
    const maxPlaybackRate = 1.4; // Maximum playback rate
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
    this.graphics.use(Resources.demon.toSprite());
    this.pos = new Vector(this.posX, this.posY);
    this.scale = new Vector(1, 1);

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
    });

    this.playSoundAtRandomInterval();
  }

  moveTowardsTarget() {
    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();

    if (distance > this.minDistance && distance < this.maxDistance) {
      const desiredVel = direction.normalize().scale(this.speed);
      this.vel = desiredVel.clampMagnitude(this.speed);

      // Calculate rotation based on movement direction
      this.rotation = Math.atan2(this.vel.y, this.vel.x);
    } else {
      this.vel = Vector.Zero;
    }
  }

  update(engine, delta) {
    this.moveTowardsTarget();
  }
}