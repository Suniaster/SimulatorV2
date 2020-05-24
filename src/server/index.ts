import ServerController from "./ServerController";
import Agario from "../game/Agario";
import AgarioServerEngine from "./AgarioServerEngine";


let server = new ServerController()
server.initServer()

let world  = new Agario()
let engine = new AgarioServerEngine(server.server, world)

engine.start()