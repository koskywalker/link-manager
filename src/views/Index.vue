<template>
  <div class="index">
    <button v-on:click="signOut">ログアウト</button>
    <create-item v-on:create-item="addItem"></create-item>
    <item-list v-bind:items="items"></item-list>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import ItemList from '@/components/ItemList.vue'
import CreateItem from '@/components/CreateItem'

export default {
  name: 'index',
  components: {
    ItemList,
    CreateItem,
  },
  data() {
    return {
      items: [],
    }
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    },
    addItem(item) {
      this.items.push(item);
    }
  }
}
</script>
