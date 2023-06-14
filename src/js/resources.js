import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import mainCharacterImage from '../images/mainCharacter.png'
import play from "../images/play.png"


const Resources = {
    mainCharacter: new ImageSource(mainCharacterImage),
    Play: new ImageSource(play),

}
const ResourceLoader = new Loader([Resources.mainCharacter, 
Resources.Play,

])

export { Resources, ResourceLoader }