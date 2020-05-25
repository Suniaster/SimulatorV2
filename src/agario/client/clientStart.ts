import Agario from "../../game/Agario";
import ClientEngine from "../../client/ClientEngine";

let agario = new Agario({
  updateRate: 60,
  shouldHandleCollisions: false,
  dom: {
    canvasId: "myCanvas",
  },
  drawWorld: true,
});

new ClientEngine(agario).start();
