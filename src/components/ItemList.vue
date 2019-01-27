<template>
  <div class="item-list">
    <v-data-table
      :items="item"
      :headers="header"
      class="elevation-10"
      :filter="filter"
      :search="search"
    >
      <template slot="items" slot-scope="row">
        <td>{{row.item.title}}</td>
        <td>{{row.item.url}}</td>
        <td>{{row.item.comment}}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase'
// import OneItem from './OneItem'

export default {
  components: {
    // OneItem,
  },
  props: ['search'],
  data() {
    return {
      header: [
        { text: '名前', value: 'title' },
        { text: 'URL', value: 'url' },
        { text: 'メモ', value: 'comment' },
      ],
      item: [],
    }
  },
  methods: {
    filter(val, search) {
      return val === search
    },
  },
  created() {
    db.collection('items').orderBy('createdAt', 'desc')
    .onSnapshot((querySnapshot) => {
      this.item = []
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
          this.item.push(data)
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped></style>
