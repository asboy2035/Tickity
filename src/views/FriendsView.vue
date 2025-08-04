<script setup lang="ts">
  import ContentView from '@/components/navigation/ContentView.vue'
  import NavigationTitle from '@/components/navigation/NavigationTitle.vue'
  import Card from '@/components/layout/Card.vue'
  import CardTitle from '@/components/layout/CardTitle.vue'
  import { Icon } from '@iconify/vue'
  import { ref } from 'vue'
  import NavBar from '@/components/premade/navbar/NavBar.vue'
  import Grid from '@/components/layout/Grid.vue'
  import FriendItem from '@/components/premade/FriendItem.vue'
  import RunningTimers from '@/components/premade/RunningTimers.vue'

  const showingAddFriendsModal = ref<boolean>(false)
</script>

<template>
  <ContentView class="friendsView">
    <NavigationTitle title="Friends">
      <button @click="showingAddFriendsModal = !showingAddFriendsModal">
        <Icon icon="solar:user-plus-rounded-line-duotone" />
      </button>
    </NavigationTitle>

    <RunningTimers />

    <Card>
      <CardTitle
        title="Friend's Times"
        icon="solar:users-group-two-rounded-line-duotone"
      />

      <p>Add friends with the above button.</p>
      <p>You have () friends.</p>
    </Card>
    
    <Card>
      <CardTitle
        title="Friends"
        icon="solar:users-group-two-rounded-line-duotone"
      />

      <Grid class="spaced">
        <FriendItem
          name="yass queeeeen"
          :gmt="+3"
        />
        <FriendItem
          name="yass queeeeen"
          :gmt="+2"
        />
      </Grid>
    </Card>

    <NavBar />
  </ContentView>
</template>

<style scoped lang="sass">

</style>