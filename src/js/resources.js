import { ImageSource, Sound, Resource, Loader } from 'excalibur'

//characters
import mainCharacterImage from '../images/mainCharacter.png'
import ghoulImage from '../images/ghosts/ghoul.png'
import spiritImage from '../images/ghosts/spirit.png'
import demonImage from '../images/ghosts/demon.png'
import poltergeistImage from '../images/ghosts/poltergeist.png'
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

//props
import bulletImage from '../images/props/bullet.png'


const Resources = {
    //characters
    mainCharacter: new ImageSource(mainCharacterImage),
    ghoul: new ImageSource(ghoulImage),
    spirit: new ImageSource(spiritImage),
    demon: new ImageSource(demonImage),
    poltergeist: new ImageSource(poltergeistImage),
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

    //props
    bullet: new ImageSource(bulletImage),

}

const ResourceLoader = new Loader([
    //characters
    Resources.mainCharacter, 
    Resources.ghoul,
    Resources.spirit,
    Resources.demon,
    Resources.poltergeist,
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

    //props
    Resources.bullet,

])

export { Resources, ResourceLoader }