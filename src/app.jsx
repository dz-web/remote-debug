import React, { Component } from 'react';
import Console from './views/console'; // import global css style
import { observer } from 'mobx-react';
import logger from './logger';
import clients from './clients';
import ClientList from './views/client-list';
import Nav from './views/nav';

@observer
export default class App extends Component {

  constructor(props) {
    super(props);

    io.on('connection', (client) => {
      console.log(client, 'connetcion4444');
      clients.add(client);

      client.on('init', (data) => {
        clients.updateClientById(client.id, data)
      });

      client.on('log', (data) => {
        logger.add(data);
      });

      client.on('disconnect', () => {
        console.log('disconnect');
        clients.remove(client.id);
      });

    });

    io.listen(7000);
  }

  evalScript = (str) => {
    logger.add({ type: 'log', logs: `> ${str}` });
    clients.currentClient.client.emit('eval', str);
  };

  render() {
    // const { logs } = this.state;
    console.log(Object.keys(clients.list));
    return (
      // App root node
      <div >
        <Nav />
        <div className="tab-content">
          <Console logger={logger} evalScript={this.evalScript} />
          <ClientList list={clients.list} curr={clients.currentClient} />
        </div>
      </div>
    );
  }
}
