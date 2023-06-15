import axios from 'axios';
import { myStore } from 'src/store';
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
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token

  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return api.get(`/api/logout?userid=${userId}&token=${token}`)
}

export {
  login,
  logout
}
