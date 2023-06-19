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
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token

  let result = false

  const saveCurrentLocation = (position: any): boolean => {
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
    ).then((res: any) => {
      return res.data.status
    }).catch(() => {
      return false
    })

    return false
  }

  if (trackgps) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          result = saveCurrentLocation(position)
          myStore.commit('authentication/setPosition', {
            trackgps: true,
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
      myStore.commit('authentication/setPosition', {
        trackgps: false,
        latitude: "0",
        longitude: "0",
        speed: null,
        altitude: null
      })
    }
  } else {
    result = false
    myStore.commit('authentication/setPosition', {
      trackgps: false,
      latitude: "0",
      longitude: "0",
      speed: null,
      altitude: null
    })
  }

  if (result == false) {
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
