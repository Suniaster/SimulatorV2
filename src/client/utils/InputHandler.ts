export default class InputHandler{
    pressedKeys: string[]
    constructor(private socket: SocketIOClient.Socket){
        this.pressedKeys = []
    }

    handle(event:string, key:string){
        switch(event){
            case 'keydown':
                this.pressedKeys.push(key);

                this.socket.emit('changeDirBlob', this.direction())
            break;
            case 'keyup':
                this.pressedKeys = this.pressedKeys.filter((val) => val !== key)

                this.socket.emit('changeDirBlob', this.direction())
            break;
        }

    }


    private direction():{x:number, y:number}{
        let returnVal = {
            x: 0,
            y: 0
        }

        this.pressedKeys.forEach((key)=>{
            if(key === 'w') returnVal.y = -1
            if(key === 'a') returnVal.x = -1
            if(key === 'd') returnVal.x =  1
            if(key === 's') returnVal.y =  1
        })

        return returnVal;
    }
}