
<script setup lang="ts">
  import Card from '@/components/layout/Card.vue'
  import CardTitle from '@/components/layout/CardTitle.vue'
  import NavBar from '@/components/premade/navbar/NavBar.vue'
  import ContentView from '@/components/navigation/ContentView.vue'
  import NavigationTitle from '@/components/navigation/NavigationTitle.vue'
  import { Icon } from '@iconify/vue'
  import Grid from '@/components/layout/Grid.vue'
  import ClockCard from '@/components/premade/ClockCard.vue'
  import { useUserStore } from '@/stores/user'
  import { computed, ref } from 'vue'
  import type { Clock } from '@/stores/clocks'
  import Modal from '@/components/layout/Modal.vue'
  import { useClocksStore } from '@/stores/clocks'
  import HStack from '@/components/layout/HStack.vue'
  import RunningTimers from '@/components/premade/RunningTimers.vue'

  const userStore = useUserStore()
  const clocksStore = useClocksStore()
  const isModalOpen = ref(false)

  const clocksByContinent = computed(() => {
    const continents: Record<string, Clock[]> = {}
    for (const clock of userStore.enabledClocks) {
      if (!continents[clock.continent]) {
        continents[clock.continent] = []
      }
      continents[clock.continent].push(clock)
    }
    return continents
  })

  const availableClocks = computed(() => {
    return clocksStore.clocks.filter(clock => {
      return !userStore.enabledClocks.some((enabledClock: Clock) => enabledClock.name === clock.name)
    })
  })

  function addClock(clock: Clock) {
    userStore.addClock(clock)
  }

  function deleteClock(clock: Clock) {
    userStore.removeClock(clock)
  }
</script>

<template>
  <ContentView id="homeView">
    <NavigationTitle title="Tickity">
      <button @click="isModalOpen = true">
        <Icon icon="solar:pen-new-square-line-duotone" />
      </button>
    </NavigationTitle>

    <RunningTimers />

    <Modal v-if="isModalOpen" @click="isModalOpen = false">
      <CardTitle title="Add a Clock" icon="solar:clock-circle-line-duotone" />

      <HStack class="clockList" @click.stop>
        <button
          v-for="clock in availableClocks"
          :key="clock.name"
          @click="addClock(clock)"
        >
          <Icon icon="solar:map-point-add-line-duotone" />
          {{ clock.name }}
        </button>
      </HStack>
    </Modal>

    <Card v-if="userStore.enabledClocks.length === 0">
      <CardTitle
        title="Welcome to Tickity!"
        icon="solar:hearts-line-duotone"
      />
      <p>Add clocks with the button above.</p>
    </Card>

    <Card v-for="(continentClocks, continent) in clocksByContinent" :key="continent">
      <CardTitle
        :title="continent"
        icon="solar:cloud-line-duotone"
      />

      <Grid class="spaced tight">
        <ClockCard
          v-for="clock in continentClocks"
          :key="clock.name"
          :clock="clock"
          @delete="deleteClock"
        />
      </Grid>
    </Card>

    <NavBar />
  </ContentView>
</template>

<style scoped lang="sass">
.clockList
  gap: 0.5rem
  overflow-y: scroll

  button
    width: fit-content
</style>

