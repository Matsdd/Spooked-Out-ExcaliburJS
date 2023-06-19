import { ImageSource, Sound, Resource, Loader } from 'excalibur'

//characters
import mainCharacterImage from '../images/mainCharacter.png'
import ghoulImage from '../images/ghosts/ghoul.png'
import spiritImage from '../images/ghosts/spirit.png'
import demonImage from '../images/ghosts/demon.png'
import poltergeistImage from '../images/ghosts/poltergeist.png'
import Frederik from "../images/ghosts/Frederik.png"
import guardianImage from "../images/ghosts/guardian.png"
import wraithImage from "../images/ghosts/wraith.png"
import arachImage from "../images/ghosts/arach.png"
import phantomImage from "../images/ghosts/phantom.png"

//rooms
import lobby from "../images/rooms/lobby.png"
import boss from "../images/rooms/boss.png"
import cellar from "../images/rooms/cellar.png"
import pool from "../images/rooms/pool.png"

//menu
import titleback from "../images/menu/titleback.png"
import settingsBack from '../images/menu/settingsMenu.png'
import deathBack from '../images/menu/deathscreen.png'
import play from "../images/menu/play.png"
import Continue from "../images/menu/Continue.png"
import quit from "../images/menu/quit.png"
import settings from "../images/menu/Settings.png"
import titlescreen from "../images/menu/titlescreen.png"

//props
import bulletImage from '../images/props/bullet.png'
import barrier from '../images/props/barrier.png'
import lichtAan from "../images/props/lichtAan.png"
import lichtUit from "../images/props/lichtUit.png"
import donker from "../images/props/donker.png"
import vaas from "../images/props/vaas.png"

// music
import backgroundMusic from '../sfx/8-bit loop background music.mp3'
import Ghost1 from '../sfx/Ghost 1.mp3'
import Ghost2 from '../sfx/Ghost 2.mp3'
import hitSound from '../sfx/hitsound.wav'
import bossRoar from '../sfx/BossRoar.mp3'
import playerHit1 from '../sfx/playerHit.mp3'
import playerHit2 from '../sfx/playerHit2.mp3'
import deathScream from '../sfx/deathScream.mp3'
import dungeonAmbience from '../sfx/dungeonambience.mp3'



const Resources = {
    //characters
    mainCharacter: new ImageSource(mainCharacterImage),
    ghoul: new ImageSource(ghoulImage),
    spirit: new ImageSource(spiritImage),
    demon: new ImageSource(demonImage),
    poltergeist: new ImageSource(poltergeistImage),
    Frederik: new ImageSource(Frederik),
    Guardian: new ImageSource(guardianImage),
    Wraith: new ImageSource(wraithImage),
    Arach: new ImageSource(arachImage),
    Phantom: new ImageSource(phantomImage),

    //rooms
    Lobby: new ImageSource(lobby),
    Boss: new ImageSource(boss),
    Cellar: new ImageSource(cellar),
    Pool: new ImageSource(pool),

    //menu
    Titleback: new ImageSource(titleback),
    Settingsback: new ImageSource(settingsBack),
    DeathBack: new ImageSource(deathBack),
    Play: new ImageSource(play),
    Continue: new ImageSource(Continue),
    Quit: new ImageSource(quit),
    Settings: new ImageSource(settings),
    Titlescreen: new ImageSource(titlescreen),

    //props
    bullet: new ImageSource(bulletImage),
    Barrier: new ImageSource(barrier),
    LichtAan: new ImageSource(lichtAan),
    LichtUit: new ImageSource(lichtUit),
    Donker: new ImageSource(donker),
    Vaas: new ImageSource(vaas),

    // music
    gameMusic: new Sound(backgroundMusic),
    Ghost1: new Sound(Ghost1),
    Ghost2: new Sound(Ghost2),
    bossRoar: new Sound(bossRoar),
    playerHit1: new Sound(playerHit1),
    playerHit2: new Sound(playerHit2),
    deathScream: new Sound(deathScream),
    dungeonAmbience: new Sound(dungeonAmbience),
    hitSound: new Sound(hitSound)

}

const ResourceLoader = new Loader([
    //characters
    Resources.mainCharacter,
    Resources.ghoul,
    Resources.spirit,
    Resources.demon,
    Resources.poltergeist,
    Resources.Frederik,
    Resources.Guardian,
    Resources.Wraith,
    Resources.Arach,
    Resources.Phantom,

    //rooms
    Resources.Lobby,
    Resources.Boss,
    Resources.Cellar,
    Resources.Pool,

    //menu
    Resources.Titleback,
    Resources.Settingsback,
    Resources.DeathBack,
    Resources.Play,
    Resources.Continue,
    Resources.Quit,
    Resources.Settings,
    Resources.Titlescreen,

    //props
    Resources.bullet,
    Resources.Barrier,
    Resources.LichtUit,
    Resources.LichtAan,
    Resources.Donker,
    Resources.Vaas,

    // music
    Resources.gameMusic,
    Resources.Ghost1,
    Resources.Ghost2,
    Resources.bossRoar,
    Resources.playerHit1,
    Resources.playerHit2,
    Resources.deathScream,
    Resources.dungeonAmbience,
    Resources.hitSound

])

export { Resources, ResourceLoader }