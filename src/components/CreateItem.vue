<template>
  <div class="create-item">
    <button v-on:click="openForm" v-show="!isCreating">追加</button>
    <div v-show="isCreating">
      <div class="content">
        <form class="form" @submit.prevent="sendForm">
          <div class="field">
            <label>Title</label>
            <input type="text" v-model="title" ref="title" defaultValue="">
          </div>
          <div class="field">
            <label>URL</label>
            <input type="text" v-model="url" ref="url" defaultValue="">
          </div>
          <div class="field">
            <label>Comment</label>
            <input type="text" v-model="comment" ref="comment" defaultValue="">
          </div>
          <div class="buttons">
            <button type="submit">追加</button>
            <button v-on:click="closeForm">キャンセル</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase'
export default {
  data() {
    return {
      title: '',
      url: '',
      comment: '',
      createdAt: '',
      isCreating: false
    }
  },
  methods: {
    openForm() {
      this.isCreating = true
    },
    closeForm() {
      this.isCreating = false
    },
    sendForm() {
      if (this.title.length > 0 && this.url.length > 0) {
        const now = new Date()
        db.collection('items').add({
          title: this.title,
          url: this.url,
          comment: this.comment,
          createdAt: now,
          slug: this.generateUUID(),
        })
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(error => {
          console.error('Error adding document: ', error)
        })
        this.title = ''
        this.url = ''
        this.comment = ''
        this.isCreating = false
      }
    },
    generateUUID() {
      let d = new Date().getTime();
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
