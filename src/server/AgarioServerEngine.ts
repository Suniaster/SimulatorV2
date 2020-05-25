import ServerEngine from "./ServerEngine";
import Agario from "../game/Agario";
import Blob from "../game/entities/Blob";
import World from "../game/WorldEngine";
import Glob from "../game/entities/Glob";

export default class AgarioServerEngine extends ServerEngine {
  world: Agario;
  constructor(server, world: Agario) {
    super(server, world);

    // this.registerEventListener("changeBlobDir", this.changeBlobDir);
  }

  setup() {
    for (let i = 0; i < 1; i += 1) {
      let pos = World.generateRandomCoord();
      let g = new Glob(this.world, { position: { x: pos.x, y: pos.y } });
      g.changeVel({ x: 10, y: 10 });
      g.create();
    }
  }

  onConnection(socket: SocketIO.Socket) {
    console.log("New connection:", socket.id);
    // this.world.createBlob(socket.id);
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
