import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js'
import { bullet } from '../bullet.js'
import { spirit } from './spirit.js'
import { ghoul } from './ghoul.js'
import { wraith } from './wraith.js'
import { bossBar } from '../ui/bossBar.js'
import { darkAttack } from '../props/darkAttack.js'
import { poltergeist } from './poltergeist.js'
import { arach } from './arach.js'
import { upgradeSpeed } from '../artifacts/upgradeSpeed.js';
import { upgradePierce } from '../artifacts/upgradePierce.js';
import { upgradeDual } from '../artifacts/upgradeDual.js';
import { upgradeHp } from '../artifacts/upgradeHp.js';
import { upgradeAmmo } from '../artifacts/upgradeAmmo.js';

export class demon extends ghost {
  constructor(target, posX, posY,game) {
    super({
      width: Resources.demon.width / 1.6,
      height: Resources.demon.height / 1.6,
    });
    this.target = target;
    this.speed = 0;
    this.minDistance = 1;
    this.maxDistance = 1000;
    this.rotation = 0;
    this.game = game
    this.hp = 100 + (50 * game.difficulty)
    this.maxHp = 100 + (50 * game.difficulty)
    this.summonTimer = 0
    this.summonCooldown = 300
    this.bulletTimer = 0
    this.bulletCooldown = 300
    this.randomNumber = 0
    this.pos = new Vector(posX, posY);
    this.dead = false;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  playSoundAtRandomInterval() {
    const minInterval = 8000; // Minimum interval in milliseconds
    const maxInterval = 17000; // Maximum interval in milliseconds

    const randomInterval = Math.random() * (maxInterval - minInterval) + minInterval;

    // Play the sound
    const sound = new Audio(Resources.bossRoar.path);

    if ( this.dead === true ){
      sound.volume = 0 ;
    } else {
      sound.volume = 0.5;
    }

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
    this.game.difficulty++
  }

  onInitialize(engine) {
    const currentScene = engine.currentScene;
    this.graphics.use(Resources.demon.toSprite());
    this.scale = new Vector(1, 1);

    this.on('collisionstart', (event) => {
      const hitSound = new Audio(Resources.hitSound.path);
      const deathSound = new Audio(Resources.ghostDeath1.path)
      hitSound.volume = 0.3;
      deathSound.volume = 1;
      if (event.other instanceof bullet) {
        this.hp -= 1;
        hitSound.play();
        if (this.hp <= 0) {
          this.kill();
          this.dead = true;
          this.game.addScore(25,false)
          this.randomNumber
          this.randomNumber = this.getRandomInt(2);
          switch (this.randomNumber) {
            case 0:
            this.upgrade = new  upgradeDual(this.pos.x, this.pos.y);
            currentScene.add(this.upgrade);
            console.log("dual")
            break;
            case 1:
              this.randomNumber = this.getRandomInt(3);
              switch (this.randomNumber) {
                case 0 :
                this.upgrade = new  upgradeHp(this.pos.x, this.pos.y);
                currentScene.add(this.upgrade);
                console.log("hp")
                break;
                case 1 :
                this.upgrade = new  upgradeAmmo(this.pos.x, this.pos.y);
                currentScene.add(this.upgrade);
                console.log("ammo")
                break;
                case 2 :
                this.upgrade = new  upgradeSpeed(this.pos.x, this.pos.y);
                currentScene.add(this.upgrade);
                console.log("speed")
                break;
              }
            break;
          }
          deathSound.play();
        }
      }
    });

    const bossbar = new bossBar(this)
    engine.currentScene.add(bossbar)



      this.playSoundAtRandomInterval();

  }

  update(engine, delta) {
    
    this.summonTimer++
    this.bulletTimer++
    const direction = this.target.pos.sub(this.pos);
    this.rotation = direction.toAngle() + Math.PI / 2;

    //spawn twee spiritus
    this.summon(engine)
  }

  summon(engine) {
    const currentScene = engine.currentScene;
    if (this.hp > 75 && this.summonTimer >= this.summonCooldown) {
      console.log('pipi');
      const Spirit = new spirit(this.target, this.pos.x + 100, this.pos.y, this.game,false);
      Spirit.rotation = this.rotation;
      currentScene.add(Spirit);

      const spirit2 = new spirit(this.target, this.pos.x - 100, this.pos.y, this.game,false);
      spirit2.rotation = this.rotation;
      currentScene.add(spirit2);
      this.summonTimer = 50

    }

    //schiet kogels, spawn twee spiritus of een goel en spirit (3/4)
    if (this.hp <= 75 && this.hp > 50 && this.bulletTimer >= this.bulletCooldown) {
      const dark = new darkAttack(this.pos.x, this.pos.y, this.target)
      engine.currentScene.add(dark)
      this.randomNumber = Math.round(Math.random())
      this.bulletTimer = this.randomNumber * 80
    }
    if (this.hp <= 75 && this.hp > 50 && this.summonTimer >= this.summonCooldown) {
      this.randomNumber = Math.round(Math.random())
      switch (this.randomNumber) {
        case 0:
          const Spirit = new spirit(this.target, this.pos.x + 100, this.pos.y, this.game,false);
          Spirit.rotation = this.rotation;
          currentScene.add(Spirit);

          const spirit2 = new spirit(this.target, this.pos.x - 100, this.pos.y, this.game,false);
          spirit2.rotation = this.rotation;
          currentScene.add(spirit2);

          const spirit3 = new spirit(this.target, this.pos.x, this.pos.y + 50, this.game,false);
          spirit3.rotation = this.rotation;
          currentScene.add(spirit3);
          this.summonTimer = 0
          break
        case 1:
          const Ghoul = new ghoul(this.target, this.pos.x, this.pos.y, 5, this.game,false);
          Ghoul.rotation = this.rotation;
          currentScene.add(Ghoul);

          const spirit4 = new spirit(this.target, this.pos.x, this.pos.y + 50, this.game,false);
          spirit4.rotation = this.rotation;
          currentScene.add(spirit4);
          this.summonTimer = -100
          break
      }
    }

    //schiet slowness, spawn vier spiritus, een goel en twee spiritus of een wraith(2/4)
    if (this.hp <= 50 && this.bulletTimer >= this.bulletCooldown) {
      const dark = new darkAttack(this.pos.x, this.pos.y, this.target)
      engine.currentScene.add(dark)
      this.randomNumber = Math.round(Math.random())
      this.bulletTimer = this.randomNumber * 150
    }
    if (this.hp <= 50 && this.hp > 25 && this.summonTimer >= this.summonCooldown) {
      this.randomNumber = Math.round(Math.random() * 2)
      switch (this.randomNumber) {
        case 0:
          const Spirit = new spirit(this.target, this.pos.x + 100, this.pos.y, this.game,false);
          Spirit.rotation = this.rotation;
          currentScene.add(Spirit);

          const spirit2 = new spirit(this.target, this.pos.x - 100, this.pos.y, this.game,false);
          spirit2.rotation = this.rotation;
          currentScene.add(spirit2);

          const spirit3 = new spirit(this.target, this.pos.x + 100, this.pos.y + 50, this.game,false);
          spirit3.rotation = this.rotation;
          currentScene.add(spirit3);

          const spirit4 = new spirit(this.target, this.pos.x - 100, this.pos.y + 50, this.game,false);
          spirit4.rotation = this.rotation;
          currentScene.add(spirit4);
          this.summonTimer = -50
          break
        case 1:
          const Ghoul = new ghoul(this.target, this.pos.x, this.pos.y, this.game,false);
          Ghoul.rotation = this.rotation;
          currentScene.add(Ghoul);

          const spirit5 = new spirit(this.target, this.pos.x + 100, this.pos.y, this.game,false);
          spirit5.rotation = this.rotation;
          currentScene.add(spirit5);

          const spirit6 = new spirit(this.target, this.pos.x - 100, this.pos.y, this.game,false);
          spirit6.rotation = this.rotation;
          currentScene.add(spirit6);
          this.summonTimer = -100
          break
        case 2:
          const wrat = new wraith(this.target, this.pos.x - 100, this.pos.y, this.game,false);
          wrat.rotation = this.rotation;
          currentScene.add(wrat);
          this.summonTimer = -100
          break
      }
    }

    //kleine kans op rare ghost (1/4)
    if (this.hp <= 25 && this.hp > 0 && this.summonTimer >= this.summonCooldown) {
      this.randomNumber = Math.round(Math.random() * 4)
      switch (this.randomNumber) {
        case 0:
          const Spirit = new spirit(this.target, this.pos.x + 100, this.pos.y, this.game,false);
          Spirit.rotation = this.rotation;
          currentScene.add(Spirit);

          const spirit2 = new spirit(this.target, this.pos.x - 100, this.pos.y, this.game,false);
          spirit2.rotation = this.rotation;
          currentScene.add(spirit2);

          const spirit3 = new spirit(this.target, this.pos.x, this.pos.y + 50, this.game,false);
          spirit3.rotation = this.rotation;
          currentScene.add(spirit3);
          this.summonTimer = 0
          break
        case 1:
          const Ghoul = new ghoul(this.target, this.pos.x, this.pos.y, this.game,false);
          Ghoul.rotation = this.rotation;
          currentScene.add(Ghoul);

          const spirit4 = new spirit(this.target, this.pos.x, this.pos.y + 50, this.game,false);
          spirit4.rotation = this.rotation;
          currentScene.add(spirit4);
          this.summonTimer = -100
          break
        case 2:
          const Wrat = new wraith(this.target, this.pos.x, this.pos.y, this.game,false);
          Wrat.rotation = this.rotation;
          currentScene.add(Wrat);
          break
        case 3:
          const kever = new arach(this.target, this.pos.x, this.pos.y, this.game,false);
          kever.rotation = this.rotation;
          currentScene.add(kever);
          break
        case 4:
          const pot = new poltergeist(this.target, (Math.round(Math.random() * 1000)) + 100, 350, this.game,false);
          pot.rotation = this.rotation;
          currentScene.add(pot);
          break
      }
    }
  }
  onPostKill() {
    this.dead = true;
  }

}