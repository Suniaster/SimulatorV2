import P5Controller from "./P5Controller";
import SocketHandler from "./SocketHandler";
import InputHandler from "./utils/InputHandler";
import io from 'socket.io-client';

let socket = io.connect();
let input = new InputHandler(socket);

let p5Control = new P5Controller(input).init();

let handler = new SocketHandler(socket, p5Control.world);
handler.initHandlers();