import Agario from "../../game/Agario";
import AgarioClient from "./AgarioClientEngine";

let agario = new Agario({
  updateRate: 60,
  handleCollisions: false,
  dom: {
    canvasId: "myCanvas",
  },
  drawWorld: true,
});

new AgarioClient(agario).start();
