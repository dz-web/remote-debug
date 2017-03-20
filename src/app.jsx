import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Console from './views/console';
import Store from './views/store';
import logger from './model/logger';
import clients from './model/clients';
import ClientList from './views/client-list';
import Nav from './views/nav';
import ws from './server/WSever';
import Tab from './component/tab';
import Source from './views/source';

const TabBar = Tab.TabBar;
const TabPane = Tab.TabPane;
@observer
export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = { clientListClose: true };
  }

  onClose = () => {
    this.setState({ clientListClose: true });
  };

  onClientListClick = () => {
    this.setState({ clientListClose: false });
  };

  render() {
    const { clientListClose } = this.state;
    const bar = <button onClick={this.onClientListClick} className="client-list-btn" />;
    return (
      // App root node
      <div >
        <Tab activeTab={0} rightBar={bar}>
          <TabPane tab="Console">
            <Console logger={logger} />
          </TabPane>
          <TabPane tab="Store">
            <Store />
          </TabPane>
          <TabPane tab="Sources">
            <Source />
          </TabPane>
          <TabPane tab="Network">
            <div />
          </TabPane>
        </Tab>
        {
          clientListClose ? null :
            <ClientList list={clients.list} curr={clients.currentClient} onClose={this.onClose} />
        }
      </div>
    );
  }
}
