import SocketIO from 'socket.io'
import http from 'http'
import { EntityInfo } from "../game/helpers/types";
import World from "../game/WorldEngine";

export default class ServerEngine{
  io: SocketIO.Server
  private events: {
    name: string,
    handler: (socket:SocketIO.Socket, ...args:any)=>void
  }[]

  private sockets: {
    [id:string]: SocketIO.Socket
  }

  constructor(private server: http.Server, protected world: World){
    this.io = SocketIO(this.server);
    this.events = []
    this.sockets = {}
  }

  public start(){
    this.startWorld()
    this.startListeners()
  }

  private startListeners(){
    this.io.on('connection', (socket)=>{
      this.sockets[socket.id] = socket
      socket.on("updateAllObjects",()=>{
        socket.emit("updateObjects", this.world.entities.getEntitiesInfo());
      })

      this.onConnection(socket)

      this.events.forEach((event)=>{
        socket.on(event.name, (...args) => event.handler(socket, ...args))
      })

      socket.on("disconnect", ()=>{
          delete this.sockets[socket.id]
          this.onDisconnect(socket);
      })
    })
  }
  
  protected registerEventListener(name:string, handler: (socket, ...args)=>void){
    this.events.push({
      name, handler
    })
  }

  protected onConnection(socket: SocketIO.Socket){}
  protected onDisconnect(socket: SocketIO.Socket){}

  protected startWorld(){
    let worldEvents = ['objectCreated',"objectDestroyed", "updateObjects"]

    // eco all world events to connected sockets
    for(let eventName of worldEvents){

      this.world.events.on(eventName, (...args)=>{
        
        Object.values(this.sockets).forEach((socket)=>{
          socket.emit(eventName, ...args)
        })
  
      })

    }


    this.world.setup();
    this.world.start();
  }
}