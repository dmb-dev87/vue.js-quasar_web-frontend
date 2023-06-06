import { userInfo } from 'os';
import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { Router } from 'vue-router'
// import {
//   createStore,
//   Store as VuexStore,
//   useStore as vuexUseStore,
// } from 'vuex'

import {
  createStore,
  Module,
  createComposable,
  Getters,
  Mutations,
} from 'vuex-smart-module'

// import loginModule from './login'
// import { LoginStateInterface } from './login/state'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// export interface StateInterface {
//   // Define your own store structure, using submodules if needed
//   // example: ExampleStateInterface;
//   // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
//   login: LoginStateInterface
// }

// provide typings for `this.$store`
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $store: VuexStore<StateInterface>
//   }
// }

// // provide typings for `useStore` helper
// export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

// // Provide typings for `this.$router` inside Vuex stores
//  declare module "vuex" {
//    export interface Store<S> {
//      readonly $router: Router;
//    }
//  }

// export default store(function (/* { ssrContext } */) {
//   const Store = createStore<StateInterface>({
//     modules: {
//       loginModule
//     },

//     // enable strict mode (adds overhead!)
//     // for dev mode and --debug builds only
//     strict: !!process.env.DEBUGGING
//   })

//   return Store;
// })

class LoginState {
  url = "";
  username = "";
}

class LoginGetters extends Getters<LoginState> {
  get url() {
    return this.state.url
  }
  get username() {
    return this.state.username
  }
}

class LoginMutations extends Mutations<LoginState> {
  setUrl(url: string) {
    this.state.url = url
  }
  setUsername(username: string) {
    this.state.username = username
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

// export function useStore() {
//   return vuexUseStore(storeKey)
// }
