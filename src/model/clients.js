/**
 * Created by dz on 2017/3/11.
 */
import { observable, action, map, computed, extendObservable } from 'mobx';

class Clients {
  @observable currentClient = null;
  list = observable.map();

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
    }
    console.error(`no client found ${id}`);
    return null;
  }

  @action
  remove(id) {
    this.list.delete(id);
  }

  @action
  updateClientById(id, data) {
    const c = this.list.get(id);
    if (c) {
      const f = { ...c, ...data };
      this.list.set(id, f);
    } else {
      console.error(`no client found ${id}`);
    }
  }

}
const clients = new Clients();

export default clients;