import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import type { RawStop, SortOrder } from '@/types'
import { fetchStops } from '@/api/stops'

export interface State {
  rawStops: RawStop[]
  loading: boolean
  error: string | null
  selectedLine: number | null
  selectedStop: string | null
  stopsSortOrder: SortOrder
}

export interface Getters {
  lines: number[]
  stopsForLine: string[]
  timesForStop: string[]
  allUniqueStops: string[]
}

type AppStore = Omit<Store<State>, 'getters'> & { getters: Getters }

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore(): AppStore {
  return baseUseStore<State>(key) as AppStore
}

const store = createStore<State>({
  state: {
    rawStops: [],
    loading: false,
    error: null,
    selectedLine: null,
    selectedStop: null,
    stopsSortOrder: 'asc',
  },

  mutations: {
    SET_RAW_STOPS(state, stops: RawStop[]) {
      state.rawStops = stops
    },
    SET_LOADING(state, value: boolean) {
      state.loading = value
    },
    SET_ERROR(state, message: string | null) {
      state.error = message
    },
    SET_SELECTED_LINE(state, line: number | null) {
      state.selectedLine = line
      state.selectedStop = null
      state.stopsSortOrder = 'asc'
    },
    SET_SELECTED_STOP(state, stop: string | null) {
      state.selectedStop = stop
    },
    TOGGLE_STOPS_SORT(state) {
      state.stopsSortOrder = state.stopsSortOrder === 'asc' ? 'desc' : 'asc'
    },
  },

  actions: {
    async loadStops({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const stops = await fetchStops()
        commit('SET_RAW_STOPS', stops)
      } catch {
        commit('SET_ERROR', 'Failed to load stops. Please try again.')
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },

  getters: {
    lines(state): number[] {
      const unique = [...new Set(state.rawStops.map(s => s.line))]
      return unique.sort((a, b) => a - b)
    },

    stopsForLine(state): string[] {
      if (state.selectedLine === null) return []
      const sorted = state.rawStops
        .filter(s => s.line === state.selectedLine)
        .sort((a, b) => state.stopsSortOrder === 'asc' ? a.order - b.order : b.order - a.order)
      return [...new Set(sorted.map(s => s.stop))]
    },

    timesForStop(state): string[] {
      if (state.selectedLine === null || state.selectedStop === null) return []
      const times = state.rawStops
        .filter(s => s.line === state.selectedLine && s.stop === state.selectedStop)
        .map(s => s.time.padStart(5, '0'))
      return [...new Set(times)].sort()
    },

    allUniqueStops(state): string[] {
      const unique = [...new Set(state.rawStops.map(s => s.stop))]
      return unique.sort((a, b) => a.localeCompare(b))
    },
  },
})

export default store
