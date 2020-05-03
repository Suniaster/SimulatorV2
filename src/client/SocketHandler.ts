import io from 'socket.io-client'

export default class SocketHandler{

    constructor(){
        let socket = io.connect();

        socket.on("allObjectsInfo", (infos)=>{
            console.log(infos)
        })
    }
    
}