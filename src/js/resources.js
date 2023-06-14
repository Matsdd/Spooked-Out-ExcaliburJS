import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import mainCharacterImage from '../images/mainCharacter.png'
import ghoulImage from '../images/ghosts/ghoul.png'
import play from "../images/menu/play.png"
import titlescreen from "../images/menu/titlescreen.png"
import lobby from "../images/rooms/lobby.png"
import Frederik from "../images/ghosts/Frederik.png"

const Resources = {
    mainCharacter: new ImageSource(mainCharacterImage),
    ghoul: new ImageSource(ghoulImage),
    Play: new ImageSource(play),
    Titlescreen: new ImageSource(titlescreen),
    Lobby: new ImageSource(lobby),
    Frederik: new ImageSource(Frederik)

}

const ResourceLoader = new Loader([
    Resources.mainCharacter, 
    Resources.ghoul, 
    Resources.Play, 
    Resources.Lobby,
    Resources.Frederik,
    Resources.Titlescreen,

])

export { Resources, ResourceLoader }