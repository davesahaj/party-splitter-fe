/* eslint-disable @typescript-eslint/no-explicit-any */

import forEach from 'lodash/forEach'

import { Cookies } from '@/libs'

type storageType = 'cookie' | 'localStorage'

export const storageWriter = (type: storageType, data: any) => {
  function normalizeData(val: any) {
    return JSON.stringify(val)
  }

  switch (type) {
    case 'cookie': {
      forEach(data, (value: any, key: any) => {
        if (key) Cookies.set(key, normalizeData(value))
      })
    }
  }
}

export const storageReader = (type: storageType, key: string) => {
  switch (type) {
    case 'cookie': {
      let retrievedData = null

      try {
        retrievedData = JSON.parse(Cookies.get(key) || '')
      } catch (error) {
        retrievedData = Cookies.get(key) || ''
      }

      return retrievedData
    }
  }
}
