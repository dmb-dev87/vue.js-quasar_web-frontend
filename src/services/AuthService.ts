import axios from 'axios';
import { useStore } from 'src/store';
import { getBaseUrl } from './utility';

const login = (url: string, username: string, password: string) => {
  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return api.get(
    `/api/?email=${username}&password=${password}`,
  )
}

const logout = () => {
  const store = useStore()
  const url = store.getters.url
  const username = store.getters.username
  const token = store.getters.token

  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return api.get(`/api/logout?userid=${username}&token=${token}`)
}

export {
  login,
  logout
}
