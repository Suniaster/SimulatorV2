import express from 'express';
import http from 'http'
import path from 'path'

class ServerController {
  app: express.Express;
  main_dir: string;
  server: http.Server;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app)
    this.main_dir = __dirname + '../../../';
  }

  initServer() {
    this.app.get('/', (req, res) => {
      var name = path.resolve(this.main_dir + './public/index.html');
      res.sendFile(name);
    });
    console.log(path.resolve(this.main_dir));

    this.app.use('/static', express.static(path.resolve(this.main_dir+'public')));

    let port = 3000;

    this.server.listen(port, () => {
      console.log('Server alive on port: ', port );
    });
  }
}


new ServerController().initServer()