<script setup lang="ts">
  import NavigationButton from '@/components/premade/navbar/NavigationButton.vue'
  import HStack from '@/components/layout/HStack.vue'
</script>

<template>
  <h-stack>
    <NavigationButton
      link="/"
      icon="solar:clock-circle-line-duotone"
      text="Tickity"
    />

    <NavigationButton
      link="/map"
      icon="solar:map-line-duotone"
      text="Map"
    />

    <NavigationButton 
      link="/timers" 
      icon="solar:hourglass-line-line-duotone"
      text="Timers" 
    />
    
    <NavigationButton
      link="/settings"
      icon="solar:settings-line-duotone"
      text="Settings"
    />
  </h-stack>
</template>
