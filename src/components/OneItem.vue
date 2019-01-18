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
          <label>Title</label>
          <input type="text" v-model="item.title">
        </div>
        <div class="field">
          <label>URL</label>
          <input type="text" v-model="item.url">
        </div>
        <div class="field">
          <label>Comment</label>
          <input type="text" v-model="item.comment">
        </div>
        <div class="button">
          <button v-on:click="hideForm">完了</button>
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
      db.collection('items').doc(id).delete()
    }
  }
}
</script>

<style lang="scss" scoped></style>
