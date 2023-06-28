import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input, Engine } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js'
import { vaas } from '../props/vaas.js'
import { bullet } from '../bullet.js'
import { flames } from '../props/flames.js'

export class poltergeist extends ghost {
  constructor(target, posX, posY,game,getscore) {
    super({
      width: Resources.poltergeist.width / 1.6,
      height: Resources.poltergeist.height / 1.6,
    });
    this.target = target;
    this.speed = 0;
    this.getscore = getscore
    this.minDistance = 1;
    this.maxDistance = 500;
    this.rotation = 0;
    this.hp = 15 + (game.difficulty * 3)
    this.game = game
    this.timer = 0;
    this.cooldown = 100;
    this.pos = new Vector(posX, posY);
    this.burn = false;
    this.burnCount = 0;
    this.burnTimer = 0;
    this.burn1 = true;
    this.dead = false;
  }

  onInitialize(Engine) {
    this.graphics.use(Resources.poltergeist.toSprite());
    this.scale = new Vector(0.3, 0.3);
    const hitSound = new Audio(Resources.hitSound.path);
    const ghostDeath1 = new Audio(Resources.ghostDeath1.path);
    const ghostDeath2 = new Audio(Resources.ghostDeath2.path);
    ghostDeath1.volume = 0.5
    ghostDeath2.volume = 0.5
    hitSound.volume = 0.3;

    this.on('collisionstart', (event) => {
      if (event.other instanceof bullet) {
        this.hp -= 1;
        hitSound.play();
        if (this.hp <= 0) {
          this.kill();
          this.dead = true; 
          if (this.getscore) {
          this.game.addScore(4,false)
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
      this.playSoundAtRandomInterval();
    });


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

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  update(Engine) {

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
        if (this.getscore) {
        this.game.addScore(4,false)
        }
      }
    }

    if ( this.burnTimer > 0 ) {
      this.burnTimer--
    }

    this.randomNumber
    this.timer++
    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();

    const currentScene = Engine.currentScene;
    const poltergeistInScene = currentScene.actors.find(actor => actor instanceof poltergeist);
    if (poltergeistInScene === this) {

      if (this.timer > this.cooldown && distance > this.minDistance) {
        this.randomNumber = this.getRandomInt(2);

        switch (this.randomNumber) {
          case 0:
            const Vaas1 = new vaas(this.pos.x * 0.90, this.pos.y * 0.99, this.target);
            Vaas1.rotation = this.rotation;
            currentScene.add(Vaas1);
            break;
          case 1:
            const Vaas = new vaas(this.pos.x * 1.1, this.pos.y * 1.01, this.target);
            Vaas.rotation = this.rotation;
            currentScene.add(Vaas);
            break;
        }

        this.timer = 0
      };
    }


    if (direction.distance() > 0) {
      this.rotation = direction.toAngle() + Math.PI / 2;
    } else {
      this.timer = 0
    }
  }

  onPostKill() {
    this.dead = true;
  }
}