/**
 * Created by dz on 2017/3/11.
 */

import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import './nav.scss';

@observer
export default class Nav extends Component {

  static propTypes = {
    evalScript: PropTypes.func,
    logger: PropTypes.any,
  };

  onChange = (e) => {
    if (e.target.value === '') {
      this.inputHis.resetCount();
    }
  };

  render() {
    return (
      <div styleName="tabs">
        <nav>Console</nav>
        <nav>Store</nav>
        <nav>Source</nav>
        <nav>Network</nav>
      </div>
    );
  }
}
