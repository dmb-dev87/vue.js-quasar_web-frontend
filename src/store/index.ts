import { plugins } from 'app/postcss.config.cjs';
import { userInfo } from 'os';
import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { Router } from 'vue-router'
import {
  createStore,
  Module,
  createComposable,
  Getters,
  Mutations,
} from 'vuex-smart-module'
import createPersistedState from 'vuex-persistedstate'

class LoginState {
  url = ""
  username = ""
  token = ""
  loggedin = false
}

class LoginGetters extends Getters<LoginState> {
  get url () {
    return this.state.url
  }
  get username() {
    return this.state.username
  }
  get token () {
    return this.state.token
  }
  get loggedin () {
    return this.state.loggedin
  }
}

class LoginMutations extends Mutations<LoginState> {
  setUrl (url: string) {
    this.state.url = url
  }
  setUsername (username: string) {
    this.state.username = username
  }
  setToken (token: string) {
    this.state.token = token
  }
  setLoggedin (loggedin: boolean) {
    this.state.loggedin = loggedin
  }
}

const loginConfig = {
  state: LoginState,
  getters: LoginGetters,
  mutations: LoginMutations,
  modules: {

  }
}

export const loginModule = new Module(loginConfig)

export default store(function (/* { ssrContext } */) {
  const loginStore = createStore(
    loginModule,
    {
      plugins: [createPersistedState()],
      strict: !!process.env.DEBUGGING
    }
  );

  return loginStore;
})

export const loginStore = createStore(loginModule, {
  plugins: [createPersistedState()],
  strict: !!process.env.DEBUGGING
})

export const useLoginStore = createComposable(loginModule)
