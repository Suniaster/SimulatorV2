import ClientEngine from "../../client/ClientEngine";
import Keyboard from "../../client/Keyboard";

export default class AgarioClient extends ClientEngine {
  playerDir: {
    x: number;
    y: number;
  };

  start() {
    super.start();
    this.playerDir = { x: 0, y: 0 };
    let keyboard = new Keyboard(this);
    keyboard.keyup = (key) => {
      this.addDir(key);
    };

    keyboard.keydown = (key) => {
      this.removeDir(key);
    };
  }

  removeDir(key: string) {
    let x = this.playerDir.x,
      y = this.playerDir.y;
    if (key === "w") y = 0;
    else if (key === "a") x = 0;
    else if (key === "s") y = 0;
    else if (key === "d") x = 0;
    else return;

    // if dirChanges
    if (this.playerDir.x !== x || this.playerDir.y !== y) {
      this.playerDir.x = x;
      this.playerDir.y = y;
      this.socket.emit("player/changeDir", this.playerDir);
    }
  }

  addDir(key: string) {
    let x = this.playerDir.x,
      y = this.playerDir.y;
    if (key === "w") y = -1;
    else if (key === "a") x = -1;
    else if (key === "s") y = 1;
    else if (key === "d") x = 1;
    else return;

    // if dirChanges
    if (this.playerDir.x !== x || this.playerDir.y !== y) {
      this.playerDir.x = x;
      this.playerDir.y = y;
      this.socket.emit("player/changeDir", this.playerDir);
    }
  }
}
