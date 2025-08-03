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
  state: () => {
    const savedClocks: string | null = localStorage.getItem('enabledClocks')
    const savedTimers: string | null = localStorage.getItem('timers')

    return {
      enabledClocks: savedClocks ? JSON.parse(savedClocks) : [] as Clock[],
      timers: savedTimers ? JSON.parse(savedTimers) : [] as Timer[],
    }
  },
  
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
        localStorage.setItem('enabledClocks', JSON.stringify(this.enabledClocks))
      }
    },
    
    removeClock(clock: Clock) {
      this.enabledClocks = this.enabledClocks.filter((c: Clock) => c.name !== clock.name)
      localStorage.setItem('enabledClocks', JSON.stringify(this.enabledClocks))
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
      localStorage.setItem('timers', JSON.stringify(this.timers))
    },
    
    removeTimer(id: number): void {
      this.timers = this.timers.filter((t: Timer) => t.id !== id)
      localStorage.setItem('timers', JSON.stringify(this.timers))
    },
    
    startTimer(id: number): void {
      const timer = this.timers.find((t: Timer) => t.id === id)
      if (timer) {
        timer.isRunning = true
        localStorage.setItem('timers', JSON.stringify(this.timers))
      }
    },
    
    pauseTimer(id: number): void {
      const timer = this.timers.find((t: Timer) => t.id === id)
      if (timer) {
        timer.isRunning = false
        localStorage.setItem('timers', JSON.stringify(this.timers))
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

      localStorage.setItem('timers', JSON.stringify(this.timers))
    },

    clearData() {
      this.enabledClocks = []
      this.timers = []
      localStorage.removeItem('enabledClocks')
      localStorage.removeItem('timers')
    },
  },
})
