/**
 * Created by dz on 2017/3/11.
 */

import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import './store.scss';
import store from '../model/store';
import ws from '../server/WSever';

const TAB_LABEL = ['Local Storage', 'Cookies'];

const clearAllCookie = `
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
deleteAllCookies();
`;

@observer
export default class Store extends Component {
  state = { selectedId: TAB_LABEL[0] };

  componentDidMount() {
    ws.evalCallbackSlient('window.localStorage', 'localStorage');
  }

  onClear = () => {
    if (confirm('Clear all localStorage and cookies?')) {
      ws.evalCallbackSlient('localStorage.clear();', 'localStorage');
      ws.evalCallbackSlient(clearAllCookie, 'cookie');
    }
  };

  onClick = (id) => {
    if (id === this.state.selectedId) return;

    this.setState({ selectedId: id });

    switch (id) {
      case TAB_LABEL[0]:
        ws.evalCallbackSlient('window.localStorage', 'localStorage');
        break;
      case TAB_LABEL[1]:
        ws.evalCallbackSlient('document.cookie', 'cookie');
        break;
      default:
        console.log(id);
    }
  };

  renderTabs() {
    return TAB_LABEL.map((i) =>
      <button
        key={i}
        onClick={() => this.onClick(i)}
        styleName={i === this.state.selectedId ? 'active' : ''}
      >{i}</button>
    );
  }

  renderTable(data) {
    const fa = Object.keys(data).map(i => {
      return (<tr key={i}>
        <td><input type="text" value={i} /></td>
        <td><input type="text" value={data[i]} /></td>
      </tr>);
    });

    return (
      <table colSpan={0} rowSpan={0}>
        <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>{fa}</tbody>
      </table>
    );
  }

  renderStorage() {
    if (!store.localStorage) return null;
    return this.renderTable(store.localStorage);
  }

  renderCookie() {
    if (!store.cookie) return <div styleName="emtpy">No cookies!</div>;
    return this.renderTable(store.cookie);
  }

  render() {
    const isStorage = this.state.selectedId === TAB_LABEL[0];
    return (
      <div styleName="store">
        <div styleName="sider">
          { this.renderTabs() }
          <button styleName="clear-btn" onClick={this.onClear}>Clear all</button>
        </div>
        <div styleName="content">
          {isStorage ? this.renderStorage() : this.renderCookie()}
        </div>
      </div>
    );
  }
}
