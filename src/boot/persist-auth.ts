import { boot } from 'quasar/wrappers'
import { Cookies } from 'quasar'
import createPersistedState from 'vuex-persistedstate'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default async (app: any, router: any, store: any, vue: any) => {
  const cookies = Cookies

  createPersistedState({
    storage: {
      getItem: key => JSON.stringify(cookies.get(key)),
      setItem: (key, value) => cookies.set(key, value),
      removeItem: key => cookies.remove(key)
    }
  })(store)
}
