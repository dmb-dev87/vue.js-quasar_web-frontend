import axios from 'axios';
import { getBaseUrl } from './utility';
import { myStore } from 'src/store';

const checkLocations = (date: any, time: any) => {
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token

  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return api.get(`/api/check-locations/?token=${token}&userId=${userId}&date=${date}&time=${time}`)
}

export {
  checkLocations
}
