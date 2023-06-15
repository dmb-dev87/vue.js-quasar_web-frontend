import axios from 'axios';
import { getBaseUrl } from './utility';
import { myStore } from 'src/store';

const getServices = () => {
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token

  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return api.get(`/api/services/?userId=${userId}&token=${token}`)
}

const getService = (id: any) => {
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token

  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return api.get(`/api/service/${id}/?userId=${userId}&token=${token}`)
}

const acceptService = (id: any, accepted: string) => {
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token

  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return api.get(`/api/aceept-reject/?token=${token}&userId=${userId}&service=${id}&accept=${accepted}`)
}

const startService = (id: any, kms: any) => {
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token

  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return api.get(`/api/start-service/${id}/?token=${token}&userId=${userId}&kms=${kms}`)
}

const getCostItems = () => {
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token

  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return api.get(`/api/service-cost-voices/?token=${token}&userId=${userId}`)
}

const addCost = (
  id: any,
  voiceId: any,
  amount: any,
  quantity: any,
  total_amount: any,
  notes: string
) => {
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token

  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return api.get(`/api/add-service-cost/?token=${token}&userId=${userId}&service=${id}&voice=${voiceId.value}&amount=${amount}&quantity=${quantity}&total_amount=${total_amount}&notes=${notes}`)
}

const endService = (
  id: any,
  kms: any
) => {
  const url = myStore.state.authentication.url
  const userId = myStore.state.authentication.userId
  const token = myStore.state.authentication.token

  const api = axios.create({
    baseURL: getBaseUrl(url),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return api.get(`/api/end-service/?token=${token}&userId=${userId}&service=${id}&kms=${kms}`)
}

export {
  getServices,
  getService,
  acceptService,
  startService,
  getCostItems,
  addCost,
  endService,
}
