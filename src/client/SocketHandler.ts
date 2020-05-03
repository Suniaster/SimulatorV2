import io from 'socket.io-client'
import P5World from './world/P5World';

export default class SocketHandler{
    public socket: SocketIOClient.Socket
    constructor(private world: P5World){
        this.socket = io.connect();
    }
    
    initHandlers(){
        this.socket.on("allObjectsInfo", (infos)=>{
            infos.forEach((info)=>{
                this.world.entities.register(info)
            })
        })
    }

}