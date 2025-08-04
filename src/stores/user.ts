import { defineStore } from 'pinia'
import type { Clock } from './clocks'

export interface Timer {
  id: number
  title: string
  duration: number
  remaining: number
  isRunning: boolean
}

export const useUserStore = defineStore('user', {
  state: () => ({
    enabledClocks: [] as Clock[],
    timers: [] as Timer[],
  }),
  
  getters: {
    runningTimers(): Timer[] {
      return this.timers.filter((t: Timer) => t.isRunning)
    }
  },

  actions: {
    initializeTimers() {
      setInterval(() => {
        this.updateTimers()
        this.timers.forEach((timer: Timer) => {
          if (timer.remaining === 0 && timer.isRunning) {
            new Notification('Tickity', { body: `Timer "${timer.title}" has finished!` })
            this.pauseTimer(timer.id)
          }
        })
      }, 1000)
      
      Notification.requestPermission().then(r => {
        if (r == 'denied') {
          console.log('Permission Denied')
        } else if (r == 'granted') {
          console.log('Permission Granted')
        } else {
          console.log('Permission Requested')
        }
      })
    },
    
    addClock(clock: Clock): void {
      if (!this.enabledClocks.find((c: Clock) => c.name === clock.name)) {
        this.enabledClocks.push(clock)
      }
    },
    
    removeClock(clock: Clock) {
      this.enabledClocks = this.enabledClocks.filter((c: Clock) => c.name !== clock.name)
    },


    addTimer(title: string, duration: number) {
      const newTimer: Timer = {
        id: Date.now(),
        title,
        duration,
        remaining: duration,
        isRunning: false,
      }
      this.timers.push(newTimer)
    },
    
    removeTimer(id: number): void {
      this.timers = this.timers.filter((t: Timer) => t.id !== id)
    },
    
    startTimer(id: number): void {
      const timer = this.timers.find((t: Timer) => t.id === id)
      if (timer) {
        timer.isRunning = true
      }
    },
    
    pauseTimer(id: number): void {
      const timer = this.timers.find((t: Timer) => t.id === id)
      if (timer) {
        timer.isRunning = false
      }
    },

    updateTimers() {
      this.timers.forEach((timer: Timer) => {
        if (timer.isRunning && timer.remaining > 0) {
          timer.remaining--
        } else if (timer.remaining === 0) {
          timer.isRunning = false
        }
      })
    },

    clearData() {
      this.enabledClocks = []
      this.timers = []
    },
  },
  persist: true
})
