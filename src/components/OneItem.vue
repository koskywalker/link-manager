<template>
  <div class="one-item">
    <div class="content" v-show="!isEditing">
      <div class="item-title">{{ item.title }}</div>
      <div class="item-url">{{ item.url }}</div>
      <div class="item-comment">{{ item.comment }}</div>
      <div class="item-btns">
        <button v-on:click="showForm">編集</button>
        <button v-on:click="deleteItem(item.id)">削除</button>
      </div>
    </div>
    <div class="content" v-show="isEditing">
      <div class="form">
        <div class="field">
          <label>
            Title: <input type="text" v-model="item.title">
          </label>
        </div>
        <div class="field">
          <label>
            URL: <input type="text" v-model="item.url">
          </label>
        </div>
        <div class="field">
          <label>
            Comment: <input type="text" v-model="item.comment">
          </label>
        </div>
        <div class="button">
          <button v-on:click="hideForm">キャンセル</button>
          <button v-on:click="updateItem(item.id)">完了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase'
export default {
  props: ['item'],
  data() {
    return {
      isEditing: false
    }
  },
  methods: {
    showForm() {
      this.isEditing = true
    },
    hideForm() {
      this.isEditing = false
    },
    deleteItem(id) {
      db.collection('item').doc(id).delete()
    },
    updateItem(id) {
      const now = new Date()
      db.collection('item').doc(id).update({
        title: this.item.title,
        url: this.item.url,
        comment: this.item.comment,
        updatedAt: now,
      })
      this.hideForm()
    }
  }
}
</script>

<style lang="scss" scoped></style>
