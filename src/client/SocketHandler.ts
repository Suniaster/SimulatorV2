import io from 'socket.io-client'
import P5World from './world/P5World';

export default class SocketHandler{
    constructor(public socket: SocketIOClient.Socket, private world: P5World){
    }
    
    initHandlers(){
        this.socket.on("allObjectsInfo", (infos)=>{
            infos.forEach((info)=>{
                this.world.entities.register(info)
            })
        })
    }

}