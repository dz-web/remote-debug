/**
 * Created by dz on 17/2/7.
 */

import React, { Component, PropTypes } from 'react';
import styles from './tab.scss';

class TabBar extends Component {
  render() {
    return (
      <div >
        {this.props.children}
      </div>
    );
  }
}

class TabPane extends Component {
  render() {
    return (
      <div >
        {this.props.children}
      </div>
    );
  }
}

export default class Tab extends Component {
  static propTypes = {
    activeKey: PropTypes.number,
    children: PropTypes.any,
    rightBar: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = { activeKey: parseInt(props.activeKey, 10) || 0 };
  }

  tabClick(idx) {
    this.setState({ activeKey: idx });
  };

  render() {
    const tabs = [];
    const contents = [];
    const activeKey = this.state.activeKey;

    React.Children.forEach(this.props.children, (e, idx) => {
      const { tab, children } = e.props;
      const isActive = activeKey === idx;
      tabs.push(
        <button
          styleName={isActive ? 'active' : ''}
          key={`tab-${idx}`}
          onClick={() => this.tabClick(idx)}
        >
          {tab}
        </button>);
      contents.push(
        <div
          styleName={isActive ? 'active' : ''}
          key={`content-${idx}`}
        >
          {isActive ? children : ''}
        </div>
      );
    });

    return (
      <div className="tab">
        <div styleName="tabbar">
          <div>
            {tabs}
          </div>
          <div styleName="right-bar">
            {this.props.rightBar}
          </div>
        </div>
        <div styleName="tab-content">
          {contents}
        </div>
      </div>
    );
  }
}

Tab.TabPane = TabPane;
Tab.TabBar = TabBar;

