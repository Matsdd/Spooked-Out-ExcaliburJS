import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import mainCharacterImage from '../images/mainCharacter.png'
import ghoulImage from '../images/ghosts/ghoul.png'

import play from "../images/play.png"


const Resources = {
    mainCharacter: new ImageSource(mainCharacterImage),
    ghoul: new ImageSource(ghoulImage),
    Play: new ImageSource(play),
}
const ResourceLoader = new Loader([Resources.mainCharacter, Resources.ghoul, Resources.Play, ])
    




export { Resources, ResourceLoader }