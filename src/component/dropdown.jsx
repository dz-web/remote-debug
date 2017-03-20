/**
 * Created by dz on 17/2/4.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './dropdown.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class DropDown extends Component {
  render() {
    return (
      <div styleName="dropdown">
        {this.props.children}
      </div>
    );
  }
}


@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class DropDownItem extends Component {
  render() {
    return (
      <div styleName="dropdown-item">
        {this.props.children}
      </div>
    );
  }
}

DropDown.Item = DropDownItem;
