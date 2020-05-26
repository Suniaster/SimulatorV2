import io from "socket.io-client";
import World from "../game/WorldEngine";
import { EventEmitter } from "events";
import { ClientEngineConfig } from "../game/helpers/types";

export default class ClientEngine {
  public socket: SocketIOClient.Socket;
  public clientId: string;
  protected events: EventEmitter;
  protected animationPaused: boolean;
  protected config: ClientEngineConfig;

  constructor(public world: World, config: ClientEngineConfig = {}) {
    let canvasDefault = {
      width: window.innerWidth,
      height: window.innerHeight,
      id: "myCanvas",
    };
    if (config.canvas) {
      config.canvas = Object.assign(canvasDefault, config.canvas);
    }
    let defaultOptions = {
      canvas: {
        width: window.innerWidth,
        height: window.innerHeight,
        id: "myCanvas",
      },
      handleCollisions: false,
    };

    this.config = Object.assign(defaultOptions, config);
    this.socket = io();
    this.events = new EventEmitter();
    this.animationPaused = false;

    // Default options of world when client
    this.world.config.handleCollisions = this.config.handleCollisions;
    this.world.config.drawWorld = true;
    this.world.setCanvas(this.config.canvas.id);

    // Canvas default values
    let canvas = document.getElementById(
      this.config.canvas.id,
    ) as HTMLCanvasElement;
    console.log(this.config.canvas);
    canvas.width = this.config.canvas.width;
    canvas.height = this.config.canvas.height;
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
