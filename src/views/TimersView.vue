<script setup lang="ts">
  import ContentView from '@/components/navigation/ContentView.vue'
  import NavigationTitle from '@/components/navigation/NavigationTitle.vue'
  import NavBar from '@/components/premade/navbar/NavBar.vue'
  import RunningTimers from '@/components/premade/RunningTimers.vue';
  import { useUserStore } from '@/stores/user'
  import Card from '@/components/layout/Card.vue'
  import CardTitle from '@/components/layout/CardTitle.vue'
  import Grid from '@/components/layout/Grid.vue'
  import { ref } from 'vue'
  import Modal from '@/components/layout/Modal.vue'
  import VStack from '@/components/layout/VStack.vue'
  import HStack from '@/components/layout/HStack.vue'
  import { Icon } from '@iconify/vue'
  import InteriorItem from '@/components/layout/InteriorItem.vue'

  const userStore = useUserStore()
  const isModalOpen = ref(false)
  const customTimerTitle = ref('')
  const customTimerDuration = ref(0)

  const presets = [
    { title: 'Pomodoro', duration: 25 * 60 },
    { title: 'Short Break', duration: 5 * 60 },
    { title: 'Long Break', duration: 15 * 60 },
  ]

  function addTimer(title: string, duration: number) {
    userStore.addTimer(title, duration)
  }

  function addCustomTimer() {
    if (customTimerTitle.value && customTimerDuration.value > 0) {
      addTimer(customTimerTitle.value, customTimerDuration.value * 60)
      isModalOpen.value = false
      customTimerTitle.value = ''
      customTimerDuration.value = 0
    }
  }
</script>

<template>
  <ContentView>
    <NavigationTitle title="Timers">
      <button @click="isModalOpen = true">
        <Icon icon="solar:alarm-add-line-duotone" />
      </button>
    </NavigationTitle>

    <RunningTimers />

    <Card v-if="userStore.timers.length > 0">
      <CardTitle
        title="All Timers"
        icon="solar:hourglass-line-duotone"
      />

      <Grid class="spaced">
        <InteriorItem
          v-for="timer in userStore.timers"
          :key="timer.id"
        >
          <h3>
            {{ timer.title }}
            {{ Math.floor(timer.remaining / 60) }}:{{ ('0' + (timer.remaining % 60)).slice(-2) }}
          </h3>

          <HStack>
            <button @click="userStore.startTimer(timer.id)" v-if="!timer.isRunning">
              <Icon icon="solar:play-line-duotone" />
            </button>

            <button @click="userStore.pauseTimer(timer.id)" v-if="timer.isRunning">
              <Icon icon="solar:pause-line-duotone" />
            </button>

            <button @click="userStore.removeTimer(timer.id)">
              <Icon icon="solar:trash-bin-minimalistic-line-duotone" />
            </button>
          </HStack>
        </InteriorItem>
      </Grid>
    </Card>

    <Modal v-if="isModalOpen" @click="isModalOpen = false">
      <VStack @click.stop>
        <CardTitle title="Create Timer" icon="solar:clock-circle-line-duotone" />
        <input type="text" v-model="customTimerTitle" placeholder="Timer Title" />
        <input type="number" v-model="customTimerDuration" placeholder="Duration (minutes)" />

        <button @click="addCustomTimer">
          <Icon icon="solar:alarm-add-line-duotone" />
          Add Timer
        </button>
      </VStack>
    </Modal>

    <Card>
      <CardTitle
        title="Presets"
        icon="solar:checklist-minimalistic-line-duotone"
      />

      <Grid class="spaced">
        <InteriorItem
          v-for="preset in presets"
          :key="preset.title"
          @click="addTimer(preset.title, preset.duration)"
        >
          <p class="light">{{ preset.title }}</p>
          <h2>{{ preset.duration / 60 }} minutes</h2>
        </InteriorItem>
      </Grid>
    </Card>

    <NavBar />
  </ContentView>
</template>
