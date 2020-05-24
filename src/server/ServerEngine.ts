import Blob from "../game/entities/Blob";
import SocketIO from 'socket.io'
import http from 'http'
import { EntityInfo } from "../game/helpers/types";
import Agario from "../game/Agario";

export default class ServerEngine{
  io: SocketIO.Server

  constructor(private server: http.Server, private world: Agario){
    this.io = SocketIO(this.server);
  }

  public start(){
    this.startWorld()
    this.startListeners()
  }

  protected startListeners(){
    this.io.on('connection', (socket)=>{
      
      socket.emit("updateObjects", this.world.entities.getEntitiesInfo());
      this.world.createBlob(socket.id);
  
      socket.on("changeDirBlob", (direction:{ x: -1 | 0 | 1, y: -1 | 0 | 1 })=>{
          let blob = this.world.entities.getEntity(socket.id) as Blob
          if(!blob)
              blob = this.world.createBlob(socket.id) as Blob;
          blob.moveInDirection(direction)
      })

      socket.on("disconnect", ()=>{
          let blob = this.world.entities.getEntity(socket.id)
          if(blob) blob.destroy();
      })
    })
  }

  protected startWorld(){
    this.world.events.on('objectCreated', ()=>{

    })

    this.world.events.on("objectDestroyed", ()=>{

    })

    this.world.events.on("updateObjects", (infos: EntityInfo[])=>{

    })


    this.world.setup();
    this.world.start();
  }
}