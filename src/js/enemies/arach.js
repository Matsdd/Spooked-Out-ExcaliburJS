import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js';
import { bullet } from '../bullet.js';

export class arach extends ghost {
  bounceTimer = 0
  constructor(target, posX, posY, chosenPath) {
    super({
      width: Resources.Arach.width / 1.1,
      height: Resources.Arach.height / 2,
    });
    this.target = target;
    this.speed = 130;
    this.minDistance = 1;
    this.maxDistance = 500;
    this.rotation = 0;
    this.hp = 10;
    this.soundInterval = null;
    this.graphics.use(Resources.Arach.toSprite());
    this.scale = new Vector(0.45, 0.45);
    this.pos = new Vector(posX, posY);
    this.prox = false
    this.path = [
      new Vector(100, 100),
      new Vector(200, 200),
      new Vector(300, 100),
      new Vector(400, 200),
    ]
    this.currentWaypoint = 0;
    this.chosenPath = chosenPath;
    this.aggro = false;
  }

  onInitialize() {

    this.on('collisionstart', (event) => {
      const hitSound = new Audio(Resources.hitSound.path);
      hitSound.volume = 0.3;
      if (event.other instanceof bullet) {
        this.hp -= 1;
        hitSound.play();
        this.aggro = true;
        if (this.hp <= 0) {
          this.kill();
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
        this.maxDistance = 450;
        this.path = [
          new Vector(1430, 150),
          new Vector(1430, 300),
          new Vector(1430, 150),
          new Vector(1170, 150),
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
    const sound = new Audio(Resources.Ghost1.path);
    sound.volume = 0.2;

    // Set pitch
    const minPlaybackRate = 1; // Minimum playback rate
    const maxPlaybackRate = 4; // Maximum playback rate
    const randomPlaybackRate = Math.random() * (maxPlaybackRate - minPlaybackRate) + minPlaybackRate;
    sound.playbackRate = randomPlaybackRate;
    sound.play();

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
  }
}
