import { defineStore } from 'pinia'

export interface Friend {
  name: string
  gmtOffset: number
}

export const useFriendsStore = defineStore('friends', {
  state: () => ({
    friends: [
      { name: 'John Doe', gmtOffset: -5 },
      { name: 'Jane Smith', gmtOffset: 1 },
    ] as Friend[]
  }),

  actions: {
    addFriend(friend: Friend) {
      this.friends.push(friend)
    },

    deleteFriend(name: string) {
      this.friends = this.friends.filter(friend => friend.name !== name)
    },

    updateFriend(originalName: string, updatedFriend: Friend) {
      const index = this.friends.findIndex(friend => friend.name === originalName)
      if (index !== -1) {
        this.friends[index] = updatedFriend
      }
    }
  },

  persist: true
})
