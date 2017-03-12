/**
 * Created by dz on 2017/3/11.
 */
import { observable, action, map, computed, extendObservable } from 'mobx';

class Clients {
  @observable currentClient = null;
  list = observable.map();

  constructor() {

  }

  @action
  add(obj) {
    this.list.set(obj.id, { client: obj, url: '' });
    if (this.currentClient === null) this.currentClient = this.list.get(obj.id);
  }

  @action
  switchClient(id) {
    console.log('switch', id);
    const c = this.list.get(id);
    if (c) {
      this.currentClient = c;
      return this.currentClient;
    } else {
      console.error(`no client found ${id}`);
    }
  }

  @action
  remove(id) {
    this.list.delete(id)
  }

  @action
  updateClientById(id, data) {
    let c = this.list.get(id);
    if (c) {
      const f = { ...c, ...data };
      this.list.set(id, f);
    } else {
      console.error(`no client found ${id}`);
    }
  }

  // @computed
  // get currentClient() {
  //   return this._currentClient;
  // }

}
const clients = new Clients();

export default clients;