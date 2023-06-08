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

class LoginState {
  url = ""
  username = ""
  token = ""
}

class LoginGetters extends Getters<LoginState> {
  get url() {
    return this.state.url
  }
  get username() {
    return this.state.username
  }
  get token() {
    return this.state.token
  }
}

class LoginMutations extends Mutations<LoginState> {
  setUrl(url: string) {
    this.state.url = url
  }
  setUsername(username: string) {
    this.state.username = username
  }
  setToken(token: string) {
    this.state.token = token
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
  const loginStore = createStore(loginModule, {
    strict: !!process.env.DEBUGGING
  });

  return loginStore;
})

export const useStore = createComposable(loginModule)
