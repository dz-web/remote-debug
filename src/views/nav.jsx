/**
 * Created by dz on 2017/3/11.
 */

import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import './nav.scss';

const TAB_LABEL = ['Console', 'Store', 'Source', 'Network'];

@observer
export default class button extends Component {

  static propTypes = {
    evalScript: PropTypes.func,
    logger: PropTypes.any,
  };

  state = { selectedId: TAB_LABEL[0] };

  onClick = (id) => {
    this.setState({ selectedId: id });
    this.props.onNavSelected(id);
  };

  renderTabs() {
    return TAB_LABEL.map((i) =>
      <button
        key={i}
        onClick={() => this.onClick(i)}
        styleName={i === this.state.selectedId ? 'active' : ''}
      > {i} </button>
    );
  }

  render() {
    return (
      <div styleName="tabs">
        <div>
          { this.renderTabs() }
        </div>
        <div styleName="right-bar">
          <button styleName="client-list" onClick={() => this.props.onClientListClick()} />
        </div>
      </div>
    );
  }
}
