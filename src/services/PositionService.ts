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

const savePostion = () => {
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token
  const trackgps = myStore.state.authentication.trackgps

  let result = false

  if (trackgps) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const api = axios.create({
            baseURL: getBaseUrl(url),
            headers: {
              'Content-Type': 'application/json'
            }
          })

          await api.post(
            `/api/save-location/?userId=${userId}&token=${token}`,
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              speed: position.coords.speed,
              altitude: position.coords.altitude
            }
          )

          result = true
          myStore.commit('authentication/setPosition', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
            altitude: position.coords.altitude,
          })
        },
        (error) => {
          result = false
        }
      )
    } else {
      result = false
    }
  } else {
    result = false
  }

  if (result == false) {
    myStore.commit('authentication/setPosition', {
      latitude: "0",
      longitude: "0",
      speed: null,
      altitude: null
    })
  }
}

export {
  checkLocations,
  savePostion
}
