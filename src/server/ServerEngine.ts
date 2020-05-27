import SocketIO from "socket.io";
import http from "http";
import World from "../game/WorldEngine";

export default class ServerEngine {
  io: SocketIO.Server;
  private possibleEvents: {
    name: string;
    handler: (socket: SocketIO.Socket, ...args: any) => void;
  }[];

  private sockets: {
    [id: string]: SocketIO.Socket;
  };

  constructor(private server: http.Server, protected world: World) {
    this.io = SocketIO(this.server);
    this.possibleEvents = [];
    this.sockets = {};
  }

  public start() {
    this.startWorld();
    this.startListeners();
  }

  private startListeners() {
    this.io.on("connection", (socket) => {
      this.sockets[socket.id] = socket;
      socket.on("getAllObjects", () => {
        socket.emit("updateObjects", this.world.entities.getEntitiesInfo());
      });

      this.onConnection(socket);

      this.possibleEvents.forEach((event) => {
        socket.on(event.name, (...args) => event.handler(socket, ...args));
      });

      socket.on("disconnect", () => {
        delete this.sockets[socket.id];
        this.onDisconnect(socket);
      });
    });
  }

  protected registerEventListener(
    name: string,
    handler: (socket: SocketIO.Socket, ...args) => void,
  ) {
    this.possibleEvents.push({
      name,
      handler,
    });
  }

  protected onConnection(socket: SocketIO.Socket) {}
  protected onDisconnect(socket: SocketIO.Socket) {}
  protected setup() {}

  protected startWorld() {
    let worldEvents = ["objectCreated", "objectDestroyed", "updateObjects"];

    // eco all world events to connected sockets
    for (let eventName of worldEvents) {
      this.world.events.on(eventName, (...args) => {
        Object.values(this.sockets).forEach((socket) => {
          socket.emit(eventName, ...args);
        });
      });
    }

    this.startWorldLoop();
  }

  startWorldLoop() {
    this.setup();
    setInterval(
      () => this.world.timeStep(),
      1000 / 60,
    );
  }
}
