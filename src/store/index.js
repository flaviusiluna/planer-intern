import Vue from 'vue'
import Vuex from 'vuex'
import * as crypto from 'crypto-js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users: [],
    tasks: [],
    user: null,
    loginErrors: [],
    search: ''
  },

  actions: {
    LOGIN({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const user = state.users.find(user => user.name === payload.name && user.password === payload.password);
            if (user) {
              commit('USER', user);
              commit('LOGIN_ERRORS', []);
              resolve(true);
            } else {
              reject('User or password is incorrect');
              commit('LOGIN_ERRORS', ['User or password is incorrect']);
            }
          } catch (error) {
            reject('User or password is incorrect');
          }

        }, 300);
      });

    },

    REGISTER({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const user = state.users.find(user => user.name === payload.name);
            if (user) {
              commit('LOGIN_ERRORS', ['User already exists']);
              reject('User already exists');
            } else {
              commit('REGISTER', payload);
              commit('LOGIN_ERRORS', []);
              resolve(true);
            }
          } catch (error) {
            reject('Error');
          }

        }, 300);
      });

    },
    ADD_TASK({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            payload.user = state.user.id;
            payload.hash = crypto.MD5(payload.title + payload.text).toString()
            commit('TASK', payload);
            resolve(true);
          } catch (error) {
            reject('Error');
          }

        }, 300);
      });

    },

    DELETE_TASK({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            commit('DELETE_TASK', payload);
            resolve(true);
          } catch (error) {
            reject('Error');
          }

        }, 300);
      });

    },
    UPDATE_TASK({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            commit('UPDATE_TASK', payload);
            resolve(true);
          } catch (error) {
            reject('Error');
          }

        }, 300);
      });

    },
  },

  mutations: {
    SEARCH(state, payload) {
      state.search = payload;
    },

    TASK(state, payload) {
      state.tasks.unshift(payload);
    },

    DELETE_TASK(state, payload) {
      const index = state.tasks.findIndex(f => f.hash === payload.hash);
      if (index > -1) {
        state.tasks.splice(index, 1);
      }
    },
    UPDATE_TASK(state, payload) {
      const index = state.tasks.findIndex(f => f.hash === payload.hash);
      if (index > -1) {
        Vue.set(state.tasks, index, payload);
      }
    },
    USER(state, payload) {
      state.user = payload;
    },

    REGISTER(state, newUser) {
      newUser.id = crypto.MD5(newUser.name).toString();
      if (state.users.length === 0) {
        newUser.role = 'admin';
      } else {
        newUser.role = 'user';
      }
      state.users.unshift(newUser);
      state.user = newUser;
    },

    LOGIN_ERRORS(state, payload) {
      state.loginErrors = payload;
    }
  },

  getters: {
    isAuthenticated: state => {
      return !!(state.user && state.user.name);
    }
  }
});

try {
  const localstorageDB = localStorage.getItem('toDoDB');
  if (localstorageDB) {
    store.replaceState(JSON.parse(localstorageDB));
    store.state.loginErrors = [];
    store.state.search = '';
  }
} catch (error) {
  console.error('Error on local storage');
}


store.subscribe((mutation, state) => {
  try {
    localStorage.setItem('toDoDB', JSON.stringify(state));
  } catch (error) {
    console.error('Error on local storage');
  }
});

export default store;