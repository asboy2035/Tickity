<script setup lang="ts">
  import InteriorItem from '@/components/layout/InteriorItem.vue'
  import {ref} from 'vue'

  defineProps<{
    city: string
    gmt: number
  }>()

  const time = ref<number>(1200)
</script>

<template>
  <InteriorItem class="clock">
    <p class="light">{{ city }}</p>
    <h1>{{ time }}</h1>
  </InteriorItem>
</template>

<style scoped lang="sass">

</style>