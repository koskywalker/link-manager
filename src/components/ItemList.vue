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
import OneItem from './OneItem'

export default {
  props: ['items'],
  components: {
    OneItem,
  },
  methods: {
    deleteItem(item) {
      const itemIndex = this.items.indexOf(item)
      this.items.splice(itemIndex, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
