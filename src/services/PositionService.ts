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

const savePostion = async () => {
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token
  const trackgps = myStore.state.authentication.trackgps

  const lat = myStore.state.authentication.position.latitude
  const lng = myStore.state.authentication.position.longitude

  if (trackgps) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (lat !== position.coords.latitude && lng !== position.coords.longitude) {
            const api = axios.create({
              baseURL: getBaseUrl(url),
              headers: {
                'Content-Type': 'application/json'
              }
            })

            api.post(
              `/api/save-location/?userId=${userId}&token=${token}`,
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                speed: position.coords.speed,
                altitude: position.coords.altitude
              }
            )

            myStore.commit('authentication/setPosition', {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              speed: position.coords.speed,
              altitude: position.coords.altitude,
            })
          }
        },
        (error) => {
          myStore.commit('authentication/setPosition', {
            latitude: 0,
            longitude: 0,
            speed: null,
            altitude: null
          })
        }
      )
    } else {
      myStore.commit('authentication/setPosition', {
        latitude: 0,
        longitude: 0,
        speed: null,
        altitude: null
      })
    }
  } else {
    myStore.commit('authentication/setPosition', {
      latitude: 0,
      longitude: 0,
      speed: null,
      altitude: null
    })
  }
}

export {
  checkLocations,
  savePostion
}
