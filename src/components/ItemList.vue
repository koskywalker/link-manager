<template>
  <div class="item-list">
    <one-item
      v-for="(item, index) in items"
      v-bind:item="item"
      v-bind:key="index">
    </one-item>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase'
import OneItem from './OneItem'

export default {
  components: {
    OneItem,
  },
  data() {
    return {
      items: [],
    }
  },
  created() {
    db.collection('items').orderBy('createdAt', 'desc')
    .onSnapshot((querySnapshot) => {
      this.items = []
      querySnapshot.forEach((doc) => {
        const currentUserId = firebase.auth().currentUser.uid
        if (currentUserId === doc.data().userId) {
          let data = {
            id: doc.id,
            userId: doc.data().userId,
            title: doc.data().title,
            url: doc.data().url,
            comment: doc.data().comment,
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
          }
          this.items.push(data)
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped></style>
