import Agario from "../game/Agario";
import ClientEngine from "./ClientEngine";


let agario = new Agario({
    updateRate: 5,
    shouldHandleCollisions: false,
    dom:{
        canvasId: 'myCanvas'
    },
    drawWorld: true
})

new ClientEngine(agario).start();