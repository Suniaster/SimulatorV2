import http from 'http'
import SocketIO from 'socket.io'
import HomeSockets from './controllers/HomeSockets';

export default class IOController{
    io: SocketIO.Server
    constructor(private server: http.Server){
        this.io = SocketIO(this.server);
    }

    registerControllers(){
        new HomeSockets(this.io).initialize();
    }

}

export class IOControllerSingleton{
    static instance
    constructor(server?: http.Server){
        if(!IOControllerSingleton.instance){
            IOControllerSingleton.instance = new IOController(server)
        }
    }

    getInstance(): IOController{
        return IOControllerSingleton.instance
    }
}