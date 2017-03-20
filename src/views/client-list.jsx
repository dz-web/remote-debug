import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import './client-list.scss';
import clients from '../model/clients';

const reg = new RegExp(/%\d[\dA-F]/g);
function autoDecode(str) {
  if (reg.test(str)) {
    const s = decodeURIComponent(str);
    return autoDecode(s);
  } else {
    return str;
  }
}
@observer
export default class ClientList extends Component {

  static propTypes = {
    list: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = { id: null };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.curr) {
      console.log(nextProps.curr);
      if (this.state.id === nextProps.curr.client.id) return;
      this.setState({ id: nextProps.curr.client.id });
    }
  }

  // componentDidMount() {
  //   // this.setState({ id: clients.currentClient.id });
  // }

  onClientClick = (id) => {
    if (id === this.state.id) return;
    this.setState({ id });
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
          <div styleName="entry-title">{i.title || '无标题'} <em styleName="id">({id})</em></div>
          <div>
            <div><i>Agent:</i> {i.agent}</div>
            <div><i>URL:</i> {autoDecode(i.url)}</div>
          </div>
        </li>);
    });
    return (<ul ref={(ref) => { this.content = ref; }} styleName="content">
      {arr}
    </ul>);
  }

  render() {
    const { list } = this.props;
    return (
      <div styleName="client-list">
        <div styleName="title">Clients
          <button styleName="close" onClick={() => this.props.onClose()} />
        </div>
        {this.renderList(list)}
      </div>
    );
  }
}
