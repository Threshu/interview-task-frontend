import { describe, it, expect, beforeEach } from 'vitest'
import store from '@/store'
import type { State } from '@/store'
import type { RawStop, SortOrder } from '@/types'

function stop(line: number, name: string, order: number, time: string): RawStop {
  return { line, stop: name, order, time }
}

function reset(partial: Partial<State> = {}) {
  store.replaceState({
    rawStops: [],
    loading: false,
    error: null,
    selectedLine: null,
    selectedStop: null,
    stopsSortOrder: 'asc' as SortOrder,
    ...partial,
  })
}

describe('getter: lines', () => {
  beforeEach(() => reset())

  it('returns empty array when no stops loaded', () => {
    expect(store.getters.lines).toEqual([])
  })

  it('returns unique line numbers sorted ascending', () => {
    reset({
      rawStops: [
        stop(110, 'A', 1, '10:00'),
        stop(100, 'B', 1, '10:00'),
        stop(110, 'C', 2, '11:00'),
        stop(120, 'A', 1, '10:00'),
      ],
    })
    expect(store.getters.lines).toEqual([100, 110, 120])
  })

  it('deduplicates lines that appear many times', () => {
    reset({
      rawStops: [
        stop(100, 'A', 1, '10:00'),
        stop(100, 'A', 1, '11:00'),
        stop(100, 'B', 2, '12:00'),
      ],
    })
    expect(store.getters.lines).toEqual([100])
  })
})

describe('getter: stopsForLine', () => {
  beforeEach(() => reset())

  it('returns empty array when no line is selected', () => {
    reset({ rawStops: [stop(100, 'A', 1, '10:00')], selectedLine: null })
    expect(store.getters.stopsForLine).toEqual([])
  })

  it('returns only stops belonging to the selected line', () => {
    reset({
      rawStops: [
        stop(100, 'Alpha', 1, '10:00'),
        stop(200, 'Beta', 1, '10:00'),
      ],
      selectedLine: 100,
    })
    expect(store.getters.stopsForLine).toEqual(['Alpha'])
  })

  it('deduplicates stops (same stop, multiple times)', () => {
    reset({
      rawStops: [
        stop(100, 'Alpha', 1, '10:00'),
        stop(100, 'Alpha', 1, '11:00'),
        stop(100, 'Alpha', 1, '12:00'),
      ],
      selectedLine: 100,
    })
    expect(store.getters.stopsForLine).toHaveLength(1)
  })

  it('sorts by order ascending by default', () => {
    reset({
      rawStops: [
        stop(100, 'C Stop', 3, '10:00'),
        stop(100, 'A Stop', 1, '10:00'),
        stop(100, 'B Stop', 2, '10:00'),
      ],
      selectedLine: 100,
      stopsSortOrder: 'asc',
    })
    expect(store.getters.stopsForLine).toEqual(['A Stop', 'B Stop', 'C Stop'])
  })

  it('sorts by order descending when stopsSortOrder is desc', () => {
    reset({
      rawStops: [
        stop(100, 'A Stop', 1, '10:00'),
        stop(100, 'B Stop', 2, '10:00'),
        stop(100, 'C Stop', 3, '10:00'),
      ],
      selectedLine: 100,
      stopsSortOrder: 'desc',
    })
    expect(store.getters.stopsForLine).toEqual(['C Stop', 'B Stop', 'A Stop'])
  })

  it('uses min order when same stop appears with multiple orders (route loops)', () => {
    const data: RawStop[] = [
      stop(100, 'A', 1, '10:00'),
      stop(100, 'Loop', 9, '10:00'),
      stop(100, 'Loop', 5, '11:00'),
      stop(100, 'B', 7, '10:00'),
    ]
    reset({ rawStops: data, selectedLine: 100, stopsSortOrder: 'asc' })
    const asc = store.getters.stopsForLine
    expect(asc).toEqual(['A', 'Loop', 'B'])
    reset({ rawStops: data, selectedLine: 100, stopsSortOrder: 'desc' })
    const desc = store.getters.stopsForLine
    expect(desc).toEqual([...asc].reverse())
  })
})

describe('getter: timesForStop', () => {
  beforeEach(() => reset())

  it('returns empty array when no line selected', () => {
    reset({ selectedLine: null, selectedStop: 'Alpha' })
    expect(store.getters.timesForStop).toEqual([])
  })

  it('returns empty array when no stop selected', () => {
    reset({ selectedLine: 100, selectedStop: null })
    expect(store.getters.timesForStop).toEqual([])
  })

  it('returns times only for the selected line and stop', () => {
    reset({
      rawStops: [
        stop(100, 'Alpha', 1, '10:00'),
        stop(100, 'Beta', 2, '10:00'),
        stop(200, 'Alpha', 1, '10:00'),
      ],
      selectedLine: 100,
      selectedStop: 'Alpha',
    })
    expect(store.getters.timesForStop).toEqual(['10:00'])
  })

  it('returns times sorted ascending', () => {
    reset({
      rawStops: [
        stop(100, 'Alpha', 1, '14:00'),
        stop(100, 'Alpha', 1, '09:00'),
        stop(100, 'Alpha', 1, '11:30'),
      ],
      selectedLine: 100,
      selectedStop: 'Alpha',
    })
    expect(store.getters.timesForStop).toEqual(['09:00', '11:30', '14:00'])
  })

  it('pads single-digit hours so lexicographic sort matches chronological', () => {
    reset({
      rawStops: [
        stop(100, 'Alpha', 1, '14:00'),
        stop(100, 'Alpha', 1, '9:29'),
        stop(100, 'Alpha', 1, '12:38'),
      ],
      selectedLine: 100,
      selectedStop: 'Alpha',
    })
    expect(store.getters.timesForStop).toEqual(['09:29', '12:38', '14:00'])
  })
})

describe('getter: allUniqueStops', () => {
  beforeEach(() => reset())

  it('returns empty array when no stops loaded', () => {
    expect(store.getters.allUniqueStops).toEqual([])
  })

  it('returns unique stop names sorted alphabetically', () => {
    reset({
      rawStops: [
        stop(100, 'Żabiniec', 1, '10:00'),
        stop(100, 'Aleja Róż', 2, '10:00'),
        stop(200, 'Aleja Róż', 1, '10:00'),
        stop(200, 'Biprostal', 1, '10:00'),
      ],
    })
    expect(store.getters.allUniqueStops).toEqual(['Aleja Róż', 'Biprostal', 'Żabiniec'])
  })

  it('deduplicates stops that appear on multiple lines', () => {
    reset({
      rawStops: [
        stop(100, 'Centrum', 1, '10:00'),
        stop(200, 'Centrum', 1, '11:00'),
        stop(300, 'Centrum', 1, '12:00'),
      ],
    })
    expect(store.getters.allUniqueStops).toEqual(['Centrum'])
  })
})
