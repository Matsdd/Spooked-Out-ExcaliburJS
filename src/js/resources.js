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
import settingsBack from '../images/menu/settingsMenu.png'

//props
import bulletImage from '../images/props/bullet.png'
import barrier from '../images/props/barrier.png'

// music
import backgroundMusic from '../sfx/8-bit loop background music.mp3'
import Ghost1 from '../sfx/Ghost 1.mp3'

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
    Settingsback: new ImageSource(settingsBack),

    //props
    bullet: new ImageSource(bulletImage),
    Barrier: new ImageSource(barrier),

    // music
    gameMusic: new Sound(backgroundMusic),
    Ghost1: new Sound(Ghost1)

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
    Resources.Settingsback,

    //props
    Resources.bullet,
    Resources.Barrier,

    // music
    Resources.gameMusic,
    Resources.Ghost1

])

export { Resources, ResourceLoader }