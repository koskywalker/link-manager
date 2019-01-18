<template>
  <div class="item-list">
    <one-item
      v-on:delete-item="deleteItem"
      v-for="(item, index) in items"
      v-bind:item="item"
      v-bind:key="index">
    </one-item>
  </div>
</template>

<script>
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
        let data = {
          'id': doc.id,
          'title': doc.data().title,
          'url': doc.data().url,
          'comment': doc.data().comment,
        }
        this.items.push(data)
      })
    })
  },
  methods: {
    deleteItem(item) {
      const itemIndex = this.items.indexOf(item)
      this.items.splice(itemIndex, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
