import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import ExploderImage from '../sprites/robots/ExploderI.png'
import DamageExploderImage from '../sprites/robots/ExploderIDamage.png'



const Resources = {
    Exploder: new ImageSource(ExploderImage),
    DamageExploder: new ImageSource(DamageExploderImage),
    LaserBingus: new ImageSource(LaserBingusImage),
    Fortification: new ImageSource(FortificationImage),
    Laser: new ImageSource(LaserImage),
    Background: new ImageSource(BackgroundImage),
    Explosion: new ImageSource(ExplosionImage),
    Lane: new ImageSource(laneImage),
    CurrencyCounter: new ImageSource(currencyCounterImage),
    Settings: new ImageSource(SettingsImage),
    Selection: new ImageSource(selectionImage)
}
const ResourceLoader = new Loader([Resources.DamageExploder, Resources.Exploder, Resources.LaserBingus, 
    Resources.Fortification, Resources.Laser, Resources.Background, Resources.Explosion, Resources.Lane,
    Resources.CurrencyCounter, Resources.Settings, Resources.Selection, ])

export { Resources, ResourceLoader }