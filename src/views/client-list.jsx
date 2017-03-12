/**
 * Created by dz on 2017/3/11.
 */

import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import './client-list.scss';
import clients from '../clients';

@observer
export default class ClientList extends Component {

  static propTypes = {};
  state = { id: null, close: false };

  constructor(props) {
    super(props);
    console.log(props.curr, 'curr');

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.curr) {
      console.log(nextProps.curr);
      if (this.state.id === nextProps.curr.client.id) return;
      this.setState({ id: nextProps.curr.client.id });
    }
  }

  onClientClick = (id) => {
    this.setState({ id: id });
    clients.switchClient(id);
  };

  renderList(list) {
    if (list.size === 0) return <div styleName="empty">No clients!</div>;
    const arr = [];
    list.forEach(i => {
      const id = i.client.id;
      arr.push(
        <li
          key={id}
          onClick={() => this.onClientClick(id)}
          styleName={this.state.id === id ? 'active' : ''}
        >
          <div><i>ID:</i> {id}</div>
          <div><i>Agent:</i> {i.agent}</div>
          <div><i>URL:</i> {i.url}</div>
        </li>);
    });
    return (<ul ref={(ref) => { this.content = ref; }} styleName="content">
      {arr}
    </ul>);
  }

  close = () => {
    this.setState({ close: true });
  };

  render() {
    if (this.state.close) return null;

    let list = this.props.list;
    return (
      <div styleName="client-list">
        <div styleName="title">Clients
          <button styleName="close" onClick={this.close}>X</button>
        </div>
        {this.renderList(list)}
      </div>
    );
  }
}
