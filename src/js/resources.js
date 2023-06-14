import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import mainCharacterImage from '../images/mainCharacter.png'



const Resources = {
    mainCharacter: new ImageSource(mainCharacterImage),
}
const ResourceLoader = new Loader([Resources.mainCharacter, ])

export { Resources, ResourceLoader }