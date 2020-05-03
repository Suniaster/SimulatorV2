import P5Controller from "./P5Controller";
import SocketHandler from "./SocketHandler";
import InputHandler from "./utils/InputHandler";

let p5Control = new P5Controller().init()
let io = new SocketHandler(p5Control.world);
io.initHandlers();
let input = new InputHandler(p5Control.world, io.socket);