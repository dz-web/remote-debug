/**
 * Created by dz on 2017/3/11.
 */

import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import './console.scss';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;

class InputHistory {

  constructor() {
    this.data = [];
    try {
      if ('his' in localStorage) {
        this.data = JSON.parse(localStorage['his']);
      }
    } catch (e) {

    }
    this.resetCount();
  }

  save() {
    localStorage['his'] = JSON.stringify(this.data);
  }

  push(str) {
    const len = this.data.length;
    if (len > 0 && str === this.data[len - 1])  return;
    this.data.push(str);
    this.resetCount();
    this.save();
  }

  prev() {
    if (this.count <= 0) return this.data[0];
    this.count -= 1;
    // console.log(this.count);
    return this.data[this.count];
  }

  next() {
    const last = this.data.length - 1;
    if (this.count >= last) return this.data[last];
    this.count += 1;
    // console.log(this.count);
    return this.data[this.count];
  }

  resetCount() {
    this.count = this.data.length;
  }
}

@observer
export default class Console extends Component {

  static propTypes = {
    evalScript: PropTypes.func,
    logger: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.inputHis = new InputHistory();
  }

  onKeyDown = (e) => {
    if (e.keyCode === KEY_ENTER && !e.shiftKey) {
      // prevent defaut enter key, enable the enter combine with shift key
      e.preventDefault();
      if (this.area.value.trim() === '') return;
      this.props.evalScript(this.area.value);
      this.inputHis.push(this.area.value);
      this.area.value = '';
    }

    if (e.keyCode === KEY_UP) {
      e.preventDefault();
      this.area.value = this.inputHis.prev();
    }

    if (e.keyCode === KEY_DOWN) {
      this.area.value = this.inputHis.next();
    }

  };

  mapLogType = (type) => ['log', 'warn', 'info', 'error'].indexOf(type) !== -1 ? type : 'log';

  componentDidUpdate(prevProps, prevState) {
    this.content.scrollTop = this.content.scrollHeight;
  }

  onChange = (e) => {
    if (e.target.value === '') {
      this.inputHis.resetCount();
    }
  };

  render() {
    let { logger = [] } = this.props;
    return (
      <div styleName="console">
        <div styleName="toobar">
          <button onClick={() => logger.clear()}>clear</button>
        </div>
        <ul styleName="content" ref={(ref) => { this.content = ref; }}>
          { logger.logs.map((i, idx) => <li styleName={this.mapLogType(i['type'])}
                                               key={idx}>{i['logs']}</li>) }
        </ul>
        <textarea styleName="area" onKeyDown={this.onKeyDown} onChange={this.onChange}
                  ref={(ref) => { this.area = ref; }} />
      </div>
    );
  }
}
