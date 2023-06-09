import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const getBaseUrl = (instUrl: string) => {
  let completeUrl = ''
  instUrl = instUrl.trim()

  if (!instUrl) {
    instUrl = 'fakenotexistingurl'
  } else {
    if (instUrl.charAt(instUrl.length -1) === '/') {
      instUrl = instUrl.slice(0, -1)
    }
    if (instUrl.startsWith('http')) {
      completeUrl = instUrl
    } else if (instUrl.search('.')) {
      completeUrl = `https://${instUrl}`
    }
  }

  if (!completeUrl) {
    completeUrl = `https://${instUrl}.demoserver.pro`
  }

  return completeUrl
}

const api = axios.create({ baseURL: 'https://api.example.com' });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, getBaseUrl };
