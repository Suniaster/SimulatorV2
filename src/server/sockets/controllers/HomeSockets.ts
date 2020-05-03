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
            this.world.createBlob(socket.id)
            socket.emit("allObjectsInfo", this.world.entities.getEntitiesInfo());

            socket.on("moveBlob", (direction:{ x: -1 | 0 | 1, y: -1 | 0 | 1 })=>{
                this.world.entities.getEntity(socket.id).moveByOffSet({
                    x: 10* direction.x,
                    y: 10*direction.y
                })
            })

        })
        return this
    }
}