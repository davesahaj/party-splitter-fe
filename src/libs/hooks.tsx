/*----------  single source to import and use all third party libraries hooks  ----------*/

import { getHotkeyHandler, randomId, useViewportSize } from '@mantine/hooks'
import { useLocation, useParams, useRoute, useRouter, useSearch } from 'wouter'
import { create as createStore } from 'zustand'

export {
  createStore,
  getHotkeyHandler,
  randomId,
  useLocation,
  useParams,
  useRoute,
  useRouter,
  useSearch,
  useViewportSize,
}
