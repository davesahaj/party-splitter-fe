/* eslint-disable @/no-unused-vars */

import { notification } from '@/services'

const API_URL = import.meta.env.VITE_BE_URL

type ApiServiceTypes = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  replace?: boolean
  data?: unknown
  file?: File | null
}

type BodyType = FormData | string
type HeaderType = {
  'Content-Type'?: string
  Authorization?: string
}

function appendDataToForm(formData: FormData, data: never) {
  Object.keys(data).forEach(function (key) {
    formData.append(key, data[key])
  })
}

async function makeRequest(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, options)

    const contentType = response.headers.get('content-type')

    if (contentType && contentType.includes('application/json')) {
      return response.json()
    } else {
      return response
    }
  } catch (error) {
    console.error('Error occurred:', error)
    notification.show({ title: 'Error', message: 'Network Error' })
    return null
  }
}

async function get(this: ApiServiceTypes) {
  const headers: HeaderType = {}

  const options: RequestInit = { method: 'GET', headers }

  return makeRequest(this.url, options)
}

async function post(this: ApiServiceTypes) {
  let body: BodyType = JSON.stringify(this.data)

  const headers: HeaderType = {
    'Content-Type': 'application/json',
  }

  if (this.file) {
    delete headers['Content-Type']

    const formData = new FormData()
    formData.append('file', this.file)
    appendDataToForm(formData, this.data as never)
    body = formData
  }

  const options: RequestInit = {
    method: 'POST',
    body,
    headers,
  }

  return makeRequest(this.url, options)
}

async function put(this: ApiServiceTypes) {
  const body: BodyType | File = this.file || JSON.stringify(this.data)

  const headers: HeaderType = {
    'Content-Type': this.file ? this.file.type : 'application/json',
  }

  const options: RequestInit = {
    method: 'PUT',
    body,
    headers,
  }

  return makeRequest(this.url, options)
}

async function del(this: ApiServiceTypes) {
  const headers: HeaderType = {}

  const options: RequestInit = { method: 'DELETE', headers }

  return makeRequest(this.url, options)
}

async function apiService({ method = 'GET', url, data, file, replace = false }: ApiServiceTypes) {
  const endpoint = replace ? url : API_URL + url

  switch (method) {
    case 'GET':
      return await get.call({ url: endpoint })

    case 'POST':
      return await post.call({ url: endpoint, data, file })

    case 'PUT':
      return await put.call({ url: endpoint, data, file })

    case 'DELETE':
      return await del.call({ url: endpoint })

    default:
      throw new Error(`Unsupported request type: ${method}`)
  }
}

export { apiService as api }
