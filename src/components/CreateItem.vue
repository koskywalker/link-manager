<template>
  <div class="create-item">
    <button v-on:click="openForm" v-show="!isCreating">追加</button>
    <div v-show="isCreating">
      <div class="content">
        <div class="form">
          <div class="field">
            <label>Title</label>
            <input type="text" v-model="newTitle" ref="title" defaultValue="">
          </div>
          <div class="field">
            <label>URL</label>
            <input type="text" v-model="newUrl" ref="url" defaultValue="">
          </div>
          <div class="field">
            <label>Comment</label>
            <input type="text" v-model="newComment" ref="comment" defaultValue="">
          </div>
          <div class="buttons">
            <button v-on:click="sendForm">追加</button>
            <button v-on:click="closeForm">キャンセル</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTitle: '',
      newUrl: '',
      newComment: '',
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
      if (this.newTitle.length > 0 && this.newUrl.length > 0) {
        const title = this.newTitle
        const url = this.newUrl
        const comment = this.newComment
        this.$emit('create-item', {
          title,
          url,
          comment
        })
        this.newTitle = ''
        this.newUrl = ''
        this.newComment = ''
        this.isCreating = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
