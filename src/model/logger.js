/**
 * Created by dz on 2017/3/11.
 */
import { observable, action, map, computed } from 'mobx';
class Logger {
  @observable logs = [];

  @action
  add(obj) {
    console.log('add log', obj);
    this.logs.push(obj);
  }

  @action
  clear() {
    this.logs = [];
  }

}
const logger = new Logger();

export default logger;