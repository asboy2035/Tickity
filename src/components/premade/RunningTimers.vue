<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  import Card from '@/components/layout/Card.vue'
  import CardTitle from '@/components/layout/CardTitle.vue'
  import InteriorItem from '@/components/layout/InteriorItem.vue'
  import HStack from '@/components/layout/HStack.vue'
  import { Icon } from '@iconify/vue'
  import Grid from '@/components/layout/Grid.vue'

  const userStore = useUserStore()
</script>

<template>
  <Card v-if="userStore.runningTimers.length > 0">
    <CardTitle
        title="Running Timers"
        icon="solar:hourglass-line-duotone"
    />

    <Grid class="spaced">
      <InteriorItem
          v-for="timer in userStore.runningTimers"
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
</template>