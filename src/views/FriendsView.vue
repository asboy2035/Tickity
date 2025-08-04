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
  import { useFriendsStore, type Friend } from '@/stores/friends'
  import Modal from '@/components/layout/Modal.vue'
  import HStack from '@/components/layout/HStack.vue'

  const showingAddFriendsModal = ref<boolean>(false)
  const showingEditModal = ref<boolean>(false)
  const showingDeleteModal = ref<boolean>(false)

  const friendsStore = useFriendsStore()

  const newFriendName = ref('')
  const newFriendGmtOffset = ref(0)

  const selectedFriend = ref<Friend | null>(null)
  const originalFriendName = ref<string | null>(null)

  function addFriend() {
    if (newFriendName.value) {
      friendsStore.addFriend({
        name: newFriendName.value,
        gmtOffset: newFriendGmtOffset.value
      })
      newFriendName.value = ''
      newFriendGmtOffset.value = 0
      showingAddFriendsModal.value = false
    }
  }

  function showEditModal(friend: Friend) {
    selectedFriend.value = { ...friend }
    originalFriendName.value = friend.name
    showingEditModal.value = true
  }

  function updateFriend() {
    if (selectedFriend.value && originalFriendName.value) {
      friendsStore.updateFriend(originalFriendName.value, selectedFriend.value)
      showingEditModal.value = false
      selectedFriend.value = null
      originalFriendName.value = null
    }
  }

  function showDeleteModal(name: string) {
    selectedFriend.value = friendsStore.friends.find(f => f.name === name) || null
    showingDeleteModal.value = true
  }

  function deleteFriend() {
    if (selectedFriend.value) {
      friendsStore.deleteFriend(selectedFriend.value.name)
      showingDeleteModal.value = false
      selectedFriend.value = null
    }
  }
</script>

<template>
  <ContentView class="friendsView">
    <!-- Add Friend Modal -->
    <Modal
      title="Add Friend"
      v-if="showingAddFriendsModal"
      @close="showingAddFriendsModal = false"
    >
      <CardTitle
        title="Add Friend"
        icon="solar:pen-new-square-line-duotone"
      />
      <input type="text" placeholder="Name" v-model="newFriendName" />
      <input type="number" placeholder="GMT Offset" v-model="newFriendGmtOffset" />

      <HStack class="fullWidth autoSpace">
        <button @click="showingAddFriendsModal = false" class="transparent">
          Cancel
        </button>
        <button @click="addFriend">
          <Icon icon="solar:pen-new-square-line-duotone" />
          Add
        </button>
      </HStack>
    </Modal>

    <!-- Edit Friend Modal -->
    <Modal
      title="Edit Friend"
      v-if="showingEditModal && selectedFriend"
    >
      <CardTitle
        :title="'Edit ' + selectedFriend.name"
        icon="solar:pen-2-line-duotone"
      />

      <input type="text" placeholder="Name" v-model="selectedFriend.name" />
      <input type="number" placeholder="GMT Offset" v-model="selectedFriend.gmtOffset" />

      <HStack class="fullWidth autoSpace">
        <button @click="showingEditModal = false" class="transparent">
          Cancel
        </button>
        <button @click="updateFriend">
          <Icon icon="solar:pen-2-line-duotone" />
          Update
        </button>
      </HStack>
    </Modal>

    <!-- Delete Friend Modal -->
    <Modal
      v-if="showingDeleteModal && selectedFriend"
      @close="showingDeleteModal = false"
    >
      <CardTitle
        :title="'Delete ' + selectedFriend.name"
        icon="solar:trash-bin-minimalistic-line-duotone"
      />
      <p>Are you sure you want to delete {{ selectedFriend.name }}?</p>

      <HStack class="fullWidth autoSpace">
        <button @click="showingDeleteModal = false" class="transparent">
          Cancel
        </button>
        <button @click="deleteFriend">
          <Icon icon="solar:trash-bin-minimalistic-line-duotone" />
          Delete
        </button>
      </HStack>
    </Modal>

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

      <p>You have {{ friendsStore.friends.length }} friends.</p>
    </Card>

    <Card>
      <CardTitle
        title="Friends"
        icon="solar:users-group-two-rounded-line-duotone"
      />

      <Grid class="spaced">
        <FriendItem
          v-for="friend in friendsStore.friends"
          :key="friend.name"
          :name="friend.name"
          :gmt-offset="friend.gmtOffset"
          @edit="showEditModal"
          @delete="showDeleteModal"
        />
      </Grid>
    </Card>

    <NavBar />
  </ContentView>
</template>
