import P5World from "../world/P5World";

export default class InputHandler{
    constructor(private socket: SocketIOClient.Socket){
        
    }

    handle(event:string, key:string){
        switch(event){
            case 'keydown':
                this.socket.emit('moveBlob', {x: 1, y:0})
            break;
        }

    }

}