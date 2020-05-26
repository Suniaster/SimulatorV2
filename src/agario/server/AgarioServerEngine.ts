import ServerEngine from "../../server/ServerEngine";
import Agario from "../../game/Agario";
import Blob from "../../game/entities/Blob";
import World from "../../game/WorldEngine";
import Glob from "../../game/entities/Glob";

export default class AgarioServerEngine extends ServerEngine {
  world: Agario;
  constructor(server, world: Agario) {
    super(server, world);

    // this.registerEventListener("changeBlobDir", this.changeBlobDir);
  }

  setup() {
    for (let i = 0; i < 50; i += 1) {
      this.world.createRandomGlob();
    }
  }

  start(){
    this.registerEventListener("player/changeDir", (socket, newDir)=>{
      this.changeBlobDir(socket, newDir)
    })

    super.start();
  }

  onConnection(socket: SocketIO.Socket) {
    this.world.createBlob(socket.id);
  }

  onDisconnect(socket: SocketIO.Socket) {
    let blob = this.world.entities.getEntity(socket.id);
    if (blob) blob.destroy();
  }

  changeBlobDir(
    socket: SocketIO.Socket,
    direction: { x: -1 | 0 | 1; y: -1 | 0 | 1 },
  ){
    let blob = this.world.entities.getEntity(socket.id) as Blob;
    if (!blob) {
      blob = this.world.createBlob(socket.id) as Blob;
    }
    blob.moveInDirection(direction);
  };
}
