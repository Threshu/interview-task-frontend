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
      } catch (e) {
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
      const orderByStop = new Map<string, number>()
      for (const s of state.rawStops) {
        if (s.line !== state.selectedLine) continue
        const prev = orderByStop.get(s.stop)
        if (prev === undefined || s.order < prev) orderByStop.set(s.stop, s.order)
      }
      const entries = [...orderByStop.entries()]
      entries.sort(([, a], [, b]) => state.stopsSortOrder === 'asc' ? a - b : b - a)
      return entries.map(([stop]) => stop)
    },

    timesForStop(state): string[] {
      if (state.selectedLine === null || state.selectedStop === null) return []
      const pad = (n: number) => n.toString().padStart(2, '0')
      const times = state.rawStops
        .filter(s => s.line === state.selectedLine && s.stop === state.selectedStop)
        .map(s => {
          const [h, m] = s.time.split(':').map(Number)
          return `${pad(h)}:${pad(m)}`
        })
      return [...new Set(times)].sort()
    },

    allUniqueStops(state): string[] {
      const unique = [...new Set(state.rawStops.map(s => s.stop))]
      return unique.sort((a, b) => a.localeCompare(b))
    },
  },
})

export default store
