import ServerController from "./ServerController";
import ServerEngine from "./ServerEngine";
import World from "../game/WorldEngine";


let server = new ServerController()
server.initServer()

let world  = new World()
let engine = new ServerEngine(server.server, world)

engine.start()