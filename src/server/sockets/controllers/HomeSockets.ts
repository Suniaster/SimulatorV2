import SocketManagerBase from "../SocketManagerBase";

export default class HomeSockets extends SocketManagerBase{

    constructor(io: SocketIO.Server){
        super(io);
        this.path = '/';
        // this.verbose = 'Log Id';
    }
    initialize(){
        this.createConnectionHandler((socket)=>{
        
        
        })
        return this
    }
}