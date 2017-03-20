/**
 * Created by dz on 2017/3/11.
 */
import { observable, action, map, computed } from 'mobx';

class Source {
  @observable source = '';
}

const source = new Source();

export default source;
