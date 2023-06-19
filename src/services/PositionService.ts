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

const savePostion = (trackgps: boolean) => {
  if (trackgps) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          myStore.commit('authentication/setPosition', {
            trackgps: trackgps,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
            altitude: position.coords.altitude
          })
        },
        (error: any) => {
          myStore.commit('authentication/setPosition', {
            trackgps: false,
            latitude: "0",
            longitude: "0",
            speed: null,
            altitude: null
          })
        }
      )
    } else {
      myStore.commit('authentication/setPosition', {
        trackgps: false,
        latitude: "0",
        longitude: "0",
        speed: null,
        altitude: null
      })
    }
  } else {
    myStore.commit('authentication/setPosition', {
      trackgps: false,
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
