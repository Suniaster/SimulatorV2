import Agario from "../game/Agario";
import ClientEngine from "./ClientEngine";


let agario = new Agario({
    updateRate: 60,
    shouldHandleCollisions: false
})

new ClientEngine(agario)