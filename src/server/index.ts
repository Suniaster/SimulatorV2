import ServerController from "./ServerController";
import IOController from "./sockets/IOController";


let server = new ServerController()
server.initServer()
new IOController(server.server).registerControllers()