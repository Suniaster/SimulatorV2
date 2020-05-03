import SocketManagerBase from "../SocketManagerBase";
import World from "../../world/World";

export default class HomeSockets extends SocketManagerBase{

    world: World;

    constructor(io: SocketIO.Server){
        super(io);
        this.path = '/';
        this.verbose = 'Log Id';
        this.world = new World();
    }
    initialize(){
        this.world.setup();
        this.createConnectionHandler((socket)=>{
            socket.emit("allObjectsInfo", this.world.entities.getEntitiesInfo())
        })
        return this
    }
}