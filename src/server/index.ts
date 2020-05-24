import ServerController from "./ServerController";
import ServerEngine from "./ServerEngine";
import Agario from "../game/Agario";


let server = new ServerController()
server.initServer()

let world  = new Agario()
let engine = new ServerEngine(server.server, world)

engine.start()