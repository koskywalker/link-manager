<template>
  <div class="create-item">
    <button v-on:click="openForm" v-show="!isCreating">追加</button>
    <div v-show="isCreating">
      <div class="content">
        <div class="form">
          <div class="field">
            <label>
              Title: <input type="text" v-model="title" ref="title" defaultValue="">
            </label>
          </div>
          <div class="field">
            <label>
              URL: <input type="text" v-model="url" ref="url" defaultValue="">
            </label>
          </div>
          <div class="field">
            <label>
              Comment: <input type="text" v-model="comment" ref="comment" defaultValue="">
            </label>
          </div>
          <div class="buttons">
            <button v-on:click="cancelAddItem">キャンセル</button>
            <button v-on:click="addItem">追加</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase'
export default {
  data() {
    return {
      title: '',
      url: '',
      comment: '',
      isCreating: false
    }
  },
  methods: {
    openForm() {
      this.isCreating = true
    },
    cancelAddItem() {
      this.title = '',
      this.url = '',
      this.comment = '',
      this.isCreating = false
    },
    addItem() {
      if (this.title.length > 0 && this.url.length > 0) {
        const now = new Date()
        const currentUserId = firebase.auth().currentUser.uid
        db.collection('items').add({
          userId: currentUserId,
          title: this.title,
          url: this.url,
          comment: this.comment,
          createdAt: now,
          updatedAt: now,
        })
        this.title = ''
        this.url = ''
        this.comment = ''
        this.isCreating = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
