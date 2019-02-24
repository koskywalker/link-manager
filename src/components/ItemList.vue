<template>
  <div class="item-list">
    <v-data-table :items="desserts" :headers="header" class="elevation-10" :search="search">
      <template slot="items" slot-scope="props">
        <td>{{props.item.title}}</td>
        <td>{{props.item.url}}</td>
        <td>{{props.item.comment}}</td>
        <td class="justify-center align-center layout px-0">
          <v-icon small @click="editItem(props.item)" class="mr-4">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        "{{ search }}" に該当する項目はありません。
      </v-alert>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" icon></v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">項目を編集</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.title" label="名前" ref="title" onfocus="this.select()"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.url" label="URL"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.comment" label="メモ"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="cancelAddItem">キャンセル</v-btn>
          <v-btn color="blue darken-1" flat @click="saveItem(editedItem)">完了</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase'

export default {
  props: ['search'],
  data() {
    return {
      header: [
        { text: '名前', value: 'title' },
        { text: 'URL', value: 'url' },
        { text: 'メモ', value: 'comment' },
        { text: '', value: 'name', sortable: false },
      ],
      desserts: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        title: '',
        url: '',
        comment: '',
      },
      defaultItem: {
        title: '',
        url: '',
        comment: '',
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.cancelAddItem()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      db.collection('items').orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        this.desserts = []
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
            this.desserts.push(data)
          }
        })
      })
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.$nextTick(this.$refs.title.focus)
    },

    deleteItem(item) {
      db.collection('items').doc(item.id).delete()
    },

    cancelAddItem() {
      this.dialog = false,
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },

    saveItem(item) {
      if (this.editedItem.title.length > 0 && this.editedItem.url.length > 0) {
        const now = new Date()
        db.collection('items').doc(item.id).update({
          title: this.editedItem.title,
          url: this.editedItem.url,
          comment: this.editedItem.comment,
          updatedAt: now,
        })
        this.editedItem = Object.assign({}, this.defaultItem)
        this.dialog = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
