import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import mainCharacterImage from '../images/mainCharacter.png'
import ghoulImage from '../images/ghosts/ghoul.png'



const Resources = {
    mainCharacter: new ImageSource(mainCharacterImage),
    ghoul: new ImageSource(ghoulImage),
}
const ResourceLoader = new Loader([Resources.mainCharacter, Resources.ghoul, ])

export { Resources, ResourceLoader }