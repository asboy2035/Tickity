<script setup lang="ts">
  import FullScreenCover from "@/components/premade/FullScreenCover.vue"
  import Card from "@/components/layout/Card.vue"
</script>

<template>
  <FullScreenCover class="modalCover">
    <Card class="modalCard spaced">
      <slot />
    </Card>
  </FullScreenCover>
</template>

<style scoped lang="sass">
  .modalCard
    width: fit-content
    min-width: 20rem
    max-width: 40rem

  .modalCover
    z-index: 5
</style>
