import { defineStore } from 'pinia'

export interface Clock {
  name: string
  continent: string
  gmtOffset: number
  coordinates: {
    lat: number
    lon: number
  }
}

export const useClocksStore = defineStore('clocks', {
  state: () => ({
    clocks: [
      { name: 'New York', continent: 'North America', gmtOffset: -4, coordinates: { lat: 40.7128, lon: -74.006 } },
      { name: 'London', continent: 'Europe', gmtOffset: 1, coordinates: { lat: 51.5072, lon: -0.1276 } },
      { name: 'Tokyo', continent: 'Asia', gmtOffset: 9, coordinates: { lat: 35.6762, lon: 139.6503 } },
      { name: 'Sydney', continent: 'Australia', gmtOffset: 10, coordinates: { lat: -33.8688, lon: 151.2093 } },
      { name: 'Cairo', continent: 'Africa', gmtOffset: 2, coordinates: { lat: 30.0444, lon: 31.2357 } },
      { name: 'Rio de Janeiro', continent: 'South America', gmtOffset: -3, coordinates: { lat: -22.9068, lon: -43.1729 } },
    ] as Clock[],
  }),
})
