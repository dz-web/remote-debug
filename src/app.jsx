import React, { Component } from 'react';
import './css/main.scss';
import Console from './views/console'; // import global css style
import { observer } from 'mobx-react';
import logger from './logger';

@observer
export default class App extends Component {
  client = null;

  constructor(props) {
    super(props);

    io.on('connection', (client) => {
      console.log(client, 'connetcion4444');
      this.client = client;
      client.on('log', (data) => {
        logger.add(data);
      });

      client.on('disconnect', () => {
        console.log('disconnect');
      });

    });

    io.listen(7000);
  }

  evalScript = (str) => {
    logger.add({ type: 'log', logs: `> ${str}` });
    this.client.emit('eval', str);
  }

  render() {
    // const { logs } = this.state;
    return (
      // App root node
      <div >
        <Console logger={logger} evalScript={this.evalScript} />
      </div>
    );
  }
}
