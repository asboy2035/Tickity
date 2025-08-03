
<script setup lang="ts">
  import ContentView from '@/components/navigation/ContentView.vue'
  import NavigationTitle from '@/components/navigation/NavigationTitle.vue'
  import NavBar from '@/components/premade/navbar/NavBar.vue'
  import RunningTimers from '@/components/premade/RunningTimers.vue';
  import { useUserStore } from '@/stores/user'
  import Card from '@/components/layout/Card.vue'
  import CardTitle from '@/components/layout/CardTitle.vue'

  const userStore = useUserStore()

  function clearData() {
    if (confirm('Are you sure you want to clear all data?')) {
      userStore.clearData()
    }
  }
</script>

<template>
  <ContentView>
    <NavigationTitle title="Settings" />

    <RunningTimers />

    <Card>
      <CardTitle title="Data Management" icon="solar:database-line-duotone" />
      <button @click="clearData">Clear All Data</button>
    </Card>

    <NavBar />
  </ContentView>
</template>

<style scoped lang="sass">
button
  background-color: var(--color-danger)
  color: var(--color-text-inverted)
  border: none
  padding: 0.5rem 1rem
  border-radius: 0.5rem
  cursor: pointer
</style>
