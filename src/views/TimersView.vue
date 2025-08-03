

<script setup lang="ts">
  import ContentView from '@/components/navigation/ContentView.vue'
  import NavigationTitle from '@/components/navigation/NavigationTitle.vue'
  import NavBar from '@/components/premade/navbar/NavBar.vue'
  import { useUserStore } from '@/stores/user'
  import Card from '@/components/layout/Card.vue'
  import CardTitle from '@/components/layout/CardTitle.vue'
  import Grid from '@/components/layout/Grid.vue'
  import { onMounted, onUnmounted, ref } from 'vue'
  import Modal from '@/components/layout/Modal.vue'
  import VStack from '@/components/layout/VStack.vue'
  import HStack from '@/components/layout/HStack.vue'
  import { Icon } from '@iconify/vue'

  const userStore = useUserStore()
  const isModalOpen = ref(false)
  const customTimerTitle = ref('')
  const customTimerDuration = ref(0)

  const presets = [
    { title: 'Pomodoro', duration: 25 * 60 },
    { title: 'Short Break', duration: 5 * 60 },
    { title: 'Long Break', duration: 15 * 60 },
  ]

  let timerInterval: number | undefined;

  onMounted(() => {
    timerInterval = setInterval(() => {
      userStore.updateTimers();
      userStore.timers.forEach(timer => {
        if (timer.remaining === 0 && timer.isRunning) {
          new Notification('Tickity', { body: `Timer "${timer.title}" has finished!` });
          userStore.pauseTimer(timer.id);
        }
      });
    }, 1000);
    Notification.requestPermission();
  });

  onUnmounted(() => {
    clearInterval(timerInterval);
  });

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

    <Modal v-if="isModalOpen" @click="isModalOpen = false">
      <VStack class="modal-content" @click.stop>
        <CardTitle title="Create a Custom Timer" icon="solar:clock-circle-line-duotone" />
        <input type="text" v-model="customTimerTitle" placeholder="Timer Title" />
        <input type="number" v-model="customTimerDuration" placeholder="Duration (minutes)" />
        <button @click="addCustomTimer">Add Timer</button>
      </VStack>
    </Modal>

    <Card v-if="userStore.timers.length > 0">
      <CardTitle title="Running Timers" icon="solar:hourglass-line-duotone" />
      <VStack>
        <HStack v-for="timer in userStore.timers" :key="timer.id">
          <span>{{ timer.title }}</span>
          <span>{{ Math.floor(timer.remaining / 60) }}:{{ ('0' + (timer.remaining % 60)).slice(-2) }}</span>
          <button @click="userStore.startTimer(timer.id)" v-if="!timer.isRunning">
            <Icon icon="solar:play-circle-line-duotone" />
          </button>
          <button @click="userStore.pauseTimer(timer.id)" v-if="timer.isRunning">
            <Icon icon="solar:pause-circle-line-duotone" />
          </button>
          <button @click="userStore.removeTimer(timer.id)">
            <Icon icon="solar:close-circle-line-duotone" />
          </button>
        </HStack>
      </VStack>
    </Card>

    <Card>
      <CardTitle title="Presets" icon="solar:checklist-minimalistic-line-duotone" />
      <Grid>
        <Card
          v-for="preset in presets"
          :key="preset.title"
          @click="addTimer(preset.title, preset.duration)"
        >
          <VStack>
            <CardTitle
              :title="preset.title"
              icon="solar:settings-line-duotone"
            />
            <span>{{ preset.duration / 60 }} minutes</span>
          </VStack>
        </Card>
      </Grid>
    </Card>

    <NavBar />
  </ContentView>
</template>

<style scoped lang="sass">
.modal-content
  padding: 1rem
  gap: 1rem

  input
    padding: 0.5rem
    border-radius: 0.5rem
    border: 1px solid var(--color-border)

  button
    background-color: var(--color-primary)
    color: var(--color-text-inverted)
    border: none
    padding: 0.5rem 1rem
    border-radius: 0.5rem
    cursor: pointer
</style>

