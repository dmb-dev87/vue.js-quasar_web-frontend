import axios from 'axios';
import { useStore } from 'src/store';
import { getBaseUrl } from './utility';

const getServices = () => {
  const store = useStore()
  const url = store.state.authentication.url
  const userId = store.state.authentication.username
  const token = store.state.authentication.token

  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return api.get(`/api/services/?userId=${userId}&token=${token}`)
}

export {
  getServices
}
