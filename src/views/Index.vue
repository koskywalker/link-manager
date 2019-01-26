<template>
    <v-container class="index">
      <v-layout align-centter justify-center>
        <v-flex>
          <button v-on:click="signOut">ログアウト</button>
          <create-item></create-item>
          <item-list></item-list>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import ItemList from '@/components/ItemList'
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
    }
  }
}
</script>
