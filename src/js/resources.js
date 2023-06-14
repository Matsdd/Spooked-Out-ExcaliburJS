import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import mainCharacterImage from '../images/mainCharacter.png'
import ghoulImage from '../images/ghosts/ghoul.png'
import play from "../images/play.png"
import lobby from "../images/rooms/lobby.png"

const Resources = {
    mainCharacter: new ImageSource(mainCharacterImage),
    ghoul: new ImageSource(ghoulImage),
    Play: new ImageSource(play),
    Lobby: new ImageSource(lobby),

}

const ResourceLoader = new Loader([Resources.mainCharacter, 
    Resources.ghoul, 
    Resources.Play, 
    Resources.Lobby,

])

export { Resources, ResourceLoader }