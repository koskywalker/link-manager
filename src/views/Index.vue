<template>
  <div class="index">
    <button v-on:click="signOut">ログアウト</button>
    <create-item v-on:create-item="openAddItemForm"></create-item>
    <item-list></item-list>
  </div>
</template>

<script>
import firebase from 'firebase'
import ItemList from '@/components/ItemList.vue'
import CreateItem from '@/components/CreateItem'

export default {
  name: 'index',
  components: {
    ItemList,
    CreateItem,
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    },
    openAddItemForm(item) {
      this.items.push(item);
    }
  }
}
</script>
