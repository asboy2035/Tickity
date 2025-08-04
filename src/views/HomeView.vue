
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
  import VStack from '@/components/layout/VStack.vue'
  import RunningTimers from '@/components/premade/RunningTimers.vue'

  const userStore = useUserStore()
  const clocksStore = useClocksStore()
  const isAddClockModalOpen = ref(false)
  const isAddCustomClockModalOpen = ref(false)

  const newClockName = ref('')
  const newClockContinent = ref('Africa')
  const newClockGmtOffset = ref(0)

  const continents = ['Africa', 'Asia', 'Australia', 'Europe', 'North America', 'South America']

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

  function addCustomClock() {
    if (newClockName.value) {
      clocksStore.addClock({
        name: newClockName.value,
        continent: newClockContinent.value,
        gmtOffset: newClockGmtOffset.value
      })
      userStore.addClock({
        name: newClockName.value,
        continent: newClockContinent.value,
        gmtOffset: newClockGmtOffset.value,
        coordinates: { lat: 0, lon: 0 }
      })
      newClockName.value = ''
      newClockContinent.value = 'Africa'
      newClockGmtOffset.value = 0
      isAddCustomClockModalOpen.value = false
    }
  }

  function deleteClock(clock: Clock) {
    userStore.removeClock(clock)
  }
</script>

<template>
  <ContentView id="homeView">
    <NavigationTitle title="Tickity">
      <button @click="isAddClockModalOpen = !isAddClockModalOpen">
        <Icon icon="solar:clock-circle-line-duotone" />
      </button>
      <button @click="isAddCustomClockModalOpen = !isAddCustomClockModalOpen">
        <Icon icon="solar:pen-new-square-line-duotone" />
      </button>
    </NavigationTitle>

    <RunningTimers />

    <Modal v-if="isAddClockModalOpen" @click="isAddClockModalOpen = false">
      <CardTitle
        title="Presets"
        icon="solar:clock-circle-line-duotone"
      />

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

      <button class="fullWidth">
        <Icon icon="solar:check-read-line-duotone" />
        Done
      </button>
    </Modal>

    <Modal v-if="isAddCustomClockModalOpen" @click="isAddCustomClockModalOpen = false">
      <CardTitle
        title="Create Custom Clock"
        icon="solar:pen-new-square-line-duotone"
      />

      <VStack @click.stop class="fullWidth">
        <input type="text" placeholder="Name" v-model="newClockName" />
        <select v-model="newClockContinent">
          <option v-for="continent in continents" :key="continent" :value="continent">
            {{ continent }}
          </option>
        </select>
        <input type="number" placeholder="GMT Offset" v-model="newClockGmtOffset" />

        <HStack class="fullWidth autoSpace">
          <button @click="isAddCustomClockModalOpen = false" class="transparent">
            Cancel
          </button>
          <button @click="addCustomClock">
            <Icon icon="solar:pen-new-square-line-duotone" />
            Create
          </button>
        </HStack>
      </VStack>
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

