import Agario from "../../game/Agario";
import AgarioClient from "./AgarioClientEngine";

let agario = new Agario({
  updateRate: 120,
});

let client = new AgarioClient(agario, {
  canvas: {
    id: "myCanvas",
  },
});

client.start();
