import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, Engine } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js'
import { spirit } from '../enemies/spirit.js'
import { ghoul } from '../enemies/ghoul.js'
import { bullet } from '../bullet.js'
import { bossBar } from '../ui/bossBar.js'

export class guardian extends ghost {
  bouncing = true
  constructor(target, posX, posY) {
    super({
      width: Resources.Guardian.width / 1.6,
      height: Resources.Guardian.height / 1.6,
    });
    this.target = target;
    this.speed = 0;
    this.minDistance = 1;
    this.maxDistance = 500;
    this.rotation = 0;
    this.hp = 50;
    this.maxHp = 50
    this.timer = 0;
    this.cooldown = 250;
    this.pos = new Vector(posX, posY);
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.Guardian.toSprite());
    this.scale = new Vector(0.3, 0.3);

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

      this.playSoundAtRandomInterval();
    });

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

    const bossbar = new bossBar(this)
    Engine.currentScene.add(bossbar)

  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  update(Engine) {
    this.randomNumber

    this.timer++
    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();

    const currentScene = Engine.currentScene;
    const guardianInScene = currentScene.actors.find(actor => actor instanceof guardian);
    if (guardianInScene === this) {

      if (this.timer > this.cooldown && distance > this.minDistance) {
        this.randomNumber = this.getRandomInt(2)
        switch (this.randomNumber) {
          case 0:
            const Spirit = new spirit(this.target, this.pos.x, this.pos.y,);
            Spirit.rotation = this.rotation;
            currentScene.add(Spirit);

            const Spirit2 = new spirit(this.target, this.pos.x / 1.2, this.pos.y,);
            Spirit.rotation = direction.toAngle() + Math.PI / 2;
            currentScene.add(Spirit2);

            this.timer = 0;
            break;

          case 1:
            const Ghoul = new ghoul(this.target, this.pos.x, this.pos.y,);
            Ghoul.rotation = this.rotation;
            currentScene.add(Ghoul);

            this.timer = 0;

        }
      };
    }


    //     if (direction.distance() > 0) {
    //       this.rotation = direction.toAngle() + Math.PI / 2;
    //     }else {
    //       this.timer = 0
    //     }
  }
}

