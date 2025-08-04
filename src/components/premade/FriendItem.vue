<script setup lang="ts">
  import InteriorItem from '@/components/layout/InteriorItem.vue'
  import HStack from '@/components/layout/HStack.vue'
  import VStack from '@/components/layout/VStack.vue'
  import { onMounted, ref } from 'vue'
  import { Icon } from '@iconify/vue'

  const props = defineProps<{
    name: string
    gmtOffset: number
  }>()

  const emit = defineEmits(['edit', 'delete'])

  const time = ref<string>('00:00')

  function updateTime() {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    const friendTime = new Date(utc + 3600000 * props.gmtOffset)
    time.value = friendTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  onMounted(() => {
    updateTime()
    setInterval(updateTime, 1000)
  })
</script>

<template>
  <InteriorItem class="friendItem">
    <HStack class="autoSpace fullWidth">
      <VStack class="friendInfo">
        <p class="light friendName">{{ name }}</p>
        <h2>{{ time }}</h2>
      </VStack>

      <HStack>
        <button @click="emit('edit', { name, gmtOffset })">
          <Icon icon="solar:pen-line-duotone" />
        </button>
        <button @click="emit('delete', name)">
          <Icon icon="solar:trash-bin-minimalistic-line-duotone" />
        </button>
      </HStack>
    </HStack>
  </InteriorItem>
</template>

<style scoped lang="sass">

</style>
