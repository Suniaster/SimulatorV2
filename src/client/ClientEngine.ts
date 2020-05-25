import io from 'socket.io-client'
import World from '../game/WorldEngine'
import Glob from '../game/entities/Glob';

export default class ClientEngine{
    public socket: SocketIOClient.Socket
    constructor(private world: World){
        // this.socket = io();
    }

    start(){
        this.startAnimation();
        this.world.events.on("posTimeStep", ()=>{
            console.log('time:',this.world.time)

        })

        // this.socket.on("connect", ()=>{
        //     // this.world.referenceEnitityId = this.socket.id
        // })

        // this.socket.on("updateObjects", (infos)=>{
        //     infos.forEach((info)=>{
        //         this.world.entities.updateOrCreateWithInfo(info)
        //     })
        // })

        // this.socket.on('objectCreated', info => {
        //     this.world.entities.updateOrCreateWithInfo(info)
        // })

        // this.socket.on("objectDestroyed", (id)=>{
        //     let ent = this.world.entities.getEntity(id);
        //     ent.destroy();
        // })
    }


    startAnimation(){
        this.setup();
        this.animate();
    }

    animate(){
        requestAnimationFrame(this.animate.bind(this))
        this.world.timeStep();
        this.world.draw();
    }

    setup(){
        for(let i=0;i<5;i+=1){
            let pos = World.generateRandomCoord()
            let g = new Glob(this.world, {position:{x: pos.x, y: pos.y}})
            g.changeVel({x: 10, y:10})
            g.create()
        }
    }
}