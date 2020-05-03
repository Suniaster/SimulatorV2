export default abstract class SocketManagerBase{
    path: string;
    abstract initialize() : SocketManagerBase;
    verbose: undefined | 'Log Connections' | 'Log Id';

    constructor(public io : SocketIO.Server){
        this.path = '/test';
    }


    createConnectionHandler(listener: (socket:SocketIO.Socket)=>void){
        this.io.of(this.path)
            .on('connection', (socket)=>{
                switch(this.verbose){
                    case 'Log Connections':
                        console.log("New connection on ", this.path)
                    case 'Log Id':
                        console.log("   With id: ", socket.id)
                    break;
                }

                listener(socket)
            })
    }

    emit(messageName:string, ...args:any[]){
        this.io.of(this.path).emit(messageName, ...args)
    }
}