import SocketManagerBase from "../SocketManagerBase";
import World from "../../world/World";

export default class HomeSockets extends SocketManagerBase{

    world: World;

    constructor(io: SocketIO.Server){
        super(io);
        this.path = '/';
        this.verbose = 'Log Id';
        this.world = new World(this.io);
    }
    initialize(){
        this.world.setup();
        this.world.start();
        this.createConnectionHandler((socket)=>{
            this.world.createBlob(socket.id)
            socket.emit("updateObjects", this.world.entities.getEntitiesInfo());

            socket.on("changeDirBlob", (direction:{ x: -1 | 0 | 1, y: -1 | 0 | 1 })=>{
                let blob = this.world.entities.getEntity(socket.id)
                blob.setVel({
                    x: 10*direction.x,
                    y: 10*direction.y
                })
            })

        })
        return this
    }
}