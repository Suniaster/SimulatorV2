import SocketManagerBase from "../SocketManagerBase";
import World from "../../world/World";
import Blob from "../../entities/Blob";

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
            socket.emit("updateObjects", this.world.entities.getEntitiesInfo());
            this.world.createBlob(socket.id);

            socket.on("changeDirBlob", (direction:{ x: -1 | 0 | 1, y: -1 | 0 | 1 })=>{
                let blob = this.world.entities.getEntity(socket.id) as Blob
                if(!blob)
                    blob = this.world.createBlob(socket.id) as Blob;
                blob.moveInDirection(direction)
                this.io.emit("updateObjects", [blob.getInfo()])
            })


            socket.on("disconnect", ()=>{
                this.world.entities.remove(socket.id)
            })
        })
        return this
    }
}