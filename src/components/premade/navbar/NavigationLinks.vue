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
      link="/globe"
      icon="solar:global-line-duotone"
      text="Globe"
    />

<!--    <NavigationButton-->
<!--      link="/friends"-->
<!--      icon="solar:users-group-two-rounded-line-duotone"-->
<!--      text="Friends"-->
<!--    />-->

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
