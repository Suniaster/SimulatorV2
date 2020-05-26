import ClientEngine from "./ClientEngine";

export default class Keyboard {
  protected eventsNames: {
    [keyName: string]: {
      eventName: string;
      config?: any;
    };
  };

  constructor(private client: ClientEngine) {
    let canvas = this.client.world.config.dom.canvas;
    console.log("object");

    document.addEventListener("keydown", (ev) => {
      let key = ev.key;
      if (this.eventsNames[key]) {
        client.socket.emit("keyboard/" + this.eventsNames[key].eventName);
      }
    });
    this.eventsNames = {};
  }

  addEvent(keyName, eventName) {
    this.eventsNames[keyName] = { eventName };
  }

  removeEvent(keyName) {
    delete this.eventsNames[keyName];
  }
}
