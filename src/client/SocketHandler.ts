import io from 'socket.io-client'
import P5World from './world/P5World';

export default class SocketHandler{
    constructor(public socket: SocketIOClient.Socket, private world: P5World){
    }
    
    initHandlers(){
        this.socket.on("updateObjects", (infos)=>{
            console.log(infos)
            infos.forEach((info)=>{
                this.world.entities.updateOrCreateEntity(info)
            })
        })
    }

}