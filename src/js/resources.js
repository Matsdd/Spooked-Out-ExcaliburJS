import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import mainCharacterImage from '../images/mainCharacter.png'
<<<<<<< HEAD
import ghoulImage from '../images/ghosts/ghoul.png'

=======
import play from "../images/play.png"
>>>>>>> 03052c6b4bc0995e894f5d0c0638e0893b279225


const Resources = {
    mainCharacter: new ImageSource(mainCharacterImage),
<<<<<<< HEAD
    ghoul: new ImageSource(ghoulImage),
}
const ResourceLoader = new Loader([Resources.mainCharacter, Resources.ghoul, ])
=======
    Play: new ImageSource(play),

}
const ResourceLoader = new Loader([Resources.mainCharacter, 
Resources.Play,

])
>>>>>>> 03052c6b4bc0995e894f5d0c0638e0893b279225

export { Resources, ResourceLoader }