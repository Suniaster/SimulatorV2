import ClientEngine from "../../client/ClientEngine";
import Keyboard from "../../client/Keyboard";

export default class AgarioClient extends ClientEngine {
  start() {
    super.start();
    let keyboard = new Keyboard(this);
    keyboard.addEvent("w", "up");
  }
}
