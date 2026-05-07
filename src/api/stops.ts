import axios from 'axios'
import type { RawStop } from '@/types'

export const fetchStops = (): Promise<RawStop[]> =>
  axios.get<RawStop[]>('http://localhost:3000/stops').then(r => r.data)
