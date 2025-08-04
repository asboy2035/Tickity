<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  import Card from '@/components/layout/Card.vue'
  import CardTitle from '@/components/layout/CardTitle.vue'
  import InteriorItem from '@/components/layout/InteriorItem.vue'
  import HStack from '@/components/layout/HStack.vue'
  import { Icon } from '@iconify/vue'
  import Grid from '@/components/layout/Grid.vue'
  import VStack from '@/components/layout/VStack.vue'
  import {onMounted, ref} from 'vue'

  const userStore = useUserStore()
  const isOnTimersView = ref<boolean>(false)
  const showingTimers = ref<boolean>(false)

  onMounted(() => {
    if (window.location.pathname == '/timers') {
      isOnTimersView.value = true
    }
  })
</script>

<template>
  <Card
    v-if="userStore.runningTimers.length > 0"
    class="spaced runningTimers"
  >
    <HStack
      class="fullWidth autoSpace"
      @click="showingTimers = !showingTimers"
    >
      <HStack>
        <button class="transparent">
          <Icon
            class="toggleIcon"
            :class="{ rotated: showingTimers }"
            icon="solar:alt-arrow-right-line-duotone"
          />
        </button>

        <CardTitle
          class="pointingCursor"
          title="Running Timers"
          icon="solar:hourglass-line-duotone"
          :class="{ noMargins: !showingTimers }"
        />
      </HStack>

      <RouterLink to="/timers">
        <button v-if="!isOnTimersView">
          <Icon icon="solar:hourglass-line-line-duotone" />
          All Timers
        </button>
      </RouterLink>
    </HStack>

    <Grid class="spaced" v-if="showingTimers">
      <InteriorItem
        v-for="timer in userStore.runningTimers"
        :key="timer.id"
      >
        <HStack class="autoSpace fullWidth">
          <VStack>
            <p class="light">{{ timer.title }}</p>
            <h2>{{ Math.floor(timer.remaining / 60) }}:{{ ('0' + (timer.remaining % 60)).slice(-2) }}</h2>
          </VStack>

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
        </HStack>
      </InteriorItem>
    </Grid>
  </Card>
</template>

<style scoped lang="sass">
  .pointingCursor
    cursor: pointer

  .toggleIcon
    transition: 0.2s ease
    width: 1.5rem !important
    height: 1.5rem !important

    &.rotated
      rotate: 90deg
</style>
