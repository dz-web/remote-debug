/**
 * Created by dz on 2017/3/11.
 */
class WSever {
  constructor() {
    io.on('connection', (client) => {
      console.log(client, 'connetcion4444');
      this.client = client;
      client.on('disconnect', () => {
        console.log('disconnect');
      });

    });
    io.listen(7000);
  }

  get cc() {
    return new Promise((rs, rj) => {

    })
  }
}

const ws = new WSever();
export default  ws;