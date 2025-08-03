
<script setup lang="ts">
  import InteriorItem from '@/components/layout/InteriorItem.vue'
  import { ref } from 'vue'
  import type { Clock } from '@/stores/clocks'
  import { Icon } from '@iconify/vue'
  import HStack from '@/components/layout/HStack.vue'

  const props = defineProps<{
    clock: Clock
  }>()

  const emit = defineEmits(['delete'])

  const time = ref<number>(1200) // This seems to be a placeholder, I'll leave it for now.

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
