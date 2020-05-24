import io from 'socket.io-client'
import World from '../game/WorldEngine'

export default class ClientEngine{
    public socket: SocketIOClient.Socket
    constructor(private world: World){
        this.socket = io();
        world.drawEntities = true;
    }

    start(){
        this.world.setup()
        this.world.start()

        // this.socket.on("connect", ()=>{
        //     this.world.referenceEnitityId = this.socket.id
        // })

        // this.socket.on("updateObjects", (infos)=>{
        //     infos.forEach((info)=>{
        //         this.world.entities.updateOrCreateEntity(info)
        //     })
        // })

        // this.socket.on('objectCreated', info => {
        //     this.world.entities.updateOrCreateEntity(info)
        // })

        // this.socket.on("objectDestroyed", (id)=>{
        //     this.world.entities.delete(id);
        // })
    }

}