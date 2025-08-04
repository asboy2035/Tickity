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
      { "name": "New York", "continent": "North America", "gmtOffset": -4, "coordinates": { "lat": 40.7128, "lon": -74.006 } },
      { "name": "London", "continent": "Europe", "gmtOffset": 1, "coordinates": { "lat": 51.5072, "lon": -0.1276 } },
      { "name": "Tokyo", "continent": "Asia", "gmtOffset": 9, "coordinates": { "lat": 35.6762, "lon": 139.6503 } },
      { "name": "Sydney", "continent": "Australia", "gmtOffset": 10, "coordinates": { "lat": -33.8688, "lon": 151.2093 } },
      { "name": "Cairo", "continent": "Africa", "gmtOffset": 2, "coordinates": { "lat": 30.0444, "lon": 31.2357 } },
      { "name": "Rio de Janeiro", "continent": "South America", "gmtOffset": -3, "coordinates": { "lat": -22.9068, "lon": -43.1729 } },
      { "name": "Los Angeles", "continent": "North America", "gmtOffset": -7, "coordinates": { "lat": 34.0522, "lon": -118.2437 } },
      { "name": "Beijing", "continent": "Asia", "gmtOffset": 8, "coordinates": { "lat": 39.9042, "lon": 116.4074 } },
      { "name": "Moscow", "continent": "Europe", "gmtOffset": 3, "coordinates": { "lat": 55.7558, "lon": 37.6173 } },
      { "name": "Cape Town", "continent": "Africa", "gmtOffset": 2, "coordinates": { "lat": -33.9249, "lon": 18.4241 } },
      { "name": "Buenos Aires", "continent": "South America", "gmtOffset": -3, "coordinates": { "lat": -34.6037, "lon": -58.3816 } },
      { "name": "Auckland", "continent": "Oceania", "gmtOffset": 12, "coordinates": { "lat": -36.8485, "lon": 174.7633 } },
      { "name": "Dubai", "continent": "Asia", "gmtOffset": 4, "coordinates": { "lat": 25.2048, "lon": 55.2708 } },
      { "name": "Paris", "continent": "Europe", "gmtOffset": 2, "coordinates": { "lat": 48.8566, "lon": 2.3522 } },
      { "name": "Toronto", "continent": "North America", "gmtOffset": -4, "coordinates": { "lat": 43.6532, "lon": -79.3832 } },
      { "name": "Shanghai", "continent": "Asia", "gmtOffset": 8, "coordinates": { "lat": 31.2304, "lon": 121.4737 } },
      { "name": "Mumbai", "continent": "Asia", "gmtOffset": 5.5, "coordinates": { "lat": 19.076, "lon": 72.8777 } },
      { "name": "Mexico City", "continent": "North America", "gmtOffset": -6, "coordinates": { "lat": 19.4326, "lon": -99.1332 } },
      { "name": "São Paulo", "continent": "South America", "gmtOffset": -3, "coordinates": { "lat": -23.5505, "lon": -46.6333 } },
      { "name": "Lagos", "continent": "Africa", "gmtOffset": 1, "coordinates": { "lat": 6.5244, "lon": 3.3792 } },
      { "name": "Berlin", "continent": "Europe", "gmtOffset": 2, "coordinates": { "lat": 52.52, "lon": 13.405 } },
      { "name": "Istanbul", "continent": "Europe", "gmtOffset": 3, "coordinates": { "lat": 41.0082, "lon": 28.9784 } },
      { "name": "Seoul", "continent": "Asia", "gmtOffset": 9, "coordinates": { "lat": 37.5665, "lon": 126.978 } },
      { "name": "Jakarta", "continent": "Asia", "gmtOffset": 7, "coordinates": { "lat": -6.2088, "lon": 106.8456 } },
      { "name": "Bogotá", "continent": "South America", "gmtOffset": -5, "coordinates": { "lat": 4.711, "lon": -74.0721 } },
      { "name": "Nairobi", "continent": "Africa", "gmtOffset": 3, "coordinates": { "lat": -1.2921, "lon": 36.8219 } },
      { "name": "Madrid", "continent": "Europe", "gmtOffset": 2, "coordinates": { "lat": 40.4168, "lon": -3.7038 } },
      { "name": "Rome", "continent": "Europe", "gmtOffset": 2, "coordinates": { "lat": 41.9028, "lon": 12.4964 } },
      { "name": "Bangkok", "continent": "Asia", "gmtOffset": 7, "coordinates": { "lat": 13.7563, "lon": 100.5018 } },
      { "name": "Santiago", "continent": "South America", "gmtOffset": -4, "coordinates": { "lat": -33.4489, "lon": -70.6693 } },
      { "name": "Lima", "continent": "South America", "gmtOffset": -5, "coordinates": { "lat": -12.0464, "lon": -77.0428 } },
      { "name": "Karachi", "continent": "Asia", "gmtOffset": 5, "coordinates": { "lat": 24.8607, "lon": 67.0011 } },
      { "name": "Helsinki", "continent": "Europe", "gmtOffset": 3, "coordinates": { "lat": 60.1695, "lon": 24.9355 } },
      { "name": "Singapore", "continent": "Asia", "gmtOffset": 8, "coordinates": { "lat": 1.3521, "lon": 103.8198 } },
      { "name": "Manila", "continent": "Asia", "gmtOffset": 8, "coordinates": { "lat": 14.5995, "lon": 120.9842 } },
      { "name": "Montreal", "continent": "North America", "gmtOffset": -4, "coordinates": { "lat": 45.5019, "lon": -73.5673 } },
      { "name": "Johannesburg", "continent": "Africa", "gmtOffset": 2, "coordinates": { "lat": -26.2041, "lon": 28.0473 } },
      { "name": "Vancouver", "continent": "North America", "gmtOffset": -7, "coordinates": { "lat": 49.2827, "lon": -123.1207 } },
      { "name": "Copenhagen", "continent": "Europe", "gmtOffset": 2, "coordinates": { "lat": 55.6761, "lon": 12.5683 } },
      { "name": "Accra", "continent": "Africa", "gmtOffset": 0, "coordinates": { "lat": 5.6037, "lon": -0.187 } },
      { "name": "Warsaw", "continent": "Europe", "gmtOffset": 2, "coordinates": { "lat": 52.2297, "lon": 21.0122 } },
      { "name": "Vienna", "continent": "Europe", "gmtOffset": 2, "coordinates": { "lat": 48.2082, "lon": 16.3738 } }
    ] as Clock[],
  }),
  actions: {
    addClock(clock: Omit<Clock, 'coordinates'>) {
      this.clocks.push({
        ...clock,
        coordinates: { lat: 0, lon: 0 }
      });
    }
  },
  persist: true
})
