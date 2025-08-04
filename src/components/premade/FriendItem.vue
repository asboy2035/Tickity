<script setup lang="ts">
  import InteriorItem from '@/components/layout/InteriorItem.vue'
  import HStack from '@/components/layout/HStack.vue'
  import VStack from '@/components/layout/VStack.vue'
  import { ref } from 'vue'
  import { Icon } from '@iconify/vue'

  defineProps<{
    name: string
    gmt: number
  }>()

  const time = ref<string>("00:00")
</script>

<template>
  <InteriorItem class="friendItem">
    <HStack class="autoSpace fullWidth">
      <VStack class="friendInfo">
        <p class="light friendName">{{ name }}</p>
        <h2>{{ time }}</h2>
      </VStack>

      <HStack>
        <button>
          <Icon icon="solar:pen-line-duotone" />
        </button>
        <button>
          <Icon icon="solar:trash-bin-minimalistic-line-duotone" />
        </button>
      </HStack>
    </HStack>
  </InteriorItem>
</template>

<style scoped lang="sass">

</style>
