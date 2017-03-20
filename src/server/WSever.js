import clients from '../model/clients';
import logger from '../model/logger';
import source from '../model/source';
import store from '../model/store';

class WSever {
  constructor() {
    io.on('connection', (client) => {
      console.log(client, 'connetcion4444');
      clients.add(client);

      // 客户端 init
      client.on('init', (data) => {
        clients.updateClientById(client.id, data);
      });

      // 客户端 log
      client.on('log', (data) => {
        console.log('log daa', data);
        logger.add(data);
      });

      // 客户端 log
      client.on('localStorage', (data) => {
        // logger.add(data);
        // console.log('store', data);
        store.setLocalStorage(data);
        // store.store.set('localStorage', data)
        // store.setLocalStorage('localStorage', data);
      });

      // 客户端 output
      client.on('output', (data) => {
        // console.log('output', data);
        let out = data;
        try {
          if (typeof data !== 'string') {
            const c = JSON.stringify(data);
            out = c !== undefined ? c : c.toString();
          }
        } catch (e) {}
        logger.add({ logs: out, type: 'output' });
      });

      // 客户端 cookie
      client.on('cookie', (data) => {
        // logger.add(data);
        store.setCookie(data);
        store.store.set('cookie', data);
      });

      client.on('source', (data) => {
        // logger.add(data);
        source.source = data;
        // store.store.set('cookie', data);
        console.log('source', data);
      });

      // 客户端 断开
      client.on('disconnect', () => {
        console.log('disconnect');
        clients.remove(client.id);
      });
    });

    io.listen(7000);
  }

  evalCallbackSlient(cmd, callback) {
    clients.currentClient.client.emit('eval', { cmd, callback });
  }

  evalCallback(cmd, callback, silent = false) {
    // console.log('evalScript', obj);
    if (!silent) logger.add({ type: 'input', logs: cmd });
    this.evalCallbackSlient(cmd, callback);
  }
}

const ws = new WSever();
export default ws;
