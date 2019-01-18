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
  }
}
</script>

<style lang="scss" scoped></style>
