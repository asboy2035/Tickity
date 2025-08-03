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
  
  actions: {
    addClock(clock: Clock) {
      if (!this.enabledClocks.find(c => c.name === clock.name)) {
        this.enabledClocks.push(clock)
      }
    },
    removeClock(clock: Clock) {
      this.enabledClocks = this.enabledClocks.filter(c => c.name !== clock.name)
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
    removeTimer(id: number) {
      this.timers = this.timers.filter(t => t.id !== id)
    },
    startTimer(id: number) {
      const timer = this.timers.find(t => t.id === id)
      if (timer) {
        timer.isRunning = true
      }
    },
    pauseTimer(id: number) {
      const timer = this.timers.find(t => t.id === id)
      if (timer) {
        timer.isRunning = false
      }
    },
    updateTimers() {
      this.timers.forEach(timer => {
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
})
