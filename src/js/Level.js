import '../css/style.css'
import * as ex from 'excalibur'
import { Actor, Engine, Vector, Timer, TextAlign } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Exploder } from './exploder'
import { LaserBingus } from './laserBingus'
import { Fortification } from './fortification'

import { CurrencyCounter } from './currencyCounter'
import { Settings } from './settings'
import { Selection } from './selection'

import { Spot } from './spot'

export class Level extends Engine {

    constructor() {
        super({ width: 1530.01, height: 860.01 })
        // this.showDebug(true)
    }

    catfood = 20;
    catnip = 5;

    onInitialize(Engine, catfood) {
        const Background = new Actor();
        Background.graphics.use(Resources.Background.toSprite());
        Background.pos = new Vector(767, 430);
        Background.scale = new Vector(0.8, 0.8);
        this.add(Background);

        let currencyCounter = new CurrencyCounter();
        this.add(currencyCounter);

        let settings = new Settings();
        this.add(settings);

        let selection = new Selection();
        this.add(selection);

        const timer = new Timer({
          fcn: () => this.spawn(),
          repeats: true,
          interval: 10000,
        })  
          Engine.currentScene.add(timer)
          timer.start()

          const spot = new Spot


          this.catfoodLabel = new ex.Label({
            text: 'catfood',
            pos: ex.vec(20, 70),
            font: new ex.Font({
                size: 50,
                unit: ex.FontUnit.Px,
                textAlign: TextAlign.Left
            })
        });
        this.add(this.catfoodLabel)

        this.catnipLabel = new ex.Label({
            text: 'catnip',
            pos: ex.vec(20, 150),
            font: new ex.Font({
                size: 50,
                unit: ex.FontUnit.Px,
                textAlign: TextAlign.Left
            })
        });
        this.add(this.catnipLabel)


        Engine.input.pointers.primary.on('down', function (evt) {



            const clickX = evt.worldPos.x;
            const clickY = evt.worldPos.y;

            
              let laserBingus = new LaserBingus(clickX, clickY);
              Engine.add(laserBingus);  
            
            });
    }
    
    placeLaserBingus() {
  
}

    spawn() {
      let exploder = new Exploder(this)
          this.add(exploder)
    }

    onPostUpdate() {
        this.catfoodLabel.text = this.catfood + ''
        this.catnipLabel.text = this.catnip + ''
    }

    moneyAdd() {
        this.catfood += 1;
        }



    startGame() {        
        console.log("Enjoy!")
    }
}
