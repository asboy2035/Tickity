<script setup lang="ts">
  import ContentView from '@/components/navigation/ContentView.vue'
  import NavigationTitle from '@/components/navigation/NavigationTitle.vue'
  import NavBar from '@/components/premade/navbar/NavBar.vue'
  import RunningTimers from '@/components/premade/RunningTimers.vue'
  import { useUserStore } from '@/stores/user'
  import Card from '@/components/layout/Card.vue'
  import CardTitle from '@/components/layout/CardTitle.vue'
  import { Icon } from '@iconify/vue'

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
      <CardTitle
        title="Data Management"
        icon="solar:database-line-duotone"
      />

      <button @click="clearData">
        <Icon icon="solar:trash-bin-minimalistic-line-duotone" />
        Clear All Data
      </button>
      <p class="light">This can't be undone!</p>
    </Card>

    <NavBar />
  </ContentView>
</template>
