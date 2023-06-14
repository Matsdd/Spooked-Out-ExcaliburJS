import { ImageSource, Sound, Resource, Loader } from 'excalibur'

//characters
import mainCharacterImage from '../images/mainCharacter.png'
import ghoulImage from '../images/ghosts/ghoul.png'
import Frederik from "../images/ghosts/Frederik.png"

//rooms
import lobby from "../images/rooms/lobby.png"

//menu
import titleback from "../images/menu/titleback.png"
import play from "../images/menu/play.png"
import Continue from "../images/menu/Continue.png"
import quit from "../images/menu/quit.png"
import settings from "../images/menu/Settings.png"
import titlescreen from "../images/menu/titlescreen.png"


const Resources = {
    //characters
    mainCharacter: new ImageSource(mainCharacterImage),
    ghoul: new ImageSource(ghoulImage),
    Frederik: new ImageSource(Frederik),

    //rooms
    Lobby: new ImageSource(lobby),

    //menu
    Titleback: new ImageSource(titleback),
    Play: new ImageSource(play),
    Continue: new ImageSource(Continue),
    Quit: new ImageSource(quit),
    Settings: new ImageSource(settings),
    Titlescreen: new ImageSource(titlescreen),

}

const ResourceLoader = new Loader([
    //characters
    Resources.mainCharacter, 
    Resources.ghoul, 
    Resources.Frederik,

    //rooms
    Resources.Lobby,

    //menu
    Resources.Titleback,
    Resources.Play, 
    Resources.Continue,
    Resources.Quit,
    Resources.Settings,
    Resources.Titlescreen,

])

export { Resources, ResourceLoader }