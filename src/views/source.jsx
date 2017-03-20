/**
 * Created by dz on 2017/3/11.
 */

import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import './source.scss';
import ws from '../server/WSever';
import source from '../model/source';
import beautify from 'js-beautify';
// var beautify_html = require('js-beautify').html;

@observer
export default class Source extends Component {

  state = { isFormat: false };

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    ws.evalCallbackSlient("document.getElementsByTagName('html')[0].outerHTML", 'source');
  };

  format = () => {
    this.setState({ isFormat: true });
  };

  render() {
    const html = this.state.isFormat ? beautify.html(source.source) : source.source;
    return (
      <div >
        <div styleName="source">
          {html}
        </div>
        <div styleName="toolbar">
          {!this.state.isFormat && <button onClick={this.format}>formatter</button>}
          <button onClick={this.reload}>reload</button>
        </div>
      </div>
    );
  }
}
