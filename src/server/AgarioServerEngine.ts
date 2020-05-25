import ServerEngine from "./ServerEngine";
import Agario from "../game/Agario";
import Blob from "../game/entities/Blob";

export default class AgarioServerEngine extends ServerEngine {
  world: Agario;
  constructor(io, world: Agario) {
    super(io, world);

    this.registerEventListener("changeBlobDir", this.changeBlobDir);
  }

  onConnection(socket: SocketIO.Socket) {
    this.world.createBlob(socket.id);
  }

  onDisconnect(socket: SocketIO.Socket) {
    let blob = this.world.entities.getEntity(socket.id);
    if (blob) blob.destroy();
  }

  changeBlobDir = (
    socket: SocketIO.Socket,
    direction: { x: -1 | 0 | 1; y: -1 | 0 | 1 },
  ) => {
    let blob = this.world.entities.getEntity(socket.id) as Blob;
    if (!blob) {
      blob = this.world.createBlob(socket.id) as Blob;
    }
    blob.moveInDirection(direction);
  };
}
