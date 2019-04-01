<template>
  <div class="item-list">
    <v-layout>
      <v-flex style="overflow-y: scroll;">
        <v-data-table
          :items="tableItems"
          :headers="header"
          class="elevation-1"
          :search="search"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <tr
              @keydown.space.prevent="copyItemUrl(props.item)"
              @keyup.69="editItem(props.item)"
              @keyup.68="deleteItem(props.item)"
              @keyup.74="jumpToTargetLink(props.item)"
              tabindex="0"
            >
              <td class="item-list-col item-list__title">
                <a :href="props.item.url" target="_blank" tabindex="-1">{{props.item.title}}</a>
              </td>
              <td class="item-list-col item-list__comment">{{props.item.comment}}</td>
              <td class="item-list-col item-list__btns justify-center align-center layout pl-5">
                <v-icon small @click="editItem(props.item)" class="mr-4">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </tr>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >"{{ search }}" に該当する項目はありません。</v-alert>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="500px" @keydown.esc="cancelAddItem">
      <v-card>
        <v-card-title>
          <span class="headline">項目を編集</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="editedItem.title"
                  label="名前"
                  ref="title"
                  :rules="[rules.required]"
                  onfocus="this.select()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="editedItem.url"
                  label="URL"
                  ref="url"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
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
import firebase from 'firebase/app'
import db from '../firebase'

export default {
  props: ['search'],
  data () {
    return {
      header: [
        { text: '名前', value: 'title', sortable: false },
        { text: 'メモ', value: 'comment', sortable: false },
        { text: '', value: 'name', sortable: false },
      ],
      tableItems: [],
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
      },
      rules: {
        required: value => !!value || '入力必須項目です。',
      }
    }
  },

  watch: {
    dialog (val) {
      val || this.cancelAddItem()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      db.collection('items').orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          this.tableItems = []
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
              this.tableItems.push(data)
            }
          })
        })
    },

    editItem (item) {
      this.editedIndex = this.tableItems.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.$nextTick(this.$refs.title.focus)
    },

    deleteItem (item) {
      confirm('本当に削除してもよろしいですか？') &&
        db.collection('items').doc(item.id).delete()
    },

    cancelAddItem () {
      this.dialog = false,
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
    },

    saveItem (item) {
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
    },

    copyItemUrl (item) {
      const text = document.createElement('textarea')
      text.value = item.url
      document.body.appendChild(text)
      text.select()
      document.execCommand('copy')
      document.body.removeChild(text)
    },

    jumpToTargetLink (item) {
      open(item.url, "_blank")
    }
  }
}
</script>

<style>
.item-list .v-table__overflow table,
.item-list .v-table__overflow thead,
.item-list .v-table__overflow tbody,
.item-list .v-table__overflow th {
  display: block;
}

.item-list .v-table__overflow tr {
  align-items: center;
  display: flex;
  padding: 0 20px;
}

.item-list-col {
  align-items: center;
  display: flex;
  overflow: hidden;
}

.item-list .elevation-1 {
  box-shadow: none !important;
  height: 300px;
}

table.v-table tbody tr:focus {
  background: #eee;
  outline: none;
}

.v-table__overflow table.v-table thead tr {
  height: 48px;
}

.v-table__overflow table.v-table thead th {
  font-weight: bold;
}

.v-table__overflow table.v-table tbody td {
  height: 40px;
}

.v-table__overflow table.v-table tbody td {
  width: 100%;
}

.item-list .v-table__overflow th:first-child,
.item-list .v-table__overflow .item-list__title {
  width: 50%;
}

.item-list .v-table__overflow th,
.item-list .v-table__overflow .item-list__comment {
  width: 30%;
}

.item-list .v-table__overflow th:last-child,
.item-list .v-table__overflow .item-list__btns {
  width: 20%;
}

.item-list .v-alert {
  margin: 0;
  height: 40px;
}
</style>
