/**
 * Created by dz on 2017/3/11.
 */
import { observable, action, map, computed } from 'mobx';

class Store {
  store = observable.map();

  setLocalStorage(v) {
    console.log('localStorage',v);
    this.store.set('localStorage', v);

  }

  @computed
  get localStorage() {
    return this.store.get('localStorage');
  }

  setCookie(v) {
    console.log('setcookie', v);
    this.store.set('cookie', v);
  }

  @computed
  get cookie() {
    const cookie = this.store.get('cookie');
    if (!cookie) return null;

    const f = {};
    cookie.split('; ').forEach(i => {
      const [k, v] = i.split('=');
      f[k] = v;
    });
    return f;
  }

  @action
  clear() {
    this.store.clear();
  }

}

const store = new Store();

export default store;
