import { storageReader, storageWriter } from '@/utils'

const API_URL = process.env.NEXT_PUBLIC_API_URL

type ApiServiceTypes = {
  url: string
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: unknown
  token?: 'register' | 'auth' // TODO: CHANGE THIS LATER
  file?: File | null
}

type BodyType = FormData | string
type HeaderType = {
  'Content-Type'?: string
  Authorization?: string
}

const tokenMap = {
  auth: 'token', // !for AWS?
}

function throwError(error: Error) {
  console.error('Error occurred:', error)

  return { success: false, message: 'Something went wrong' }
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

    if (response.status === 401) {
      storageWriter('cookie', { key: 'token', value: null })
      window.location.href = '/auth'
    }

    if (contentType && contentType.includes('application/json')) {
      return response.json()
    } else {
      return response
    }
  } catch (error) {
    return throwError(error as Error)
  }
}

async function get(this: ApiServiceTypes) {
  const url = API_URL + this.url

  const headers: HeaderType = {}

  if (this.token) {
    const token = storageReader('cookie', tokenMap[this.token])
    headers.Authorization = `Bearer ${token}`
  }

  const options: RequestInit = { method: 'GET', headers }

  return makeRequest(url, options)
}

async function post(this: ApiServiceTypes) {
  const url = API_URL + this.url

  let body: BodyType = JSON.stringify(this.data)

  const headers: HeaderType = {
    'Content-Type': 'application/json',
  }

  if (this.token) {
    const token = storageReader('cookie', tokenMap[this.token])
    headers.Authorization = `Bearer ${token}`
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

  return makeRequest(url, options)
}

async function put(this: ApiServiceTypes) {
  const url = API_URL + this.url
  const options: RequestInit = {
    method: 'PUT',
    body: JSON.stringify(this.data),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return makeRequest(url, options)
}

async function del(this: ApiServiceTypes) {
  const url = API_URL + this.url

  const headers: HeaderType = {}

  if (this.token) {
    const token = storageReader('cookie', tokenMap[this.token])
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  const options: RequestInit = { method: 'DELETE', headers }

  return makeRequest(url, options)
}

async function apiService({ type = 'GET', url, data, token, file }: ApiServiceTypes) {
  switch (type) {
    case 'GET':
      return await get.call({ token, url })

    case 'POST':
      return await post.call({ token, url, data, file })

    case 'PUT':
      return await put.call({ token, url, data })

    case 'DELETE':
      return await del.call({ token, url })

    default:
      throw new Error(`Unsupported request type: ${type}`)
  }
}

export { apiService as api }
