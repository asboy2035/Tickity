<script setup lang="ts">
  import InteriorItem from '@/components/layout/InteriorItem.vue'
  import { onMounted, onUnmounted, ref } from 'vue'
  import type { Clock } from '@/stores/clocks'
  import { Icon } from '@iconify/vue'
  import HStack from '@/components/layout/HStack.vue'

  const props = defineProps<{
    clock: Clock
  }>()

  const emit = defineEmits(['delete'])

  const time = ref<string>('--:--')
  let timeout: number
  let interval: number

  onMounted(() => {
    const update = () => {
      const now = new Date()
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000
      const cityTime = new Date(utcTime + props.clock.gmtOffset * 3600000)
      time.value = cityTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    }

    const startMinuteSync = () => {
      update()
      const now = new Date()
      const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds())
      timeout = setTimeout(() => {
        update()
        interval = setInterval(update, 60000)
      }, delay)
    }

    startMinuteSync()
  })

  onUnmounted(() => {
    clearTimeout(timeout)
    clearInterval(interval)
  })

  function deleteClock() {
    emit('delete', props.clock)
  }
</script>

<template>
  <InteriorItem class="clock">
    <HStack>
      <p class="light">{{ props.clock.name }}</p>

      <button @click="deleteClock" class="transparent">
        <Icon icon="solar:trash-bin-minimalistic-line-duotone" />
      </button>
    </HStack>
    <h1>{{ time }}</h1>
  </InteriorItem>
</template>
