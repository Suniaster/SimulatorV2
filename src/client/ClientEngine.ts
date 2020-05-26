import io from "socket.io-client";
import World from "../game/WorldEngine";
import { EventEmitter } from "events";
export default class ClientEngine {
  public socket: SocketIOClient.Socket;
  public clientId: string;
  protected events: EventEmitter;
  protected animationPaused: boolean;

  constructor(public world: World) {
    this.socket = io();
    this.events = new EventEmitter();
    this.animationPaused = false;

    let canvas = this.world.config.dom.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  start() {
    this.socket.on("connect", () => {
      this.startAnimation();
      this.clientId = this.socket.id;
      this.socket.emit("getAllObjects");
      this.events.emit("clientConnected", this.socket);
    });

    this.socket.on("updateObjects", (infos) => {
      infos.forEach((info) => {
        this.world.entities.updateOrCreateWithInfo(info);
      });
    });

    this.socket.on("objectCreated", (info) => {
      this.world.entities.updateOrCreateWithInfo(info);
    });

    this.socket.on("objectDestroyed", (id) => {
      let ent = this.world.entities.getEntity(id);
      ent.destroy();
    });
  }

  startAnimation() {
    this.animationSetup();
    this.animate();
  }

  pauseAnimation() {
    this.animationPaused = true;
  }

  resumeAnimation() {
    this.animationPaused = false;
    this.animate();
  }

  animate() {
    if (!this.animationPaused) {
      requestAnimationFrame(this.animate.bind(this));
    }
    this.world.timeStep();
    this.world.draw();
  }
  animationSetup() {}
}
