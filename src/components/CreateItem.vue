<template>
  <div class="create-item">
    <v-dialog v-model="dialog" max-width="500px" @keydown.esc="cancelAddItem">
      <v-btn slot="activator" icon tabindex="0">
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
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
          <v-btn color="blue darken-1" flat @click="addItem">追加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '../firebase'

export default {
  data () {
    return {
      dialog: false,
      formTitle: '項目を追加',
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

  methods: {
    cancelAddItem () {
      this.dialog = false
    },

    addItem () {
      if (this.editedItem.title.length > 0 && this.editedItem.url.length > 0) {
        const now = new Date()
        const currentUserId = firebase.auth().currentUser.uid
        db.collection('items').add({
          userId: currentUserId,
          title: this.editedItem.title,
          url: this.editedItem.url,
          comment: this.editedItem.comment,
          createdAt: now,
          updatedAt: now,
        })
        this.editedItem = Object.assign({}, this.defaultItem)
        this.dialog = false
      }
    }
  },

  watch: {
    dialog (val) {
      if (val) {
        this.$nextTick(this.$refs.title.focus)
      }
      if (!val) {
        this.$emit('dialog-value-event')
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.$refs.title.reset()
          this.$refs.url.reset()
        }, 300)
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
