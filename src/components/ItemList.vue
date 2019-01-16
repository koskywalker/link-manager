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
    db.collection('items').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = {
          'id': doc.id,
          'title': doc.data().title,
          'url': doc.data().url,
          'comment': doc.data().comment,
          'slug': doc.data().slug,
        }
        this.items.push(data)
      })
    })
  },
  beforeRouteEnter (to, from, next) {
    db.collection('items').where('slug', '==', to.param.item).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        next(vm => {
          vm.title = doc.data().title
          vm.url = doc.data().url
          vm.comment = doc.data().comment
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      db.collection('items').where('slug', '==', this.$route.param.item).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data())
          this.title = doc.data().title
          this.url = doc.data().url
          this.comment = doc.data().comment
        })
      })
    },
    deleteItem(item) {
      const itemIndex = this.items.indexOf(item)
      this.items.splice(itemIndex, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
